import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 flex-shrink-0">
        <p className="font-raleway font-semibold text-sm text-[#262626]">{label}</p>
      </div>
      <div className="flex-1 relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute top-0 left-0 h-full bg-[#084EC5] rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="w-12 flex-shrink-0 text-right">
        <p className="font-raleway font-semibold text-xs text-[#262626]">
          {value}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;

