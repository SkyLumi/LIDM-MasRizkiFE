import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  skills: string[];
  learnMoreLink?: string;
}

const GameCard: React.FC<GameCardProps> = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  skills
}) => {
  const navigate = useNavigate();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleStartPlaying = () => {
    // Redirect to game URL
    navigate(`/teacher/games/${id}`);
  };

  // const handleViewDetails = () => {
  //   navigate(`/teacher/games/${id}`);
  // };

  // Map skill names to icons
  const getSkillIcon = (skill: string) => {
    const iconSvg = skill.toLowerCase() === 'motorik' 
      ? 'https://framerusercontent.com/images/eZUCQxtUVGPuYAMGexj8Avr3GM8.svg?width=24&height=24'
      : skill.toLowerCase() === 'kognitif'
      ? 'https://framerusercontent.com/images/nKe0S2wW4RMJ4JWuBS8OUyL84k.svg?width=24&height=24'
      : 'https://framerusercontent.com/images/CRn0Is2cjByqrLkhckAJgtExxY.svg?width=24&height=24';

    return (
      <div className="opacity-100">
        <div 
          className="relative inline-flex items-center justify-center"
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <div className="w-12 h-12 bg-white rounded-full border-0 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110">
            <div className="w-6 h-6 text-[#E82D2F] flex items-center justify-center">
              <span 
                className="w-full h-full block bg-current"
                style={{
                  maskImage: `url("${iconSvg}")`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center center',
                  WebkitMaskImage: `url("${iconSvg}")`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center center',
                }}
              />
            </div>
          </div>
          
          {/* Tooltip */}
          {hoveredSkill === skill && (
            <div 
              className="absolute bottom-full left-1/2 flex flex-col items-center mb-2 opacity-100 pointer-events-none z-[9]" 
              style={{ transform: 'translateX(-50%) translateY(4px)' }}
            >
              <div className="bg-[#454545] text-white font-raleway font-medium text-sm leading-4 px-3 py-1.5 rounded-md whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                {skill}
              </div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#454545]" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-[20px] shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_0_rgba(255,255,255,0.1)] w-full opacity-100 flex">
      {/* Image Game */}
      <div className="rounded-tl-[20px] rounded-bl-[20px] opacity-100 w-[32%] relative">
        <div className="absolute rounded-inherit top-0 right-0 bottom-0 left-0">
          <img 
            alt={title}
            className="block w-full h-full rounded-inherit object-center object-cover rounded-tl-[20px] rounded-bl-[20px]" 
            src={imageUrl}
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="bg-[#EDF8FF] rounded-tr-[20px] rounded-br-[20px] opacity-100 flex-1 flex flex-col">
        {/* Text Container */}
        <div className="opacity-100 p-6 pb-4">
          <div className="justify-center opacity-100 mb-2">
            <p className="font-raleway font-bold text-xl leading-6 text-[#262626] uppercase m-0">
              {title}
            </p>
          </div>
          <div className="justify-center opacity-100">
            <p className="font-raleway font-medium text-base leading-5 text-[#262626] m-0">
              {description}
            </p>
          </div>
        </div>

        {/* Holistic Skills Container */}
        <div className="opacity-100 px-6 pb-4 flex gap-2">
          {skills.map((skill, index) => (
            <React.Fragment key={index}>
              {getSkillIcon(skill)}
            </React.Fragment>
          ))}
        </div>

        {/* Button Container */}
        <div className="opacity-100 px-6 pb-6 flex gap-3">
          {/* <div className="opacity-100 flex-1">
            <button
              onClick={handleViewDetails}
              className="w-full h-[46px] bg-white border border-gray-300 rounded-lg shadow-sm opacity-100 cursor-pointer transition-all duration-200 hover:bg-gray-50"
            >
              <div className="justify-center items-center opacity-100 ">
                <p className="font-raleway font-bold text-sm leading-[14px] text-center text-[#0066FF] capitalize m-0">
                  Lihat Detail
                </p>
              </div>
            </button>
          </div> */}
          <div className="opacity-100 flex-1">
            <button
              onClick={handleStartPlaying}
              className="w-full h-[46px] bg-[#0066FF] border border-[#0066FF] rounded-lg shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_0_rgba(255,255,255,0.1)] opacity-100 cursor-pointer transition-all duration-200 hover:bg-[#0052CC]"
            >
              <div className="justify-center items-center opacity-100 ">
                <p className="font-raleway font-bold text-sm leading-[14px] text-center text-white capitalize m-0">
                  Mulai Bermain
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
