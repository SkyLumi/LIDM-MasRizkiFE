import { useState, useRef, useEffect } from "react";
import AvatarPickerModal from "./AvatarPickerModal";
import { updateStudent } from "../../../../services/api"; // 👈 Import API update
import { RefreshCw } from "lucide-react"; // Icon loading (opsional)

// Gunakan tipe data yang sesuai dengan Context atau Database abang
// Disini saya sesuaikan dengan properti yang mau diedit
export type PlayerData = {
  id: string | number;
  name: string;
  kelas: string; // ganti absen jadi kelas biar konsisten
  image: string;
  disability?: string;
  email?: string;
  password?: string; // password opsional (kosong berarti tidak diganti)
};

type EditPlayerModalProps = {
  open: boolean;
  player: PlayerData | null;
  onClose: () => void;
  onSave?: () => void; // Callback untuk refresh data di parent
};

export default function EditPlayerModal({
  open,
  player,
  onClose,
  onSave,
}: EditPlayerModalProps) {
  // --- STATES ---
  const [isLoading, setIsLoading] = useState(false);
  
  // State Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  
  // State Dropdowns
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  
  const [selectedObstacle, setSelectedObstacle] = useState<string | null>(null);
  const [obstacleDropdownOpen, setObstacleDropdownOpen] = useState(false);

  // State UI lain
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const classDropdownRef = useRef<HTMLDivElement | null>(null);
  const obstacleDropdownRef = useRef<HTMLDivElement | null>(null);

  // Options
  const classOptions = ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"];
  const obstacleOptions = [
    "ADHD (Attention Deficit Hyperactivity Disorder)",
    "ASD (Autism Spectrum Disorder)",
    "Down Syndrome",
    "DCD (Development Coordination Disorder)",
    "Cerebral Palsy",
    "None"
  ];

  // --- EFFECT: ISI DATA SAAT MODAL DIBUKA ---
  useEffect(() => {
    if (open && player) {
      // Pecah Nama
      const parts = player.name.split(" ");
      if (parts.length === 1) {
        setFirstName(player.name);
        setLastName("");
      } else {
        setFirstName(parts[0]);
        setLastName(parts.slice(1).join(" "));
      }

      // Isi field lain
      setEmail(player.email || "");
      setAvatar(player.image || "");
      setSelectedClass(player.kelas || null); // Sesuaikan key dr backend (kelas/absen)
      setSelectedObstacle(player.disability || null);
      setPassword(""); // Reset password (kosong = tidak diubah)
    }
  }, [open, player]);

  // --- HANDLE SAVE ---
  const handleSave = async () => {
    if (!player) return;

    // Validasi sederhana
    if (!firstName || !selectedClass) {
      alert("Nama Depan dan Kelas wajib diisi!");
      return;
    }

    setIsLoading(true);

    try {
      // Gabung nama
      const fullName = lastName ? `${firstName} ${lastName}` : firstName;

      // Siapkan payload
      const payload = {
        nama_lengkap: fullName,
        kelas: selectedClass,
        jenis_kendala: selectedObstacle, // Sesuaikan key backend
        foto_profil: avatar,
        email: email,
      };

      // Hanya kirim password jika diisi
      if (password) {
        // @ts-ignore
        payload.kata_sandi = password;
      }

      // Panggil API
      await updateStudent(player.id, payload);

      alert("Berhasil mengupdate data pemain!");
      
      if (onSave) onSave(); // Refresh data di parent
      onClose(); // Tutup modal

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Gagal update data");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open || !player) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] opacity-100 transition-opacity duration-200 ease-in-out">
      <div className="relative w-[900px] max-w-[90%] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200 max-h-[90vh] overflow-y-auto"> {/* Tambah max-h dan overflow-y biar scrollable di layar kecil */}
        
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100"
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              Ubah informasi pemain di bawah ini.
            </p>
          </div>

          {/* Form Container */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            {/* Left Column: Avatar */}
            <div className="flex flex-col items-center gap-4 w-full md:w-[220px] shrink-0">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#BFBFBF] overflow-hidden border border-gray-200">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/220?text=No+Image")} // Fallback image
                />
              </div>
              <button
                onClick={() => setIsAvatarOpen(true)}
                className="font-['Raleway'] text-[14px] font-bold text-[#0066FF] bg-transparent border-0 p-0 cursor-pointer w-full text-center hover:underline transition-colors"
              >
                Ganti Avatar
              </button>
              
              {/* Status Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgb(238, 255, 238)", border: "1px solid rgb(9, 222, 27)", borderRadius: "6px", padding: "8px 12px", marginTop: "8px", width: "100%", boxSizing: "border-box" }}>
                <div style={{ width: "16px", height: "16px", color: "rgb(9, 222, 27)", flexShrink: 0 }}>
                  <CheckIcon />
                </div>
                <span style={{ fontFamily: "Raleway", fontWeight: 600, fontSize: "12px", color: "rgb(45, 55, 72)", lineHeight: 1.4 }}>
                  Face ID Terdaftar
                </span>
              </div>
            </div>

            {/* Right Column: Inputs */}
            <div className="grid grid-cols-1 gap-4 grow w-full">
              
              {/* Row 1: Nama Depan & Belakang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 font-['Raleway']">
                    <label className="font-bold text-[14px] text-[#262626]">
                      Nama Depan <span className="text-[#E82D2F]">*</span>
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className="w-full h-12 px-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus:border-[#0066FF] transition-all"
                      placeholder="Nama Depan"
                    />
                  </div>
                  <div className="flex flex-col gap-2 font-['Raleway']">
                    <label className="font-bold text-[14px] text-[#262626]">
                      Nama Belakang
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="w-full h-12 px-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus:border-[#0066FF] transition-all"
                      placeholder="Nama Belakang"
                    />
                  </div>
              </div>

              {/* Row 2: Kelas & Hambatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Dropdown Kelas */}
                  <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={classDropdownRef}>
                    <label className="font-bold text-[14px] text-[#262626]">
                      Kelas <span className="text-[#E82D2F]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                      className="w-full h-12 px-4 text-left rounded-lg border border-[#BFBFBF] font-medium text-[16px] bg-white flex justify-between items-center focus:border-[#0066FF]"
                    >
                      <span className={selectedClass ? "text-[#262626]" : "text-[#BFBFBF]"}>
                        {selectedClass || "Pilih Kelas"}
                      </span>
                      <ChevronDownIcon isOpen={classDropdownOpen} />
                    </button>
                    
                    {classDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#0066FF] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
                        {classOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => { setSelectedClass(opt); setClassDropdownOpen(false); }}
                            className="px-4 py-3 hover:bg-[#F5F5F5] cursor-pointer font-medium text-[#262626]"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                   {/* Dropdown Hambatan */}
                   <div className="flex flex-col gap-2 font-['Raleway'] relative" ref={obstacleDropdownRef}>
                    <label className="font-bold text-[14px] text-[#262626]">
                      Jenis Hambatan
                    </label>
                    <button
                      type="button"
                      onClick={() => setObstacleDropdownOpen(!obstacleDropdownOpen)}
                      className="w-full h-12 px-4 text-left rounded-lg border border-[#BFBFBF] font-medium text-[16px] bg-white flex justify-between items-center focus:border-[#0066FF]"
                    >
                      <span className={`truncate pr-2 ${selectedObstacle ? "text-[#262626]" : "text-[#BFBFBF]"}`}>
                        {selectedObstacle || "Pilih (Opsional)"}
                      </span>
                      <ChevronDownIcon isOpen={obstacleDropdownOpen} />
                    </button>
                    
                    {obstacleDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#0066FF] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
                        {obstacleOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => { setSelectedObstacle(opt); setObstacleDropdownOpen(false); }}
                            className="px-4 py-3 hover:bg-[#F5F5F5] cursor-pointer font-medium text-[#262626] text-sm"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
              </div>

              {/* Row 3: Email */}
              <div className="flex flex-col gap-2 font-['Raleway']">
                <label className="font-bold text-[14px] text-[#262626]">
                  Email <span className="text-[#BFBFBF] font-normal">(Opsional)</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full h-12 px-4 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus:border-[#0066FF] transition-all"
                  placeholder="email@sekolah.com"
                />
              </div>

              {/* Row 4: Password */}
              <div className="flex flex-col gap-2 font-['Raleway']">
                <label className="font-bold text-[14px] text-[#262626]">
                  Password Baru <span className="text-[#BFBFBF] font-normal">(Isi jika ingin mengganti)</span>
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full h-12 pl-4 pr-12 rounded-lg border border-[#BFBFBF] font-medium text-[16px] outline-none focus:border-[#0066FF] transition-all"
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BFBFBF] hover:text-[#0066FF]"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] bg-white text-[#262626] hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] bg-[#0066FF] text-white hover:bg-[#0055CC] transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>

        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        open={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        selected={avatar}
        onSelect={(url) => setAvatar(url)}
      />
    </div>
  );
}

// --- SVG ICONS Helper ---
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0066FF]" : "text-[#BFBFBF]"}`}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94"></path>
    <path d="M1 1l22 22"></path>
    <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24"></path>
    <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95"></path>
  </svg>
);