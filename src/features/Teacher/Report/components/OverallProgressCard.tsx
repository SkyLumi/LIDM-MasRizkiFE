import React from "react";
import { useSelectedPlayer } from "../contexts/SelectedPlayerContext";
import { Info } from "lucide-react";

interface OverallStats {
  scores: {
    fokus: number;
    koordinasi: number;
    waktu_reaksi: number;
    keseimbangan: number;
    ketangkasan: number;
    memori: number;
  };
  meta?: {
    total_games: number;
    total_minutes: number;
  };
}

interface OverallProgressCardProps {
  data?: OverallStats | null;
}

const OverallProgressCard: React.FC<OverallProgressCardProps> = ({ data }) => {
  const { currentPlayer } = useSelectedPlayer();

  const calculateOverallScore = () => {
    if (!data?.scores) return 0;
    const { fokus, koordinasi, waktu_reaksi, keseimbangan, ketangkasan, memori } = data.scores;
    
    const rawReaction = waktu_reaksi || 0;
    const reactionScore = Math.max(0, Math.min(100, ((10000 - rawReaction) / 10000) * 100));

    const total = fokus + koordinasi + reactionScore + keseimbangan + ketangkasan + memori;
    return (total / 6).toFixed(1); // 1 desimal (string)
  };

  const overallScoreStr = calculateOverallScore() as string;;
  const overallScoreNum = parseFloat(overallScoreStr);

  const totalGames = data?.meta?.total_games || 0;
  const totalMinutes = data?.meta?.total_minutes || 0;

  return (
    <div className="bg-[#edf8ff] rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-[16px] ">
        <svg
          // className="w-[54px]"
          width="85px"
          height="60px"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.00488281" width="54" height="54" rx="27" fill="white" />
          <g clipPath="url(#clip0_1715_656)">
            <g clipPath="url(#clip1_1715_656)">
              <g clipPath="url(#clip2_1715_656)">
                <mask
                  id="mask0_1715_656"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="4"
                  width="55"
                  height="45"
                >
                  <path
                    d="M54.0049 4.69629H0.00488281V48.2427H54.0049V4.69629Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_1715_656)">
                  <path
                    d="M6.29203 36.3535H9.6371C10.4599 36.3535 11.1283 37.0219 11.1283 37.8447V47.7331H4.80078V37.8447C4.80078 37.0219 5.46923 36.3535 6.29203 36.3535Z"
                    fill="#FFC900"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.7353 28.1279H19.0804C19.9032 28.1279 20.5716 28.7964 20.5716 29.6192V47.7308H14.2432V29.6192C14.2432 28.7964 14.9125 28.1279 15.7353 28.1279Z"
                    fill="#FF55EB"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.1767 33.292H28.5218C29.3446 33.292 30.013 33.9604 30.013 34.7832V47.7312H23.6846V34.7832C23.6846 33.9604 24.3539 33.292 25.1767 33.292Z"
                    fill="#FFC900"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34.623 28.1279H37.9681C38.7909 28.1279 39.4593 28.7964 39.4593 29.6192V47.7308H33.1309V29.6192C33.1309 28.7964 33.8002 28.1279 34.623 28.1279Z"
                    fill="#FF55EB"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M44.0644 16.0801H47.4095C48.2323 16.0801 48.9008 16.7485 48.9008 17.5713V47.7319H42.5723V17.5713C42.5723 16.7485 43.2416 16.0801 44.0644 16.0801Z"
                    fill="#FFC900"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.513672 47.7324H53.491"
                    stroke="black"
                    strokeWidth="1.02267"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.80078 33.2744L19.8322 19.7054L27.004 27.2499L49.6683 5.25586"
                    stroke="black"
                    strokeWidth="1.11564"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M43.3066 6.69039L49.7616 5.25586L47.9923 11.615"
                    stroke="black"
                    strokeWidth="1.11564"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.3979 14.619C27.5559 15.2391 28.4363 15.2391 28.5943 14.619L28.8574 13.587C28.9421 13.2542 29.2024 12.9939 29.5352 12.9093L30.5672 12.6462C31.1873 12.4881 31.1873 11.6077 30.5672 11.4496L29.5352 11.1865C29.2024 11.1019 28.9421 10.8416 28.8574 10.5088L28.5943 9.4768C28.4363 8.85669 27.5559 8.85669 27.3979 9.4768L27.1347 10.5088C27.0502 10.8416 26.7898 11.1019 26.457 11.1865L25.425 11.4496C24.8049 11.6077 24.8049 12.4881 25.425 12.6462L26.457 12.9093C26.7898 12.9939 27.0502 13.2542 27.1347 13.587L27.3979 14.619Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.743763"
                  />
                  <path
                    d="M6.47598 26.0974C6.98533 26.0974 7.39825 25.6845 7.39825 25.1752C7.39825 24.6658 6.98533 24.2529 6.47598 24.2529C5.96662 24.2529 5.55371 24.6658 5.55371 25.1752C5.55371 25.6845 5.96662 26.0974 6.47598 26.0974Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.743763"
                  />
                  <path
                    d="M31.9574 17.9246C32.4667 17.9246 32.8797 17.5117 32.8797 17.0023C32.8797 16.493 32.4667 16.0801 31.9574 16.0801C31.448 16.0801 31.0352 16.493 31.0352 17.0023C31.0352 17.5117 31.448 17.9246 31.9574 17.9246Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.743763"
                  />
                </g>
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1715_656">
              <rect
                width="54"
                height="44.6"
                fill="white"
                transform="translate(0.00488281 4.7002)"
              />
            </clipPath>
            <clipPath id="clip1_1715_656">
              <rect
                width="54"
                height="44.6"
                fill="white"
                transform="translate(0.00488281 4.7002)"
              />
            </clipPath>
            <clipPath id="clip2_1715_656">
              <rect
                width="54"
                height="44.6087"
                fill="white"
                transform="translate(0.00488281 4.69629)"
              />
            </clipPath>
          </defs>
        </svg>
        <h2 className="font-raleway font-bold text-[20px] leading-[22px] text-[#084EC5]">
          Laporan kemajuan secara keseluruhan
          {currentPlayer ? ` — ${currentPlayer.name}` : ""}
        </h2>
        <Info className="w-[100px] h-[24px] text-[#084EC5]" />
      </div>

      {/* Labels under progress bar */}
      <div className="flex justify-between mt-[18px] mb-2">
        <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0E2D5D]">
          0
        </p>
        <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0E2D5D]">
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
            style={{ width: `${overallScoreNum}%` }}
          >
            {/* Marker at 81.1 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <div className="flex flex-col items-center">
                <p className="font-raleway font-semibold text-[10px] leading-[10px] text-[#0D469B] bg-white mb-4 whitespace-nowrap">
                  {overallScoreStr}
                </p>
                <div className="w-px bg-[#0D469B] mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Percentage Display */}
      <div className="mb-6 flex fle-row justify-between">
        <p className="font-raleway font-bold text-[40px] leading-[40px] text-[#084EC5] mb-3">
          {overallScoreStr}%
        </p>
        <button className=" w-[84px] h-full py-[10px] p-0 bg-white border border-black rounded-md hover:bg-gray-50 transition-colors">
          <p className=" w-auto font-raleway font-bold text-[12px] leading-[12px] text-[#212529] capitalize">
            Lihat detail
          </p>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="flex gap-4 mt-[50px]">
        {/* Total Games Card */}
        <div className="flex bg-none">
          <div className="flex flex-row items-center gap-2">
            <img
              src="https://framerusercontent.com/images/QDvlCSrmIhDHQbj8Pbs6zjXhCM.png?width=212&height=184"
              alt="Game controller"
              className="w-[53px] h-[46px] object-contain"
            />
            <div className="text-center">
              <p className="font-raleway font-bold text-sm leading-[18px] text-[#084EC5]">
                Total Games
              </p>
              <p className="font-raleway font-bold text-sm leading-[18px] text-[#084EC5]">
                dimainkan
              </p>
            </div>
            <p className="font-raleway font-bold text-[35px] leading-[35px] text-[#084EC5]">
              {totalGames}
            </p>
          </div>
        </div>

        {/* Total Minutes Card */}
        <div className="flex bg-none">
          <div className="flex flex-row items-center gap-2">
            <img
              src="https://framerusercontent.com/images/KNLhL06zzaOON15w5wVkFmZRtmQ.png?width=193&height=208"
              alt="Stopwatch"
              className="w-[48px] h-[52px] object-contain"
            />
            <div className="text-center">
              <p className="font-raleway font-bold text-sm leading-[18px] text-[#084EC5]">
                Total Menit
              </p>
              <p className="font-raleway font-bold text-sm leading-[18px] text-[#084EC5]">
                dimainkan
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="font-raleway font-bold text-[35px] leading-[35px] text-[#084EC5]">
                {totalMinutes}
              </p>
              <p className="font-raleway font-bold text-sm leading-[14px] text-[#084EC5]">
                mins
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCard;
