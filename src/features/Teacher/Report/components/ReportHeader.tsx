import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react"; 
import ChangePlayerModal from "./ChangePlayerModal";
import { useSelectedPlayer } from "../contexts/SelectedPlayerContext";

// Props untuk komunikasi ke Parent
interface ReportHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ selectedDate, onDateChange }) => {
  const { players, loading, currentPlayer, setCurrentPlayer } = useSelectedPlayer();
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  // --- STATE DROPDOWN ---
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  // Helper: Format Tanggal ke "Agustus 2025" (Bahasa Indonesia)
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(date);
  };

  // Helper: Generate List 6 Bulan Terakhir
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();
    // Generate 6 bulan ke belakang
    for (let i = 0; i < 6; i++) { 
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      options.push(d);
    }
    return options;
  };

  const monthOptions = getMonthOptions();

  // Handle Click Outside (Tutup dropdown kalau klik di luar)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthSelect = (date: Date) => {
    onDateChange(date);
    setIsDateDropdownOpen(false);
  };

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
          <div className="w-[76px] h-[76px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
            {safeImageSrc ? (
              <img
                src={safeImageSrc}
                alt={currentPlayer?.name || "Pemain"}
                className="w-full h-full object-cover"
              />
            ) : (
               <span className="text-gray-400 font-bold text-2xl">
                  {currentPlayer?.name?.charAt(0) || "?"}
               </span>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col gap-2 flex-grow min-w-0">
            <h3 className="font-raleway font-bold text-base leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {currentPlayer
                ? currentPlayer.name
                : loading
                ? "Memuat..."
                : "Pilih Pemain"}
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

        {/* Date Range Filter (DROPDOWN) */}
        <div className="flex flex-col gap-2">
          <p className="font-raleway font-bold text-sm text-[#262626]">
            Laporan Bulan:
          </p>
          
          <div className="relative" ref={dateDropdownRef}>
            <button 
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-4 py-2 bg-white border border-black rounded-lg flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 transition-colors min-w-[220px]"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-black" />
                <span className="font-raleway font-bold text-sm text-gray-700 capitalize">
                  {formatDate(selectedDate)}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[300px] overflow-y-auto">
                {monthOptions.map((dateOption, index) => {
                   const isSelected = dateOption.getMonth() === selectedDate.getMonth() && dateOption.getFullYear() === selectedDate.getFullYear();
                   return (
                    <button
                        key={index}
                        onClick={() => handleMonthSelect(dateOption)}
                        className={`px-4 py-3 text-left font-raleway text-sm transition-colors flex items-center justify-between ${
                        isSelected
                            ? "bg-blue-50 text-[#0066FF] font-bold" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {formatDate(dateOption)}
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                    </button>
                   )
                })}
              </div>
            )}
          </div>
          
          {/* MODAL PEMAIN */}
          <ChangePlayerModal
              open={isChangeOpen}
              onClose={() => setIsChangeOpen(false)}
              players={players}
              currentPlayer={currentPlayer} 
              onConfirm={(p) => {
                setCurrentPlayer(p);
                setIsChangeOpen(false);
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;