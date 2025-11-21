import React, { useState } from 'react';
import GameCard from './components/GameCard';
import FilterDropdown from './components/FilterDropdown';
import TutorialCard from '../Teacher/Dashboard/components/TutorialCard';

const DashboardGamesContainer: React.FC = () => {
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
      id: 'tangkap-game',
      title: 'TANGKAP RASA',
      description: 'Penangkapan Es Krim Terhebat!',
      imageUrl: 'https://framerusercontent.com/images/MMaNnP62Y1mEGXox40R4JAyw.png?width=538&height=506',
      skills: ['Motorik', 'Kognitif'],
      learnMoreLink: '#'
    },
    {
      id: 'papan-game',
      title: 'PAPAN SEIMBANG',
      description: 'Persiapan, Mulai, Seimbangkan!',
      imageUrl: 'https://framerusercontent.com/images/FR7BN9QpiRVUPGBwQnTS1gd1rQo.png?width=538&height=506',
      skills: ['Motorik', 'Kognitif', 'Akademik'],
      learnMoreLink: '#'
    },
    {
      id: 'kartu-game',
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
    <div className="w-full min-h-screen bg-white font-raleway overflow-visible">
      {/* Main Container - Right Bar */}
      <div className="flex flex-col">
        {/* Header - Sticky */}
        {/* <div className="sticky top-0 z-50 flex justify-end items-center p-6 bg-gradient-to-r from-[#E82D2F] to-[#C21315]">
          <div className="flex items-center gap-4">
            <CameraButton />
            <ProfileDropdown />
          </div>
        </div> */}

        {/* Content */}
        <div className="flex gap-6 p-6">
          {/* Left Side - Games List */}
          <div className="flex-1">
            <div className="pt-10 pb-6 bg-white min-h-screen overflow-visible">
              {/* Header with Title and Filter */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-[40px] font-bold text-[#262626] leading-[48px] m-0">
                  Daftar Games
                </h1>
                
                <FilterDropdown
                  defaultItem="Semua Game"
                  menuItems={['Semua Game', 'Kognitif', 'Motorik', 'Akademik']}
                  onFilterChange={setActiveFilter}
                />
              </div>

              {/* Game Cards List */}
              <div className="flex flex-col gap-4 mt-0 items-stretch">
                {filteredGames.map(game => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    description={game.description}
                    imageUrl={game.imageUrl}
                    skills={game.skills}
                    learnMoreLink={game.learnMoreLink}
                  />
                ))}
                
                {filteredGames.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Tidak ada game dengan filter ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Player Profile and Tutorial */}
          <div className="w-[312px] flex-shrink-0 flex flex-col gap-6">            
            {/* Tutorial Card with Gradient Background */}
            <div className="bg-gradient-to-r from-[#E82D2F] to-[#C21315] rounded-2xl shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_0_rgba(255,255,255,0.1)] p-7">
              <TutorialCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGamesContainer;
