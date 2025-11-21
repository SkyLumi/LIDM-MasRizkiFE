import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sidebarLogo from "../../assets/images/sidebar-logo.svg";
import logo from "../../assets/images/HorizontalLogo.svg";
import { loginGuru } from "../../services/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email: string) => {
    if (!email) return false;
    return /\S+@\S+\.\S+/.test(email);
  };

  // Validasi real-time untuk email
  const getEmailError = () => {
    if (!isTouched.email) return "";

    if (!formData.email.trim()) {
      return "Email harus diisi";
    }

    if (!validateEmail(formData.email)) {
      return "Format email tidak valid";
    }

    return "";
  };

  const getPasswordError = () => {
    if (!isTouched.password) return "";

    if (!formData.password) {
      return "Kata sandi harus diisi";
    }

    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Pastikan touched state aktif untuk validasi
    setIsTouched({ email: true, password: true });

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = {
            email: formData.email,
            kata_sandi: formData.password 
        };
        const result = await loginGuru(payload);
        if (result.user) {
          localStorage.setItem('user_data', JSON.stringify(result.user));
        }
        navigate("/teacher/dashboard");
      } catch (err) {
        setErrors({ password: "Email atau kata sandi salah" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid =
    formData.email && formData.password && validateEmail(formData.email);

  return (
    <div className="flex min-h-screen w-screen bg-white overflow-hidden">
      {/* Left Sidebar - Red Background with Cloud Character */}
      <div className="hidden lg:flex lg:w-[576px] lg:flex-shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[#E82D2F] to-[#C21315] shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] relative">
        <img
          src={sidebarLogo}
          alt="CloudsUp Logo"
          className="w-[357px] h-[357px] ani  mate-fadeIn"
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-[40px] min-w-0">
        <div className="w-full space-y-[30px]">
          {/* Logo */}
          <div className="flex items-center justify-start gap-1">
            <img src={logo} alt="CloudsUp" className="w-[287px]" />
          </div>

          {/* Title Section */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-[24px] font-bold text-[#262626] font-raleway">
                Masuk akun terlebih dahulu
              </h1>
              <p className="text-sm text-[#262626] leading-[18px]">
                Untuk memainkan game dan melihat perkembangan keterampilan anak
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-[#262626]">
                Belum memiliki akun?
              </p>
              <a
                href="/register"
                className="text-sm font-bold text-[#0066ff] hover:underline transition-all"
              >
                Daftar disini
              </a>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-0">
            {/* Email and Password - Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">
                  Email<span className="text-red-600 ml-0.5">*</span>
                </label>
                <div className="relative w-full h-[56px]">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, email: true }))
                    }
                    onBlur={() => {
                      setIsFocused((prev) => ({ ...prev, email: false }));
                      setIsTouched((prev) => ({ ...prev, email: true }));
                    }}
                    placeholder="Masukkan alamat email"
                    className={`w-full h-full px-5 py-4 rounded-lg border font-medium text-base text-gray-600 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      errors.email || getEmailError()
                        ? "bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100 "
                        : isFocused.email
                        ? "bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-600 "
                        : "bg-white border-gray-300 placeholder:text-gray-400"
                    }`}
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.5em",
                    }}
                  />
                </div>
                {(errors.email || getEmailError()) && (
                  <p
                    className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: "normal",
                      letterSpacing: "0.4px",
                      lineHeight: "16px",
                    }}
                  >
                    {errors.email || getEmailError()}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">
                  Kata sandi<span className="text-red-600 ml-0.5">*</span>
                </label>
                <div className="relative w-full h-[56px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, password: true }))
                    }
                    onBlur={() => {
                      setIsFocused((prev) => ({ ...prev, password: false }));
                      setIsTouched((prev) => ({ ...prev, password: true }));
                    }}
                    placeholder="Masukkan kata sandi"
                    className={`w-full h-full px-5 py-4 pr-12 rounded-lg border font-medium text-base text-gray-900 outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      errors.password || getPasswordError()
                        ? "bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100"
                        : isFocused.password
                        ? "bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400"
                        : "bg-white border-gray-300 placeholder:text-gray-400"
                    }`}
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.5em",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-[1px] top-1/2 -translate-y-1/2 transition-colors duration-[400ms] border-none bg-transparent outline-none focus:outline-none ${
                      errors.password || getPasswordError()
                        ? "text-red-600 border-none bg-transparent outline-none"
                        : isFocused.password
                        ? "text-blue-600 border-none bg-transparent outline-none"
                        : "text-gray-400 border-none bg-transparent outline-none"
                    }`}
                  >
                    {" "}
                    {showPassword ? (
                      <svg  className=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                      >
                        <path
                          fill="#BFBFBF"
                          d="M11.998 3.6c-3.03 0-5.456 1.38-7.222 3.023C3.02 8.25 1.847 10.2 1.292 11.539a1.193 1.193 0 0 0 0 .922c.555 1.34 1.729 3.29 3.484 4.917C6.542 19.02 8.968 20.4 11.998 20.4c3.03 0 5.457-1.38 7.223-3.022 1.755-1.632 2.928-3.578 3.487-4.917a1.193 1.193 0 0 0 0-.922c-.558-1.339-1.732-3.289-3.487-4.916C17.454 4.98 15.028 3.6 11.998 3.6Zm-5.4 8.4a5.4 5.4 0 1 1 10.8 0 5.4 5.4 0 0 1-10.8 0Zm5.4-2.4a2.402 2.402 0 0 1-3.161 2.276c-.206-.067-.446.06-.439.278a3.602 3.602 0 0 0 4.53 3.322 3.602 3.602 0 0 0-.776-7.076c-.217-.007-.345.229-.277.439.078.24.123.495.123.761Z"
                        />
                      </svg>
                    ) : (
                      // <EyeOff className="w-5 h-5 border-none" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                      >
                        <path
                          fill="#BFBFBF"
                          d="M1.455 2.591A.9.9 0 0 0 .345 4.01l22.2 17.4a.9.9 0 0 0 1.11-1.418l-3.945-3.09c1.485-1.522 2.49-3.228 2.996-4.44a1.193 1.193 0 0 0 0-.922c-.558-1.339-1.732-3.289-3.487-4.916C17.456 4.98 15.03 3.6 12 3.6c-2.557 0-4.687.986-6.349 2.28L1.455 2.591Zm6.911 5.415a5.401 5.401 0 0 1 8.381 6.57L15.3 13.444a3.599 3.599 0 0 0-3.143-5.04c-.217-.008-.344.229-.277.439a2.389 2.389 0 0 1-.124 1.822L8.37 8.01l-.004-.004Zm5.622 9.015a5.401 5.401 0 0 1-7.335-5.779L3.116 8.457C2.261 9.57 1.65 10.68 1.294 11.54a1.193 1.193 0 0 0 0 .922c.559 1.34 1.732 3.29 3.487 4.917 1.763 1.642 4.19 3.022 7.22 3.022 1.792 0 3.37-.484 4.732-1.219l-2.745-2.16Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {(errors.password || getPasswordError()) && (
                  <p
                    className="text-xs text-red-600 pl-1 opacity-100 max-h-[30px] mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: "normal",
                      letterSpacing: "0.4px",
                      lineHeight: "16px",
                    }}
                  >
                    {errors.password || getPasswordError()}
                  </p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200"
              >
                Lupa Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full h-[56px]  rounded-lg font-bold text-base leading-[1.5em] outline-none transition-all duration-500 ${
                isFormValid && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-1">
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{
                      animationDelay: "-0.32s",
                      animationDuration: "1.4s",
                    }}
                  />
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{
                      animationDelay: "-0.16s",
                      animationDuration: "1.4s",
                    }}
                  />
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDuration: "1.4s" }}
                  />
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
