import React, { useState } from 'react';
import { RefreshCw, User } from 'lucide-react';

// 👇 Pastikan path import modal ini BENAR. Kalau filenya ada di Report, import dari sana.
import ChangePlayerModal, { ToastNotification, ConfettiContainer, LoadingDots } from './ChangePlayerModal';

// 👇 Import Player dari Context
import { useSelectedPlayer } from "../../../../../src/features/Teacher/Report/contexts/SelectedPlayerContext.tsx";
import type { Player } from "../../../../../src/features/Teacher/Report/contexts/SelectedPlayerContext.tsx";

const PlayerProfileCard: React.FC = () => {
  const { players, currentPlayer, setCurrentPlayer, loading } = useSelectedPlayer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false); 
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleConfirm = (player: Player) => {
    setIsModalOpen(false);
    setIsSwitching(true);
    setTimeout(() => {
      setCurrentPlayer(player); 
      setIsSwitching(false);
      setShowToast(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 1000);
  };

  const displayName = currentPlayer?.name || "Pilih Pemain";
  const displayImage = currentPlayer?.image;
  const showLoading = loading || isSwitching;

  return (
    <>
      {showConfetti && <ConfettiContainer />}
      <ToastNotification isOpen={showToast} onClose={() => setShowToast(false)} title="Berhasil!" message={`Pemain diganti ke ${displayName}`} duration={3000} />

      <div className="w-[312px] h-[133.6px] bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] p-[20px] flex items-center gap-4">
        <div className="w-[76px] h-[76px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {displayImage ? <img src={displayImage} alt={displayName} className="w-full h-full object-cover" /> : <User className="w-8 h-8 text-gray-400" />}
        </div>
        <div className="flex flex-col gap-2 flex-grow min-w-0">
          {showLoading ? <div className="w-full h-5 flex items-center"><LoadingDots color="#FFFFFF" /></div> : <h3 className="w-full font-raleway font-bold text-base leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">{displayName}</h3>}
          <button onClick={() => setIsModalOpen(true)} disabled={loading || players.length === 0} className="w-[172px] h-[49.6px] p-2 bg-white rounded-lg border border-gray-800 flex items-center justify-center gap-2 cursor-pointer transition-transform duration-[450ms] hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed">
            <span className="font-raleway font-bold text-[14px] leading-4 text-gray-800">{players.length === 0 ? "Memuat..." : "Ganti Pemain"}</span>
            <RefreshCw className="w-4 h-4 text-gray-800 flex-shrink-0" />
          </button>
        </div>
      </div>

      <ChangePlayerModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirm} 
        players={players} 
        currentPlayer={currentPlayer} 
      />
    </>
  );
};

export default PlayerProfileCard;