import React, { useState, useRef, useEffect } from 'react';
import LogoutModal from './LogoutModal';

interface ProfileDropdownProps {
  name?: string;
  role?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  name = 'Divo Tahta', 
  role = 'Tenaga Pendidik' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    console.log('Logout confirmed');
    // Add logout logic here (e.g., call logout from AuthContext)
    setShowLogoutModal(false);
    // Redirect to login or call logout function
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Add settings logic here
  };

  return (
    <>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
      <div style={{ position: 'relative', width: 'fit-content', zIndex: 50 }} ref={dropdownRef}>
        {/* Profile Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          transition: 'background-color 0.2s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Avatar */}
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10000px',
            backgroundColor: 'rgb(232, 45, 47)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgb(255, 255, 255)',
            fontFamily: 'Raleway',
            fontWeight: 700,
            fontSize: '20px',
            flexShrink: 0
          }}
        >
          {getInitials(name)}
        </div>
        
        {/* Profile Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1, textAlign: 'left' }}>
          <div 
            style={{
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '16px',
              color: 'rgb(255, 255, 255)',
              whiteSpace: 'nowrap'
            }}
          >
            {name}
          </div>
          <div 
            style={{
              fontFamily: 'Raleway',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '12px',
              color: 'rgb(255, 255, 255)',
              whiteSpace: 'nowrap'
            }}
          >
            {role}
          </div>
        </div>
        
        {/* Chevron Icon */}
        <div 
          style={{
            width: '24px',
            height: '24px',
            color: 'rgb(255, 255, 255)',
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0
          }}
        >
          <span 
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              backgroundColor: 'currentColor',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)',
              WebkitMaskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)'
            }}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: '0px',
            width: '100%',
            minWidth: '180px',
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(224, 224, 224)',
            borderRadius: '8px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            overflow: 'hidden',
            display: 'block',
            zIndex: 50,
            padding: '4px'
          }}
        >
          {/* Settings */}
          <div
            onClick={handleSettings}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '16px',
              color: 'rgb(38, 38, 38)',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              borderRadius: '6px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '16px', height: '16px', color: 'inherit', flexShrink: 0 }}>
              <span 
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  backgroundColor: 'currentColor',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url(https://framerusercontent.com/images/hsNGcX4bPiqWPQ1Ifw3RKC8gmdw.svg?width=24&height=24)',
                  WebkitMaskImage: 'url(https://framerusercontent.com/images/hsNGcX4bPiqWPQ1Ifw3RKC8gmdw.svg?width=24&height=24)'
                }}
              />
            </div>
            <span>Pengaturan</span>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '16px',
              color: 'rgb(38, 38, 38)',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              borderRadius: '6px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '16px', height: '16px', color: 'inherit', flexShrink: 0 }}>
              <span 
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  backgroundColor: 'currentColor',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url(https://framerusercontent.com/images/OJLXrGO9r1U0tsZPkNxFcgog0X0.svg?width=24&height=24)',
                  WebkitMaskImage: 'url(https://framerusercontent.com/images/OJLXrGO9r1U0tsZPkNxFcgog0X0.svg?width=24&height=24)'
                }}
              />
            </div>
            <span>Keluar</span>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfileDropdown;
