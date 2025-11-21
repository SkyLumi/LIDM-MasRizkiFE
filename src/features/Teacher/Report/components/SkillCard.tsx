import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { getWeeklyAnalytics } from "../../../../services/api";

// Import Icon
import FokusIcon from "../../../../assets/images/skillcard/fokus.svg";
import KeseimbanganIcon from "../../../../assets/images/skillcard/keseimbangan.svg";
import KetangkasanIcon from "../../../../assets/images/skillcard/ketangkasan.svg";
import KoordinasiIcon from "../../../../assets/images/skillcard/koordinasi.svg";
import MemoriIcon from "../../../../assets/images/skillcard/memori.svg";
import WaktuIcon from "../../../../assets/images/skillcard/waktureaksi.svg";

// Definisi Tipe Data dari API
interface WeeklyStats {
  fokus: number;
  koordinasi: number;
  waktu_reaksi: number;
  keseimbangan: number;
  ketangkasan: number;
  memori: number;
}

interface SkillCardProps {
  studentId: number; // Butuh ID Murid buat nembak API
}

const SkillCard: React.FC<SkillCardProps> = ({ studentId }) => {
  
  // State buat nyimpen data skor
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!studentId) return;
      
      try {
        setLoading(true);
        
        const result = await getWeeklyAnalytics(studentId);
        
        if (result.status === 'sukses') {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Gagal ambil statistik:", error);
        // Opsional: Bisa set state error kalo mau nampilin pesan
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [studentId]);

  // Config buat Mapping Card (Biar gak copas kode 6 kali)
  const skillConfig = [
    { key: 'fokus', title: 'Fokus', icon: FokusIcon, colorStart: '#0066FF', colorEnd: '#0784cc', barColor: '#084EC5' },
    { key: 'koordinasi', title: 'Koordinasi Tangan & Mata', icon: KoordinasiIcon, colorStart: '#E82D2F', colorEnd: '#be4343', barColor: '#C21315' },
    { key: 'waktu_reaksi', title: 'Rata-rata Waktu Reaksi', icon: WaktuIcon, colorStart: '#00B510', colorEnd: '#59f366', barColor: '#009E0E', isReactionTime: true },
    { key: 'keseimbangan', title: 'Keseimbangan', icon: KeseimbanganIcon, colorStart: '#FE3905', colorEnd: '#f36a45', barColor: '#D92D00' },
    { key: 'ketangkasan', title: 'Ketangkasan', icon: KetangkasanIcon, colorStart: '#F89508', colorEnd: '#dead68', barColor: '#D67E00' },
    { key: 'memori', title: 'Memori', icon: MemoriIcon, colorStart: '#FA3AB1', colorEnd: '#f584ca', barColor: '#D12890' },
  ];

  if (loading) return <div className="mt-6 text-center">Memuat data statistik...</div>;
  if (!stats) return <div className="mt-6 text-center">Data tidak tersedia.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[24px]">
      {skillConfig.map((skill) => {
        // Ambil nilai dari state
        // @ts-ignore (Biar TS ga rewel soal index key string)
        let rawValue = stats[skill.key] || 0;
        
        // Khusus Waktu Reaksi: Nilai kecil = Bagus (kebalikan), tapi progress bar butuh persen (0-100)
        // Kita harus normalisasi. Misal max lambat = 2000ms (0%), 0ms = 100%.
        let displayValue = rawValue;
        let progressPercent = rawValue;

        if (skill.isReactionTime) {
            // Format: 1200 ms -> "1.2s"
            displayValue = `${(rawValue / 1000).toFixed(2)}s`;
            // Logika Progress Bar (Makin kecil makin penuh)
            // Contoh kasar: 2 detik = 0%, 0.5 detik = 100%
            progressPercent = Math.max(0, Math.min(100, (2000 - rawValue) / 20)); 
        } else {
            // Format biasa: 85 -> "85 Points"
            displayValue = `${Math.round(rawValue)} Points`;
            progressPercent = Math.min(100, Math.max(0, rawValue));
        }

        return (
          <div key={skill.key} className="w-full h-full">
            <div 
              className="rounded-lg p-[18px] relative overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(to top right, ${skill.colorStart}, ${skill.colorEnd})` }}
            >
              
              {/* Header: Icon & Title */}
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center p-3">
                   <img src={skill.icon} alt={skill.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-raleway font-bold text-[18px] leading-tight text-white">
                    {skill.title}
                  </h3>
                </div>
                <Info className="text-white/80 w-5 h-5 cursor-pointer hover:text-white" />
              </div>

              {/* Progress Bar Area */}
              <div className="relative mb-4">
                <div className="flex justify-between mb-1 text-white/80 text-[10px] font-semibold font-raleway">
                  <span>0</span>
                  <span>100</span>
                </div>
                
                <div className="h-[8px] bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: `${progressPercent}%`,
                        backgroundColor: skill.barColor
                    }}
                  />
                </div>
                
                {/* Marker Angka (Opsional: Floating di atas bar) */}
                <div 
                    className="absolute top-4 transition-all duration-1000"
                    style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="w-0.5 h-2 bg-white mx-auto mb-1"></div>
                    <span className="text-[10px] text-white font-bold bg-black/20 px-1 rounded">
                        {skill.isReactionTime ? `${Math.round(rawValue)}ms` : Math.round(rawValue)}
                    </span>
                </div>
              </div>

              {/* Big Score Number */}
              <div className="font-raleway text-[28px] mb-[16px] text-white font-bold">
                {displayValue}
              </div>

              {/* Detail Button */}
              <button className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors shadow-sm">
                <p className="font-raleway font-bold text-[12px] text-[#212529]">
                  Lihat Detail
                </p>
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillCard;