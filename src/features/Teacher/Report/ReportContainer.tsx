import React, { useState, useEffect } from "react";
// 👇 Pastikan getFullReport support params (id, month, year)
import { getFullReport } from "../../../services/api"; 
import {
  ReportHeader,
  OverallProgressCard,
  PerformanceRadarChart,
  SkillCard,
  GameHistorySection,
  OverallProgressReportCard,
  FocusDetailCard,
  CoordinationDetailCard,
  ReactionTimeDetailCard,
  BalanceDetailCard,
  AgilityDetailCard,
  MemoryDetailCard,
} from "./components";
import { SelectedPlayerProvider, useSelectedPlayer } from "./contexts/SelectedPlayerContext";

// Interface Data (Sesuai update terakhir)
export interface AnalyticsStats {
  scores: {
    fokus: number;
    keseimbangan: number;
    ketangkasan: number;
    koordinasi: number;
    memori: number;
    waktu_reaksi: number;
  };
  heatmap: number[][];
  hand_usage: { left: number; right: number };
  
  period_average: number;
  game_scores: Record<string, number>;
  game_skills?: Record<string, any>; // Data detail per skill per game
  meta: {
    total_games: number;
    total_minutes: number;
  };
};

export interface FullReportData {
  overall: AnalyticsStats;
  week1: AnalyticsStats;
  week2: AnalyticsStats;
  week3: AnalyticsStats;
  week4: AnalyticsStats;
}

const ReportContent: React.FC = () => {
  const { currentPlayer, loading: loadingPlayer, players } = useSelectedPlayer();
  const [reportData, setReportData] = useState<FullReportData | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // --- STATE TANGGAL (FILTER) ---
  // Default: new Date() -> Hari ini
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPlayer?.id) return;

      try {
        setLoadingReport(true);
        
        // Ambil Bulan & Tahun dari state selectedDate
        const month = selectedDate.getMonth() + 1; // JS Month mulai dari 0
        const year = selectedDate.getFullYear();

        // Panggil API dengan filter
        // Pastikan backend & api service support params ini
        const result = await getFullReport(currentPlayer.id, month, year); 
        
        if (result.status === 'sukses') {
          setReportData(result.data);
        } else {
           // Handle jika data kosong/error
           setReportData(null);
        }
      } catch (error) {
        console.error("Gagal load report:", error);
      } finally {
        setLoadingReport(false);
      }
    };

    fetchData();
  }, [currentPlayer, selectedDate]); // Re-fetch saat player ganti ATAU tanggal ganti

  // Tampilan Loading / Belum Pilih
  if (loadingPlayer || loadingReport) {
    return <div className="p-10 text-center font-raleway text-gray-500">Memuat data...</div>;
  }

  // Jika tidak ada murid
  if (players.length === 0) {
     // Kita butuh Header dummy biar tetep bisa lihat UI (opsional)
     // Tapi karena Header butuh props, kita skip dulu atau render basic
     return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <div className="mt-10 font-raleway text-red-500">Belum ada data murid di kelas ini.</div>
        </div>
    );
  }

  if (!currentPlayer || !reportData) {
    // Tampilkan Header meskipun data kosong, biar bisa ganti tanggal/pemain
    return (
        <div className="flex gap-6">
             <div className="flex-1 flex flex-col m-[40px]">
                <div className="flex mb-5">
                    <ReportHeader 
                        selectedDate={selectedDate} 
                        onDateChange={setSelectedDate} 
                    />
                </div>
                <div className="p-10 text-center font-raleway text-gray-500">
                    Data tidak tersedia untuk periode ini.
                </div>
             </div>
        </div>
    );
  }

  // Ambil data Overall buat kartu-kartu kecil
  const overallStats = reportData.overall.scores;
  
  return (
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col m-[40px]">
          {/* Header: Pass State & Handler */}
          <div className="flex mb-5">
            <ReportHeader 
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] ">
            <div className=" w-full h-full p-[18px] bg-[#edf8ff] rounded-xl">
              <OverallProgressCard data={reportData?.overall}/>
            </div>
            <div className=" max-h-[329px] w-full h-full bg-[#edf8ff] rounded-xl">
              <PerformanceRadarChart stats={overallStats} />
            </div>
          </div>

          {/* Skill Cards Grid */}
          <SkillCard stats={overallStats} />

          {/* Game History Section (Pass month/year filter juga jika perlu) */}
          <GameHistorySection studentId={currentPlayer.id} />

          {/* Overall Progress Report Card */}
          <OverallProgressReportCard data={reportData}/>

          {/* Detail Cards */}
          <FocusDetailCard data={reportData}  />
          <CoordinationDetailCard data={reportData}/>
          <ReactionTimeDetailCard data={reportData}/>
          <BalanceDetailCard data={reportData}/>
          <AgilityDetailCard breakdownData={reportData as any}/>
          <MemoryDetailCard data={reportData}/>
        </div>
      </div>
  );
};

const ReportContainer: React.FC = () => {
  return (
    <SelectedPlayerProvider>
      <ReportContent />
    </SelectedPlayerProvider>
  );
};

export default ReportContainer;