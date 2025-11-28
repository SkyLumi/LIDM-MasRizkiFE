import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { LucideInfo } from "lucide-react";
import MemoryIcon from "../../../../assets/images/report/memori.svg";

// --- INTERFACE DATA ---
interface GameSkillDetail {
  fokus: number;
  koordinasi: number;
  keseimbangan: number;
  ketangkasan: number;
  memori: number; // Kita butuh Memori
  waktu_reaksi: number;
}

interface AnalyticsStats {
  scores: { memori: number }; // Kita butuh Memori
  game_skills?: Record<string, GameSkillDetail>;
}

interface ReportData {
  overall: AnalyticsStats;
  week1: AnalyticsStats;
  week2: AnalyticsStats;
  week3: AnalyticsStats;
  week4: AnalyticsStats;
}

interface MemoryDetailCardProps {
  data?: ReportData | null;
}

const MemoryDetailCard: React.FC<MemoryDetailCardProps> = ({ data }) => {
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");

  // Auto-Select Minggu
  useEffect(() => {
    if (data) {
        if (data.week4.scores.memori > 0) setActiveWeek("week4");
        else if (data.week3.scores.memori > 0) setActiveWeek("week3");
        else if (data.week2.scores.memori > 0) setActiveWeek("week2");
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

  // 1. CHART VERTICAL: Rata-rata MEMORI Mingguan
  const verticalChartData = useMemo(() => {
    return [
      { name: "Minggu 1", y: data?.week1?.scores?.memori || 0 },
      { name: "Minggu 2", y: data?.week2?.scores?.memori || 0 },
      { name: "Minggu 3", y: data?.week3?.scores?.memori || 0 },
      { name: "Minggu 4", y: data?.week4?.scores?.memori || 0 },
    ];
  }, [data]);

  // 2. CHART HORIZONTAL: Skor MEMORI Per Game
  const horizontalChartData = useMemo(() => {
    const currentWeekSkills = data?.[activeWeek]?.game_skills || {};

    return gamesConfig.map((game) => {
      const detail = currentWeekSkills[game.name];
      // Ambil MEMORI saja
      const score = detail ? detail.memori : 0;

      return {
        y: score,
        color: "rgb(209, 18, 144)", // Warna Pink Gelap
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
        title: { text: null }, 
        gridLineColor: "rgb(255, 255, 255)",
        labels: { style: { fontFamily: "Raleway", fontWeight: "700", color: "#D11290" } }
    },
  };

  const verticalChartOptions = useMemo(() => ({
    ...chartBaseOptions,
    chart: { ...chartBaseOptions.chart, type: "column", height: 401 },
    xAxis: {
        categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
        labels: { style: { fontFamily: "Raleway", fontWeight: "700", color: "#D11290" } },
        lineWidth: 0,
    },
    plotOptions: {
        column: { borderRadius: 4, borderWidth: 0, dataLabels: { enabled: true, color: "#D11290", formatter: function(this:any){return this.y.toFixed(0)} } }
    },
    series: [{ name: "Memori", data: verticalChartData, color: "#D11290" }]
  }), [verticalChartData]);

  const horizontalChartOptions = useMemo(() => ({
    ...chartBaseOptions,
    chart: { ...chartBaseOptions.chart, type: "bar", height: 401 },
    xAxis: {
        categories: gamesConfig.map(g => g.name),
        labels: { enabled: false },
        lineWidth: 0,
    },
    plotOptions: {
        bar: { borderRadius: 4, borderWidth: 0, dataLabels: { enabled: true, color: "#D11290" } }
    },
    series: [{ name: "Memori", data: horizontalChartData }]
  }), [horizontalChartData]);

  const overallScore = data?.overall?.scores?.memori || 0;

  return (
    <div className="bg-white rounded-lg p-0">
      
      {/* Top Section - Header Card (Gradient Pink) */}
       <div className="bg-gradient-to-tr from-[#FA3AB1] to-[#f584ca] rounded-lg p-6 mt-8 h-[221px]">
          {/* Left Column - Text & Progress */}
          <div className="flex gap-6 mb-6 ">
            {/* Right Column - Chart SVG */}
            <div className=" flex-shrink-0">
              <div data-framer-component-type="SVG" className="w-full h-full">
                <div
                  className="w-full h-full flex items-center"
                  style={{ aspectRatio: "inherit" }}
                >
                  <img src={MemoryIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* Title */}
              <div className="flex flex-row justify-between mb-6">
                <div className="flex gap-3 items-center">
                  <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-white col-span-2">
                    Memori
                  </h2>
                  <div className="flex items-center">
                    <LucideInfo className="text-white"></LucideInfo>
                  </div>
                </div>
                {/* Percentage Display */}
                <div className=" flex items-end">
                  <p className="font-raleway font-bold text-[30px] text-white">
                    80 %
                  </p>
                </div>
              </div>
              {/* Description */}
              <div className="mt-6">
                <p className="font-raleway font-semibold text-[15px] leading-[18px] text-white">
                  Kemampuan untuk secara efisien menyandikan, menafsirkan,
                  menyimpan, dan mengambil informasi yang ditemui selama bermain
                  game, memfasilitasi retensi dan pemanfaatan pengetahuan serta
                  strategi terkait game.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Bottom Section - Week Tabs & Chart (Background Light Pink) */}
      <div className="bg-[#FFF0F9] p-4 mt-8 rounded-lg">
        <div className="flex gap-6">
          {/* Left Chart */}
          <div className="flex-1">
             <h3 className="text-center font-bold text-[#D11290] mb-2">Trend Mingguan</h3>
            <HighchartsReact highcharts={Highcharts} options={verticalChartOptions} />
          </div>

          {/* Right Chart */}
          <div className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-4 border-b-2 border-[#ffd6f0]">
                {["week1", "week2", "week3", "week4"].map((week) => (
                <button
                    key={week}
                    onClick={() => setActiveWeek(week as any)}
                    className={`px-4 py-2 font-bold text-[14px] border-b-2 transition-colors ${
                    activeWeek === week 
                        ? "text-[#D11290] border-[#D11290]" 
                        : "text-[#D11290] border-transparent hover:bg-pink-50"
                    }`}
                >
                    {week.replace("week", "Minggu ")}
                </button>
                ))}
            </div>

            <div className="flex flex-row">
                <div className="flex flex-col justify-around py-4 pr-2">
                    {gamesConfig.map((game, i) => (
                        <div key={i} className="flex items-center gap-2 h-[45px]">
                            <img src={game.icon} className="w-8 h-8 rounded" alt="" />
                        </div>
                    ))}
                </div>
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

export default MemoryDetailCard;