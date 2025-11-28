import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { LucideInfo } from "lucide-react";
import ReactionIcon from "../../../../assets/images/report/reaction-time.svg";

// --- INTERFACE DATA (Sama kayak yang lain) ---
interface GameSkillDetail {
  waktu_reaksi: number; // Skor 0-100 (dari backend logic baru)
  waktu_reaksi_ms: number; // Raw Data ms
}

interface AnalyticsStats {
  scores: { waktu_reaksi: number }; // Raw Data ms
  game_skills?: Record<string, GameSkillDetail>;
}

interface ReportData {
  overall: AnalyticsStats;
  week1: AnalyticsStats;
  week2: AnalyticsStats;
  week3: AnalyticsStats;
  week4: AnalyticsStats;
}

interface ReactionTimeDetailCardProps {
  data?: ReportData | null; // Ganti props jadi Full Data
}

const ReactionTimeDetailCard: React.FC<ReactionTimeDetailCardProps> = ({ data }) => {
  // State Active Week (Default Week 1)
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");

  // Auto Select Minggu yang ada datanya
  useEffect(() => {
    if (data) {
        if (data.week4.scores.waktu_reaksi > 0) setActiveWeek("week4");
        else if (data.week3.scores.waktu_reaksi > 0) setActiveWeek("week3");
        else if (data.week2.scores.waktu_reaksi > 0) setActiveWeek("week2");
        else setActiveWeek("week1");
    }
  }, [data]);

  // Logic Helper: Konversi MS ke Score 0-100 (Biar bar chart bisa naik)
  // 0ms = 100 poin, 10000ms = 0 poin
  const msToScore = (ms: number) => {
    if (!ms || ms <= 0) return 0;
    return Math.max(0, Math.min(100, ((10000 - ms) / 10000) * 100));
  };

  // --- LOGIC DATA DINAMIS ---
  
  // 1. Display Angka Utama (Detik)
  const reactionMs = data?.overall?.scores?.waktu_reaksi || 0;
  const scoreInSeconds = (reactionMs / 1000).toFixed(2); // Jadiin "1.32"
  const progressPercent = msToScore(reactionMs); // Buat Progress Bar

  const games = [
    {
      name: "GELEMBUNG AJAIB",
      icon: "https://framerusercontent.com/images/5I3P3XAnbMenWJjscRxX24z5M.png?width=538&height=506",
    },
    {
      name: "PAPAN SEIMBANG",
      icon: "https://framerusercontent.com/images/FR7BN9QpiRVUPGBwQnTS1gd1rQo.png?width=538&height=506",
    },
    {
      name: "TANGKAP RASA",
      icon: "https://framerusercontent.com/images/MMaNnP62Y1mEGXox40R4JAyw.png?width=538&height=506",
    },
    {
      name: "KARTU COCOK",
      icon: "https://framerusercontent.com/images/SFEfgSYbe53srnzCJKt25zMYb8.png?width=538&height=506",
    },
  ];

  // 2. Data Vertical Chart (Minggu 1-4)
  const verticalChartData = useMemo(() => {
    return [
      { y: msToScore(data?.week1?.scores?.waktu_reaksi || 0), color: "rgb(10, 93, 20)" },
      { y: msToScore(data?.week2?.scores?.waktu_reaksi || 0), color: "rgb(10, 93, 20)" },
      { y: msToScore(data?.week3?.scores?.waktu_reaksi || 0), color: "rgb(10, 93, 20)" },
      { y: msToScore(data?.week4?.scores?.waktu_reaksi || 0), color: "rgb(10, 93, 20)" },
    ];
  }, [data]);

  // 3. Data Horizontal Chart (Per Game)
  const horizontalChartData = useMemo(() => {
    const currentSkills = data?.[activeWeek]?.game_skills || {};
    
    return games.map((game) => {
        // Ambil skill 'waktu_reaksi' (yang sudah 0-100 dari backend)
        const val = currentSkills[game.name]?.waktu_reaksi || 0;
        return {
            y: val,
            color: "rgb(10, 93, 20)"
        };
    });
  }, [data, activeWeek]);


  // Konfigurasi Vertical Bar Chart
  const verticalChartOptions = useMemo(
    () => ({
      chart: {
        type: "column",
        height: 401,
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
      },
      title: { text: null },
      credits: { enabled: false },
      xAxis: {
        categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "14px",
            color: "rgb(10, 93, 20)",
          },
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 20, 40, 60, 80, 100],
        title: { text: null },
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "12px",
            color: "rgb(10, 93, 20)",
          },
        },
        gridLineColor: "rgb(255, 255, 255)",
        gridLineWidth: 1,
      },
      plotOptions: {
        column: {
          borderRadius: 4,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: "Raleway",
              fontWeight: "700",
              fontSize: "12px",
              color: "rgb(10, 93, 20)",
            },
            formatter: function (this: any) {
              return this.y.toFixed(0); // Tampilkan Skor (bukan detik biar grafik naik)
            },
          },
          states: { hover: { enabled: false } },
        },
      },
      series: [
        {
          name: "Progress",
          data: verticalChartData,
          pointPadding: 0.2,
          groupPadding: 0.3,
        },
      ],
      tooltip: { enabled: false },
      legend: { enabled: false },
    }),
    [verticalChartData]
  );

  // Konfigurasi Horizontal Bar Chart (Games)
  const horizontalChartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 401,
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
      },
      title: { text: null },
      credits: { enabled: false },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 25, 50, 75, 100],
        title: { text: null },
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "12px",
            color: "rgb(10, 93, 20)",
          },
        },
        gridLineColor: "rgb(255, 255, 255)",
        gridLineWidth: 1,
      },
      xAxis: {
        categories: games.map((g) => g.name),
        labels: { enabled: false },
        lineWidth: 0,
        tickWidth: 0,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderWidth: 0,
          dataLabels: { enabled: false },
          states: { hover: { enabled: false } },
        },
      },
      series: [
        {
          name: "Progress",
          data: horizontalChartData,
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
      ],
      tooltip: { enabled: false },
      legend: { enabled: false },
    }),
    [horizontalChartData]
  );

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Top Section - Background Image with Content */}
      <div>
        <div className="bg-gradient-to-tr from-[#00B510] to-[#59f366] rounded-lg p-6 mt-8 h-[221px]">
          {/* Left Column - Text & Progress */}
          <div className="flex gap-6 mb-6 ">
            {/* Right Column - Chart SVG */}
            <div className=" flex-shrink-0">
              <div data-framer-component-type="SVG" className="w-full h-full">
                <div
                  className="w-full h-full flex items-center"
                  style={{ aspectRatio: "inherit" }}
                >
                  <img src={ReactionIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* Title */}
              <div className="flex flex-row justify-between mb-6">
                <div className="flex gap-3 items-center">
                  <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-white col-span-2">
                    Rata-rata Waktu Reaksi
                  </h2>
                  <div className="flex items-center">
                    <LucideInfo className="text-white"></LucideInfo>
                  </div>
                </div>
                {/* Percentage Display (GANTI JADI DETIK) */}
                <div className=" flex items-end">
                  <p className="font-raleway font-bold text-[30px]  text-white">
                    {scoreInSeconds} s
                  </p>
                </div>
              </div>
              
              {/* Labels under progress bar */}
               <div className="flex justify-between mt-[18px] mb-2">
                  <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">
                    10s (Lambat)
                  </p>
                  <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">
                    0s (Cepat)
                  </p>
               </div>

              {/* Progress Bar */}
              <div className="mb-6">
                 {/* Progress Bar Container */}
                 <div className="h-[9px] bg-white rounded-full relative">
                   {/* Progress Fill */}
                   <div
                     className="absolute top-0 left-0 h-[9px] bg-[#0A5D14] rounded-full transition-all duration-1000"
                     style={{ width: `${progressPercent}%` }}
                   >
                     {/* Marker */}
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                       <div className="flex flex-col items-center">
                         <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0A5D14] bg-white px-1 py-0.5 rounded shadow-sm mb-4 whitespace-nowrap">
                           {scoreInSeconds}s
                         </p>
                         <div className="w-px bg-[#0A5D14] mt-1" />
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

              {/* Description */}
              <div className="mt-6">
                <p className="font-raleway font-semibold text-[15px] leading-[18px] text-white">
                  Kemampuan untuk mendeteksi dan merespons rangsangan/isyarat
                  yang disajikan di lingkungan permainan secara cepat.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section - Week Tabs & Games Chart */}
        <div className="bg-[#EEFFEE] p-4 mt-8">
          <div className="flex gap-6">
            {/* Left Chart - Vertical Bar Chart */}
            <div className="flex-1">
              <HighchartsReact
                highcharts={Highcharts}
                options={verticalChartOptions}
              />
            </div>

            {/* Right Chart - Horizontal Bar Chart with Tabs */}
            <div className="flex-1 flex flex-col">
              {/* Week Tabs */}
              <div className="flex gap-2 mb-4 border-[#dedede] border-b-2">
                {["week1", "week2", "week3", "week4"].map((week) => (
                    <button
                        key={week}
                        onClick={() => setActiveWeek(week as any)}
                        className={`px-4 py-2 rounded-none bg-transparent font-['Raleway'] font-bold text-[14px] leading-[21px] transition-colors ${
                        activeWeek === week
                            ? "text-[#0A5D14] border-b-2 border-b-[#0A5D14]"
                            : "text-[#0A5D14] hover:bg-green-100"
                        }`}
                        style={{
                        borderBottomWidth: activeWeek === week ? "2px" : "0",
                        }}
                    >
                        {week.replace("week", "Minggu ")}
                    </button>
                ))}
              </div>

              {/* Date Display */}
              <div className="mb-6">
                <p className="font-['Raleway'] font-bold text-[12px] leading-[18px] text-[#0A5D14]">
                  4 Agustus 2025 - 10 Agustus 2025
                </p>
              </div>
              <div className="flex flex-row">
                {/* Game Icons */}
                <div className="flex flex-col justify-between items-center mt-4 bg-transparent p-4 rounded-lg">
                  {games.map((game, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-2"
                    >
                      <div className="w-9 h-9 rounded overflow-hidden">
                        <img
                          src={game.icon}
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        {game.name === "PAPAN SEIMBANG" ? (
                          <p className="font-['Raleway'] font-bold text-[11px] leading-[13px] text-[#262626] uppercase whitespace-pre-line">
                            PAPAN
                            <br />
                            SEIMBANG
                          </p>
                        ) : (
                          game.name.split(" ").map((word, i) => (
                            <p
                              key={i}
                              className="font-['Raleway'] font-bold text-[11px] leading-[13px] text-[#262626] uppercase"
                            >
                              {word}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Horizontal Bar Chart */}
                <div className="flex-1">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={horizontalChartOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionTimeDetailCard;