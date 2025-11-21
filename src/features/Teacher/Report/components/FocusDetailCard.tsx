import React, { useState, useMemo } from "react";
import FokusIcon from "../../../../assets/images/report/fokus.svg";
import { LucideInfo } from "lucide-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const FocusDetailCard: React.FC = () => {
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
          data: [
            { y: weekComparisonData.week31, color: "rgb(8, 78, 197)" },
            { y: weekComparisonData.week32, color: "rgb(8, 78, 197)" },
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
            color: "rgb(30, 75, 169)",
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
            color: "rgb(8, 78, 197)",
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
    <div>
      <div className="bg-[#0066FF] rounded-xl p-6 mt-8 h-[222px]">
        {/* Left Column - Text & Progress */}
        <div className="flex gap-6 mb-6 ">
          {/* Right Column - Chart SVG */}
          <div className="w-[433px] h-[269px] flex-shrink-0">
            <div data-framer-component-type="SVG" className="w-full h-full">
              <div
                className=" flex items-center"
                style={{ aspectRatio: "inherit" }}
              >
                <img src={FokusIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Title */}
            <div className="flex flex-row justify-between mb-6">
              <div className="flex gap-3 items-center">
                <h2 className="font-raleway font-bold text-[25px] leading-[25px] text-white col-span-2">
                  Fokus
                </h2>
                <div className="flex items-center">
                  <LucideInfo className="text-white"></LucideInfo>
                </div>
              </div>
              {/* Percentage Display */}
              <div className=" flex items-end">
                <p className="font-raleway font-bold text-[30px]  text-white">
                  81.1%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {/* Labels under progress bar */}
            <div className="flex justify-between mt-[18px] mb-2">
              <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">
                0
              </p>
              <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white">
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
                  style={{ width: "81.1%" }}
                >
                  {/* Marker at 81.1 */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <p className="font-raleway font-semibold text-[10px] leading-[10px] text-white bg-transparent mt-7 whitespace-nowrap">
                        81.1
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
                Kemampuan untuk berkonsentrasi pada detail lingkungan permainan
                sambil secara efektif mencapai tujuannya.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section - Week Tabs & Games Chart */}
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
              <button
                onClick={() => setActiveWeek("week31")}
                className={`px-4 py-2 rounded-none bg-transparent font-['Raleway'] font-bold text-[14px] leading-[21px] transition-colors ${
                  activeWeek === "week31"
                    ? "text-[#084EC5] border-b-2 border-b-[#084EC5]"
                    : "text-[#084EC5] hover:bg-blue-50"
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
                    ? "text-[#084EC5] border-b-2 border-b-[#084EC5]"
                    : "text-[#084EC5] hover:bg-blue-50"
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
              <p className="font-['Raleway'] font-bold text-[12px] leading-[18px] text-[#0B1E59]">
                4 Agustus 2025 - 10 Agustus 2025
              </p>
            </div>
            <div className= "flex flex-row">
              {/* Game Icons */}
              <div className="flex flex-col justify-between items-center mt-4 bg-transparent p-4 rounded-lg">
                {games.map((game, index) => (
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

export default FocusDetailCard;