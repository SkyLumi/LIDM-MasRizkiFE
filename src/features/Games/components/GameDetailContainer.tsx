import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerProfileCard from "../../Teacher/Dashboard/components/PlayerProfileCard";

const GameDetailContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mock game data - in production, this would come from an API
  const gameData = [
    {
      id: "gelembung-game",
      title: "GELEMBUNG AJAIB",
      subtitle: "Masuki dunia yang penuh gelembung!",
      description: [
        "Masuk ke dunia mandi penuh gelembung dan bersiaplah untuk keseruan tanpa batas! 💦",
        "Tugasmu sederhana: pecahkan sebanyak mungkin gelembung sebelum waktu habis. Tapi awas—gelembung merah siap menggagalkan misi dengan sekali sentuh!",
        "",
        "Kumpulkan skor tertinggi, asah refleksmu, dan jadikan rutinitas harian makin seru. Pegang tongkat gelembungmu, dan mulai ledakkan semua gelembung ajaib sekarang! ✨🫧",
      ],
      imageUrl: "https://framerusercontent.com/images/nkLn9PjYYr2IJIaepmAH6duDgAk.png?width=1280&height=720",
      thumbnailUrl: "https://framerusercontent.com/images/nkLn9PjYYr2IJIaepmAH6duDgAk.png?width=1280&height=720",
      motoricSkills: [
        "Gerakan Anggota Tubuh Atas",
        "Kekuatan Inti",
        "Pengendalian Postur",
        "Koordinasi Bilateral",
        "Waktu Reaksi",
        "Kecepatan dan Kelincahan",
        "Kesadaran Ruang",
      ],
      cognitiveSkills: [
        "Perhatian dan Konsentrasi",
        "Pengambilan Keputusan",
        "Pengenalan Pola",
        "Pemahaman Sebab dan Akibat",
        "Urutan dan Urutkan",
      ],
    },
    {
      id: "tangkap-rasa",
      title: "TANGKAP RASA",
      subtitle: "Penangkapan Es Krim Terhebat!",
      description: [
        "Siap jadi penjaga es krim terhebat di dunia? Pakai apronmu dan tangkap semua rasa yang jatuh dari langit! Gerakkan ember ke kiri dan kanan untuk mengumpulkan scoop sebanyak-banyaknya sebelum terlambat.",
        "",
        "Tapi awas… bola merah pengacau siap menghancurkan mimpimu dalam satu sentuhan! Jaga fokus, kumpulkan rasa favoritmu, dan buktikan bahwa kamu adalah master penangkap es krim sejati! 🍨✨",
      ],
      imageUrl: "https://framerusercontent.com/images/P11HlN0vTfNfAygqJjbRmascyzk.png?width=1280&height=720",
      thumbnailUrl: "https://framerusercontent.com/images/fjUBpDoEsbLzSFsz4hqNO06vv54.png?width=301&height=214",
      motoricSkills: [
        "Gerakan Anggota Tubuh Atas",
        "Kekuatan Inti",
        "Pengendalian Postur",
        "Koordinasi Bilateral",
        "Waktu Reaksi",
        "Kecepatan dan Kelincahan",
        "Kesadaran Ruang",
      ],
      cognitiveSkills: [
        "Perhatian dan Konsentrasi",
        "Pengambilan Keputusan",
        "Pengenalan Pola",
        "Pemahaman Sebab dan Akibat",
        "Urutan dan Urutkan",
      ],
    },
    {
      id: "papan-seimbang",
      title: "PAPAN SEIMBANG",
      subtitle: "Persiapan, Mulai, Seimbangkan!",
      description: [
        "Seberapa kuat keseimbanganmu? Tantang fokus dan koordinasi tubuhmu untuk menjaga papan tetap stabil saat berbagai objek datang menyerang dari segala arah.",
        "",
        "Ambil posisi plank, tahan ritme tubuhmu, dan lihat seberapa lama kamu bisa bertahan tanpa jatuh! Tetap stabil, tetap fokus — dan buktikan kalau kamu adalah si penguasa keseimbangan sesungguhnya! 💪✨",
      ],
      imageUrl: "https://framerusercontent.com/images/7QgIgtFN8FcGccgGX6FW5zXAPn4.png?width=1280&height=720",
      thumbnailUrl: "https://framerusercontent.com/images/7QgIgtFN8FcGccgGX6FW5zXAPn4.png?width=1280&height=720",
      motoricSkills: [
        "Keseimbangan",
        "Gerakan Anggota Tubuh Atas",
        "Gerakan Anggota Tubuh Bawah",
        "Kesadaran Tubuh",
        "Kekuatan Inti",
        "Koordinasi Bilateral",
        "Kesadaran Ruang",
        "Pengendalian Postur",
      ],
      cognitiveSkills: [
        "Perhatian dan Konsentrasi",
        "Antisipasi dan Prediksi",
      ],
      academicSkills: ["Penyelesaian Tugas"],
    },
    {
      id: "kartu-cocok",
      title: "KARTU COCOK",
      subtitle: "Waktunya memanfaatkan ingatanmu!",
      description: [
        "Siapkan ingatan terbaikmu! Balik setiap kartu satu per satu untuk mencari pasangan yang cocok dan kumpulkan skor setinggi mungkin. Fokus, ingat letaknya, dan buat strategi untuk menang dengan percobaan seminimal mungkin.",
        "",
        "Semakin banyak pasangan yang kamu temukan, semakin cepat kamu naik ke level yang lebih sulit dan menantang! Bisakah otakmu tetap tajam sampai akhir? Saatnya membuktikan kemampuan memorimu! ✨🃏",
      ],
      imageUrl: "https://framerusercontent.com/images/F0jhuyjdhQi5eCxjjtw4q4xPrZo.png?width=1280&height=720",
      thumbnailUrl: "https://framerusercontent.com/images/vFgBHm42OqN7F85YyjEh4Lx5Wm8.png?width=301&height=214",
      motoricSkills: [],
      cognitiveSkills: [
        "Perhatian dan Konsentrasi",
        "Memori",
        "Pengenalan Pola",
        "Urutan dan Susunan",
        "Penalaran Logis",
      ],
      academicSkills: [
        "Pengelompokan",
        "Pencocokan dan Asosiasi",
        "Penyelesaian Tugas",
      ],
    },
  ];

  // Use useMemo to recalculate currentGame when id changes
  const currentGame = useMemo(() => {
    const found = gameData.find((g) => g.id === id);
    console.log('URL ID:', id);
    console.log('Current Game:', found ? found.title : 'Not found');
    console.log('Available IDs:', gameData.map(g => g.id));
    return found || gameData[0];
  }, [id]);

  const handleBack = () => {
    navigate("/teacher/dashboard");
  };

  const handlePlay = () => {
    const gameUrlMap: { [key: string]: string } = {
      "gelembung-game": "https://cloudsup.bayangan.xyz/gelembung-game",
      "tangkap-rasa": "https://cloudsup.bayangan.xyz/tangkap-game",
      "papan-seimbang": "https://cloudsup.bayangan.xyz/papan-game",
      "kartu-cocok": "https://cloudsup.bayangan.xyz/kartu-game",
    };
    const playUrl = gameUrlMap[currentGame.id] || gameUrlMap["gelembung-game"];
    window.open(playUrl, "_blank");
  };

  return (
    <div className="px-[40px] pt-[40px]">
      {/* Top Section - Image, Profile Card, Thumbnail */}
      <div className="flex justify-between ">
        {/* Game Image */}
        <div className="flex-shrink-0">
          <div
            className="aspect-[16/9] w-full max-w-[824px]"
            style={{ aspectRatio: "1.7777777777777777" }}
          >
            <img
              src={currentGame.imageUrl}
              alt={currentGame.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Profile Card and Thumbnail */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div>
            <PlayerProfileCard />
          </div>

          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-[301px] h-[214px] rounded-lg overflow-hidden">
              <img
                src={currentGame.thumbnailUrl}
                alt={currentGame.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Content */}
      <div className="flex justify-between p-4">
        {/* Kolom Kiri: Back Button, Title, Play Button, & Description */}
        {/* Konten ini sebelumnya memiliki w-[440px] */}
        <div className="flex-shrink-0 w-[395px]">
          {/* Back Button and Title Section */}
          <div className="mb-8">
            {" "}
            {/* Hapus w-[440px] karena sudah diatur di parent */}
            <div className="flex flex-col items-start gap-6 mb-6">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 font-raleway font-bold text-sm leading-[14px] text-[#0066FF]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3444_1611)">
                    <g clip-path="url(#clip1_3444_1611)">
                      <g clip-path="url(#clip2_3444_1611)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM9.0993 9.86661C8.99279 9.96551 8.99279 10.1341 9.09931 10.233L11.8101 12.7502C12.1137 13.0321 12.1313 13.5066 11.8494 13.8101C11.5675 14.1137 11.093 14.1313 10.7895 13.8494L8.07863 11.3322C7.33301 10.6398 7.33301 9.45977 8.07863 8.76742L10.7895 6.25021C11.093 5.96836 11.5675 5.98593 11.8494 6.28947C12.1313 6.593 12.1137 7.06755 11.8101 7.3494L9.0993 9.86661Z"
                          fill="#0066FF"
                        />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_3444_1611">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_3444_1611">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                    <clipPath id="clip2_3444_1611">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Kembali</span>
              </button>

              {/* Title and Subtitle */}
              <div>
                <h1 className="font-raleway font-bold text-[32px] leading-[40px] text-[#262626] uppercase mb-2">
                  {currentGame.title}
                </h1>
                <p className="font-raleway font-medium text-xl leading-6 text-[#262626] capitalize">
                  {currentGame.subtitle}
                </p>
              </div>
            </div>
            {/* Play Button */}
            <div className="mb-6">
              <button
                onClick={handlePlay}
                className="w-[148px] h-auto bg-[#0066FF] border border-[#0066FF] rounded-lg shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_0_rgba(255,255,255,0.1)] py-[16px] px-[40px] font-raleway font-bold text-sm leading-[14px] text-white capitalize"
              >
                Play
              </button>
            </div>
            {/* Description */}
            <div className="mb-8">
              {currentGame.description.map((paragraph, index) => (
                paragraph ? (
                  <p
                    key={index}
                    className="font-raleway font-semibold text-base leading-6 text-[#262626] mb-2"
                  >
                    {paragraph}
                  </p>
                ) : (
                  <p key={index} className="mb-2">&nbsp;</p>
                )
              ))}
            </div>
          </div>
        </div>{" "}
        {/* Akhir Kolom Kiri */}
        {/* Kolom Kanan: Skills Section */}
        {/* Konten ini sebelumnya memiliki w-[467px] */}
        <div className="max-w-[592px] flex-shrink-0">
          <div className="bg-[#edf8ff] rounded-lg p-8 flex flex-col h-full">
            {" "}
            {/* Tambahkan h-full agar background-nya mengikuti tinggi kolom terpanjang */}
            <h2 className="font-raleway font-bold text-[20px] text-[#0D469B] mb-8">
              Keterampilan holistik yang akan dikembangkan oleh Game {currentGame.title} :
            </h2>
            <div className={`grid gap-6 ${currentGame.academicSkills && currentGame.academicSkills.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {/* Motorik Skills */}
              {currentGame.motoricSkills && currentGame.motoricSkills.length > 0 && (
              <div>
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="w-[82px] h-[82px] flex-shrink-0">
                    <svg
                      width="82"
                      height="82"
                      viewBox="0 0 82 82"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="82" height="82" rx="41" fill="white" />
                      <path
                        d="M47.3112 29.6003L47.2324 29.0425C47.0356 27.6578 45.9462 26.5684 44.5615 26.3715L44.0037 26.2928C43.4328 26.214 43.0324 25.6759 43.1112 25.105C43.1899 24.534 43.7215 24.1272 44.299 24.2125L44.8568 24.2912C47.1668 24.6194 48.9846 26.4372 49.3128 28.7472L49.3915 29.305C49.4703 29.8759 49.0765 30.414 48.499 30.4928C47.9215 30.5715 47.3899 30.1778 47.3112 29.6003ZM36.3649 28.8325C35.5446 28.0122 35.5446 26.68 36.3649 25.8597C37.1853 25.0394 38.5174 25.0394 39.3378 25.8597L51.9378 38.4597C52.1543 38.6762 52.5546 38.5319 52.5546 38.2169V33.1178C52.5546 31.6675 53.7293 30.4928 55.1796 30.4928C56.6299 30.4928 57.8046 31.6675 57.8046 33.1178V44.694C57.8046 48.6447 55.9737 52.3656 52.8499 54.7806C49.5096 57.3597 45.2637 58.0422 41.4574 56.9265C39.5937 56.4606 37.8284 55.4959 36.3649 54.0325L36.0434 53.7109L29.0149 46.6825L26.9149 44.5825C26.0946 43.7622 26.0946 42.43 26.9149 41.6097C27.7353 40.7894 29.0674 40.7894 29.8878 41.6097L31.9812 43.7031L31.9878 43.7097L35.0459 46.7744C35.3871 47.1156 35.9384 47.1156 36.2731 46.7744C36.6078 46.4331 36.6143 45.8819 36.2731 45.5472L27.9649 37.2325C27.1446 36.4122 27.1446 35.08 27.9649 34.2597C28.7853 33.4394 30.1174 33.4394 30.9378 34.2597L39.2459 42.5744C39.5871 42.9156 40.1384 42.9156 40.4731 42.5744C40.8078 42.2331 40.8143 41.6819 40.4731 41.3472L31.1149 31.9825C30.2946 31.1622 30.2946 29.83 31.1149 29.0097C31.9353 28.1894 33.2674 28.1894 34.0878 29.0097L43.4459 38.3744C43.7871 38.7156 44.3384 38.7156 44.6731 38.3744C45.0078 38.0331 45.0143 37.4819 44.6731 37.1472L36.3649 28.8325ZM25.0971 47.3125C25.6681 47.2272 26.2062 47.6275 26.2849 48.205L26.3637 48.7628C26.5606 50.1475 27.6499 51.2369 29.0346 51.4337L29.5924 51.5125C30.1634 51.5912 30.5637 52.1294 30.4849 52.7003C30.4062 53.2712 29.8681 53.6715 29.2971 53.5928L28.7393 53.514C26.4293 53.1859 24.6115 51.3681 24.2834 49.0581L24.2112 48.5003C24.1324 47.9294 24.5262 47.3912 25.1037 47.3125H25.0971Z"
                        fill="#E82D2F"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                      Keterampilan
                    </h3>
                    <p className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                      Motorik
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {currentGame.motoricSkills.map((skill, index) => (
                    <p
                      key={index}
                      className="font-raleway text-base font-light leading-6 text-[#262626]"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
              )}

              {/* Kognitif Skills */}
              {currentGame.cognitiveSkills && currentGame.cognitiveSkills.length > 0 && (
              <div>
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="w-[82px] h-[82px] flex-shrink-0">
                    <svg
                      width="82"
                      height="82"
                      viewBox="0 0 82 82"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="82" height="82" rx="41" fill="white" />
                      <path
                        d="M24.2002 38.9143C24.2002 30.803 30.7758 24.2012 38.9002 24.2012H40.4752C46.7227 24.2012 52.3664 28.749 53.423 34.7143C53.5739 35.5674 53.8693 36.4009 54.4139 37.0768L57.1702 40.5287C57.5771 41.0405 57.8002 41.6705 57.8002 42.3268C57.8002 43.9149 56.5139 45.2012 54.9258 45.2012H53.6002V49.4012C53.6002 51.7177 51.7168 53.6012 49.4002 53.6012H45.2002V55.7012C45.2002 56.8627 44.2618 57.8012 43.1002 57.8012H30.5002C29.3386 57.8012 28.4002 56.8627 28.4002 55.7012V50.9302C28.4002 49.8343 27.9474 48.7974 27.278 47.9246C25.2896 45.3587 24.2002 42.189 24.2002 38.9143ZM42.923 37.8512H46.2502C47.9893 37.8512 49.4002 36.4402 49.4002 34.7012C49.4002 32.9621 47.9893 31.5512 46.2502 31.5512C46.1911 31.5512 46.1321 31.5512 46.073 31.5577C45.6399 30.3305 44.4718 29.4512 43.1002 29.4512C42.5358 29.4512 42.0108 29.5955 41.558 29.858C40.9936 28.9787 40.0158 28.4012 38.9002 28.4012C37.7846 28.4012 36.8068 28.9787 36.2424 29.858C35.783 29.6021 35.258 29.4512 34.7002 29.4512C32.9611 29.4512 31.5502 30.8621 31.5502 32.6012C29.8111 32.6012 28.4002 34.0121 28.4002 35.7512C28.4002 37.1227 29.2796 38.2909 30.5068 38.724C30.5068 38.783 30.5002 38.8421 30.5002 38.9012C30.5002 40.6402 31.9111 42.0512 33.6502 42.0512C34.0177 42.0512 34.3721 41.9855 34.7002 41.874V43.1012C34.7002 44.2627 35.6386 45.2012 36.8002 45.2012C37.9618 45.2012 38.9002 44.2627 38.9002 43.1012V41.874C39.2283 41.9921 39.5827 42.0512 39.9502 42.0512C41.6893 42.0512 43.1002 40.6402 43.1002 38.9012C43.1002 38.5337 43.0346 38.1793 42.923 37.8512ZM34.7002 35.7512V35.9284H34.6936C34.6936 35.8693 34.7002 35.8102 34.7002 35.7512Z"
                        fill="#E82D2F"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                      Keterampilan
                    </h3>
                    <p className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                      Kognitif
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {currentGame.cognitiveSkills.map((skill, index) => (
                    <p
                      key={index}
                      className="font-raleway text-base font-light leading-6 text-[#262626]"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
              )}

              {/* Academic Skills (if available) */}
              {currentGame.academicSkills && currentGame.academicSkills.length > 0 && (
                <div>
                  <div className="flex flex-col items-start gap-3 mb-4">
                    <div className="w-[82px] h-[82px] flex-shrink-0">
                      <svg
                        width="82"
                        height="82"
                        viewBox="0 0 82 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="82" height="82" rx="41" fill="white" />
                        <path
                          d="M41 24C30.5066 24 22 32.5066 22 43C22 53.4934 30.5066 62 41 62C51.4934 62 60 53.4934 60 43C60 32.5066 51.4934 24 41 24ZM41 56C33.268 56 27 49.732 27 42C27 34.268 33.268 28 41 28C48.732 28 55 34.268 55 42C55 49.732 48.732 56 41 56Z"
                          fill="#E82D2F"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                        Keterampilan
                      </h3>
                      <p className="font-raleway font-bold text-base leading-[19.2px] text-[#262626]">
                        Akademik
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {currentGame.academicSkills.map((skill, index) => (
                      <p
                        key={index}
                        className="font-raleway text-base font-light leading-6 text-[#262626]"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>{" "}
        {/* Akhir Kolom Kanan */}
      </div>
    </div>
  );
};

export default GameDetailContainer;
