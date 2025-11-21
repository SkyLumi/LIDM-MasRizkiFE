import { useState, useEffect } from 'react';
import ChangePasswordModal from './ChangePasswordModal';

// Sesuaikan sama data baru dari Backend
interface UserData {
  nama: string;
  email: string;
  nama_sekolah: string;
  role: string;
}

export default function AccountDetails() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // 1. Ambil data dari LocalStorage
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal load user:", error);
      }
    }
  }, []);

  // 2. Logic Tampilan Role (Biar Keren)
  const getDisplayRole = (roleDb?: string) => {
    if (!roleDb) return "Tenaga Pendidik";
    const r = roleDb.toLowerCase();
    if (r === 'guru') return "Tenaga Pendidik";
    if (r === 'murid') return "Orang Tua";
    if (r === 'admin') return "Administrator";
    return roleDb;
  };

  // 3. Logic Ambil Huruf Depan (Inisial)
  const getInitial = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  // Kalau data belum load, bisa return null atau loading skeleton
  // Tapi karena localStorage cepet, biasanya aman langsung render
  
  return (
    <>
      <div className="w-auto flex-col grid grid-cols-2 gap-[12px]">
        {/* KARTU KIRI: FOTO & HEADER */}
        <div className="flex items-center justify-start bg-[#EDF8FF] rounded-xl">
          <div className="w-auto justify-center items-center ml-7 bg-[#EDF8FF] rounded-xl">
            <div className="flex flex-row items-center ">
              {/* Avatar Inisial */}
              <div className="w-20 h-20 rounded-full bg-[#084EC5] flex items-center justify-center text-[#084EC5]">
                <p className="text-white font-bold text-4xl leading-[48px]">
                  {getInitial(user?.nama)}
                </p>
              </div>
              
              <div className="flex flex-col items-start gap-1 ml-4">
                {/* Role */}
                <p className="text-[#084EC5] text-[18px] font-medium">
                  {getDisplayRole(user?.role)}
                </p>
                {/* Nama Besar */}
                <p className="text-[#262626] text-[24px] font-bold">
                  {user?.nama || "Memuat..."}
                </p>
                {/* Nama Sekolah */}
                <p className="text-[#0052CC] text-[18px] font-bold">
                  {user?.nama_sekolah || "Nama Sekolah"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KARTU KANAN: DETAIL */}
        <div className="w-auto flex flex-col p-[24px] bg-[#EDF8FF] rounded-xl">
          <p className="text-[#0066FF] font-bold text-[16px] text-left mb-2">
            Detail Akun
          </p>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row justify-between gap-1">
              <p className="text-[#262626] font-bold text-[16px]">Nama Lengkap</p>
              <p className="text-[#262626] font-normal text-[16px]">
                {user?.nama || "-"}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <p className="text-[#262626] font-bold text-[16px]">Email</p>
              <p className="text-[#262626] font-normal text-[16px]">
                {user?.email || "-"}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <p className="text-[#262626] font-bold text-[16px]">Password</p>
              <p className="text-[#262626] font-normal text-[16px]">•••••••••••••••••</p>
            </div>
          </div>
          <div className="hover:outline-none border-none items-end flex flex-col">
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="w-auto text-right font-bold text-[14px] text-[#0066FF] transition-colors bg-transparent border-none hover:underline cursor-pointer mt-2"
            >
              Ganti Password
            </button>
          </div>
        </div>
      </div>
      
      <ChangePasswordModal
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
}