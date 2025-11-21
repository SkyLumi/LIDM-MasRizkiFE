import React from 'react';
// import { Gamepad2, Clock } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: string;
  iconColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, subtitle, value, iconColor, Icon }) => {
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
      <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <p className="font-raleway font-bold text-sm text-[#084EC5]">{title}</p>
          <p className="font-raleway font-bold text-sm text-[#084EC5]">{subtitle}</p>
        </div>
        <p className="font-raleway font-bold text-2xl text-[#084EC5] mt-1">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
