import { useEffect, useRef, useState } from "react";
import AvatarPickerModal from "./AvatarPickerModal";
import FaceRecognitionModal from "./FaceRecognitionModal";
import { getObstacles } from "../../../../services/api"; // Pastikan path ini benar

type AddPlayerModalProps = {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
};

// Kita pastikan ID itu number
interface OptionData {
  id: number;
  nama: string;
}

export default function AddPlayerModal({
  open,
  onClose,
  onSave,
}: AddPlayerModalProps) {
  // --- STATE UI ---
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  
  // --- STATE DATA MASTER ---
  const [classList, setClassList] = useState<OptionData[]>([]);
  const [obstacleList, setObstacleList] = useState<OptionData[]>([]);
  const [isLoadingMaster, setIsLoadingMaster] = useState(false);

  // --- STATE FORM (Dropdown) ---
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  // PERBAIKAN: Tipe state harus number | null
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string | null>(null);

  const [obstacleDropdownOpen, setObstacleDropdownOpen] = useState(false);
  // PERBAIKAN: Tipe state harus number | null
  const [selectedObstacleId, setSelectedObstacleId] = useState<number | null>(null);
  const [selectedObstacleName, setSelectedObstacleName] = useState<string | null>(null);

  // --- STATE FORM (Input Text) ---
  const [fullName, setFullName] = useState("");
  const [attendanceNumber, setAttendanceNumber] = useState("");
  
  // PERBAIKAN: Pastikan state email & password ada!
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- STATE MODAL LAIN ---
  const [isFaceRecognitionOpen, setIsFaceRecognitionOpen] = useState(false); 
  const [isAddPlayerVisible, setIsAddPlayerVisible] = useState(true);

  const classDropdownRef = useRef<HTMLDivElement | null>(null);
  const obstacleDropdownRef = useRef<HTMLDivElement | null>(null);

  // List Kelas Manual (ID harus number)
  const MANUAL_CLASS_LIST = [
    { id: 1, nama: "Kelas 1" },
    { id: 2, nama: "Kelas 2" },
    { id: 3, nama: "Kelas 3" },
    { id: 4, nama: "Kelas 4" },
    { id: 5, nama: "Kelas 5" },
    { id: 6, nama: "Kelas 6" },
  ];

  // --- USE EFFECT LOAD DATA ---
  useEffect(() => {
    if (open) {
        setClassList(MANUAL_CLASS_LIST);

        const fetchHambatan = async () => {
            setIsLoadingMaster(true);
            try {
                const obstaclesData = await getObstacles();
                setObstacleList(obstaclesData);
            } catch (error) {
                console.error("Gagal ambil data hambatan:", error);
            } finally {
                setIsLoadingMaster(false);
            }
        };
        fetchHambatan();
        setIsAddPlayerVisible(true);
    } else {
        // Reset Form
        setIsFaceRecognitionOpen(false);
        setIsAvatarOpen(false);
        setFullName("");
        setAttendanceNumber("");
        setEmail("");
        setPassword("");
        setSelectedClassId(null);
        setSelectedClassName(null);
        setSelectedObstacleId(null);
        setSelectedObstacleName(null);
        setAvatar(undefined);
    }
  }, [open]);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (classDropdownRef.current && !classDropdownRef.current.contains(event.target as Node)) {
        setClassDropdownOpen(false);
      }
      if (obstacleDropdownRef.current && !obstacleDropdownRef.current.contains(event.target as Node)) {
        setObstacleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!open && !isFaceRecognitionOpen) return null;

  const isFormValid =
    fullName.trim() !== "" &&
    attendanceNumber.trim() !== "" &&
    selectedClassId !== null &&
    selectedObstacleId !== null;

  // --- HANDLERS ---
  const handleSave = () => {
    if (!isFormValid) return;
    
    setIsAvatarOpen(false);
    setIsAddPlayerVisible(false);
    setIsFaceRecognitionOpen(true); 
  };

  const handleFaceRecognitionClose = () => {
      setIsFaceRecognitionOpen(false);
      setIsAddPlayerVisible(true);
  }

  const handleFaceRecognitionComplete = async (imageData: string) => {
    console.log("udah scan face")
    if (onSave) {
        const finalPayload = {
            nama_lengkap: fullName,
            nomor_absen: attendanceNumber,
            id_hambatan: selectedObstacleId as number, 
            id_kelas: selectedClassId as number,
            email: email,
            password: password,
            image_base64: imageData, // Foto wajah dari kamera
            avatar: avatar
        };

        console.log("Payload dikirim ke API:", finalPayload);
        await onSave(finalPayload);

      }
      setIsFaceRecognitionOpen(false); 
      setIsAddPlayerVisible(true);
      onClose(); 
      return true;
  }

  const handleAddPlayerClose = () => {
      setIsFaceRecognitionOpen(false);
      setIsAddPlayerVisible(true);
      setIsAvatarOpen(false);
      onClose();
  }

  return (
    <>
      {open && isAddPlayerVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] opacity-100 transition-opacity duration-200 ease-in-out">
          <div className="relative w-[900px] max-w-[90%] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
            
            {/* Tombol Close */}
            <button
              aria-label="Close"
              onClick={handleAddPlayerClose}
              className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100"
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Konten Modal */}
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-[2px] text-left px-6">
                <h3 className="font-['Raleway'] font-bold text-[24px] text-[#0066FF] leading-[31.92px] m-0">
                  Tambahkan Detail Pemain
                </h3>
                <p className="font-['Raleway'] font-medium text-[14px] text-[#262626] leading-[19.6px] m-0">
                  Isi detail pemain baru di bawah ini
                </p>
              </div>

              <div className="flex flex-row gap-6 items-start">
                {/* AVATAR SECTION */}
                <div className="flex flex-col items-center gap-4 w-[220px] shrink-0">
                  <div className="w-[220px] h-[220px] rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#BFBFBF] overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                  <button
                    onClick={() => setIsAvatarOpen(true)}
                    className="font-['Raleway'] text-[14px] font-bold text-[#0066FF] bg-transparent border-0 p-0 cursor-pointer w-full text-center hover:underline transition-colors"
                  >
                    Edit Avatar
                  </button>
                </div>

                {/* FORM INPUTS */}
                <div className="grid grid-cols-2 gap-4 grow">
                  
                  {/* Nama Lengkap */}
                  <div>
                    <div className="flex flex-col gap-2 font-['Raleway']">
                      <label>
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Nama Lengkap</span>
                        <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">*</span>
                      </label>
                      <div className="relative w-full h-14">
                        <input
                          type="text"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder="Masukkan nama lengkap"
                          className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] outline-none focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* KELAS DROPDOWN (Fixed: id number) */}
                  <div className="min-w-0 w-full">
                    <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={classDropdownRef}>
                      <label>
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Kelas</span>
                        <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">*</span>
                      </label>
                      <div className="relative w-full h-14">
                        <button
                          type="button"
                          onClick={() => setClassDropdownOpen((prev) => !prev)}
                          className={`w-full h-full pr-10 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[12px] text-[#262626] outline-none cursor-pointer bg-white text-left focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF] ${classDropdownOpen ? " shadow-[0_0_0_1px_#0066FF]" : ""}`}
                        >
                          <span className={selectedClassName ? "text-[#262626]" : "text-[#BFBFBF]"}>
                            {selectedClassName ?? "Pilih Kelas"}
                          </span>
                        </button>
                        
                        {/* Dropdown Content */}
                        <div className={`absolute left-0 right-0 top-full bg-white border border-[#0066FF] rounded-lg mt-1 max-h-[200px] overflow-y-auto z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${classDropdownOpen ? "block" : "hidden"}`}>
                          {classList.map((cls) => (
                            <button
                              key={cls.id}
                              type="button"
                              onClick={() => {
                                setSelectedClassId(cls.id); // cls.id adalah number
                                setSelectedClassName(cls.nama);
                                setClassDropdownOpen(false);
                              }}
                              className="w-full text-left px-5 py-3 font-['Raleway'] font-medium text-[16px] text-[#262626] cursor-pointer transition-colors hover:bg-[#F5F5F5]"
                            >
                              {cls.nama}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nomor Absen */}
                  <div>
                    <div className="flex flex-col gap-2 font-['Raleway']">
                      <label>
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Nomor Absen</span>
                        <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">*</span>
                      </label>
                      <div className="relative w-full h-14">
                        <input
                          type="text"
                          value={attendanceNumber}
                          onChange={(event) => setAttendanceNumber(event.target.value)}
                          placeholder="Contoh: 12"
                          className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* HAMBATAN DROPDOWN (Fixed: id number) */}
                  <div className="min-w-0 w-full">
                    <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={obstacleDropdownRef}>
                      <label>
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Pilih Jenis Hambatan</span>
                        <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">*</span>
                      </label>
                      <div className="relative w-full h-14">
                        <button
                          type="button"
                          onClick={() => setObstacleDropdownOpen((prev) => !prev)}
                          className={`w-full h-full pr-10 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[10px] text-[#262626] outline-none cursor-pointer bg-white text-left focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF] ${obstacleDropdownOpen ? "border-[#0066FF]" : ""}`}
                        >
                          <span className={selectedObstacleName ? "text-[#262626]" : "text-[#BFBFBF]"}>
                            {selectedObstacleName ?? "Pilih dari daftar"}
                          </span>
                        </button>
                        
                        {/* Dropdown Content */}
                        <div className={`absolute left-0 right-0 top-full bg-white border border-[#0066FF] rounded-lg mt-1 max-h-[200px] overflow-y-auto z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${obstacleDropdownOpen ? "block" : "hidden"}`}>
                          {isLoadingMaster ? (
                             <div className="p-4 text-gray-500 text-sm">Memuat...</div>
                          ) : (
                            obstacleList.map((obs) => (
                                <button
                                key={obs.id}
                                type="button"
                                onClick={() => {
                                    setSelectedObstacleId(obs.id); // obs.id adalah number
                                    setSelectedObstacleName(obs.nama);
                                    setObstacleDropdownOpen(false);
                                }}
                                className="w-full text-left px-5 py-3 font-['Raleway'] font-medium text-[16px] text-[#262626] cursor-pointer transition-colors hover:bg-[#F5F5F5]"
                                >
                                {obs.nama}
                                </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EMAIL (Fixed: State restored) */}
                  <div>
                    <div className="flex flex-col gap-2 font-['Raleway']">
                      <label className="flex items-center">
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Alamat Email</span>
                        <span className="font-normal text-[12px] text-[#BFBFBF] tracking-[0.4px] leading-5 inline ml-1">(Opsional)</span>
                      </label>
                      <div className="relative w-full h-14">
                        <input
                          type="text"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Contoh: email@gmail.com"
                          className="w-full h-full px-5 py-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PASSWORD (Fixed: State restored) */}
                  <div>
                    <div className="flex flex-col gap-2 font-['Raleway']">
                      <label>
                        <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">Password</span>
                        <span className="font-normal text-[12px] text-[#BFBFBF] tracking-[0.4px] leading-5 inline ml-1">(Opsional)</span>
                      </label>
                      <div className="relative w-full h-14">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Masukkan password"
                          className="w-full h-full pr-12 pl-5 py-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus-visible:border-[#0066FF] focus-visible:bg-[#EDF8FF]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] w-5 h-5 hover:text-[#0066FF]"
                        >
                          {showPassword ? (
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.92 18.92 0 0 1 5.06-6.94m3.2-1.55A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.66 18.66 0 0 1-2.31 3.62"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.49 3.49 0 0 0 2.47-1"></path>
                            </svg>
                          ) : (
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-6 mt-4 p-6 pt-0">
              <button
                onClick={handleAddPlayerClose}
                className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] cursor-pointer bg-white text-[#262626] hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className={`flex-1 p-4 rounded-lg font-['Raleway'] font-bold text-[14px] bg-[#0066FF] text-white transition-colors ${
                  isFormValid ? "opacity-100 cursor-pointer hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
                }`}
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}
      
      <AvatarPickerModal
        open={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        selected={avatar}
        onSelect={(url) => setAvatar(url)}
      />
      
      <FaceRecognitionModal 
        open={isFaceRecognitionOpen}
        onClose={handleFaceRecognitionClose}
        onRecognitionComplete={handleFaceRecognitionComplete}
      />
    </>
  );
}