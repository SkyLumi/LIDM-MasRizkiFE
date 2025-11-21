type PlayerData = {
  name: string;
  absen: string;
  image: string;
  disability: string;
  email: string;
  password: string;
};

type EditPlayerModalProps = {
  open: boolean;
  player: PlayerData | null;
  onClose: () => void;
  onSave?: (data: PlayerData) => void;
};

import { useState, useRef } from "react";
import AvatarPickerModal from "./AvatarPickerModal";


export default function EditPlayerModal({
  open,
  player,
  onClose,
  onSave,
}: EditPlayerModalProps) {
  if (!open || !player) return null;

  const [firstName, lastName] = (() => {
    const parts = player.name.split(" ");
    if (parts.length === 1) return [player.name, ""];
    return [parts[0], parts.slice(1).join(" ")];
  })();

  const obstacleOptions = [
    "[ADHD] Attention Deficit Hyperactivity Disorder",
    "[ASD] Autism Spectrum Disorder",
    "[DS] Down Syndrome",
    "[DCD] Development Coordination Disorder",
    "[CP] Cerebral Palsy",
  ];

  const obstacleDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(player.image);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const classOptions = ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"];
  const classDropdownRef = useRef<HTMLDivElement | null>(null);
  const [obstacleDropdownOpen, setObstacleDropdownOpen] = useState(false);
  const [selectedObstacle, setSelectedObstacle] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] opacity-100 transition-opacity duration-200 ease-in-out">
      <div className="relative w-[900px] max-w-[90%] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center px-6">
            <h3 className="font-['Raleway'] font-bold text-[24px] text-[#0066FF] leading-[31.92px] m-0">
              Edit Detail Pemain
            </h3>
            <p className="font-['Raleway'] font-medium text-[14px] text-[#262626] leading-[19.6px] m-0">
              Isi detail pemain baru di bawah ini.
            </p>
          </div>
          <div className="flex flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-4 w-[220px] shrink-0">
              <div className="w-[220px] h-[220px] rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#BFBFBF] overflow-hidden">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setIsAvatarOpen(true)}
                className="font-['Raleway'] text-[14px] font-bold text-[#0066FF] bg-transparent border-0 p-0 cursor-pointer w-full text-center hover:underline transition-colors"
              >
                Edit Avatar
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgb(238, 255, 238)",
                  border: "1px solid rgb(9, 222, 27)",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  marginTop: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "rgb(9, 222, 27)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "Raleway",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "rgb(45, 55, 72)",
                    lineHeight: 1.4,
                  }}
                >
                  Face Recognition telah ditambahkan
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 grow">
              <div>
                <div className="flex flex-col gap-2 font-['Raleway']">
                <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Nama Lengkap
                    </span>
                    <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                      *
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <input
                      defaultValue={firstName}
                      title={player.name}
                      type="text"
                      placeholder="Masukkan nama depan"
                      className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none"
                    />
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
              <div className="min-w-0 w-full">
                <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={classDropdownRef}>
                  <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Kelas
                    </span>
                    <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                      *
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <button
                      type="button"
                      onClick={() => setClassDropdownOpen((prev) => !prev)}
                      className={`w-full h-full pr-10 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer bg-white overflow-hidden text-ellipsis whitespace-nowrap appearance-none text-left focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF] focus-visible:shadow-[0_0_0_1px_#0066FF] ${
                        classDropdownOpen ? " shadow-[0_0_0_1px_#0066FF]" : ""
                      }`}
                    >
                      <span className={selectedClass ? "text-[#262626]" : "text-[#BFBFBF]"}>
                        {selectedClass ?? "Pilih Kelas"}
                      </span>
                    </button>
                    <div className={`absolute right-5 top-1/2 -translate-y-1/2 rotate-0 w-5 h-5 pointer-events-none transition-[transform,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center ${classDropdownOpen ? "text-[#0066FF]" : "text-[#BFBFBF]"}`}>
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={classDropdownOpen ? "transform rotate-180 transition-transform duration-300" : ""}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className={`focus-visible:border-[#0066FF] absolute left-0 right-0 top-full bg-white border border-[#0066FF] rounded-lg mt-1 max-h-[200px] overflow-y-auto z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${classDropdownOpen ? "block" : "hidden"}`}>
                      {classOptions.map((kelas) => (
                        <button
                          key={kelas}
                          type="button"
                          onClick={() => {
                            setSelectedClass(kelas);
                            setClassDropdownOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 font-['Raleway'] font-medium text-[16px] text-[#262626] cursor-pointer transition-colors hover:bg-[#F5F5F5]"
                        >
                          {kelas}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
              <div>
                <div className="flex flex-col gap-2 font-['Raleway']">
                  <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Nomor Absen
                    </span>
                    <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                      *
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <input
                      defaultValue={player.absen}
                      title={player.absen}
                      type="text"
                      placeholder="Contoh: 12"
                      className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none"
                    />
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
              <div className="min-w-0 w-full">
              <div className="min-w-0 w-full">
                <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={obstacleDropdownRef}>
                  <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Pilih Jenis Hambatan
                    </span>
                    <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                      *
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <button
                      type="button"
                      onClick={() => setObstacleDropdownOpen((prev) => !prev)}
                      className={`w-full h-full pr-10 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer bg-white overflow-hidden text-ellipsis whitespace-nowrap appearance-none text-left focus-visible:border-[#0066FF] focus-visible:shadow-[0_0_0_1px_#0066FF] ${
                        obstacleDropdownOpen ? "border-[#0066FF] shadow-[0_0_0_1px_#0066FF]" : ""
                      }`}
                    >
                      <span className={selectedObstacle ? "text-[#262626]" : "text-[#BFBFBF]"}>
                        {selectedObstacle ?? "Pilih dari daftar"}
                      </span>
                    </button>
                    <div className={`absolute right-5 top-1/2 -translate-y-1/2 rotate-0 w-5 h-5 pointer-events-none transition-[transform,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center ${obstacleDropdownOpen ? "text-[#0066FF]" : "text-[#BFBFBF]"}`}>
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={obstacleDropdownOpen ? "transform rotate-180 transition-transform duration-300" : ""}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className={`absolute left-0 right-0 top-full bg-white border border-[#0066FF] rounded-lg mt-1 max-h-[200px] overflow-y-auto z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${obstacleDropdownOpen ? "block" : "hidden"}`}>
                      {obstacleOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedObstacle(option);
                            setObstacleDropdownOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 font-['Raleway'] font-medium text-[16px] text-[#262626] cursor-pointer transition-colors hover:bg-[#F5F5F5]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
              <div>
                <div className="flex flex-col gap-2 font-['Raleway']">
                  <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Alamat Email
                    </span>
                    <span className="font-normal text-[12px] text-[#BFBFBF] tracking-[0.4px] leading-5 inline ml-1">
                      (Opsional)
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <input
                      defaultValue={player.email}
                      title={player.email}
                      type="text"
                      placeholder="Contoh: email@gmail.com"
                      className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none"
                    />
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
              <div>
                <div className="flex flex-col gap-2 font-['Raleway']">
                  <label>
                    <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                      Password
                    </span>
                    <span className="font-normal text-[12px] text-[#BFBFBF] tracking-[0.4px] leading-5 inline ml-1">
                      (Opsional)
                    </span>
                  </label>
                  <div className="relative w-full h-14">
                    <input
                      defaultValue={player.password}
                      title={player.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="w-full h-full pr-12 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Sembunyikan password" : "Lihat password"
                      }
                      title={showPassword ? "Sembunyikan" : "Lihat"}
                      className="hover:border-none bg-transparent absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    >
                      {showPassword ? (
                        <svg
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M1 1l22 22" />
                          <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                          <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95" />
                        </svg>
                      ) : (
                        <svg
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <button
              onClick={onClose}
              className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-white text-[#262626] scale-100 opacity-100 active:scale-95"
            >
              Batal
            </button>
            <button
              onClick={() => {
                const updatedPlayer: PlayerData = {
                  ...player,
                  name: `${firstName} ${lastName}`.trim(),
                  image: avatar,
                  // kamu bisa tambahkan input lain jika ingin editable
                  absen: player.absen,
                  disability: player.disability,
                  email: player.email,
                  password: player.password,
                };
                onSave?.(updatedPlayer); // ✅ panggil callback jika ada
                onClose(); // tutup modal setelah simpan
              }}
              className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white scale-100 opacity-100"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <AvatarPickerModal
        open={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        selected={avatar}
        onSelect={(url) => setAvatar(url)}
      />
    </div>
  );
}
