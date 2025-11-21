import React, { useState } from 'react';

// Fungsi validasi email
const validateEmail = (email: string) => {
    if (!email) return false;
    return /\S+@\S+\.\S+/.test(email);
};

interface EmailInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    isInvalid?: boolean;
    helpText?: string;
    invalidFormatText?: string;
    className?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
    value,
    onChange,
    onBlur,
    placeholder = "Enter your email",
    isInvalid = false,
    helpText = "Email harus diisi",
    invalidFormatText = "Format email tidak valid",
    className = "",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    // Logika validasi
    const isEmpty = isTouched && value === "";
    const isFormatInvalid = value !== "" && !validateEmail(value);
    const showHelpText = isInvalid || isEmpty || isFormatInvalid;
    const currentHelpText = isFormatInvalid ? invalidFormatText : helpText;

    // Handle blur
    const handleBlur = () => {
        setIsFocused(false);
        setIsTouched(true);
        if (onBlur) onBlur();
    };

    // Style dengan Tailwind CSS
    const baseInputStyle = "w-full h-14 px-5 py-4 rounded-lg border transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] font-medium text-base text-gray-900 outline-none font-raleway";

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
        <div className={`flex flex-col w-full ${className}`}>
            <div className="relative w-full h-14">
                <input
                    type="email"
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
            </div>
            <p style={helpTextStyle}>
                {currentHelpText}
            </p>
        </div>
    );
};

export default EmailInput;

