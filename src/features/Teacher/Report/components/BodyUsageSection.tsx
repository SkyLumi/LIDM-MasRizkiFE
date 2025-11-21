import React from 'react';

const BodyUsageSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
      <h2 className="font-raleway font-bold text-lg text-[#262626]">
        Penggunaan bagian tubuh
      </h2>
      <div className="flex items-center gap-4">
        <p className="font-raleway font-bold text-4xl text-[#262626]">43.4%</p>
        <div className="flex-1 h-8 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-[#084EC5] rounded-full"
            style={{ width: '43.4%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BodyUsageSection;

