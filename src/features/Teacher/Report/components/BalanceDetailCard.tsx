import React, { useState, useMemo, useEffect } from "react";
import { LucideInfo } from "lucide-react";
import BalanceIcon from "../../../../assets/images/report/keseimbangan.svg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// --- INTERFACE DATA (Sama standar card lain) ---
interface GameSkillDetail {
  keseimbangan: number; // Kita ambil skill keseimbangan
}

interface AnalyticsStats {
  scores: { keseimbangan: number };
  game_skills?: Record<string, GameSkillDetail>;
}

interface ReportData {
  overall: AnalyticsStats;
  week1: AnalyticsStats;
  week2: AnalyticsStats;
  week3: AnalyticsStats;
  week4: AnalyticsStats;
}

interface BalanceDetailCardProps {
  data?: ReportData | null;
}

const BalanceDetailCard: React.FC<BalanceDetailCardProps> = ({ data }) => {
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");

  // Auto-Select Minggu (Logic standar biar gak kosong pas dibuka)
  useEffect(() => {
    if (data) {
        if (data.week4.scores.keseimbangan > 0) setActiveWeek("week4");
        else if (data.week3.scores.keseimbangan > 0) setActiveWeek("week3");
        else if (data.week2.scores.keseimbangan > 0) setActiveWeek("week2");
        else setActiveWeek("week1");
    }
  }, [data]);

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

  // 1. Data Vertical Chart (Minggu 1-4)
  const verticalChartData = useMemo(() => {
    return [
      { y: data?.week1?.scores?.keseimbangan || 0, color: "rgb(198, 25, 8)" },
      { y: data?.week2?.scores?.keseimbangan || 0, color: "rgb(198, 25, 8)" },
      { y: data?.week3?.scores?.keseimbangan || 0, color: "rgb(198, 25, 8)" },
      { y: data?.week4?.scores?.keseimbangan || 0, color: "rgb(198, 25, 8)" },
    ];
  }, [data]);

  // 2. Data Horizontal Chart (Per Game)
  const horizontalChartData = useMemo(() => {
    const currentSkills = data?.[activeWeek]?.game_skills || {};
    
    return games.map((game) => {
        const val = currentSkills[game.name]?.keseimbangan || 0;
        return {
            y: val,
            color: "rgb(198, 25, 8)" // Warna Merah Bata
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
            color: "rgb(198, 25, 8)",
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
            color: "rgb(198, 25, 8)",
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
              color: "rgb(198, 25, 8)",
            },
            formatter: function (this: any) {
              return this.y.toFixed(1);
            },
          },
          states: {
            hover: { enabled: false },
          },
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

  // Konfigurasi Horizontal Bar Chart
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
            color: "rgb(198, 25, 8)",
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

  // Ambil Overall Score
  const overallScore = data?.overall?.scores?.keseimbangan || 0;

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Top Section - Background Image with Content */}
      <div>
        <div className="bg-gradient-to-tr from-[#FE3905] to-[#f36a45] rounded-lg p-6 mt-8 h-[236px]">
          {/* Left Column - Text & Progress */}
          <div className="flex gap-6 mb-6 ">
            {/* Right Column - Chart SVG */}
            <div className=" flex-shrink-0">
              <div data-framer-component-type="SVG" className="w-full h-full">
                <div
                  className="w-full h-full flex items-center"
                  style={{ aspectRatio: "inherit" }}
                >
                  <img src={BalanceIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* Title */}
              <div className="flex flex-row justify-between mb-6">
                <div className="flex gap-3 items-center">
                  <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-white col-span-2">
                    Keseimbangan
                  </h2>
                  <div className="flex items-center">
                    <LucideInfo className="text-white"></LucideInfo>
                  </div>
                </div>
                {/* Percentage Display */}
                <div className=" flex items-end">
                  <p className="font-raleway font-bold text-[30px]  text-white">
                    {overallScore.toFixed(0)} %
                  </p>
                </div>
              </div>
              {/* Progress Bar */}
              {/* Labels under progress bar */}
              <div className="flex justify-between mt-[18px] mb-2">
                <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0E2D5D]">
                  0
                </p>
                <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0E2D5D]">
                  100
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                {/* Progress Bar Container */}
                <div className="h-[9px] bg-white rounded-full relative">
                  {/* Progress Fill */}
                  <div
                    className="absolute top-0 left-0 h-[9px] bg-[#084EC5] rounded-full"
                    style={{ width: `${overallScore}%` }}
                  >
                    {/* Marker at Value */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                      <div className="flex flex-col items-center">
                        <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0D469B] bg-white mb-4 whitespace-nowrap">
                          {overallScore.toFixed(1)}
                        </p>
                        <div className="w-px bg-[#0D469B] mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="mt-6">
                <p className="font-raleway font-semibold text-[15px] leading-[18px] text-white">
                  Kemampuan untuk menjaga stabilitas dan kontrol atas gerakan
                  serta postur tubuh, bahkan saat melakukan tugas yang kompleks
                  atau menuntut fisik di dalam permainan.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section - Week Tabs & Games Chart */}
        <div className="bg-[#FFF3ED] p-4 mt-8">
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
                            ? "text-[#C61908] border-b-2 border-b-[#C61908]"
                            : "text-[#C61908] hover:bg-blue-50"
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
                <p className="font-['Raleway'] font-bold text-[12px] leading-[18px] text-[#C61908]">
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

export default BalanceDetailCard;