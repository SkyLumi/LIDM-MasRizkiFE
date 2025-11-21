import { useCallback, useEffect, useRef, useState } from "react";

type FaceRecognitionModalProps = {
  open: boolean;
  onClose: () => void;
  // Callback saat pengambilan gambar selesai, meneruskan data gambar.
  // Mengembalikan boolean (atau Promise) untuk menandai apakah pengenalan berhasil.
  onRecognitionComplete: (imageData: string) => void | boolean | Promise<void | boolean>; 
};

/**
 * Modal untuk mengambil gambar wajah menggunakan kamera depan.
 */
export default function FaceRecognitionModal({ open, onClose, onRecognitionComplete }: FaceRecognitionModalProps) {
  // === Refs dan State ===
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isInitializingRef = useRef(false);

  const resetInitializationState = useCallback(() => {
    setIsInitializing(false);
    isInitializingRef.current = false;
  }, []);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCheckingRecognition, setIsCheckingRecognition] = useState(false);
  const [faceGuideState, setFaceGuideState] = useState<"info" | "error">("info");

  // === Fungsi Kamera ===

  /**
   * Menghentikan semua track pada MediaStream aktif.
   */
  const stopCamera = useCallback(() => {
    const activeStream = streamRef.current;
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      // Pastikan semua event listener dibersihkan
      videoRef.current.onloadedmetadata = null;
      videoRef.current.oncanplay = null;
    }
  }, []);

  /**
   * Memulai akses kamera dan memuat stream ke elemen video.
   */
  const startCamera = useCallback(async () => {
    if (isInitializingRef.current) return;

    // Reset status
    stopCamera();
    setErrorMessage(null);
    setIsVideoReady(false);
    setIsInitializing(true);
    isInitializingRef.current = true;
    setFaceGuideState("info");

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Browser tidak mendukung akses kamera.");
      resetInitializationState();
      return;
    }

    try {
      // 1. Dapatkan MediaStream
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
            facingMode: "user", // Kamera depan
            width: { ideal: 640 }, 
            height: { ideal: 480 } 
        },
        audio: false,
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);

      if (videoRef.current) {
        const videoElement = videoRef.current;
        videoElement.muted = true;
        videoElement.playsInline = true; 
        
        // 2. Set srcObject SEBELUM event listener untuk memastikan data mulai dimuat
        videoElement.srcObject = mediaStream;

        // 3. Fungsi untuk menandai video siap dan mencoba play
        const handleVideoReady = async () => {
          // Bersihkan listener untuk mencegah pemanggilan ganda
          videoElement.onloadedmetadata = null;
          videoElement.oncanplay = null;
          
          // Pastikan video sudah memiliki dimensi sebelum mencoba play
          if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
              return;
          }

          try {
            await videoElement.play();
            setIsVideoReady(true);
            setErrorMessage(null);
          } catch (err) {
            console.error("Video Playback Error (Autoplay Blocked):", err);
            // Autoplay diblokir. Kita set init selesai (agar overlay hilang), 
            // tetapi isVideoReady tetap false. handleCapture akan mencoba play() lagi.
            setErrorMessage("Kamera siap, tetapi pemutaran otomatis diblokir. Klik 'Ambil Gambar' untuk memulai.");
            setIsVideoReady(false); 
          }
          // Set isInitializing menjadi false HANYA setelah mencoba play/gagal, 
          // agar overlay loading segera hilang.
          resetInitializationState();
        };

        // 4. Pasang event listener
        videoElement.onloadedmetadata = handleVideoReady;
        videoElement.oncanplay = handleVideoReady;
        
      }
    } catch (error) {
      console.error("Camera Access Error:", error);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
         setErrorMessage("Akses kamera ditolak. Mohon izinkan penggunaan kamera di pengaturan browser Anda.");
      } else {
         setErrorMessage("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.");
      }
      setIsVideoReady(false);
      resetInitializationState();
    }
  }, [resetInitializationState, stopCamera]);

  // === Effect Siklus Hidup ===
  useEffect(() => {
    if (open) {
      setCapturedImage(null); 
      setFaceGuideState("info");
      startCamera();
    } else {
      // Cleanup saat modal ditutup
      stopCamera();
      setCapturedImage(null);
      setIsVideoReady(false);
      setErrorMessage(null);
      setFaceGuideState("info");
      setIsCheckingRecognition(false);
      resetInitializationState();
    }

    return () => {
      stopCamera();
    };
  }, [open, resetInitializationState, startCamera, stopCamera]);

  // === Fungsi Aksi ===

  /**
   * Mengambil frame dari video stream dan menyimpannya.
   */
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      setErrorMessage("Stream kamera belum tersedia. Mohon coba lagi.");
      return;
    }
    
    // PENTING: Jika isVideoReady masih false (karena autoplay diblokir), coba play() dengan interaksi pengguna
    if (!isVideoReady) {
      videoRef.current.play().then(() => {
          setIsVideoReady(true);
          setErrorMessage(null);
          // Panggil handleCapture lagi setelah play berhasil
          setTimeout(handleCapture, 100); 
      }).catch((err) => {
          console.error("Manual video play() failed inside handleCapture.", err);
          setErrorMessage("Kamera belum siap. Playback gagal.");
      });
      return; 
    }

    // Lanjutkan proses pengambilan gambar jika sudah siap
    setIsCapturing(true);
    setFaceGuideState("info");
    
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (context) {
      context.save();
      // Balik secara horizontal untuk menghasilkan gambar yang tidak terbalik
      context.scale(-1, 1);
      context.drawImage(video, -width, 0, width, height);
      context.restore();

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setErrorMessage(null); 
    }
    
    setIsCapturing(false);
  };

  /**
   * Menyelesaikan proses pengenalan dan menutup modal.
   */
  const handleComplete = async () => {
    if (!capturedImage || isCheckingRecognition) return;

    setIsCheckingRecognition(true);
    try {
      const result = await onRecognitionComplete(capturedImage);
      const isSuccess = result !== false;

      if (!isSuccess) {
        setFaceGuideState("error");
        setCapturedImage(null);
        return;
      }

      // Cleanup ketika sukses
      stopCamera();
      setCapturedImage(null);
      setIsVideoReady(false);
      resetInitializationState();
      setFaceGuideState("info");
    } catch (err) {
      console.error("Face recognition validation failed:", err);
      setFaceGuideState("error");
    } finally {
      setIsCheckingRecognition(false);
    }
  };

  // Jika modal tidak terbuka, jangan render apa-apa
  if (!open) return null;

  const isRecognitionComplete = Boolean(capturedImage);
  // isVideoReady dihilangkan dari disable agar user bisa klik Ambil Gambar (untuk memicu play)
  const isCaptureDisabled = Boolean(errorMessage) || isCapturing || isInitializing || isCheckingRecognition; 
  const isSubmitDisabled = !isRecognitionComplete || isCheckingRecognition;
  const isGuideError = faceGuideState === "error";
  const guideBackground = isGuideError ? "bg-[#FFEDED]" : "bg-[#EDF8FF]";
  const guideBorder = isGuideError ? "border-[#E82D2F]" : "border-[#0066FF]";
  const guideTextColor = isGuideError ? "text-[#E82D2F]" : "text-[#0066FF]";
  const guideMessage = isGuideError
    ? "Wajah tidak terdeteksi. Silakan ambil gambar kembali."
    : "Posisikan wajah Anak menghadap ke DEPAN";

  // === Rendering JSX ===
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[120] opacity-100 transition-opacity duration-200 ease-in-out">
      <div className="relative w-[900px] max-w-[90%] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
        
        {/* Tombol Tutup */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100"
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2 text-left">
            <h3 className="font-['Raleway'] font-bold text-[24px] text-[#0066FF] leading-[31.92px] m-0">
              Tambahkan Face Recognition
            </h3>
            <p className="font-['Raleway'] font-medium text-[14px] text-[#262626] leading-[19.6px] m-0">
              Posisikan wajah Anak menghadap depan lalu ambil gambar terbaik.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            
            {/* Area Video Kamera */}
            <div className="flex-[2] h-[400px] bg-black rounded-lg relative overflow-hidden flex items-center justify-center">
              {/* Elemen Video (selalu dirender agar ref siap sebelum stream tersedia) */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                // [transform:scaleX(-1)] membalik video agar terlihat seperti cermin bagi pengguna
                className={`w-full h-full object-cover [transform:scaleX(-1)] ${!stream ? "opacity-0" : "opacity-100"}`} 
              />
              
              {/* Overlay Status Error / Perlu Izin */}
              {(errorMessage || !stream) && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center text-white px-6">
                  <p>{errorMessage ? errorMessage : (isInitializing ? "Meminta izin kamera..." : "Menunggu izin kamera...")}</p>
                  {(errorMessage || (!stream && !isInitializing)) && (
                      <button onClick={startCamera} className="mt-4 px-4 py-2 bg-[#0066FF] text-white rounded-lg font-bold transition-opacity duration-200 hover:opacity-90">Coba Lagi</button>
                  )}
                </div>
              )}
              
              {/* PENTING: Overlay Loading hanya ditampilkan saat INITIATING */}
              {isInitializing && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold">
                  Memuat Kamera...
                </div>
              )}

              {/* Overlay Panduan Wajah (Face Guide) */}
              <div className="absolute inset-0 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] w-[60%] h-[80%] m-auto rounded-full pointer-events-none border-2 border-dashed border-white/50"></div>
              
              {/* Preview Gambar yang Ditangkap */}
              {capturedImage && (
                <div className="absolute bottom-4 right-4 bg-white rounded-xl p-2 shadow-lg z-10">
                  <img src={capturedImage} alt="Hasil tangkapan" className="w-24 h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Area Kontrol & Panduan */}
            <div className="flex-1 flex flex-col gap-4 self-stretch">
              {/* Panduan Teks */}
              <div className={`font-['Raleway'] font-bold text-[16px] text-center px-4 py-4 rounded-lg min-h-[50px] flex items-center justify-center ${guideBackground} ${guideBorder} ${guideTextColor}`}>
                {guideMessage}
              </div>
              
              {/* Tombol Aksi */}
              <div className="flex flex-col gap-3 mt-2">
                
                {/* Tombol Ambil Gambar */}
                <button
                  type="button"
                  onClick={handleCapture}
                  disabled={isCaptureDisabled}
                  className={`flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white ${
                    isCaptureDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"
                  }`}
                >
                  {isCapturing ? "Mengambil..." : isVideoReady ? "Ambil Gambar" : (isInitializing ? "Memuat Kamera..." : "Ambil Gambar")}
                </button>
                
                {/* Tombol Simpan & Selesaikan */}
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={isSubmitDisabled}
                  className={`flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] bg-white text-[#262626] transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] ${
                    !isSubmitDisabled ? "cursor-pointer active:scale-95 opacity-100" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isCheckingRecognition ? "Memeriksa..." : "Simpan & Selesaikan"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Canvas tersembunyi untuk proses pengambilan gambar */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}