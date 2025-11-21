import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

// --- FUNGSI VALIDASI ---
const validateEmail = (email: string) => {
    if (typeof email !== 'string' || !email) return false;
    return /\S+@\S+\.\S+/.test(email);
};

const validateNotEmpty = (value: string) => {
    if (typeof value !== 'string') return false;
    return value.trim() !== '';
};

// --- IKON ---
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

// --- KOMPONEN INPUT EMAIL ---
function EmailInput({ 
    value, 
    onChange, 
    isInvalid, 
    placeholder 
}: { 
    value: string; 
    onChange: (value: string) => void; 
    isInvalid: boolean;
    placeholder: string;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const isEmailFormatValid = value === '' || validateEmail(value);
    const isFormatInvalid = value !== '' && !isEmailFormatValid;

    const baseClass = 'w-full h-14 px-5 rounded-lg border transition-all duration-300 outline-none font-normal text-base text-gray-900';
    const dynamicClass = isInvalid || isFormatInvalid
        ? 'bg-red-50 border-red-500 placeholder-red-500' 
        : isFocused 
        ? 'bg-blue-50 border-blue-500' 
        : 'bg-white border-gray-300 focus:border-blue-500 focus:bg-blue-50';

    return (
        <div className="w-full flex flex-col gap-2">
            <label className="font-bold text-sm text-gray-900">
                Email <span className="text-red-500 ml-1">*</span>
            </label>
            <input
                type="email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={`${baseClass} ${dynamicClass}`}
            />
            {(isInvalid || isFormatInvalid) && (
                <p className="text-xs text-red-500 mt-1 opacity-100 max-h-8">
                    {isFormatInvalid ? 'Format email tidak valid' : 'Email harus diisi'}
                </p>
            )}
        </div>
    );
}

// --- KOMPONEN INPUT PASSWORD ---
function PasswordInput({ 
    value, 
    onChange, 
    isInvalid,
    placeholder 
}: { 
    value: string; 
    onChange: (value: string) => void; 
    isInvalid: boolean;
    placeholder: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const baseClass = 'w-full h-14 px-5 pr-12 rounded-lg border transition-all duration-300 outline-none font-normal text-base text-gray-900';
    const dynamicClass = isInvalid
        ? 'bg-red-50 border-red-500 placeholder-red-500' 
        : isFocused 
        ? 'bg-blue-50 border-blue-500' 
        : 'bg-white border-gray-300 focus:border-blue-500 focus:bg-blue-50';

    return (
        <div className="w-full flex flex-col gap-2">
            <label className="font-bold text-sm text-gray-900">
                Password <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
                <input
                    type={isVisible ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`${baseClass} ${dynamicClass}`}
                />
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                        isInvalid
                            ? 'text-red-500'
                            : isFocused
                            ? 'text-blue-500'
                            : 'text-gray-500'
                    }`}
                >
                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            {isInvalid && (
                <p className="text-xs text-red-500 mt-1 opacity-100 max-h-8">
                    Kata sandi harus diisi
                </p>
            )}
        </div>
    );
}

// --- KOMPONEN LINK BUTTON ---
function LinkButton({ text, onClick }: { text: string; onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-right text-sm font-bold transition-colors text-blue-600 hover:text-blue-700"
            style={{ textDecoration: isHovered ? 'underline' : 'none' }}
        >
            {text}
        </button>
    );
}

// --- KOMPONEN BUTTON ---
function Button({ 
    text, 
    onClick, 
    isDisabled, 
    isLoading 
}: { 
    text: string; 
    onClick: () => void; 
    isDisabled: boolean; 
    isLoading: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled || isLoading}
            className="w-full h-14 px-6 rounded-lg border-none font-bold text-base transition-all duration-300 
                disabled:cursor-not-allowed disabled:opacity-50 
                bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] 
                focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            ) : (
                text
            )}
        </button>
    );
}

// --- KOMPONEN UTAMA ---
const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    // --- STATE ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- VALIDASI ---
    const isEmailFormatValid = validateEmail(email);
    const isPasswordValid = validateNotEmpty(password);
    const isButtonDisabled = !(isEmailFormatValid && isPasswordValid);
    
    // Tampilkan invalid HANYA setelah submit
    const isEmailInvalid = isSubmitted && (email === '' || !isEmailFormatValid);
    const isPasswordInvalid = isSubmitted && !isPasswordValid;

    // --- HANDLERS ---
    const handleSubmit = async () => {
        setIsSubmitted(true);
        setError('');

        if (isEmailFormatValid && isPasswordValid) {
            setIsLoading(true);
            try {
                await login(email, password);
                navigate('/teacher/dashboard');
            } catch (err) {
                setError('Login gagal. Silakan cek kredensial Anda.');
                console.error('Login error:', err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleForgotPassword = () => {
        // TODO: Implement forgot password
        console.log('Forgot password clicked');
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Email & Password dalam satu baris horizontal di desktop, vertikal di mobile */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 min-w-0">
                    <EmailInput
                        value={email}
                        onChange={setEmail}
                        isInvalid={isEmailInvalid}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                        isInvalid={isPasswordInvalid}
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            {/* Link Lupa Password */}
            <div className="flex justify-end">
                <LinkButton text="Lupa Password?" onClick={handleForgotPassword} />
            </div>

            {/* Tombol Submit */}
            <Button
                text="Masuk"
                onClick={handleSubmit}
                isDisabled={isButtonDisabled}
                isLoading={isLoading}
            />
        </div>
    );
};

export default LoginForm;
