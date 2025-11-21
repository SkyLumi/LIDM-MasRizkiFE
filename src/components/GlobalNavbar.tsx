import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CameraButton, ProfileButton } from './Navbar';

interface UserData {
  nama: string;      // Inget, backend kirimnya 'nama', bukan 'name'
  id_sekolah: number;
  id_profil: number;
  role?: string;
}

const GlobalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');

    console.log("1. Mentahan dari Storage:", storedUser);
    
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal baca data user:", error);
      }
    }
  }, []);

  const getDisplayRole = (roleDb: string | undefined) => {
    if (!roleDb) return "Tenaga Pendidik"; // Default kalau kosong

    const roleLower = roleDb.toLowerCase();

    if (roleLower === 'guru') {
        return "Tenaga Pendidik";
    }
    
    if (roleLower === 'murid') {
        return "Orang Tua"; // Sesuai request abang
    }

    if (roleLower === 'admin') {
        return "Administrator";
    }

    // Kalau role lain, tampilkan apa adanya
    return roleDb;
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user_data'); 
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <nav className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] shadow-md w-full h-full">
      <div className="flex justify-end items-center h-full px-[40px]">
        {/* User Menu */}
        <div className="flex items-center gap-[10px]">
          <CameraButton />
          <ProfileButton 
            name={userData?.nama || "Bapak/Ibu Guru"} 
            role={getDisplayRole(userData?.role)}
            onLogout={handleLogout}
            onSettings={handleSettings}
          />
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
