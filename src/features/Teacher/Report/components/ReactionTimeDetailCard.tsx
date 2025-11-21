import React, { useState, useMemo } from "react";
import { LucideInfo } from "lucide-react";
import ReactionIcon from "../../../../assets/images/report/reaction-time.svg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ReactionTimeDetailCard: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<"week31" | "week32">("week31");
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
  // Data untuk vertical bar chart (Minggu 31 & 32)
  const weekComparisonData = {
    week31: 70.7,
    week32: 79.4,
  };

  // Data untuk horizontal bar chart berdasarkan minggu
  const gameProgressData = {
    week31: {
      "GELEMBUNG AJAIB": 75,
      "PAPAN SEIMBANG": 45,
      "TANGKAP RASA": 80,
      "KARTU COCOK": 95,
    },
    week32: {
      "GELEMBUNG AJAIB": 85,
      "PAPAN SEIMBANG": 50,
      "TANGKAP RASA": 85,
      "KARTU COCOK": 100,
    },
  };

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
        categories: ["Minggu 31", "Minggu 32"],
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
        title: {
          text: null,
        },
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
          data: [
            { y: weekComparisonData.week31, color: "rgb(10, 93, 20)" },
            { y: weekComparisonData.week32, color: "rgb(10, 93, 20)" },
          ],
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
    []
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
      title: {
        text: null,
      },
      credits: {
        enabled: false,
      },
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
            color: "rgb(10, 93, 20)",
          },
        },
        gridLineColor: "rgb(255, 255, 255)",
        gridLineWidth: 1,
      },
      xAxis: {
        categories: games.map((g) => g.name),
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
          data: games.map((game) => ({
            y: gameProgressData[activeWeek][
              game.name as keyof typeof gameProgressData.week31
            ],
            color: "rgb(10, 93, 20)",
          })),
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
    [activeWeek, games]
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
                {/* Percentage Display */}
                <div className=" flex items-end">
                  <p className="font-raleway font-bold text-[30px]  text-white">
                    5.2 s
                  </p>
                </div>
              </div>
              {/* Description */}
              <div className="mt-6">
                <p className="font-raleway font-semibold text-[15px] leading-[18px] text-white">
                  Kemampuan untuk mendeteksi dan merespons rangsangan/isyarat
                  yang disajikan di lingkungan permainan secara cepat,
                  memastikan reaksi yang tepat waktu dan efisien terhadap
                  berbagai tantangan.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section - Week Tabs & Games Chart */}
        <div className="bg-[#EEFFEE] p-4 mt-8">
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
                <button
                  onClick={() => setActiveWeek("week31")}
                  className={`px-4 py-2 rounded-none bg-transparent font-['Raleway'] font-bold text-[14px] leading-[21px] transition-colors ${
                    activeWeek === "week31"
                      ? "text-[#0A5D14] border-b-2 border-b-[#0A5D14]"
                      : "text-[#0A5D14] hover:bg-blue-50"
                  }`}
                  style={{
                    borderBottomWidth: activeWeek === "week31" ? "2px" : "0",
                  }}
                >
                  Minggu 31
                </button>
                <button
                  onClick={() => setActiveWeek("week32")}
                  className={`px-4 py-2 rounded-none bg-transparent font-['Raleway'] font-bold text-[14px] leading-[21px] transition-colors ${
                    activeWeek === "week32"
                      ? "text-[#0A5D14] border-b-2 border-b-[#0A5D14]"
                      : "text-[#0A5D14] hover:bg-blue-50"
                  }`}
                  style={{
                    borderBottomWidth: activeWeek === "week32" ? "2px" : "0",
                  }}
                >
                  Minggu 32
                </button>
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