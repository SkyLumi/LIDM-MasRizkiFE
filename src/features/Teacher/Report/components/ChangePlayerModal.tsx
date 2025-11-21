type Player = {
  name: string;
  absen: string;
  image: string;
};

type ChangePlayerModalProps = {
  open: boolean;
  onClose: () => void;
  players: Player[];
  currentPlayer: Player;
  onConfirm: (player: Player) => void;
};

import { useEffect, useRef, useState } from "react";

export default function ChangePlayerModal({ open, onClose, players, currentPlayer, onConfirm }: ChangePlayerModalProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Player>(currentPlayer);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setSearch("");
      setSelected(currentPlayer);
    }
  }, [open, currentPlayer]);

  if (!open) return null;

  const filtered = players.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.absen.toLowerCase().includes(q);
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) onClose();
  };

  return (
    <div ref={containerRef} onClick={handleBackdropClick} className="fixed inset-0 bg-black/50 backdrop-blur-[5px] flex items-center justify-center z-[100] opacity-100 transition-opacity duration-200 ease-in-out">
      <div className="relative w-[90%] max-w-[480px] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
        <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-left pr-6">
            <h3 className="font-['Raleway'] font-bold text-[24px] text-[#0066FF] leading-[31.92px] m-0">Ganti Pemain</h3>
            <p className="font-['Raleway'] font-medium text-[14px] text-[#262626] leading-[19.6px] m-0">Pilih pemain untuk melihat perkembangan skills.</p>
          </div>

          {/* Search */}
          <div className="relative w-full h-14">
            <div className="absolute top-1/2 left-5 -translate-y-1/2 w-5 h-5 text-[#BFBFBF] flex items-center justify-center pointer-events-none transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="search"
              placeholder="Cari nama/no absen pemain disini ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full px-[52px] rounded-lg border bg-white text-[16px] text-[#262626] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] border-[#BFBFBF] shadow-none"
            />
            <button
              aria-label="Clear search"
              onClick={() => setSearch("")}
              className={`absolute right-5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center text-[#BFBFBF] transition-colors duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-5 h-5 ${search ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-2">
            {filtered.map((p) => {
              const active = p.name === selected.name && p.absen === selected.absen;
              return (
                <div key={`${p.name}-${p.absen}`} onClick={() => setSelected(p)} className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer ${active ? "bg-[#EDF8FF]" : "bg-transparent hover:bg-gray-50"}`}>
                  <div className="w-12 h-12 rounded-full bg-[#E0E0E0] text-[#595959] flex items-center justify-center overflow-hidden shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`font-['Raleway'] font-semibold text-[16px] ${active ? "text-[#0066FF]" : "text-[#262626]"}`}>{p.name}</span>
                    <span className="font-['Raleway'] font-normal text-[14px] text-[#595959]">No. Absen: {p.absen}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-6 mt-2">
            <button onClick={onClose} className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-white text-[#262626] active:scale-95">Batal</button>
            <button onClick={() => onConfirm(selected)} className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white active:scale-95">Konfirmasi</button>
          </div>
        </div>
      </div>
    </div>
  );
}


