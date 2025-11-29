import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { LucideInfo } from "lucide-react";
import CoordinationIcon from "../../../../assets/images/report/coordination.svg";

// --- INTERFACE DATA ---
interface GameSkillDetail {
  fokus: number;
  koordinasi: number; // Kita butuh Koordinasi
  keseimbangan: number;
  ketangkasan: number;
  memori: number;
  waktu_reaksi: number;
}

interface AnalyticsStats {
  scores: { koordinasi: number };
  game_skills?: Record<string, GameSkillDetail>;
}

interface ReportData {
  overall: AnalyticsStats;
  week1: AnalyticsStats;
  week2: AnalyticsStats;
  week3: AnalyticsStats;
  week4: AnalyticsStats;
}

interface CoordinationDetailCardProps {
  data?: ReportData | null;
}

const CoordinationDetailCard: React.FC<CoordinationDetailCardProps> = ({ data }) => {
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");

  // Auto-Select Minggu
  useEffect(() => {
    if (data) {
        if (data.week4.scores.koordinasi > 0) setActiveWeek("week4");
        else if (data.week3.scores.koordinasi > 0) setActiveWeek("week3");
        else if (data.week2.scores.koordinasi > 0) setActiveWeek("week2");
        else setActiveWeek("week1");
    }
  }, [data]);

  const gamesConfig = [
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

  // 1. CHART VERTICAL: Rata-rata KOORDINASI Mingguan
  const verticalChartData = useMemo(() => {
    return [
      { y: data?.week1?.scores?.koordinasi || 0, color: "rgb(210, 33, 21)" },
      { y: data?.week2?.scores?.koordinasi || 0, color: "rgb(210, 33, 21)" },
      { y: data?.week3?.scores?.koordinasi || 0, color: "rgb(210, 33, 21)" },
      { y: data?.week4?.scores?.koordinasi || 0, color: "rgb(210, 33, 21)" },
    ];
  }, [data]);

  // 2. CHART HORIZONTAL: Skor KOORDINASI Per Game
  const horizontalChartData = useMemo(() => {
    const currentWeekSkills = data?.[activeWeek]?.game_skills || {};

    return gamesConfig.map((game) => {
      const detail = currentWeekSkills[game.name];
      const score = detail ? detail.koordinasi : 0;

      return {
        y: score,
        color: "rgb(210, 33, 21)",
      };
    });
  }, [data, activeWeek]);

  // --- CONFIG CHARTS ---
  const chartBaseOptions = {
    chart: { backgroundColor: "transparent", spacing: [0, 0, 0, 0] },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    tooltip: { enabled: false },
    yAxis: { 
        min: 0, max: 100, 
        tickPositions: [0, 20, 40, 60, 80, 100],
        title: { text: null }, 
        gridLineColor: "rgb(255, 255, 255)",
        labels: { style: { fontFamily: "Raleway", fontWeight: "700", color: "rgb(210, 33, 21)", fontSize: "12px" } }
    },
  };

  const verticalChartOptions = useMemo(() => ({
    ...chartBaseOptions,
    chart: { ...chartBaseOptions.chart, type: "column", height: 401 },
    xAxis: {
        categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
        labels: { style: { fontFamily: "Raleway", fontWeight: "700", color: "rgb(210, 33, 21)", fontSize: "14px" } },
        lineWidth: 0,
        tickWidth: 0,
    },
    plotOptions: {
        column: { borderRadius: 4, borderWidth: 0, dataLabels: { enabled: true, style: { color: "rgb(210, 33, 21)", fontFamily: "Raleway", fontWeight: "700" }, formatter: function(this: any) { return this.y.toFixed(0); } }, states: { hover: { enabled: false } } }
    },
    series: [{ name: "Progress", data: verticalChartData }]
  }), [verticalChartData]);

  const horizontalChartOptions = useMemo(() => ({
    ...chartBaseOptions,
    chart: { ...chartBaseOptions.chart, type: "bar", height: 401 },
    xAxis: {
        categories: gamesConfig.map(g => g.name),
        labels: { enabled: false },
        lineWidth: 0,
        tickWidth: 0,
    },
    plotOptions: {
        bar: { borderRadius: 4, borderWidth: 0, dataLabels: { enabled: false }, states: { hover: { enabled: false } } }
    },
    series: [{ name: "Progress", data: horizontalChartData }]
  }), [horizontalChartData]);

  const overallScore = data?.overall?.scores?.koordinasi || 0;

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Top Section - Header Card (Gradient Red) */}
      <div className="bg-gradient-to-tr from-[#E82D2F] to-[#ff5052] rounded-lg p-6 mt-8 h-[221px]">
        <div className="flex gap-6 mb-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div data-framer-component-type="SVG" className="w-full h-full">
              <div className="w-full h-full flex items-center" style={{ aspectRatio: "inherit" }}>
                <img src={CoordinationIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Title & Score */}
            <div className="flex flex-col justi">
              <div className="flex gap-3 items-center justify-start">
                <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-white col-span-2">
                  Koordinasi Tangan & Mata
                </h2>
                <div className="flex items-center">
                  <LucideInfo className="text-white" />
                </div>
                <div className="flex items-end ml-auto"> {/* Pake ml-auto biar ke kanan */}
                  <p className="font-raleway font-bold text-[30px] text-white">
                    {overallScore.toFixed(0)} Points
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between mt-[18px] mb-2">
                  <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">0</p>
                  <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">100</p>
                </div>
                <div className="">
                  <div className="h-[9px] bg-white relative rounded-full"> {/* Tambah rounded-full */}
                    <div
                      className="absolute top-0 left-0 h-[9px] bg-[#084EC5] rounded-full transition-all duration-1000"
                      style={{ width: `${overallScore}%` }}
                    >
                      {/* Marker */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                        <div className="flex flex-col items-center">
                          <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white bg-transparent mt-7 whitespace-nowrap">
                            {overallScore.toFixed(1)}
                          </p>
                          <div className="w-px bg-[#0D469B] mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="font-raleway font-semibold text-[15px] leading-[18px] text-white">
                Kemampuan tubuh untuk mengintegrasikan informasi visual secara
                mulus dengan gerakan tangan, memungkinkan tindakan yang presisi
                dan terkoordinasi dalam permainan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Week Tabs & Chart */}
      <div className="bg-[#FFF1F1] p-4 mt-8">
        <div className="flex gap-6">
          {/* Left Chart */}
          <div className="flex-1">
            <HighchartsReact highcharts={Highcharts} options={verticalChartOptions} />
          </div>

          {/* Right Chart */}
          <div className="flex-1 flex flex-col">
            {/* Week Tabs */}
            <div className="flex gap-2 mb-4 border-[#dedede] border-b-2">
              {["week1", "week2", "week3", "week4"].map((week) => (
                <button
                  key={week}
                  onClick={() => setActiveWeek(week as any)}
                  className={`px-4 py-2 rounded-none bg-transparent font-['Raleway'] font-bold text-[14px] leading-[21px] transition-colors ${
                    activeWeek === week
                      ? "text-[#C21315] border-b-2 border-b-[#C21315]"
                      : "text-[#C21315] border-transparent hover:bg-red-50"
                  }`}
                >
                  {week.replace("week", "Minggu ")}
                </button>
              ))}
            </div>

            {/* Date Display */}
            <div className="mb-6">
              <p className="font-['Raleway'] font-bold text-[12px] leading-[18px] text-[#C21315]">
                4 Agustus 2025 - 10 Agustus 2025
              </p>
            </div>

            <div className="flex flex-row">
              {/* Game Icons */}
              <div className="flex flex-col justify-between items-center mt-4 bg-transparent p-4 rounded-lg">
                {gamesConfig.map((game, index) => (
                  <div key={index} className="flex flex-row items-center gap-2">
                    <div className="w-9 h-9 rounded overflow-hidden">
                      <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                        {/* Logic nama game panjang (Papan Seimbang) */}
                        {game.name === "PAPAN SEIMBANG" ? (
                          <p className="font-['Raleway'] font-bold text-[11px] leading-[13px] text-[#262626] uppercase whitespace-pre-line">
                            PAPAN<br />SEIMBANG
                          </p>
                        ) : (
                          game.name.split(" ").map((word, i) => (
                            <p key={i} className="font-['Raleway'] font-bold text-[11px] leading-[13px] text-[#262626] uppercase">
                              {word}
                            </p>
                          ))
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Horizontal Chart */}
              <div className="flex-1">
                <HighchartsReact highcharts={Highcharts} options={horizontalChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinationDetailCard;