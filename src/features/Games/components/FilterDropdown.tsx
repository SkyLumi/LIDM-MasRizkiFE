import React, { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
  defaultItem: string;
  menuItems: string[];
  onFilterChange: (filter: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  defaultItem, 
  menuItems, 
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onFilterChange(item);
  };

  return (
    <div className="relative w-[180px] inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 h-12 px-5 bg-white border border-gray-800 rounded-lg cursor-pointer outline-none transition-all duration-200 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 flex-grow min-w-0">
          <span className="font-raleway font-bold text-sm leading-5 text-gray-800 whitespace-nowrap flex-grow text-left">
            {selectedItem}
          </span>
        </div>
        <div
          className="w-5 h-5 text-gray-800 flex-shrink-0 flex items-center justify-center transition-transform duration-300 ease-in-out"
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <span 
            className="w-full h-full block bg-current"
            style={{
              maskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)',
              WebkitMaskImage: 'url(https://framerusercontent.com/images/oXBbhAH1fFdryzX35dzXSEukrvg.svg?width=24&height=24)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`w-full px-5 py-3 text-left font-raleway font-bold text-sm transition-colors ${
                selectedItem === item
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
