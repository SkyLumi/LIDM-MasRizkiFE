import React, { useState } from "react";
import FokusIcon from "../../../../assets/images/report/fokus.svg";
import { LucideInfo } from "lucide-react";

interface FocusDetailCardProps {
  fokusPoint: number;
}

const FocusDetailCard: React.FC<FocusDetailCardProps> = ({ fokusPoint }) => {
  const score = fokusPoint;
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
      {/* ==== TOP BLUE CARD ==== */}
      <div className="bg-[#0066FF] rounded-xl p-6 mt-8 h-[222px]">
        <div className="flex gap-6 mb-6 ">
          {/* LEFT IMAGE */}
          <div className="w-[433px] h-[269px] flex-shrink-0">
            <div className="w-full h-full flex items-center">
              <img src={FokusIcon} alt="" />
            </div>
          </div>

          {/* RIGHT TEXT AREA */}
          <div className="flex-1">
            <div className="flex flex-row justify-between mb-6">
              <div className="flex gap-3 items-center">
                <h2 className="font-raleway font-bold text-[25px] text-white">
                  Fokus
                </h2>
                <LucideInfo className="text-white" />
              </div>

              <div className="flex items-end">
                <p className="font-raleway font-bold text-[30px] text-white">
                  {score} Points
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between mt-[18px] mb-2">
              <p className="font-raleway font-semibold text-[10px] text-white">0</p>
              <p className="font-raleway font-semibold text-[10px] text-white">100</p>
            </div>

            <div className="mb-6">
              <div className="h-[9px] bg-white rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-[9px] bg-[#084EC5]"
                  style={{ width: `${score}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <p className="font-raleway font-semibold text-[10px] text-white bg-transparent mt-7 whitespace-nowrap">
                        {score}
                      </p>
                      <div className="w-px bg-[#0D469B] mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="font-raleway font-semibold text-[15px] text-white">
              Kemampuan untuk berkonsentrasi pada detail lingkungan permainan
              sambil secara efektif mencapai tujuannya.
            </p>
          </div>
        </div>
      </div>

      {/* ==== BOTTOM SECTION ==== */}
      <div className="bg-[#EDF8FF] p-4 mt-8">
        {/* WEEK TABS */}
        <div className="flex gap-2 mb-4 mt-8">
          <button
            onClick={() => setActiveWeek("week31")}
            className={`px-4 py-2 font-bold text-sm ${
              activeWeek === "week31"
                ? "text-[#084EC5] border-b-2 border-[#084EC5]"
                : "text-[#084EC5] hover:bg-blue-50"
            }`}
          >
            Minggu 31
          </button>

          <button
            onClick={() => setActiveWeek("week32")}
            className={`px-4 py-2 font-bold text-sm ${
              activeWeek === "week32"
                ? "text-[#084EC5] border-b-2 border-[#084EC5]"
                : "text-[#084EC5] hover:bg-blue-50"
            }`}
          >
            Minggu 32
          </button>
        </div>

        {/* DATE RANGE */}
        <p className="font-bold text-xs text-[#0B1E59] mb-6">
          {/* {focusData?.range ?? "Tanggal tidak tersedia"} */}
        </p>

        {/* MAIN CHART */}
        <div className="w-full h-[401px] flex">
          <svg className="w-full h-full" viewBox="0 0 418 401"></svg>
        </div>

        {/* GAME ICON LIST */}
        <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] p-4 rounded-lg">
          {games.map((game, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                src={game.icon}
                alt={game.name}
                className="w-9 h-9 rounded object-cover"
              />
              {game.name.split(" ").map((word, i) => (
                <p
                  key={i}
                  className="font-bold text-[11px] text-[#262626] uppercase leading-[13px]"
                >
                  {word}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusDetailCard;
