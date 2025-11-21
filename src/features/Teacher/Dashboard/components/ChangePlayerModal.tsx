import React, { useState, useRef, useEffect } from 'react';
import { X, Search, User, Check } from 'lucide-react';

// ========================================================================
//  INTERFACES
// ========================================================================
interface Player {
  id: string | number;
  name: string;
  absen: string | number;
  avatar?: string;
}

interface ChangePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (player: Player) => void;
  players: Player[];
  currentPlayer: Player;
}

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  duration?: number;
}


const LoadingDots: React.FC<{ color?: string }> = ({ color = '#FFFFFF' }) => {
  return (
    <>
      <style>{`
        @keyframes loadingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
      <div className="flex items-center justify-center gap-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            animation: 'loadingBounce 1.4s infinite ease-in-out both',
            animationDelay: '-0.32s',
          }}
        />
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            animation: 'loadingBounce 1.4s infinite ease-in-out both',
            animationDelay: '-0.16s',
          }}
        />
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            animation: 'loadingBounce 1.4s infinite ease-in-out both',
          }}
        />
      </div>
    </>
  );
};


const ConfettiContainer: React.FC = () => {
  const confettiColors = ['#09DE1B', '#0066FF', '#E82D2F', '#FFC700', '#8A2BE2'];

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(1080deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[199] pointer-events-none">
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <i
              key={i}
              className="absolute w-2 h-4 opacity-0"
              style={{
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${Math.random() * 100}%`,
                animation: `confetti-fall ${3 + Math.random() * 2}s linear ${Math.random() * 2}s 1`,
              }}
            />
          ))}
      </div>
    </>
  );
};


