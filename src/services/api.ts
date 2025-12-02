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

export const getFullReport = async (studentId: number, month?: number, year?: number) => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${BASE_URL}/v1/analytics/profil/${studentId}/report/full${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  
  return result; 
};


export const getGameHistory = async (studentId: number, month?: number, year?: number) => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${BASE_URL}/v1/analytics/game-history/${studentId}${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  
  return result;
};

export const updateStudent = async (id: string | number, data: any) => {
  const response = await fetch(`${BASE_URL}/v1/guru/murid/${id}`, { // Sesuaikan endpoint backend abang
    method: 'PUT', // atau PATCH
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Gagal mengupdate data pemain");
  }
  return result;
};