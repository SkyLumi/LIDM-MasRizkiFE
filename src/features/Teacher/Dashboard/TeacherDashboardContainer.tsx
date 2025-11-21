import React, { useState } from 'react';
import GameCard from '../../Games/components/GameCard';
import FilterDropdown from '../../Games/components/FilterDropdown';
import RightPanel from './components/RightPanel';

const TeacherDashboardContainer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Semua Game');

  // Game data
  const games = [
    {
      id: 'gelembung-game',
      title: 'GELEMBUNG AJAIB',
      description: 'Masuki dunia yang penuh gelembung!',
      imageUrl: 'https://framerusercontent.com/images/5I3P3XAnbMenWJjscRxX24z5M.png?width=538&height=506',
      skills: ['Motorik', 'Kognitif'],
      learnMoreLink: '#'
    },
    {
      id: 'tangkap-rasa',
      title: 'TANGKAP RASA',
      description: 'Penangkapan Es Krim Terhebat!',
      imageUrl: 'https://framerusercontent.com/images/MMaNnP62Y1mEGXox40R4JAyw.png?width=538&height=506',
      skills: ['Motorik', 'Kognitif'],
      learnMoreLink: '#'
    },
    {
      id: 'papan-seimbang',
      title: 'PAPAN SEIMBANG',
      description: 'Persiapan, Mulai, Seimbangkan!',
      imageUrl: 'https://framerusercontent.com/images/FR7BN9QpiRVUPGBwQnTS1gd1rQo.png?width=538&height=506',
      skills: ['Motorik', 'Kognitif', 'Akademik'],
      learnMoreLink: '#'
    },
    {
      id: 'kartu-cocok',
      title: 'KARTU COCOK',
      description: 'Waktunya memanfaatkan ingatanmu!',
      imageUrl: 'https://framerusercontent.com/images/SFEfgSYbe53srnzCJKt25zMYb8.png?width=538&height=506',
      skills: ['Kognitif', 'Akademik'],
      learnMoreLink: '#'
    }
  ];

  // Filter games berdasarkan skill yang dipilih
  const filteredGames = activeFilter === 'Semua Game' 
    ? games 
    : games.filter(game => game.skills.includes(activeFilter));

  return (
    <div className="w-full font-raleway py-[40px] ">
      {/* Right Bar - Two Column Layout */}
      <div className="flex gap-6 px-[40px]">
        {/* Left Column - Games List */}
        <div className="flex-1 min-w-0 p">
          {/* Header with Title and Filter */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[40px] font-bold text-gray-900 leading-[48px]">Daftar Games</h1>
            
            <FilterDropdown
              defaultItem="Semua Game"
              menuItems={['Semua Game', 'Kognitif', 'Motorik', 'Akademik']}
              onFilterChange={setActiveFilter}
            />
          </div>

          {/* Game Cards List */}
          <div className="flex flex-col gap-4">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                skills={game.skills}
              />
            ))}
            
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Tidak ada game dengan filter ini.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <RightPanel />
      </div>
    </div>
  );
};

export default TeacherDashboardContainer;

