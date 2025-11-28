import React, { useState, useMemo } from "react";
import OverallProgressIcon from "../../../../assets/images/report/overall-progress.svg";
import { LucideInfo } from "lucide-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ReportData {
  overall: { period_average: number }; // Skor rata-rata bulan ini
  week1: { game_scores: Record<string, number>; period_average: number };
  week2: { game_scores: Record<string, number>; period_average: number };
  week3: { game_scores: Record<string, number>; period_average: number };
  week4: { game_scores: Record<string, number>; period_average: number };
}

interface OverallProgressReportCardProps {
  data?: ReportData | null;
}

const OverallProgressReportCard: React.FC<OverallProgressReportCardProps> = ({ data }) => {
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");

const gamesConfig = [
    {
      name: "GELEMBUNG AJAIB", // Sesuai JSON DB
      displayName: "GELEMBUNG AJAIB",
      icon: "https://framerusercontent.com/images/5I3P3XAnbMenWJjscRxX24z5M.png?width=538&height=506",
    },
    {
      name: "PAPAN SEIMBANG", // Sesuai JSON DB
      displayName: "PAPAN SEIMBANG",
      icon: "https://framerusercontent.com/images/FR7BN9QpiRVUPGBwQnTS1gd1rQo.png?width=538&height=506",
    },
    {
      name: "TANGKAP RASA", // Sesuai JSON DB
      displayName: "TANGKAP RASA",
      icon: "https://framerusercontent.com/images/MMaNnP62Y1mEGXox40R4JAyw.png?width=538&height=506",
    },
    {
      name: "KARTU COCOK", // Sesuai JSON DB
      displayName: "KARTU COCOK",
      icon: "https://framerusercontent.com/images/SFEfgSYbe53srnzCJKt25zMYb8.png?width=538&height=506",
    },
  ];

  const verticalChartData = useMemo(() => {
    return [
      { name: "Minggu 1", y: data?.week1?.period_average || 0 },
      { name: "Minggu 2", y: data?.week2?.period_average || 0 },
      { name: "Minggu 3", y: data?.week3?.period_average || 0 },
      { name: "Minggu 4", y: data?.week4?.period_average || 0 },
    ];
  }, [data]);

  const horizontalChartData = useMemo(() => {
    const currentScores = data?.[activeWeek]?.game_scores || {};

    return gamesConfig.map((game) => {

        const exactName = game.name;
        const score = currentScores[exactName] || 0;
        
        return {
            y: score,
            color: "rgb(8, 78, 197)"
        };
    });
  }, [data, activeWeek]);

  // Konfigurasi Vertical Bar Chart (Minggu 31 & 32)
  const verticalChartOptions = useMemo(
    () => ({
      chart: {
        type: "column",
        height: 401,
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "14px",
            color: "rgb(8, 78, 197)",
          },
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 20, 40, 60, 80, 100],
        title: {
          text: null,
        },
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "12px",
            color: "rgb(30, 75, 169)",
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
              color: "rgb(8, 78, 197)",
            },
            formatter: function (this: any) {
              return this.y.toFixed(1);
            },
          },
          states: {
            hover: {
              enabled: false,
            },
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
      tooltip: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    }),
    [verticalChartData]
  );

  // Konfigurasi Horizontal Bar Chart (Games)
  const horizontalChartOptions = useMemo(
    () => ({
      chart: { type: "bar", height: 401, backgroundColor: "transparent", spacing: [0, 0, 0, 0]},
      title: { text: null },
      credits: { enabled: false },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 25, 50, 75, 100],
        title: {
          text: null,
        },
        labels: {
          style: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: "12px",
            color: "rgb(30, 75, 169)",
          },
        },
        gridLineColor: "rgb(255, 255, 255)",
        gridLineWidth: 1,
      },
      xAxis: {
        categories: gamesConfig.map((g) => g.name),
        labels: {
          enabled: false,
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderWidth: 0,
          dataLabels: {
            enabled: false,
          },
          states: {
            hover: {
              enabled: false,
            },
          },
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
      tooltip: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    }),
    [horizontalChartData]
  );

  const overallPercentage = data?.overall?.period_average || 0;

  return (
    <div>
      <div className="bg-[#EDF8FF] rounded-lg p-6 mt-8">
        {/* Left Column - Text & Progress */}
        <div className="flex gap-6 mb-6 ">
          {/* Right Column - Chart SVG */}
          <div className="w-[433px] h-[269px] flex-shrink-0">
            <div data-framer-component-type="SVG" className="w-full h-full">
              <div
                className="w-full h-full flex items-center"
                style={{ aspectRatio: "inherit" }}
              >
                <img src={OverallProgressIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Title */}
            <div className="flex flex-row justify-between mb-6">
              <div className="flex w-[272px]">
                <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-[#084EC5] col-span-2">
                  Laporan kemajuan secara keseluruhan
                </h2>
                <div className="flex items-center">
                  <LucideInfo className="text-[#084EC5]"></LucideInfo>
                </div>
              </div>
              {/* Percentage Display */}
              <div className=" flex items-end">
                <p className="font-raleway font-bold text-[30px]  text-[#084EC5]">
                  {overallPercentage}%
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
                  className="absolute top-0 left-0 h-[9px] bg-[#084EC5]"
                  style={{ width: `${overallPercentage}%` }}
                >
                  {/* Marker at 81.1 */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0D469B] bg-white mb-4 whitespace-nowrap">
                        {overallPercentage}%
                      </p>
                      <div className="w-px bg-[#0D469B] mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="font-raleway font-semibold text-[15px] leading-[18px] text-[#084EC5]">
                Skor ini menggabungkan performa dari fokus, ketangkasan,
                koordinasi tangan-mata, waktu reaksi, keseimbangan, memori, dan
                keterampilan sosial-emosional. Skor ini mengukur kemahiran dalam
                tugas-tugas permainan, kemampuan kognitif, dan kemampuan
                adaptasi emosional. Skor yang lebih tinggi menunjukkan
                penguasaan yang lebih baik terhadap tantangan dan tujuan
                permainan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Week Tabs & Games Chart */}
     <div className="bg-[#EDF8FF] p-4 mt-8">
        <div className="flex gap-6">
          {/* Left Chart - Vertical Bar Chart (Minggu 31 & 32) */}
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
                    activeWeek === week ? "text-[#084EC5] border-b-2 border-b-[#084EC5]" : "text-[#084EC5] hover:bg-blue-50"
                  }`}
                >
                  {week.replace("week", "Minggu ")}
                </button>
              ))}
            </div>

            {/* Date Display */}
            <div className="mb-6">
              <p className="font-['Raleway'] font-bold text-[12px] leading-[18px] text-[#0B1E59]">
                4 Agustus 2025 - 10 Agustus 2025
              </p>
            </div>
            <div className= "flex flex-row">
              {/* Game Icons */}
              <div className="flex flex-col justify-between items-center mt-4 bg-transparent p-4 rounded-lg">
                {gamesConfig.map((game, index) => (
                  <div key={index} className="flex flex-row items-center gap-2">
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
  );
};

export default OverallProgressReportCard;