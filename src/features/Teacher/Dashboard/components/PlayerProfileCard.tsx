import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import ChangePlayerModal, { ToastNotification, ConfettiContainer, LoadingDots } from './ChangePlayerModal';
import type { Player } from './ChangePlayerModal';

const PlayerProfileCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Data players
  const players: Player[] = [
    {
      id: '1',
      name: 'Hana Sharifah',
      absen: '12',
      avatar: 'https://framerusercontent.com/images/QL4YPq8cbQKu96Z4VlaylTBWeM.png?width=213&height=214'
    },
    {
      id: '2',
      name: 'Danentara Kusuma',
      absen: '13',
      avatar: ''
    },
    {
      id: '3',
      name: 'Arkana Al-Husna',
      absen: '14',
      avatar: ''
    },
    {
      id: '4',
      name: 'Ananda Mikhail',
      absen: '15',
      avatar: ''
    },
    {
      id: '5',
      name: 'Agil Jordi Wardhana',
      absen: '16',
      avatar: ''
    },
  ];

  const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (player: Player) => {
    setIsModalOpen(false);
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      setSelectedPlayer(player);
      setIsLoading(false);
      setShowToast(true);
      setShowConfetti(true);

      // Hide confetti after animation
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 1000);
  };

  return (
    <>
      {/* Confetti */}
      {showConfetti && <ConfettiContainer />}

      {/* Toast Notification */}
      <ToastNotification
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Berhasil!"
        message="Pemain berhasil diganti"
        duration={3000}
      />

      {/* Card */}
      <div className="w-[312px] h-[133.6px] bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] p-[20px] flex items-center gap-4">
        {/* Avatar */}
        <div className="w-[76px] h-[76px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {selectedPlayer.avatar ? (
            <img 
              src={selectedPlayer.avatar} 
              alt={selectedPlayer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-2xl font-bold">
              {selectedPlayer.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-2 flex-grow min-w-0">
          {isLoading ? (
            <div className="w-full h-5 flex items-center">
              <LoadingDots color="#FFFFFF" />
            </div>
          ) : (
            <h3 className="w-full font-raleway font-bold text-base leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedPlayer.name}
            </h3>
          )}
          
          {/* Change Player Button */}
          <button 
            onClick={handleOpenModal}
            className="w-[172px] h-[49.6px] p-2 bg-white rounded-lg border border-gray-800 flex items-center justify-center gap-2 cursor-pointer transition-transform duration-[450ms] hover:scale-105 active:scale-100"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 2, 0.64, 1)',
            }}
          >
            <span className="font-raleway font-bold text-[14px] leading-4 text-gray-800">Ganti Pemain</span>
            <RefreshCw className="w-4 h-4 text-gray-800 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <ChangePlayerModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        players={players}
        currentPlayer={selectedPlayer}
      />
    </>
  );
};

export default PlayerProfileCard;
