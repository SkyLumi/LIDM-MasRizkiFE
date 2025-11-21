import React, { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isCancelPressed, setIsCancelPressed] = useState(false);
  const [isConfirmHovered, setIsConfirmHovered] = useState(false);
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);

  if (!isOpen && !isAnimating) return null;

  const backdropOpacity = isAnimating ? 1 : 0;
  const modalOpacity = isAnimating ? 1 : 0;
  const modalTransform = isAnimating ? 'scale(1) translateY(0px)' : 'scale(0.95) translateY(10px)';
  const closeOpacity = isAnimating ? 1 : 0;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100] transition-opacity duration-200"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        opacity: backdropOpacity,
        transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-4 w-[90%] max-w-[400px] max-h-[200px] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: 'rgb(8, 78, 197) 8px 8px 0px 0px',
          opacity: modalOpacity,
          transform: modalTransform,
          transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          style={{
            color: 'rgb(69, 69, 69)',
            opacity: closeOpacity,
            transition: 'opacity 0.2s, transform 0.2s',
            transform: 'scale(1)',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Title */}
        <h3
          className="font-bold text-[24px] text-center"
          style={{
            fontFamily: 'Raleway',
            color: 'rgb(0, 102, 255)',
            margin: 0,
          }}
        >
          Keluar dari akun?
        </h3>

        {/* Description */}
        <p
          className="mt-4 text-center leading-normal"
          style={{
            fontFamily: 'Raleway',
            fontWeight: 400,
            fontSize: '14px',
            marginTop: '16px',
            marginBottom: 0,
            lineHeight: 1.5,
            color: '#000000',
          }}
        >
          Anda akan otomatis keluar dari akun yang terhubung dengan CloudsUp.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {/* Batal Button */}
          <button
            onClick={onClose}
            onMouseEnter={() => setIsCancelHovered(true)}
            onMouseLeave={() => {
              setIsCancelHovered(false);
              setIsCancelPressed(false);
            }}
            onMouseDown={() => setIsCancelPressed(true)}
            onMouseUp={() => setIsCancelPressed(false)}
            className="flex items-center justify-center flex-1 h-[42px] rounded-lg"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'Raleway',
              border: '1px solid rgb(0, 102, 255)',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.2s, background-color 0.2s, color 0.2s, border-color 0.2s',
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(0, 102, 255)',
              transform: isCancelPressed
                ? 'scale(0.95)'
                : isCancelHovered
                  ? 'scale(1.05)'
                  : 'scale(1)',
            }}
          >
            Batal
          </button>

          {/* Keluar Button */}
          <button
            onClick={onConfirm}
            onMouseEnter={() => setIsConfirmHovered(true)}
            onMouseLeave={() => {
              setIsConfirmHovered(false);
              setIsConfirmPressed(false);
            }}
            onMouseDown={() => setIsConfirmPressed(true)}
            onMouseUp={() => setIsConfirmPressed(false)}
            className="flex items-center justify-center flex-1 h-[42px] rounded-lg"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'Raleway',
              border: '1px solid rgb(194, 19, 21)',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.2s, background-color 0.2s, color 0.2s, border-color 0.2s',
              backgroundColor: 'rgb(232, 45, 47)',
              color: 'rgb(255, 255, 255)',
              opacity: 1,
              transform: isConfirmPressed
                ? 'scale(0.95)'
                : isConfirmHovered
                  ? 'scale(1.05)'
                  : 'scale(1)',
            }}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

