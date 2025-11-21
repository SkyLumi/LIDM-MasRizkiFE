const BASE_URL = import.meta.env.VITE_API_URL;

export const registerGuru = async (data: any) => {
  const response = await fetch(`${BASE_URL}/v1/guru/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mendaftar');
  }

  return result;
};

export const getSchools = async () => {
  const response = await fetch(`${BASE_URL}/v1/master/sekolah`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengambil data sekolah');
  }

  return Array.isArray(result) ? result : (result.data || []);
};

interface LoginPayload {
  email: string;
  kata_sandi: string;
}

export const loginGuru = async (data: LoginPayload) => {
  const response = await fetch(`${BASE_URL}/v1/guru/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);


  if (!response.ok) {
    throw new Error(result.message || 'Gagal login');
  }

  return result;
};

export const getObstacles = async () => {
  const response = await fetch(`${BASE_URL}/v1/master/hambatan`);
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengambil data hambatan');
  }
  
  return result;
};

interface AddStudentPayload {
  nama_lengkap: string;
  nomor_absen: string;
  id_hambatan: number;
  email?: string;
  password?: string;
  image_base64?: string;
}

export const addStudent = async (data: AddStudentPayload) => {
  const response = await fetch(`${BASE_URL}/v1/guru/murid/tambah`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Wajib 'include' biar session guru kebawa
    credentials: 'include', 
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal menambahkan murid');
  }

  return result;
};

export const getStudents = async () => {
  const response = await fetch(`${BASE_URL}/v1/guru/murid/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Wajib include biar backend tau siapa gurunya (session)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengambil data murid');
  }

  // Backend langsung balikin array list murid
  return result; 
};

export const getWeeklyAnalytics = async (studentId: number) => {
  // PENTING: Pastikan URL-nya sesuai route backend (/v1/analytics/profil/...)
  const response = await fetch(`${BASE_URL}/v1/analytics/profil/${studentId}/weekly`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // <--- WAJIB: Biar Backend tau ini Guru yang login
  });

  const result = await response.json();

  if (!response.ok) {
    // Kalo error 404/500, lempar error
    throw new Error(result.message || 'Gagal mengambil data statistik');
  }

  return result; // Balikin full JSON ({ status: 'sukses', data: {...} })
};

export const getGameHistory = async (studentId: number) => {
  const response = await fetch(`${BASE_URL}/v1/analytics/history/${studentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
};