import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStudents } from '../../../../services/api'; 

// Tipe Data Player
export interface Player {
  id: number; 
  name: string;
  email: string;
  kelas: number;
  disability: string;  
  absen: string; 
  image?: string; 
}

type SelectedPlayerContextValue = {
  players: Player[];
  loading: boolean;
  error: string | null;
  currentPlayer: Player | null;
  setCurrentPlayer: (p: Player) => void;
};

const SelectedPlayerContext = createContext<SelectedPlayerContextValue | undefined>(undefined);

export function SelectedPlayerProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true); // Default loading true
  const [error, setError] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await getStudents(); 

        console.log("🔥 RAW DATA DARI API MURID:", data);

        // Mapping Data
        const mappedPlayers: Player[] = data.map((p: any) => ({
            ...p,
            id: p.id,
            name: p.name, 
            absen: p.absen || '-',
            image: p.image || undefined 
        }));

        // Urutkan berdasarkan Absen atau Nama (Opsional, biar rapi)
        mappedPlayers.sort((a, b) => a.id - b.id);

        setPlayers(mappedPlayers);

        // --- LOGIKA AUTO SELECT (JURUS ANTI KOSONG) ---
        // Jika list tidak kosong DAN belum ada pemain yang dipilih...
        if (mappedPlayers.length > 0 && !currentPlayer) {
          // ...Pilih murid pertama secara otomatis!
          console.log("Auto-select murid pertama:", mappedPlayers[0].name);
          setCurrentPlayer(mappedPlayers[0]);
        }
        // ----------------------------------------------

      } catch (err: any) {
        console.error("Gagal load murid:", err);
        setError(err.message || 'Gagal memuat data murid');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // Jalan sekali pas mount

  const value = useMemo(
    () => ({ players, loading, error, currentPlayer, setCurrentPlayer }),
    [players, loading, error, currentPlayer]
  );

  return (
    <SelectedPlayerContext.Provider value={value}>
      {children}
    </SelectedPlayerContext.Provider>
  );
}

export function useSelectedPlayer() {
  const ctx = useContext(SelectedPlayerContext);
  if (!ctx) throw new Error('useSelectedPlayer must be used within SelectedPlayerProvider');
  return ctx;
}