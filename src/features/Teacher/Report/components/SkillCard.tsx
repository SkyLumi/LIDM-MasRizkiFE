import React from "react";
import { createPortal } from "react-dom";

// Import Icon (Sesuaikan path abang)
import FokusIcon from "../../../../assets/images/skillcard/fokus.svg";
import KeseimbanganIcon from "../../../../assets/images/skillcard/keseimbangan.svg";
import KetangkasanIcon from "../../../../assets/images/skillcard/ketangkasan.svg";
import KoordinasiIcon from "../../../../assets/images/skillcard/koordinasi.svg";
import MemoriIcon from "../../../../assets/images/skillcard/memori.svg";
import WaktuIcon from "../../../../assets/images/skillcard/waktureaksi.svg";
import ClockIcon from "../../../../assets/images/skillcard/Clock.svg";

// --- 1. KOMPONEN TOOLTIP (Dari Kode 2) ---
type IconTooltipProps = {
  text: string;
  maxWidth?: number;
  iconColor?: string;
  iconSize?: number;
  tooltipBgColor?: string;
  tooltipTextColor?: string;
};

const IconTooltip: React.FC<IconTooltipProps> = ({
  text,
  maxWidth = 300,
  iconColor = "#FFFFFF",
  iconSize = 24,
  tooltipBgColor = "#454545",
  tooltipTextColor = "#FFFFFF",
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = React.useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 12,
        left: rect.left + rect.width / 2,
      });
    }
  }, []);

  React.useEffect(() => {
    if (!isHovered) return;
    updatePosition();
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isHovered, updatePosition]);

  const tooltip =
    isHovered && typeof document !== "undefined"
      ? createPortal(
          <div
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <div
              className="px-3 py-2 rounded-lg shadow-lg text-xs font-raleway text-center"
              style={{
                maxWidth,
                backgroundColor: tooltipBgColor,
                color: tooltipTextColor,
              }}
            >
              {text}
            </div>
            <div
              className="mx-auto mt-[-4px] w-2 h-2 rotate-45"
              style={{ backgroundColor: tooltipBgColor }}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="flex items-center justify-center cursor-pointer focus:outline-none rounded-full transition-transform duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
      >
        <svg
          width={`${iconSize}px`}
          height={`${iconSize}px`}
          viewBox="0 0 24 24"
          fill={iconColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"></path>
        </svg>
      </div>
      {tooltip}
    </>
  );
};

// --- 2. LOGIKA UTAMA & STRUKTUR CARD ---

interface SkillStats {
  fokus: number;
  koordinasi: number;
  waktu_reaksi: number;
  keseimbangan: number;
  ketangkasan: number;
  memori: number;
}

interface SkillCardProps {
  stats?: SkillStats;
}

