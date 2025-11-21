export type Player = { 
  name: string; 
  absen: string; 
  image: string;
};

export async function fetchPlayers(): Promise<Player[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/guru/murid/list`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil data pemain");

  const data = await res.json();

  // Kalo backend balikin {status, data}
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  return list.map((p: any) => ({
    name: p.name ?? "",
    absen: String(p.absen ?? ""),
    image: p.image ?? "",
  }));
}
