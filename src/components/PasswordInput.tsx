import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  isInvalid?: boolean;
  helpText?: string;
  minLength?: number;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = "Enter your password",
  label = "Password",
  required = true,
  isInvalid = false,
  helpText = "Password harus diisi",
  minLength = 6,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isEmpty = isTouched && value === "";
  const isTooShort = isTouched && value !== "" && value.length < minLength;
  const showHelpText = isInvalid || isEmpty || isTooShort;
  
  const currentHelpText = isTooShort 
    ? `Password minimal ${minLength} karakter`
    : helpText;

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
    if (onBlur) onBlur();
  };

  const baseInputStyle = "w-full h-full px-5 py-4 pr-12 rounded-lg border transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] font-medium text-base text-gray-900 outline-none";

  const getInputClassName = () => {
    if (showHelpText) {
      return `${baseInputStyle} bg-red-50 border-red-600 border-2 placeholder:text-red-600 placeholder:opacity-100`;
    } else if (isFocused) {
      return `${baseInputStyle} bg-blue-50 border-blue-600 border-2 shadow-[inset_0_0_0_1px_#0066FF] placeholder:text-gray-400`;
    } else {
      return `${baseInputStyle} bg-white border-gray-300 placeholder:text-gray-400`;
    }
  };

  const helpTextStyle: React.CSSProperties = {
    opacity: showHelpText ? 1 : 0,
    maxHeight: showHelpText ? "30px" : "0px",
    marginTop: showHelpText ? "8px" : "0px",
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#E82D2F',
    letterSpacing: '0.4px',
    lineHeight: '16px',
    paddingLeft: '4px',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-bold text-gray-900">
          {label}{required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative w-full h-14">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={getInputClassName()}
          style={{
            fontSize: '16px',
            lineHeight: '1.5em',
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors duration-[400ms] ${
            showHelpText 
              ? 'text-red-600' 
              : isFocused 
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
      <p style={helpTextStyle}>
        {currentHelpText}
      </p>
    </div>
  );
};

export default PasswordInput;

