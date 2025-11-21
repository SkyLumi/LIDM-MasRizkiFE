import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface RegisterFormProps {
  onSubmit?: (data: any) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');

  const [isFocused, setIsFocused] = useState({
    fullName: false,
    school: false,
    email: false,
    password: false,
  });

  const [isTouched, setIsTouched] = useState({
    fullName: false,
    school: false,
    email: false,
    password: false,
    agreeTerms: false,
  });

  const schools = [
    'SLB NEGERI JEMBER',
    'SLB NEGERI BRANJANGAN',
    'SLB-C TPA JEMBER',
    'SLB STARKIDS JEMBER',
    'SLB ABC BALUNG',
    'SLB HARAPAN PELANGI',
    'SDLB-BCD YPAC'
  ];

  const filteredSchools = schools.filter(school =>
    school.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const validateEmail = (email: string) => {
    if (!email) return false;
    return /\S+@\S+\.\S+/.test(email);
  };

  // Validasi real-time
  const getFullNameError = () => {
    if (!isTouched.fullName) return '';
    if (!formData.fullName.trim()) {
      return 'Nama lengkap harus diisi';
    }
    return '';
  };

  const getSchoolError = () => {
    if (!isTouched.school) return '';
    if (!formData.school) {
      return 'Asal sekolah harus dipilih';
    }
    return '';
  };

  const getEmailError = () => {
    if (!isTouched.email) return '';
    
    if (!formData.email.trim()) {
      return 'Email harus diisi';
    }
    
    if (!validateEmail(formData.email)) {
      return 'Format email tidak valid';
    }
    
    return '';
  };

  const getPasswordError = () => {
    if (!isTouched.password) return '';
    
    if (!formData.password) {
      return 'Kata sandi harus diisi';
    }
    
    if (formData.password.length < 6) {
      return 'Kata sandi minimal 6 karakter';
    }
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSchoolSelect = (school: string) => {
    setFormData(prev => ({ ...prev, school }));
    setSchoolSearch(school);
    setSchoolDropdownOpen(false);
    setIsTouched(prev => ({ ...prev, school: true }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Pastikan touched state aktif untuk validasi
    setIsTouched({ 
      fullName: true, 
      school: true, 
      email: true, 
      password: true,
      agreeTerms: true 
    });

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }

    if (!formData.school) {
      newErrors.school = 'Asal sekolah harus dipilih';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!validateEmail(formData.email)) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        if (onSubmit) {
          await onSubmit(formData);
        }
        // Default: redirect to login
        navigate('/login');
      } catch (err) {
        setErrors({ password: 'Gagal mendaftar. Silakan coba lagi.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = formData.fullName && formData.school && 
                      formData.email && formData.password && 
                      validateEmail(formData.email) && 
                      formData.agreeTerms;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name and School - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            Nama Lengkap<span className="text-red-600 ml-0.5">*</span>
          </label>
          <div className="relative w-full h-14">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(prev => ({ ...prev, fullName: true }))}
              onBlur={() => {
                setIsFocused(prev => ({ ...prev, fullName: false }));
                setIsTouched(prev => ({ ...prev, fullName: true }));
              }}
              placeholder="Masukkan nama lengkap"
              className={`w-full h-full px-5 py-4 rounded-lg border font-medium text-base text-gray-900 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                errors.fullName || getFullNameError()
                  ? 'bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100' 
                  : isFocused.fullName 
                    ? 'bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
              style={{
                fontSize: '16px',
                lineHeight: '1.5em',
              }}
            />
          </div>
          {(errors.fullName || getFullNameError()) && (
            <p className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               style={{
                 fontFamily: 'Raleway, sans-serif',
                 fontWeight: 'normal',
                 letterSpacing: '0.4px',
                 lineHeight: '16px',
               }}>
              {errors.fullName || getFullNameError()}
            </p>
          )}
        </div>

        {/* School Dropdown */}
        <div className="space-y-2 relative">
          <label className="text-sm font-bold text-gray-900">
            Asal Sekolah<span className="text-red-600 ml-0.5">*</span>
          </label>
          <div className="relative w-full h-14">
            <input
              type="text"
              name="school"
              value={schoolSearch}
              onChange={(e) => {
                setSchoolSearch(e.target.value);
                setSchoolDropdownOpen(true);
              }}
              onFocus={() => {
                setSchoolDropdownOpen(true);
                setIsFocused(prev => ({ ...prev, school: true }));
              }}
              onBlur={() => {
                setIsFocused(prev => ({ ...prev, school: false }));
                setIsTouched(prev => ({ ...prev, school: true }));
              }}
              placeholder="Pilih atau ketik asal sekolah"
              className={`w-full h-full px-5 py-4 pr-12 rounded-lg border font-medium text-base text-gray-900 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${
                errors.school || getSchoolError()
                  ? 'bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100' 
                  : isFocused.school 
                    ? 'bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
              style={{
                fontSize: '16px',
                lineHeight: '1.5em',
              }}
            />
            <ChevronDown 
              className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform duration-[400ms] ${
                schoolDropdownOpen ? 'rotate-180' : ''
              }`}
            />
            
            {/* Dropdown Menu */}
            {schoolDropdownOpen && filteredSchools.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10">
                {filteredSchools.map((school, index) => (
                  <div
                    key={index}
                    onClick={() => handleSchoolSelect(school)}
                    className="px-5 py-3 font-medium text-base text-gray-900 cursor-pointer transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    {school}
                  </div>
                ))}
              </div>
            )}
          </div>
          {(errors.school || getSchoolError()) && (
            <p className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               style={{
                 fontFamily: 'Raleway, sans-serif',
                 fontWeight: 'normal',
                 letterSpacing: '0.4px',
                 lineHeight: '16px',
               }}>
              {errors.school || getSchoolError()}
            </p>
          )}
        </div>
      </div>

      {/* Email and Password - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            Email<span className="text-red-600 ml-0.5">*</span>
          </label>
          <div className="relative w-full h-14">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
              onBlur={() => {
                setIsFocused(prev => ({ ...prev, email: false }));
                setIsTouched(prev => ({ ...prev, email: true }));
              }}
              placeholder="Masukkan alamat email"
              className={`w-full h-full px-5 py-4 rounded-lg border font-medium text-base text-gray-900 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                errors.email || getEmailError()
                  ? 'bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100' 
                  : isFocused.email 
                    ? 'bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
              style={{
                fontSize: '16px',
                lineHeight: '1.5em',
              }}
            />
          </div>
          {(errors.email || getEmailError()) && (
            <p className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               style={{
                 fontFamily: 'Raleway, sans-serif',
                 fontWeight: 'normal',
                 letterSpacing: '0.4px',
                 lineHeight: '16px',
               }}>
              {errors.email || getEmailError()}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            Kata sandi<span className="text-red-600 ml-0.5">*</span>
          </label>
          <div className="relative w-full h-14">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
              onBlur={() => {
                setIsFocused(prev => ({ ...prev, password: false }));
                setIsTouched(prev => ({ ...prev, password: true }));
              }}
              placeholder="Masukkan kata sandi"
              className={`w-full h-full px-5 py-4 pr-12 rounded-lg border font-medium text-base text-gray-900 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                errors.password || getPasswordError()
                  ? 'bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100' 
                  : isFocused.password 
                    ? 'bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
              style={{
                fontSize: '16px',
                lineHeight: '1.5em',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors duration-[400ms] ${
                errors.password || getPasswordError()
                  ? 'text-red-600' 
                  : isFocused.password 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
              }`}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {(errors.password || getPasswordError()) && (
            <p className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               style={{
                 fontFamily: 'Raleway, sans-serif',
                 fontWeight: 'normal',
                 letterSpacing: '0.4px',
                 lineHeight: '16px',
               }}>
              {errors.password || getPasswordError()}
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
            <div className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              formData.agreeTerms 
                ? 'bg-blue-600 border-blue-600' 
                : errors.agreeTerms
                  ? 'bg-white border-red-600'
                  : 'bg-white border-gray-400'
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
          <span className="text-sm text-gray-900 leading-[1.4em]">
            Dengan mendaftar, saya menyetujui{' '}
            <a href="#" className="font-bold text-blue-600 hover:underline">
              Kebijakan Privasi
            </a>{' '}
            serta{' '}
            <a href="#" className="font-bold text-blue-600 hover:underline">
              Syarat & Ketentuan
            </a>{' '}
            CloudsUp.
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-xs text-red-600 pl-8 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
             style={{
               fontFamily: 'Raleway, sans-serif',
               fontWeight: 'normal',
               letterSpacing: '0.4px',
               lineHeight: '16px',
             }}>
            {errors.agreeTerms}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full h-14 px-6 py-4 rounded-lg font-bold text-base leading-[1.5em] outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isFormValid && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer'
            : 'bg-gray-400 text-white cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.32s', animationDuration: '1.4s' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.16s', animationDuration: '1.4s' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDuration: '1.4s' }} />
          </div>
        ) : (
          'Daftar'
        )}
      </button>

      {/* Click outside handler for dropdown */}
      {schoolDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setSchoolDropdownOpen(false)}
        />
      )}
    </form>
  );
};

export default RegisterForm;

