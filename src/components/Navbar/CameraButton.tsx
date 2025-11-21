import React, { useState, useRef, useEffect } from 'react';

interface CameraDevice {
  deviceId: string;
  label: string;
}

const CameraButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPermissionGranted, setIsPermissionGranted] = useState(false); // Track if permission is granted
  const dropdownRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle dropdown open - request permission and fetch cameras
  useEffect(() => {
    const fetchCamerasAndStartVideo = async () => {
      if (!isOpen) return;

      try {
        setError('');

        // Step 1: Request permission by getting a temporary stream
        let tempStream: MediaStream | null = null;
        try {
          // Mencoba mendapatkan izin kamera
          tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
          
          // Izin berhasil (Hijau Solid)
          tempStream.getTracks().forEach(track => track.stop());
          setIsPermissionGranted(true); 
        } catch (err) {
          // Izin ditolak (Merah Berkedip)
          console.error('Permission denied:', err);
          setError('Izin kamera ditolak. Silakan berikan izin akses kamera.');
          setIsPermissionGranted(false);
          return;
        } 
        
        // Step 2: Now enumerate devices with proper labels
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter(device => device.kind === 'videoinput')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Kamera ${device.deviceId.substring(0, 8)}`
          }));
        
        if (videoDevices.length > 0) {
          setCameras(videoDevices);
          const initialCameraId = selectedCamera || videoDevices[0].deviceId;
          setSelectedCamera(initialCameraId);

          // Step 3: Start video stream with selected camera
          if (videoRef.current) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: initialCameraId } }
              });
              
              streamRef.current = stream;
              videoRef.current.srcObject = stream;
            } catch (err) {
              console.error('Error starting video stream:', err);
              setError('Gagal mengakses kamera yang dipilih.');
            }
          }
        } else {
          setError('Tidak ada kamera yang ditemukan.');
        }
      } catch (err) {
        console.error('Error fetching cameras:', err);
        setError('Gagal mengakses kamera.');
      }
    };

    if (isOpen) {
      fetchCamerasAndStartVideo();
    } else if (streamRef.current) {
      // Stop stream when dropdown closes
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  // Handle camera selection change
  useEffect(() => {
    const switchCamera = async () => {
      if (!isOpen || !selectedCamera || !videoRef.current) return;
      
      if (!streamRef.current && cameras.length === 0) return;

      try {
        // Stop previous stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        // Start new stream with selected camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCamera } }
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error switching camera:', err);
      }
    };

    if (cameras.length > 0) {
      switchCamera();
    }
  }, [selectedCamera]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Blink Animation Style */}
      <style>{`
        @keyframes blink {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.3; 
            transform: scale(0.8); 
          }
        }
      `}</style>

      <div style={{ position: 'relative', width: 'fit-content', zIndex: 50 }} ref={dropdownRef}>
        {/* Camera Button */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10000px',
            backgroundColor: 'rgb(237, 248, 255)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s, background-color 0.2s',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(212, 228, 238)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(237, 248, 255)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Camera Icon (kode ikon tidak diubah) */}
          <div style={{ width: '20px', height: '20px', color: 'rgb(0, 102, 255)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span 
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                backgroundColor: 'currentColor',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(https://framerusercontent.com/images/lHM9902BG7BQkLTwz1X8hC6OjHc.svg?width=24&height=24)',
                WebkitMaskImage: 'url(https://framerusercontent.com/images/lHM9902BG7BQkLTwz1X8hC6OjHc.svg?width=24&height=24)'
              }}
            />
          </div>

          {/* Notification Dot - Logika Warna dan Animasi */}
          <div 
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '2px solid #FFFFFF',
              // Warna: Hijau jika izin Diberikan, Merah jika Ditolak/Belum
              backgroundColor: isPermissionGranted ? 'rgb(9, 222, 27)' :'rgb(249, 58, 60)',
              position: 'absolute',
              top: '9px',
              right: '9px',
              // Animasi: Solid ('none') jika Hijau, Berkedip jika Merah
              animation: isPermissionGranted ? 'none' : 'blink 1.5s infinite ease-in-out',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: '0px',
              width: '240px',
              minWidth: '180px',
              backgroundColor: 'rgb(255, 255, 255)',
              border: '1px solid rgb(224, 224, 224)',
              borderRadius: '8px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 50
            }}
          >
            {/* Video Preview */}
            {selectedCamera && !error && (
              <div 
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  backgroundColor: 'rgb(0, 0, 0)',
                  borderRadius: '4px 4px 0px 0px',
                  overflow: 'hidden',
                  display: 'block'
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}

            <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* Header */}
              <div 
                style={{
                  padding: '8px 8px 4px 8px',
                  fontFamily: 'Raleway',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'rgb(69, 69, 69)',
                  borderBottom: '1px solid rgb(224, 224, 224)',
                  userSelect: 'none'
                }}
              >
                Kamera yang Tersedia
              </div>
              
              {/* Camera List */}
              {error ? (
                <div 
                  style={{
                    padding: '10px 12px',
                    fontFamily: 'Raleway',
                    fontSize: '14px',
                    color: 'rgb(136, 136, 136)',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </div>
              ) : (
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {cameras.map((camera) => (
                    <div
                      key={camera.deviceId}
                      onClick={() => {
                        setSelectedCamera(camera.deviceId);
                        setError('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '10px 12px',
                        fontFamily: 'Raleway',
                        fontWeight: selectedCamera === camera.deviceId ? 700 : 500,
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'rgb(38, 38, 38)',
                        backgroundColor: 'transparent',
                        transition: '0.2s',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(245, 245, 245)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {camera.label}
                      </span>
                      {selectedCamera === camera.deviceId && (
                        <div style={{ width: '16px', height: '16px', color: 'rgb(0, 102, 255)', flexShrink: 0 }}>
                          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CameraButton;