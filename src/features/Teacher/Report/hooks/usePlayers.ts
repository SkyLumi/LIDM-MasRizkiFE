import { useEffect, useState } from 'react';
import { fetchPlayers } from '../api/players';
import type { Player } from '../api/players';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPlayers()
      .then((list) => {
        if (!active) return;
        setPlayers(list);
        setError(null);
      })
      .catch((e: any) => {
        if (!active) return;
        setError(e?.message || 'Gagal memuat pemain');
        setPlayers([]);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { players, loading, error };
}
