import React, { useState } from "react";
import FokusIcon from "../../../../assets/images/report/fokus.svg";
import { LucideInfo } from "lucide-react";

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
      <div className="bg-[#EDF8FF] p-4 mt-8">
        {/* Week Tabs */}
        <div className="flex gap-2 mb-4 mt-8">
          <button
            onClick={() => setActiveWeek("week31")}
            className={`px-4 py-2 font-raleway font-bold text-sm leading-[21px] transition-colors ${
              activeWeek === "week31"
                ? "text-[#084EC5] border-b-2 border-[#084EC5]"
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
            className={`px-4 py-2 font-raleway font-bold text-sm leading-[21px] transition-colors ${
              activeWeek === "week32"
                ? "text-[#084EC5] border-b-2 border-[#084EC5]"
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
          <p className="font-raleway font-bold text-xs leading-[18px] text-[#0B1E59]">
            4 Agustus 2025 - 10 Agustus 2025
          </p>
        </div>

        {/* Chart SVG */}
        <div className="w-full h-[401px] flex">
          <div data-framer-component-type="SVG" className="w-full h-full ">
            <div
              className="w-full h-full items-end flex"
              style={{ aspectRatio: "inherit" }}
            >
              <svg
                style={{ width: "100%", height: "100%" }}
                viewBox="0 0 418 401"
                preserveAspectRatio="none"
              >
                {/* Chart SVG will be rendered here */}
              </svg>
            </div>
          </div>
        </div>

        {/* Game Icons */}
        <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] p-4 rounded-lg">
          {games.map((game, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded overflow-hidden">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                {game.name === "PAPAN SEIMBANG" ? (
                  <p className="font-raleway font-bold text-[11px] leading-[13px] text-[#262626] uppercase whitespace-pre-line">
                    PAPAN
                    <br />
                    SEIMBANG
                  </p>
                ) : (
                  game.name.split(" ").map((word, i) => (
                    <p
                      key={i}
                      className="font-raleway font-bold text-[11px] leading-[13px] text-[#262626] uppercase"
                    >
                      {word}
                    </p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusDetailCard;
