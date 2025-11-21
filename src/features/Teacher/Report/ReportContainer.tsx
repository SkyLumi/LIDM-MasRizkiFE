import React from "react";
import { getWeeklyAnalytics } from "../../../services/api";
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
import { SelectedPlayerProvider } from "./contexts/SelectedPlayerContext";

export interface WeeklyAnalytics {
  fokus: number;
  keseimbangan: number;
  ketangkasan: number;
  koordinasi: number;
  memori: number;
  waktu_reaksi: number;
};

const currentStudentId = 4;

const ReportContainer: React.FC = () => {

const [weekly, setWeekly] = React.useState<WeeklyAnalytics | null>(null);

  React.useEffect(() => {
    (async () => {
      const data = await getWeeklyAnalytics(currentStudentId);
      setWeekly(data.data);
    })();
  }, []);

  if (!weekly) return <p>Loading...</p>;
  

  return (
    <SelectedPlayerProvider>
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col m-[40px]">
          {/* Header with Player Info & Date Range */}
          <div className="flex mb-5">
            <ReportHeader />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] ">
            <div className="max-w-[527px] max-h-[329px] w-full h-full p-[18px] bg-[#edf8ff] rounded-xl">
              <OverallProgressCard />
            </div>
            <div className="max-w-[527px] max-h-[329px] w-full h-full bg-[#edf8ff] rounded-xl">
              <PerformanceRadarChart />
            </div>
          </div>

          {/* Skill Cards Grid - 3x2 */}
          
          <SkillCard studentId={currentStudentId} />

          {/* Game History Section */}
          <GameHistorySection studentId={currentStudentId} />

          {/* Overall Progress Report Card */}
          <OverallProgressReportCard />

          {/* Focus Detail Card */}
          <FocusDetailCard fokusPoint={weekly.fokus}  />

          {/* Coordination Detail Card */}
          <CoordinationDetailCard coordinatePoint={weekly.koordinasi}/>

          {/* Reaction Time Detail Card */}
          <ReactionTimeDetailCard ReactionTimePoint={weekly.waktu_reaksi}/>

          {/* Balance Detail Card */}
          <BalanceDetailCard />

          {/* Agility Detail Card */}
          <AgilityDetailCard />

          {/* Memory Detail Card */}
          <MemoryDetailCard />
        </div>
      </div>
    </SelectedPlayerProvider>
  );
};

export default ReportContainer;
