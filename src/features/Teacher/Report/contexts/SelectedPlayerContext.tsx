import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import type { Player } from '../api/players';

type SelectedPlayerContextValue = {
  players: Player[];
  loading: boolean;
  error: string | null;
  currentPlayer: Player | null;
  setCurrentPlayer: (p: Player) => void;
};

const SelectedPlayerContext = createContext<SelectedPlayerContextValue | undefined>(undefined);

export function SelectedPlayerProvider({ children }: { children: React.ReactNode }) {
  const { players, loading, error } = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!currentPlayer && players.length) {
      setCurrentPlayer(players[0]);
    }
  }, [players, currentPlayer]);

  const value = useMemo(
    () => ({ players, loading, error, currentPlayer, setCurrentPlayer }),
    [players, loading, error, currentPlayer]
  );

  return (
    <SelectedPlayerContext.Provider value={value}>{children}</SelectedPlayerContext.Provider>
  );
}

export function useSelectedPlayer() {
  const ctx = useContext(SelectedPlayerContext);
  if (!ctx) throw new Error('useSelectedPlayer must be used within SelectedPlayerProvider');
  return ctx;
}


