import React from "react";
import { Link } from "react-router-dom";

const ProgressTracker: React.FC = () => {
  // Calculate progress percentage (15 minutes out of 20 minutes)
  const minutesLeft = 15;
  const totalMinutes = 20;
  const progressPercentage = (minutesLeft / totalMinutes) * 100;

  // Calculate SVG arc for circular progress
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  return (
    // CONTAINER LUAR: Digunakan untuk memposisikan kartu di tengah halaman jika diperlukan
    <div className="flex justify-center items-center flex-col mb-[48px]">
      {/* KARTU UTAMA: Flex Container untuk Layout Kiri-Kanan */}
      <div className="bg-white rounded-xl p-[20px] shadow-xl w-[240px] h-[121px] flex justify-between items-center">
        {/* 1. KOLOM KIRI: Teks & Link (Lebih besar/flex-grow) */}
        {/* Menggunakan flex-grow untuk mengambil ruang yang tersisa */}
        <div className="flex flex-col **gap-[23.52px]** justify-start h-full w-auto flex-grow">
          {/* Teks Utama */}
          <div className="flex flex-col">
            <p className="font-bold text-[14px] text-gray-800 text-left w-[128px]">
              Main setidaknya 20 menit/minggu
            </p>
          </div>

          {/* Link */}
          <div className="flex justify-start mt-[23.2px]">
            <Link
              to="/admin/reports"
              className="text-[10px] font-bold italic text-[#E82D2F] underline capitalize hover:no-underline transition-all"
            >
              Lihat detail laporan
            </Link>
          </div>
        </div>

        {/* 2. KOLOM KANAN: Circular Progress Bar (Lebar Tetap) */}
        <div className="flex flex-col justify-center items-center gap-1 w-[80px] flex-none**">
          {/* Progress Circle Container */}
          <div className="relative w-[60px] h-[60px] flex items-center justify-center">
            {/* SVG Component */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="4"
              />
              {/* Progress Arc */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="none"
                stroke="#E82D2F"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>

            {/* Center Text */}
            <span className="absolute font-bold text-2xl text-gray-800">
              {minutesLeft}
            </span>
          </div>

          {/* Minutes Text */}
          <p className="font-bold text-xs leading-5 text-gray-800 text-center whitespace-nowrap">
            Menit tersisa
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
