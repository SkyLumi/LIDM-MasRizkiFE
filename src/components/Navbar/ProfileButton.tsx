import React, { useState, useRef, useEffect } from 'react';
import LogoutModal from './LogoutModal';

interface ProfileButtonProps {
  name?: string;
  role?: string;
  onLogout?: () => void;
  onSettings?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ 
  name = 'Divo Tahta', 
  role = 'Tenaga Pendidik',
  onLogout,
  onSettings
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get initials from name
  const getInitials = (fullName: string) => {
    return fullName.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // onLogout?.();
    setShowLogoutModal(true);
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    onSettings?.();
  };

  return (
    <>
    <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => onLogout?.()}
      />
    <div className="relative w-fit z-50" ref={dropdownRef}>
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Avatar */}
        <div className="w-[48px] h-[48px] rounded-full bg-[#E82D2F] flex items-center justify-center text-white font-raleway font-bold text-xl flex-shrink-0">
          {getInitials(name)}
        </div>
        
        {/* Profile Info */}
        <div className="flex flex-col gap-0.5 flex-grow text-left">
          <div className="font-raleway font-bold text-sm leading-4 text-white whitespace-nowrap">
            {name}
          </div>
          <div className="font-raleway font-normal text-[10px] leading-3 text-white whitespace-nowrap">
            {role}
          </div>
        </div>
        
        {/* Chevron Icon */}
        <div 
          className="w-6 h-6 text-white flex-shrink-0 transition-transform duration-300"
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <span 
            className="w-full h-full block bg-current"
            style={{
              maskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)',
              WebkitMaskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-full min-w-[180px] bg-white border border-[#E0E0E0] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50 p-1">
          {/* Settings */}
          <button
            onClick={handleSettings}
            className="flex items-center gap-2 w-full px-3 py-2.5 font-raleway font-bold text-sm leading-4 text-[#262626] bg-transparent transition-all duration-200 ease-in-out cursor-pointer rounded-md hover:bg-gray-100 text-left"
          >
            <div className="w-4 h-4 text-inherit flex-shrink-0">
              <span 
                className="w-full h-full block bg-current"
                style={{
                  maskImage: 'url(https://framerusercontent.com/images/hsNGcX4bPiqWPQ1Ifw3RKC8gmdw.svg?width=24&height=24)',
                  WebkitMaskImage: 'url(https://framerusercontent.com/images/hsNGcX4bPiqWPQ1Ifw3RKC8gmdw.svg?width=24&height=24)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
            <span>Pengaturan</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2.5 font-raleway font-bold text-sm leading-4 text-[#262626] bg-transparent transition-all duration-200 ease-in-out cursor-pointer rounded-md hover:bg-gray-100 text-left"
          >
            <div className="w-4 h-4 text-inherit flex-shrink-0">
              <span 
                className="w-full h-full block bg-current"
                style={{
                  maskImage: 'url(https://framerusercontent.com/images/OJLXrGO9r1U0tsZPkNxFcgog0X0.svg?width=24&height=24)',
                  WebkitMaskImage: 'url(https://framerusercontent.com/images/OJLXrGO9r1U0tsZPkNxFcgog0X0.svg?width=24&height=24)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
            <span>Keluar</span>
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfileButton;

