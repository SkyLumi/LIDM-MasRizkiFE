import React from 'react';

const ChartSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-raleway font-bold text-xl text-[#B64C07]">
          Heat map layar
        </h3>
        <p className="font-raleway font-bold text-sm text-[#B64C07]">
          Minggu 32
        </p>
      </div>
      
      <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="font-raleway font-normal text-sm text-gray-500">
          Chart placeholder
        </p>
      </div>
      
      <button className="self-start">
        <span className="font-raleway font-bold text-xs italic underline text-[#E82D2F]">
          Lihat detail laporan
        </span>
      </button>
    </div>
  );
};

export default ChartSection;

