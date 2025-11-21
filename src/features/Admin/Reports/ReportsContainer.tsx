import React from 'react';
import { Printer } from 'lucide-react';

const ReportsContainer: React.FC = () => {
  return (
    <div className="flex gap-6 m-[40px]">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 m-[40px]">
        {/* Header Section */}
        <ReportHeader />
        
        {/* Summary Cards */}
        <div className="flex gap-4">
          <SummaryCard 
            title="Total Games"
            subtitle="dimainkan"
            value="16"
            iconColor="bg-blue-500"
          />
          <SummaryCard 
            title="Total Menit"
            subtitle="dimainkan"
            value="120"
            iconColor="bg-green-500"
          />
        </div>

        {/* Progress Overview */}
        <ProgressOverviewSection />
        
        {/* Charts Section */}
        <ChartSection />
        
        {/* Body Usage Section */}
        <BodyUsageSection />
      </div>

      {/* Right Panel */}
      <div className="w-[312px] flex-shrink-0 flex flex-col gap-6">
        {/* Player Profile */}
        <PlayerProfileCard />
        
        {/* Tutorial Card */}
        <div className="bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] p-7">
          <TutorialCard />
        </div>
      </div>
    </div>
  );
};

// Header Component
const ReportHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-raleway font-bold text-xl text-[#084EC5]">
          Riwayat penggunaan game
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Printer className="w-5 h-5 text-gray-700" />
          <span className="font-raleway font-medium text-sm text-gray-700">Print</span>
        </button>
      </div>
      <div className="h-px bg-gray-200" />
    </div>
  );
};

// Summary Card Component
interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: string;
  iconColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, subtitle, value, iconColor }) => {
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
      <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {/* Icon would go here */}
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <p className="font-raleway font-bold text-sm text-[#084EC5]">{title}</p>
          <p className="font-raleway font-bold text-sm text-[#084EC5]">{subtitle}</p>
        </div>
        <p className="font-raleway font-bold text-2xl text-[#084EC5] mt-1">{value}</p>
      </div>
    </div>
  );
};

// Progress Overview Section
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

// Progress Bar Component
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

// Chart Section
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

// Body Usage Section
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

// Player Profile Card Component
const PlayerProfileCard: React.FC = () => {
  return (
    <div className="w-[312px] bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] p-7 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-[76px] h-[76px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
        <img 
          src="https://framerusercontent.com/images/QL4YPq8cbQKu96Z4VlaylTBWeM.png?width=213&height=214"
          alt="Player"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col gap-2 flex-grow min-w-0">
        <h3 className="font-raleway font-bold text-base leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
          Ananda Mikhail
        </h3>
        <button className="w-full h-fit p-2 bg-white rounded-lg border border-gray-800 flex items-center justify-center gap-2 cursor-pointer transition-transform duration-[450ms] hover:scale-105 active:scale-100">
          <span className="font-raleway font-bold text-xs leading-4 text-gray-800">Ganti Pemain</span>
        </button>
      </div>
    </div>
  );
};

// Tutorial Card Component
const TutorialCard: React.FC = () => {
  const steps = [
    {
      title: 'Fokus',
      value: '90.6 Points',
      progress: 90.6,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Koordinasi Tangan & Mata',
      value: '55.4 Points',
      progress: 55.4,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Rata-rata Waktu Reaksi',
      value: '1.7 Detik',
      progress: 70,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Keseimbangan',
      value: '50 Points',
      progress: 50,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Ketangkasan',
      value: '97.8 Points',
      progress: 97.8,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Memori',
      value: '100 Points',
      progress: 100,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <MetricCard key={index} {...step} />
      ))}
    </div>
  );
};

// Metric Card Component
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

export default ReportsContainer;