const SkillCard: React.FC<SkillCardProps> = ({ stats }) => {
  
  // Konfigurasi lengkap (Gabungan Data + Style)
  const skillConfig = [
    { 
      key: 'fokus', 
      title: 'Fokus', 
      icon: FokusIcon, 
      colorStart: '#0066FF', 
      colorEnd: '#0784cc', 
      barColor: '#084EC5',
      textColor: '#0D469B',
      tooltip: "Kemampuan untuk berkonsentrasi pada detail lingkungan permainan sambil secara efektif mencapai tujuannya."
    },
    { 
      key: 'koordinasi', 
      title: 'Koordinasi Tangan & Mata', 
      icon: KoordinasiIcon, 
      colorStart: '#E82D2F', 
      colorEnd: '#be4343', 
      barColor: '#C21315',
      textColor: '#C21315',
      tooltip: "Kemampuan tubuh untuk mengintegrasikan informasi visual secara mulus dengan gerakan tangan."
    },
    { 
      key: 'waktu_reaksi', 
      title: 'Rata-rata Waktu Reaksi', 
      icon: WaktuIcon, 
      colorStart: '#00B510', 
      colorEnd: '#59f366', 
      barColor: '#009E0E',
      textColor: '#009E0E',
      isReactionTime: true, // Flag khusus
      tooltip: "Kemampuan untuk mendeteksi dan merespons rangsangan/isyarat secara cepat."
    },
    { 
      key: 'keseimbangan', 
      title: 'Keseimbangan', 
      icon: KeseimbanganIcon, 
      colorStart: '#FE3905', 
      colorEnd: '#f36a45', 
      barColor: '#D92D00',
      textColor: '#D92D00',
      tooltip: "Kemampuan untuk menjaga stabilitas dan kontrol atas gerakan serta postur tubuh."
    },
    { 
      key: 'ketangkasan', 
      title: 'Ketangkasan', 
      icon: KetangkasanIcon, 
      colorStart: '#F89508', 
      colorEnd: '#dead68', 
      barColor: '#D67E00',
      textColor: '#D67E00',
      tooltip: "Kemampuan untuk menggerakkan atau memposisikan tubuh dengan cepat dan akurat."
    },
    { 
      key: 'memori', 
      title: 'Memori', 
      icon: MemoriIcon, 
      colorStart: '#FA3AB1', 
      colorEnd: '#f584ca', 
      barColor: '#D12890',
      textColor: '#D11290',
      tooltip: "Kemampuan untuk secara efisien menyandikan, menyimpan, dan mengambil informasi."
    },
  ];

  if (!stats) return <div className="mt-6 text-center font-raleway text-gray-500">Data tidak tersedia.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[24px]">
      {skillConfig.map((skill) => {
        // @ts-ignore (Akses dinamis key)
        let rawValue = stats[skill.key] || 0;
        
        let displayValue;
        let progressPercent;
        let markerText;

        // --- HITUNG NILAI ---
        if (skill.isReactionTime) {
            // Logic Waktu Reaksi (MS -> Detik)
            if (rawValue >= 9999 || rawValue === 0) { 
              displayValue = '- s';
            } else {
              displayValue = `${(rawValue / 1000).toFixed(2)}s`;
            }
            // *Progress Bar dihapus sesuai request, jadi variable ini tidak dipake untuk Waktu Reaksi*
        } else {
            // Logic Skill Biasa (0-100)
            displayValue = `${Math.round(rawValue)} Points`;
            markerText = Math.round(rawValue);
            progressPercent = Math.min(100, Math.max(0, rawValue));
        }

        return (
          <div key={skill.key} className="w-full h-full">
            {/* Card Body */}
            <div 
              className="rounded-lg p-[18px] relative overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(to top right, ${skill.colorStart}, ${skill.colorEnd})` }}
            >
              
              {/* --- HEADER: ICON & TITLE --- */}
              <div className="flex flex-row items-center mb-4">
                <div className="relative">
                  <div className="w-[70px] h-[70px] relative">
                    {/* Pixelated Icon Style dari Kode 2 */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ imageRendering: "pixelated" }}>
                       <img 
                         src={skill.icon} 
                         alt={skill.title} 
                         className="w-full h-full object-cover object-center" 
                       />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-row items-center ml-[16px]">
                   <div className="flex-1">
                      <h3 className="font-raleway font-bold text-[20px] leading-tight text-white">
                        {skill.title}
                      </h3>
                   </div>
                   <div className="ml-2">
                      <IconTooltip text={skill.tooltip} iconSize={24} />
                   </div>
                </div>
              </div>

              {/* --- PROGRESS BAR SECTION --- */}
              {/* Hanya tampil jika BUKAN Waktu Reaksi */}
              {!skill.isReactionTime && (
                <div className="relative mb-3">
                    <div className="flex justify-between mt-[18px] mb-2 text-white font-raleway font-semibold text-[10px] leading-[10px]">
                        <span>0</span>
                        <span>100</span>
                    </div>
                    
                    <div className="mb-6">
                        <div className="h-[9px] bg-white rounded-full relative">
                            <div
                                className="absolute top-0 left-0 h-[9px] rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                    width: `${progressPercent}%`,
                                    backgroundColor: skill.barColor 
                                }}
                            >
                                {/* Marker Mengambang */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                                    <div className="flex flex-col items-center">
                                    <p 
                                        className="font-raleway font-semibold text-[10px] leading-[10px] bg-white mt-5 whitespace-nowrap px-1 py-0.5 rounded"
                                        style={{ color: skill.textColor }}
                                    >
                                        {markerText}
                                    </p>
                                    <div 
                                        className="w-px h-2 mt-0.5" 
                                        style={{ backgroundColor: skill.textColor }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              )}

              {/* --- BIG SCORE DISPLAY --- */}
              {/* Jika Waktu Reaksi, kasih margin top biar center karena ga ada progress bar */}
              <div className={`flex flex-row justify-between items-center mb-[16px] ${skill.isReactionTime ? 'mt-[40px] mb-[30px]' : ''}`}>
                 <div className="font-raleway text-[30px] text-white font-bold">
                    {displayValue}
                 </div>
                 {/* Icon Jam hanya untuk Waktu Reaksi */}
                 {skill.isReactionTime && (
                    <img src={ClockIcon} alt="clock" className="w-auto h-[64px] object-contain opacity-80" />
                 )}
              </div>

              {/* --- BUTTON --- */}
              <button className="w-full md:w-auto px-4 py-2 bg-white rounded-md border border-black hover:scale-[1.04] transition-transform">
                <p className="font-raleway font-bold text-[12px] leading-[12px] text-[#212529] capitalize text-center">
                  Lihat detail
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