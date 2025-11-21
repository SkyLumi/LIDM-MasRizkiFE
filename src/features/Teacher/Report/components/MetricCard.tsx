import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  progress: number;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, progress, color }) => {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-lg p-4 shadow-lg`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full" />
        </div>
        <div className="flex-1">
          <h4 className="font-raleway font-bold text-xs text-white">{title}</h4>
          <p className="font-raleway font-bold text-xs text-white opacity-80">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button className="flex-shrink-0">
          <span className="font-raleway font-bold text-[10px] text-white underline">
            Lihat detail
          </span>
        </button>
      </div>
    </div>
  );
};

export default MetricCard;

