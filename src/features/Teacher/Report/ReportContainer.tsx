import { useState, useEffect }from "react";
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
// import { Gamepad2, Clock } from 'lucide-react';
import { SelectedPlayerProvider, useSelectedPlayer } from "./contexts/SelectedPlayerContext";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPlayer?.id) return;

      try {
        setLoadingReport(true);
        // Panggil API Super
        const result = await getFullReport(currentPlayer.id);
        
        if (result.status === 'sukses') {
          setReportData(result.data);
        }
      } catch (error) {
        console.error("Gagal load report:", error);
      } finally {
        setLoadingReport(false);
      }
    };

    fetchData();
  }, [currentPlayer]);

  // Tampilan Loading / Belum Pilih
  if (loadingPlayer || loadingReport) {
    return <div className="p-10 text-center font-raleway text-gray-500">Memuat data...</div>;
  }

  // 2. Sudah selesai loading, tapi emang GAK ADA murid di database?
  if (players.length === 0) {
     return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <ReportHeader />
            <div className="mt-10 font-raleway text-red-500">Belum ada data murid di kelas ini.</div>
        </div>
    );
  }

  if (!currentPlayer || !reportData) {
    return <div className="p-10 text-center font-raleway text-gray-500">Menyiapkan data...</div>;
  }

  // Ambil data Overall buat kartu-kartu kecil (default)
  const overallStats = reportData.overall.scores;
  

  return (
    // <SelectedPlayerProvider>
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col m-[40px]">
          {/* Header with Player Info & Date Range */}
          <div className="flex mb-5">
            <ReportHeader />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] ">
            <div className=" w-full h-ful  l p-[18px] bg-[#edf8ff] rounded-xl">
              <OverallProgressCard data={reportData?.overall}/>
            </div>
            <div className=" max-h-[329px] w-full h-full bg-[#edf8ff] rounded-xl">
              <PerformanceRadarChart stats={overallStats} />
            </div>
          </div>

          {/* Skill Cards Grid - 3x2 */}
          
          <SkillCard stats={overallStats} />

          {/* Game History Section */}
          <GameHistorySection studentId={currentPlayer.id} />

          {/* Overall Progress Report Card */}
          <OverallProgressReportCard data={reportData}/>

          {/* Focus Detail Card */}
          <FocusDetailCard data={reportData}  />

          {/* Coordination Detail Card */}
          <CoordinationDetailCard data={reportData}/>

          {/* Reaction Time Detail Card */}
          <ReactionTimeDetailCard data={reportData}/>

          {/* Balance Detail Card */}
          <BalanceDetailCard data={reportData}/>

          {/* Agility Detail Card */}
          <AgilityDetailCard breakdownData={reportData as any}/>

          {/* Memory Detail Card */}
          <MemoryDetailCard data={reportData}/>
        </div>
      </div>
    // </SelectedPlayerProvider>
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
