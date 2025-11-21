import { useState, useEffect, useMemo } from "react";
// Pastikan path import ini sesuai struktur folder abang
import AddPlayerModal from "./AddPlayerModal"; 
import EditPlayerModal from "./EditPlayerModal";   
import DeletePlayerModal from "./DeletePlayerModal"; 
import { addStudent, getStudents } from "../../../../services/api"; 

// --- TIPE DATA ---
type Player = {
  id: number;
  name: string;
  kelas: string;
  absen: string;
  image: string;
  disability: string;
  email: string;
  password: string; // 👈 PERBAIKAN DISINI: Hapus '?' biar jadi Wajib (String), bukan Optional
};

// --- KOMPONEN: SEARCH BAR ---
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute top-1/2 left-5 -translate-y-1/2 w-5 h-5 text-[#BFBFBF] flex items-center justify-center pointer-events-none">
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
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="search"
          placeholder="Cari nama, no absen, atau email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 px-[52px] rounded-lg border bg-white text-[16px] text-[#262626] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] border-[#BFBFBF] shadow-none focus:border-[#0066FF] focus:shadow-[0_8px_24px_rgba(0,102,255,0.16)]"
        />
      </div>
    </div>
  );
}

// --- KOMPONEN: TOMBOL TAMBAH ---
function AddPlayerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-14 px-6 bg-[#0066FF] border border-[#0066FF] rounded-lg items-center justify-center gap-2 text-white font-bold text-[14px] shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_0_rgba(255,255,255,0.1)] transition-transform duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] active:scale-95 hover:scale-[1.04] cursor-pointer"
    >
      <span>Tambahkan Pemain</span>
      <div className="w-4 h-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </button>
  );
}

// --- KOMPONEN: ICON AKSI (EDIT/DELETE) ---
function ActionIcons({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-4 text-[20px]">
      <div
        onClick={onEdit}
        className="w-5 h-5 text-[#0066FF] cursor-pointer transition-colors hover:text-blue-700"
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </div>
      <div
        onClick={onDelete}
        className="w-5 h-5 text-[#E82D2F] cursor-pointer transition-colors hover:text-red-700"
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
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
    </div>
  );
}

// --- KOMPONEN: PASSWORD CELL ---
function PasswordCell({ value }: { value: string }) {
  const [visible, setVisible] = useState(false);

  const isEmpty = !value || value.toLowerCase() === "belum ditambahkan";
  // Tampilkan dot hanya jika ada value
  const masked = value ? "•".repeat(Math.min(value.length, 8)) : "-";
  const display = visible && !isEmpty ? value : masked;

  return (
    <div className="flex items-center gap-2">
      <span>{isEmpty ? "Belum ditambahkan" : display}</span>
      {!isEmpty && (
        <button
          className="hover:border-none bg-transparent border-0 p-0 cursor-pointer text-gray-500 hover:text-blue-600"
          type="button"
          aria-label={visible ? "Sembunyikan password" : "Lihat password"}
          title={visible ? "Sembunyikan" : "Lihat"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94"></path>
              <path d="M1 1l22 22"></path>
              <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24"></path>
              <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95"></path>
            </svg>
          ) : (
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function StudentSettingsPage() {
  // State Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // State Data & Search
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. FUNGSI FETCH DATA (API)
  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents();
      console.log("Data murid didapat:", data);
      setPlayers(data);
    } catch (error) {
      console.error("Gagal ambil data murid:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. LOAD DATA SAAT PERTAMA BUKA
  useEffect(() => {
    fetchPlayers();
  }, []);

  // 3. LOGIC FILTER PENCARIAN
  const filteredPlayers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;

    return players.filter((p) => {
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.absen || "").toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q)
      );
    });
  }, [query, players]);

  // 4. HANDLER SIMPAN DATA (CREATE)
  const handleSaveStudent = async (studentData: any) => {
    try {
      console.log("Mengirim data ke API...", studentData);
      const result = await addStudent(studentData);
      
      alert("Berhasil menambahkan murid: " + result.murid.nama_lengkap);

      // Refresh tabel otomatis
      fetchPlayers(); 
      
    } catch (error: any) {
      console.error("Gagal simpan:", error);
      alert(error.message || "Gagal menyimpan data murid.");
    }
  };

  return (
    <div className="w-full p-8">
      <div className="flex flex-col items-start text-center gap-2 mb-6">
        <p className="text-[#0066FF] text-[40px] leading-[48px] font-bold">
          Pemain Games
        </p>
        <p className="text-[#262626] text-[16px] font-medium">
          Anda dapat dengan mudah menambahkan, mengubah, atau menghapus pemain,
          pada daftar pemain dibawah ini.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6">
        {/* Search & Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="grow w-full sm:w-auto">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <AddPlayerButton onClick={() => setIsAddOpen(true)} />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-[#E0E0E0]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="uppercase text-[#595959] text-[12px] font-semibold border-b border-[#E0E0E0] bg-[#FAFAFA]">
                <th className="text-left p-4">Daftar Pemain</th>
                <th className="text-left p-4">Kelas</th>
                <th className="text-left p-4">Jenis Hambatan</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Password</th>
                <th className="text-left p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                 <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Sedang memuat data...
                    </td>
                 </tr>
              ) : filteredPlayers.length > 0 ? (
                filteredPlayers.map((p) => (
                  <tr
                    key={p.id}
                    className="text-[14px] text-[#262626] align-middle border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E0E0E0] text-[#595959] flex items-center justify-center overflow-hidden shrink-0">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-[#0066FF]">{p.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-base">{p.name}</div>
                          <div className="text-[12px] text-[#595959] mt-0.5">
                            Absen: {p.absen}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">{p.kelas}</td>
                    <td className="p-4">
                        <span className="bg-blue-50 text-[#0066FF] px-2 py-1 rounded text-xs font-medium">
                            {p.disability}
                        </span>
                    </td>
                    <td className="p-4 text-gray-600">{p.email || "-"}</td>
                    <td className="p-4">
                      {p.password ? <PasswordCell value={p.password} /> : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <ActionIcons
                          onEdit={() => {
                            setSelectedPlayer(p);
                            setIsEditOpen(true);
                          }}
                          onDelete={() => {
                            setSelectedPlayer(p);
                            setIsDeleteOpen(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      Tidak ada data pemain ditemukan.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddPlayerModal 
        open={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSave={handleSaveStudent} 
      />
      
      {isEditOpen && selectedPlayer && (
          <EditPlayerModal
            open={isEditOpen}
            player={selectedPlayer} 
            onClose={() => setIsEditOpen(false)}
          />
      )}
      
      {isDeleteOpen && selectedPlayer && (
          <DeletePlayerModal
            open={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
          />
      )}
    </div>
  );
}