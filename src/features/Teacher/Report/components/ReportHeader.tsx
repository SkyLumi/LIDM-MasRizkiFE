import React from "react";
import { Calendar, Printer } from "lucide-react";
import ChangePlayerModal from "./ChangePlayerModal";
import { useSelectedPlayer } from "../contexts/SelectedPlayerContext";

const ReportHeader: React.FC = () => {
  const { players, loading, currentPlayer, setCurrentPlayer } =
    useSelectedPlayer();
  const [isChangeOpen, setIsChangeOpen] = React.useState(false);

  const safeImageSrc =
    currentPlayer?.image && currentPlayer.image.trim() !== ""
      ? currentPlayer.image
      : undefined;

  return (
    <div className="flex items-center justify-between">
      {/* Left: Player Info & Date Range */}
      <div className="flex items-center justify-between gap-[16px]">
        {/* Player Card */}
        <div className="w-[312px] bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] p-[28px] flex items-center gap-4">
          {/* Avatar */}
          <div className="w-[76px] h-[76px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            {safeImageSrc ? (
              <img
                src={safeImageSrc}
                alt={currentPlayer?.name || "Pemain"}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col gap-2 flex-grow min-w-0">
            <h3 className="font-raleway font-bold text-base leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {currentPlayer
                ? currentPlayer.name
                : loading
                ? "Memuat pemain..."
                : "Pemain tidak tersedia"}
            </h3>
            <button
              onClick={() => setIsChangeOpen(true)}
              disabled={!players.length}
              className="w-full h-fit p-[16px] bg-white rounded-lg border border-gray-800 flex items-center justify-center gap-2 cursor-pointer transition-transform duration-[450ms] hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="font-raleway font-bold text-xs leading-4 text-gray-800">
                Ganti Pemain
              </span>
              <svg
                className="w-4 h-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Date Range & Actions */}
        <div className="flex flex-col gap-2">
          <p className="font-raleway font-bold text-sm text-[#262626]">
            Menampilkan Kemajuan Selama 30 Hari Terakhir
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-black rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-50">
              <Calendar className="w-5 h-5 text-black" />
              <span className="font-raleway font-normal text-sm text-gray-700">
                07-Jul-2025 to 05-Aug-2025
              </span>
            </button>
            <button className="px-[40px] py-2 bg-white text-black border-black rounded-lg font-raleway font-semibold text-sm hover:bg-slate-100 transition-colors">
              Laporan Terbaru
            </button>
            {/* Right: Print Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-black rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-5 h-5 text-black " />
            </button>
            <ChangePlayerModal
              open={isChangeOpen}
              onClose={() => setIsChangeOpen(false)}
              players={players}
              currentPlayer={
                currentPlayer ?? { name: "", absen: "", image: "" }
              }
              onConfirm={(p) => {
                setCurrentPlayer(p);
                setIsChangeOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