const ToastNotification: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title,
  message,
  duration = 3000,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [animStyles, setAnimStyles] = useState({
    opacity: 0,
    transform: 'translate(-50%, -30px)',
  });

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => {
        setAnimStyles({
          opacity: 1,
          transform: 'translate(-50%, 20px)',
        });
      }, 10);

      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else if (!isOpen && isRendered) {
      setAnimStyles({
        opacity: 0,
        transform: 'translate(-50%, -30px)',
      });
      setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }
  }, [isOpen, isRendered, onClose, duration]);

  if (!isRendered) return null;

  return (
    <>
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      <div
        className="fixed top-0 left-1/2 z-[200] transition-all duration-300"
        style={{
          opacity: animStyles.opacity,
          transform: animStyles.transform,
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="relative flex items-center gap-3 px-4 py-4 bg-[#EEFFEE] rounded-xl shadow-lg border border-[#09DE1B] backdrop-blur-sm min-h-[60px] overflow-hidden">
          <div className="w-6 h-6 flex-shrink-0 text-[#09DE1B]">
            <Check className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-raleway font-bold text-[15px] text-[#09DE1B] leading-tight">
              {title}
            </span>
            <span className="font-raleway font-normal text-sm text-[#2D3748] leading-snug">
              {message}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-4 h-4 flex-shrink-0 text-[#2D3748] opacity-60 cursor-pointer ml-4 hover:opacity-100 transition-opacity"
          >
            <X className="w-full h-full" />
          </button>
          <div
            className="absolute bottom-0 left-0 h-1 bg-[#09DE1B] opacity-70"
            style={{
              animation: `toast-progress ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </>
  );
};

// ========================================================================
//  PLAYER ITEM COMPONENT
// ========================================================================
const PlayerItem: React.FC<{
  player: Player;
  isSelected: boolean;
  onClick: () => void;
}> = ({ player, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-4 p-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        isSelected
          ? 'bg-[#EDF8FF]'
          : isHovered
            ? 'bg-[#F5F5F5]'
            : 'bg-transparent'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden flex-shrink-0">
        {player.avatar ? (
          <img
            src={player.avatar}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-6 h-6" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={`font-raleway font-semibold text-base ${
            isSelected ? 'text-[#0066FF]' : 'text-[#262626]'
          }`}
        >
          {player.name}
        </span>
        <span className="font-raleway font-normal text-sm text-[#595959]">
          No. Absen: {player.absen}
        </span>
      </div>
    </div>
  );
};

// ========================================================================
//  MAIN MODAL COMPONENT
// ========================================================================
const ChangePlayerModal: React.FC<ChangePlayerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  players,
  currentPlayer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(currentPlayer);
  const [animStyles, setAnimStyles] = useState({
    opacity: 0,
    transform: 'scale(0.95) translateY(10px)',
  });

  const [isConfirmHovered, setIsConfirmHovered] = useState(false);
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isCancelPressed, setIsCancelPressed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setSelectedPlayer(currentPlayer);
      setTimeout(() => {
        setAnimStyles({
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        });
      }, 10);
    } else if (!isOpen && isRendered) {
      setAnimStyles({
        opacity: 0,
        transform: 'scale(0.95) translateY(10px)',
      });
      setTimeout(() => {
        setIsRendered(false);
        setSearchTerm('');
      }, 200);
    }
  }, [isOpen, isRendered, currentPlayer]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedPlayer);
    onClose();
  };

  if (!isRendered) return null;

  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.absen.toString().includes(searchTerm)
  );

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] transition-opacity duration-200"
      style={{ opacity: animStyles.opacity }}
    >
      <div
        className="relative w-[90%] max-w-[480px] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0px_0px_#084EC5] flex flex-col overflow-hidden transition-all duration-200"
        style={{
          opacity: animStyles.opacity,
          transform: animStyles.transform,
        }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 text-gray-400 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-full h-full" />
          </button>

          {/* Content */}
          <div className="p-6 flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-1 text-left pr-6">
            <h3 className="font-raleway font-bold text-2xl text-[#0066FF] leading-8 m-0">
                Ganti Pemain
              </h3>
            <p className="font-raleway font-medium text-sm text-[#262626] leading-tight m-0">
                Pilih pemain yang akan bermain.
              </p>
            </div>

          {/* Search Bar */}
            <div className="relative w-full h-14">
            <div
              className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors duration-[400ms] ${
                isSearchFocused ? 'text-[#0066FF]' : 'text-[#BFBFBF]'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                <Search className="w-full h-full" />
              </div>
              <input
                type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Cari pemain dengan nama atau no absen disini..."
              className={`w-full h-full px-14 rounded-lg border font-raleway font-normal text-base text-[#262626] outline-none transition-all duration-[400ms] ${
                isSearchFocused
                  ? 'bg-[#EDF8FF] border-[#0066FF] shadow-[inset_0_0_0_1px_#0066FF]'
                  : 'bg-white border-[#BFBFBF]'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
            {searchTerm && (
                <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-colors duration-[400ms] ${
                  isSearchFocused ? 'text-[#0066FF]' : 'text-[#BFBFBF]'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <X className="w-full h-full" />
                </button>
              )}
            </div>

            {/* Player List */}
            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-2">
              {filteredPlayers.map((player) => (
              <PlayerItem
                  key={player.id}
                player={player}
                isSelected={selectedPlayer.id === player.id}
                onClick={() => setSelectedPlayer(player)}
              />
              ))}
            </div>

          {/* Buttons */}
            <div className="flex gap-6 mt-4">
              <button
                onClick={onClose}
              onMouseEnter={() => setIsCancelHovered(true)}
              onMouseLeave={() => {
                setIsCancelHovered(false);
                setIsCancelPressed(false);
              }}
              onMouseDown={() => setIsCancelPressed(true)}
              onMouseUp={() => setIsCancelPressed(false)}
              className="flex-1 px-4 py-4 bg-white text-[#262626] border border-[#262626] rounded-lg font-raleway font-bold text-sm leading-4 cursor-pointer transition-transform duration-[450ms]"
              style={{
                transform: isCancelPressed
                  ? 'scale(0.95)'
                  : isCancelHovered
                    ? 'scale(1.05)'
                    : 'scale(1)',
                transitionTimingFunction: 'cubic-bezier(0.34, 2, 0.64, 1)',
              }}
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
              onMouseEnter={() => setIsConfirmHovered(true)}
              onMouseLeave={() => {
                setIsConfirmHovered(false);
                setIsConfirmPressed(false);
              }}
              onMouseDown={() => setIsConfirmPressed(true)}
              onMouseUp={() => setIsConfirmPressed(false)}
              className="flex-1 px-4 py-4 bg-[#0066FF] text-white border-none rounded-lg font-raleway font-bold text-sm leading-4 cursor-pointer transition-transform duration-[450ms]"
              style={{
                transform: isConfirmPressed
                  ? 'scale(0.95)'
                  : isConfirmHovered
                    ? 'scale(1.05)'
                    : 'scale(1)',
                transitionTimingFunction: 'cubic-bezier(0.34, 2, 0.64, 1)',
              }}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ChangePlayerModal;
export { ToastNotification, ConfettiContainer, LoadingDots };
export type { Player, ChangePlayerModalProps };
