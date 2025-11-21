type ChangePasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
};

import { useState } from 'react';

export default function ChangePasswordModal({
  open,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  if (!open) return null;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    // TODO: Implement password change logic
    if (onSave) {
      onSave();
    }
    // Reset form
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] opacity-100 transition-opacity duration-200 ease-in-out">
      <div className="relative w-[480px] max-w-[90%] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100"
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
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center px-6">
            <h3 className="font-['Raleway'] font-bold text-[24px] text-[#0066FF] leading-[31.92px] m-0">
              Ganti Password
            </h3>
            <p className="font-['Raleway'] font-medium text-[14px] text-[#262626] leading-[19.6px] m-0">
              Masukkan password lama dan password baru Anda di bawah ini.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {/* Password Lama */}
            <div className="flex flex-col gap-2 font-['Raleway']">
              <label>
                <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                  Password Lama
                </span>
                <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                  *
                </span>
              </label>
              <div className="relative w-full h-14">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan password lama"
                  className="w-full h-full pr-12 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none focus:border-[#0066FF] focus:shadow-[0_8px_24px_rgba(0,102,255,0.16)]"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-5 h-5 hover:text-[#595959]"
                >
                  {showOldPassword ? (
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
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M1 1l22 22" />
                      <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                      <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95" />
                    </svg>
                  ) : (
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
            </div>

            {/* Password Baru */}
            <div className="flex flex-col gap-2 font-['Raleway']">
              <label>
                <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                  Password Baru
                </span>
                <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                  *
                </span>
              </label>
              <div className="relative w-full h-14">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  className="w-full h-full pr-12 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none focus:border-[#0066FF] focus:shadow-[0_8px_24px_rgba(0,102,255,0.16)]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-5 h-5 hover:text-[#595959]"
                >
                  {showNewPassword ? (
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
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M1 1l22 22" />
                      <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                      <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95" />
                    </svg>
                  ) : (
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
            </div>

            {/* Konfirmasi Password Baru */}
            <div className="flex flex-col gap-2 font-['Raleway']">
              <label>
                <span className="font-bold text-[14px] text-[#262626] tracking-[0.4px] leading-5 inline">
                  Konfirmasi Password Baru
                </span>
                <span className="font-bold text-[14px] text-[#E82D2F] tracking-[0.4px] leading-5 inline ml-[2px]">
                  *
                </span>
              </label>
              <div className="relative w-full h-14">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi password baru"
                  className="w-full h-full pr-12 pl-5 py-4 rounded-lg border border-[#BFBFBF] box-border font-medium text-[16px] text-[#262626] leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white shadow-none focus:border-[#0066FF] focus:shadow-[0_8px_24px_rgba(0,102,255,0.16)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-5 h-5 hover:text-[#595959]"
                >
                  {showConfirmPassword ? (
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
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M1 1l22 22" />
                      <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                      <path d="M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.18 3.95" />
                    </svg>
                  ) : (
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <p className="m-0 font-['Raleway'] font-normal text-[12px] text-[#E82D2F] tracking-[0.4px] leading-4 pl-1 opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height,margin-top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></p>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <button
              onClick={onClose}
              className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-white text-[#262626] scale-100 opacity-100 active:scale-95"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white scale-100 opacity-100 active:scale-95"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

