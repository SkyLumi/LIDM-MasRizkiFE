import React from 'react';
import ProgressBar from './ProgressBar';

const ProgressOverviewSection: React.FC = () => {
  const progressItems = [
    { label: 'Fokus', value: 0 },
    { label: 'Ketangkasan', value: 100 },
    { label: 'Koordinasi', value: 50 },
    { label: 'Keseimbangan', value: 100 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-raleway font-bold text-lg text-[#262626]">
          Laporan kemajuan secara keseluruhan
        </h2>
        <p className="font-raleway font-normal text-sm text-[#595959] leading-relaxed">
          Skor ini menggabungkan performa dari fokus, ketangkasan, koordinasi tangan-mata,
          waktu reaksi, keseimbangan, memori, dan keterampilan lainnya.
          Skor yang lebih tinggi menunjukkan penguasaan yang lebih baik.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {progressItems.map((item, index) => (
          <ProgressBar 
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressOverviewSection;

