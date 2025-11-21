import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import sidebarLogo from '../assets/images/sidebar-logo.svg';
import logo from '../assets/images/HorizontalLogo.svg';
import { getSchools } from '../services/api';

interface SchoolData {
  id: number;
  nama: string;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    schoolId: 0,
    email: '',
    password: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');

  const [schoolsList, setSchoolsList] = useState<SchoolData[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState(false);

  useEffect(() => {
    const loadSchools = async () => {
      setIsLoadingSchools(true);
      try {
        const data = await getSchools();
        setSchoolsList(data);
      } catch (error) {
        console.error("Gagal ambil sekolah:", error);
      } finally {
        setIsLoadingSchools(false);
      }
    };
    loadSchools();
  }, []);

  const filteredSchools = schoolsList.filter(school =>
    school.nama.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const handleSchoolSelect = (school: SchoolData) => {
    setFormData(prev => ({ 
      ...prev, 
      school: school.nama,
      schoolId: school.id
    }));
    setSchoolSearch(school.nama);
    setSchoolDropdownOpen(false);
    if (errors.school) {
      setErrors(prev => ({ ...prev, school: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }

    if (!formData.school) {
      newErrors.school = 'Asal sekolah harus dipilih';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Kata sandi harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat & ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration data:', formData);
      // Handle registration logic here
    }
  };

  const isFormValid = formData.fullName && formData.school && formData.email && 
                      formData.password && formData.agreeTerms;

  return (
    <div className="flex min-h-screen w-screen bg-white overflow-hidden">
      {/* Left Sidebar - Red Background with gradient */}
      <div className="hidden lg:flex lg:w-[576px] lg:flex-shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[#E82D2F] to-[#C21315] shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] relative">
        <img src={sidebarLogo} alt="logo" className="w-[357px] h-[357px]" />
      </div>

       {/* Right Panel - Registration Form */}
       <div className="flex-1 flex items-center justify-center px-[48px] min-w-0">
         <div className="w-full space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-start gap-1">
          <img src={logo} alt="logo" className="w-[287px]" />
          </div>

          {/* Title Section */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-[24px] font-bold text-[#262626] font-raleway">
                Buat akun terlebih dahulu
              </h1>
              <p className="text-sm text-[#262626] leading-[18px]">
                Untuk memainkan game dan melihat perkembangan keterampilan anak
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-[#262626]">
                Sudah memiliki akun?
              </p>
                <a href="/login" className="text-sm font-bold text-[#0066ff] hover:underline transition-all background-transparent border-none cursor-pointer">
                  Masuk disini
                </a>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name and School - Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#262626]">
                  Nama Lengkap<span className="text-[#e82d2f] ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full h-14 px-5 py-4 rounded-lg border font-medium text-base text-[#262626] outline-none transition-all duration-300 placeholder:text-[#bfbfbf] ${
                    errors.fullName 
                      ? 'border-[#e82d2f] focus:border-[#e82d2f]' 
                      : 'border-[#bfbfbf] border-solid focus:bg-blue-50 focus:border-[2px] focus:border-[#0066ff] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-[#e82d2f] pl-1 animate-fadeIn">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* School Dropdown */}
              <div className="space-y-2 relative">
                <label className="text-sm font-bold text-[#262626]">
                  Asal Sekolah<span className="text-[#e82d2f] ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="school"
                    value={schoolSearch}
                    onChange={(e) => {
                      setSchoolSearch(e.target.value);
                      setSchoolDropdownOpen(true);
                    }}
                    onFocus={() => setSchoolDropdownOpen(true)}
                    placeholder={isLoadingSchools ? "Memuat data..." : "Pilih atau ketik asal sekolah"}
                    className={`w-full h-14 px-5 py-4 pr-12 rounded-lg border font-medium text-base text-[#262626] outline-none transition-all duration-300 placeholder:text-[#bfbfbf] cursor-pointer ${
                      errors.school 
                        ? 'border-[#e82d2f] focus:border-[#e82d2f]' 
                        : 'border-[#bfbfbf] border-solid focus:bg-blue-50 focus:border-[2px] focus:border-[#0066ff] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]'
                    }`}
                  />
                  <ChevronDown 
                    className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfbfbf] pointer-events-none transition-transform duration-300 ${
                      schoolDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  
                  {/* Dropdown Menu */}
                  {schoolDropdownOpen && filteredSchools.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#bfbfbf] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10">
                      {filteredSchools.map((school, index) => (
                        <div
                          key={index}
                          onClick={() => handleSchoolSelect(school)}
                          className="px-5 py-3 font-medium text-base text-[#262626] cursor-pointer transition-colors hover:bg-[#0066ff] hover:text-white"
                        >
                          {school.nama}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.school && (
                  <p className="text-xs text-[#e82d2f] pl-1 animate-fadeIn">
                    {errors.school}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Password - Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#262626]">
                  Email<span className="text-[#e82d2f] ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan alamat email"
                  className={`w-full h-14 px-5 py-4 rounded-lg border font-medium text-base text-[#262626] outline-none transition-all duration-300 placeholder:text-[#bfbfbf] ${
                    errors.email 
                      ? 'border-[#e82d2f] focus:border-[#e82d2f]' 
                      : 'border-[#bfbfbf] border-solid focus:bg-blue-50 focus:border-[2px] focus:border-[#0066ff] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-[#e82d2f] pl-1 animate-fadeIn">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#262626]">
                  Kata sandi<span className="text-[#e82d2f] ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan kata sandi"
                    className={`w-full h-14 px-5 py-4 pr-12 rounded-lg border font-medium text-base text-[#262626] outline-none transition-all duration-300 placeholder:text-[#bfbfbf] ${
                      errors.password 
                        ? 'border-[#e82d2f] focus:border-[#e82d2f]' 
                        : 'border-[#bfbfbf] border-solid focus:bg-blue-50 focus:border-[2px] focus:border-[#0066ff] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#bfbfbf] hover:text-[#262626] transition-colors cursor-pointer background-transparent border-none focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#e82d2f] pl-1 animate-fadeIn">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all duration-300 ${
                    formData.agreeTerms 
                      ? 'bg-[#0066ff] border-[#0066ff]' 
                      : 'bg-white border-[#bfbfbf]'
                  }`}>
                    {formData.agreeTerms && (
                      <svg 
                        className="w-3 h-3 text-white" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-[#262626] leading-[1.4em]">
                  Dengan mendaftar, saya menyetujui{' '}
                  <a href="#" className="font-bold text-[#0066ff] hover:underline">
                    Kebijakan Privasi
                  </a>{' '}
                  serta{' '}
                  <a href="#" className="font-bold text-[#0066ff] hover:underline">
                    Syarat & Ketentuan
                  </a>{' '}
                  CloudsUp.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-[#e82d2f] pl-8 animate-fadeIn">
                  {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full h-14 px-6 py-4 rounded-lg font-bold text-base leading-[1.5em] transition-all duration-300 ${
                isFormValid
                  ? 'bg-[#0066ff] text-white hover:bg-[#0052cc] hover:scale-[1.02] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.3)] cursor-pointer'
                  : 'bg-[#bfbfbf] text-white cursor-not-allowed'
              }`}
            >
              Daftar
            </button>
          </form>
        </div>
      </div>

      {/* Click outside handler for dropdown */}
      {schoolDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setSchoolDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;