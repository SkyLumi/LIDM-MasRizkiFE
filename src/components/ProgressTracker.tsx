import React from "react";
import { Link } from "react-router-dom";

const ProgressTracker: React.FC = () => {

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
              Main minimal 20 menit/minggu
            </p>
          </div>

          {/* Link */}
          <div className="flex justify-start mt-[23.2px]">
            <Link
              to="/teacher/reports"
              className="text-[10px] font-bold italic text-[#E82D2F] underline capitalize hover:no-underline transition-all"
            >
              Lihat detail laporan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
