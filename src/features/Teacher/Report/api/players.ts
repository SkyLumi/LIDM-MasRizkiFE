// src/features/Teacher/Report/api/players.ts

export type Player = { name: string; absen: string; image: string };

export async function fetchPlayers(): Promise<Player[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Gagal mengambil data pemain');
  const data = await res.json();
  const list = Array.isArray(data) ? data : data?.players || [];
  return list
    .map((p: any) => ({
      name: p.name ?? p.fullName ?? '',
      absen: String(p.absen ?? p.id ?? ''),
      image: p.image ?? p.avatar ?? '',
    }))
    .filter((p: Player) => p.name);
}
