import React from 'react';
import TutorialCard from './TutorialCard';

const RightPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-[312px] flex-shrink-0">
      {/* Tutorial Card */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-lg px-[24px] py-[32px] w-[312px] h-[650.2px]">
        <TutorialCard />
      </div>
    </div>
  );
};

export default RightPanel;

