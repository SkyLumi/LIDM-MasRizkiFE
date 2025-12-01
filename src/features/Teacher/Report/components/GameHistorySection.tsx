import React, { useState, useMemo, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getGameHistory } from '../../../../services/api';

const GAME_ICONS: Record<string, string> = {
  'GELEMBUNG AJAIB': 'https://framerusercontent.com/images/5I3P3XAnbMenWJjscRxX24z5M.png?width=538&height=506',
  'PAPAN SEIMBANG': 'https://framerusercontent.com/images/FR7BN9QpiRVUPGBwQnTS1gd1rQo.png?width=538&height=506',
  'TANGKAP RASA': 'https://framerusercontent.com/images/MMaNnP62Y1mEGXox40R4JAyw.png?width=538&height=506',
  'KARTU COCOK': 'https://framerusercontent.com/images/SFEfgSYbe53srnzCJKt25zMYb8.png?width=538&height=506',
};

const GAME_COLORS: Record<string, string> = {
  'GELEMBUNG AJAIB': 'rgb(254, 57, 5)',
  'PAPAN SEIMBANG': 'rgb(254, 181, 26)',
  'TANGKAP RASA': 'rgb(0, 181, 16)',
  'KARTU COCOK': 'rgb(250, 58, 177)',
};

interface GameHistoryProps {
  studentId: number;
  selectedDate: Date; // 👇 Tambahan Props Tanggal
}

const GameHistorySection: React.FC<GameHistoryProps> = ({ studentId, selectedDate }) => {
  const [activeTab, setActiveTab] = useState<'games' | 'time'>('games');
  const [loading, setLoading] = useState(true);

  const [games, setGames] = useState<any[]>([]);
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [playTimeData, setPlayTimeData] = useState<any[]>([]);
  const [playTimeHeatmapData, setPlayTimeHeatmapData] = useState<number[][]>([]);
  const [weeks, setWeeks] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;
      try {
        setLoading(true);
        
        // 👇 Ambil bulan & tahun dari props
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();

        const result = await getGameHistory(studentId, month, year);

        if (result.status === 'sukses') {
          const stats = result.games_stats;
          
          // Map Games Count
          const processedGames = Object.keys(GAME_ICONS).map(name => ({
            name,
            value: stats[name]?.count || 0,
            icon: GAME_ICONS[name],
            color: GAME_COLORS[name]
          }));
          setGames(processedGames);

          // Map Play Time
          const processedTime = Object.keys(GAME_ICONS).map(name => ({
            name,
            value: stats[name]?.duration_minutes || 0,
            icon: GAME_ICONS[name],
            color: GAME_COLORS[name]
          }));
          setPlayTimeData(processedTime);

          // Map Heatmap (FORCE 4 MINGGU AJA)
          // Kita slice(0, 4) biar kalau backend ngasih 5, tetep tampil 4 dan rapi
          setHeatmapData(result.heatmap.games.slice(0, 4));
          setPlayTimeHeatmapData(result.heatmap.time.slice(0, 4));
          setWeeks(result.heatmap.weeks.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
        // Reset data kalo error/kosong
        setGames([]);
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, selectedDate]); // 👇 Trigger ulang saat tanggal berubah

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'];

  const getHeatmapColor = (value: number, maxValue: number = 15) => {
    const percentage = (value / maxValue) * 100;
    if (value === 0) return 'rgb(181, 228, 255)';
    if (percentage <= 20) return 'rgb(150, 200, 255)';
    if (percentage <= 50) return 'rgb(100, 170, 255)';
    if (percentage <= 80) return 'rgb(50, 140, 255)';
    return 'rgb(0, 100, 255)';
  };

  const gamesChartOptions = useMemo(() => ({
    chart: { type: 'column', height: 281, backgroundColor: 'transparent', spacing: [0, 0, 0, 0] },
    title: { text: null },
    credits: { enabled: false },
    xAxis: { categories: games.map(g => g.name), labels: { enabled: false }, lineWidth: 0, tickWidth: 0 },
    yAxis: {
      min: 0, max: 10, tickPositions: [0, 2, 4, 6, 8, 10], title: { text: null },
      labels: {
        style: { fontFamily: 'Raleway', fontWeight: '700', fontSize: '12px', color: 'rgb(30, 75, 169)' },
        formatter: function(this: Highcharts.AxisLabelsFormatterContextObject) {
           if (this.value === 0) return `<span style="color: rgb(51, 51, 51)">${this.value}</span>`;
           return String(this.value);
        },
      },
      gridLineColor: 'rgb(255, 255, 255)', gridLineWidth: 1, gridLineDashStyle: 'Solid', gridZIndex: 1,
    },
    plotOptions: {
      column: {
        borderRadiusTopLeft: 4, borderRadiusTopRight: 4, borderWidth: 1, borderColor: 'rgb(255, 255, 255)',
        dataLabels: { enabled: false }, states: { hover: { enabled: false } },
        shadow: { color: 'rgba(255, 255, 255, 0.16)', offsetX: 0, offsetY: 8, opacity: 1, width: 0 },
      },
    },
    series: [{
      name: 'Jumlah Game',
      data: games.map((game) => ({ y: game.value, color: game.color, borderWidth: 1, borderColor: 'rgb(255, 255, 255)' })),
      pointPadding: 0.1, groupPadding: 0.1,
    }],
    tooltip: { enabled: false }, legend: { enabled: false },
  }), [games]);

  const playTimeChartOptions = useMemo(() => ({
    chart: { type: 'column', height: 281, backgroundColor: 'transparent', spacing: [0, 0, 0, 0] },
    title: { text: null },
    credits: { enabled: false },
    xAxis: { categories: playTimeData.map(g => g.name), labels: { enabled: false }, lineWidth: 0, tickWidth: 0 },
    yAxis: {
      min: 0, max: 50, tickPositions: [0, 10, 20, 30, 40, 50], title: { text: null },
      labels: {
        style: { fontFamily: 'Raleway', fontWeight: '700', fontSize: '12px', color: 'rgb(30, 75, 169)' },
        formatter: function(this: Highcharts.AxisLabelsFormatterContextObject) {
           if (this.value === 0) return `<span style="color: rgb(51, 51, 51)">${this.value}</span>`;
           return String(this.value);
        },
      },
      gridLineColor: 'rgb(255, 255, 255)', gridLineWidth: 1, gridLineDashStyle: 'Solid', gridZIndex: 1,
    },
    plotOptions: {
      column: {
        borderRadiusTopLeft: 4, borderRadiusTopRight: 4, borderWidth: 1, borderColor: 'rgb(255, 255, 255)',
        dataLabels: { enabled: false }, states: { hover: { enabled: false } },
        shadow: { color: 'rgba(255, 255, 255, 0.16)', offsetX: 0, offsetY: 8, opacity: 1, width: 0 },
      },
    },
    series: [{
      name: 'Waktu Bermain',
      data: playTimeData.map((game) => ({ y: game.value, color: game.color, borderWidth: 1, borderColor: 'rgb(255, 255, 255)' })),
      pointPadding: 0.1, groupPadding: 0.1,
    }],
    tooltip: { enabled: false }, legend: { enabled: false },
  }), [playTimeData]);

  if (loading) return <div className="text-center mt-10 font-raleway text-[#084EC5]">Memuat data...</div>;

  return (
    <div className="bg-[#EDF8FF] rounded-lg p-6 mt-[48px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-['Raleway'] font-bold text-[20px] leading-[21.2px] text-[#084EC5] mb-4 text-center">
          Riwayat penggunaan game
        </h2>
        
        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#084EC5]">
          <button
            onClick={() => setActiveTab("games")}
            className={`px-4 py-2 rounded-none font-['Raleway']  font-bold text-[14px] transition-colors  bg-transparent ${
              activeTab === "games"
                ? "text-[#084EC5] border-b-2 border-b-[#084EC5]"
                : "text-[#084EC5] opacity-70 hover:opacity-100"
            }`}
            style={{ borderBottomWidth: activeTab === "games" ? "2px" : "0" }}
          >
            Jumlah Game Dimainkan
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={`px-4 py-2 rounded-none font-['Raleway'] font-bold text-[14px] transition-colors bg-transparent ${
              activeTab === "time"
                ? "text-[#084EC5]  border-b-2 border-b-[#084EC5] "
                : "text-[#084EC5] opacity-70 hover:opacity-100 "
            }`}
            style={{ borderBottomWidth: activeTab === "time" ? "2px" : "0" }}
          >
            Waktu Bermain
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'games' && (
        <>
          {/* Bar Chart */}
          <div className="mb-8 relative">
            <HighchartsReact highcharts={Highcharts} options={gamesChartOptions} />
            
            <div className="flex justify-between mt-4 px-4">
                {games.map((game, index) => (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div className="relative w-9 h-9 rounded border border-white overflow-hidden">
                      <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                  </div>
                      <div className="text-center">
                    {game.name.split(' ').map((word:any, i:any) => (
                      <p key={i} className="font-['Raleway'] font-bold text-[10px] leading-[13px] text-[#1B1A1A] uppercase">
                        {word}
                      </p>
                    ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Heatmap Section */}
          <div className="mt-8">
            <h3 className="font-['Raleway'] font-bold text-[14px] leading-[14px] text-[#084EC5] mb-4 text-center">
              Jumlah game dimainkan dalam heat map
            </h3>

            {/* Heatmap Chart */}
            <div className="flex gap-2">
              {/* Y-axis: Minggu (Vertical) */}
              <div className="flex flex-col justify-between py-2 pr-2 min-w-[80px]">
                {weeks.map((week, index) => (
                  <p key={index} className="font-['Raleway'] text-[9.6px] text-[#333333] text-right h-[calc(100%/4)] flex items-center">
                    {week}
                  </p>
                ))}
              </div>

              {/* Heatmap Grid Container */}
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-7 gap-0">
                  {heatmapData.map((weekData, weekIndex) => (
                    weekData.map((value, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="border-[15px]  border-[#D6EFFF] flex items-center justify-center py-[4px]"
                        style={{ backgroundColor: getHeatmapColor(value, 15) }}
                      >
                        <p className="font-['Raleway'] font-bold text-[#262626] text-center text-xs">
                          {value.toString().padStart(2, '0')}
                        </p>
                      </div>
                    ))
                  ))}
                </div>
                
                {/* X-axis: Hari (Horizontal) */}
                <div className="grid grid-cols-7 gap-0 mt-2">
                  {days.map((day, index) => (
                    <p key={index} className="font-['Raleway'] text-[10px] text-[#333333] text-center">{day}</p>
                  ))}
                </div>
              </div>

              {/* Y-axis: Nilai (0, 5, 10, 15) - Vertical */}
              <div className="flex flex-col justify-between py-2 pl-2 min-w-[30px]">
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/4)] flex items-start">15</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/4)] flex items-center">10</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/4)] flex items-center">5</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/4)] flex items-end">0</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'time' && (
        <>
          {/* Bar Chart - Waktu Bermain */}
          <div className="mb-8 relative">
            <HighchartsReact highcharts={Highcharts} options={playTimeChartOptions} />
            
            <div className="flex justify-between mt-4 px-4">
              {playTimeData.map((game, index) => (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div className="relative w-9 h-9 rounded border border-white overflow-hidden">
                    <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    {game.name.split(' ').map((word:any, i:any) => (
                      <p key={i} className="font-['Raleway'] font-bold text-[10px] leading-[13px] text-[#1B1A1A] uppercase">
                        {word}
                      </p>
                    ))}
                  </div>
                  <p className="font-['Raleway'] font-bold text-[10px] text-[#1E4BA9] mt-1">
                    {game.value} menit
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Section - Waktu Bermain */}
          <div className="mt-8">
            <h3 className="font-['Raleway'] font-bold text-[14px] leading-[14px] text-[#084EC5] mb-4 text-center">
              Waktu bermain dalam heat map (menit)
            </h3>

            <div className="flex gap-2">
              <div className="flex flex-col justify-between py-2 pr-2 min-w-[80px]">
                {weeks.map((week, index) => (
                  <p key={index} className="font-['Raleway'] text-[9.6px] text-[#333333] text-right h-[calc(100%/4)] flex items-center">
                    {week}
                  </p>
                ))}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-7 gap-0">
                  {playTimeHeatmapData.map((weekData, weekIndex) => (
                    weekData.map((value, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="border-[15px]  border-[#D6EFFF] flex items-center justify-center py-[4px]"
                        style={{ backgroundColor: getHeatmapColor(value, 50) }}
                      >
                        <p className="font-['Raleway'] font-bold text-[#262626] text-center text-xs">
                          {value}
                        </p>
                      </div>
                    ))
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-0 mt-2">
                  {days.map((day, index) => (
                    <p key={index} className="font-['Raleway'] text-[10px] text-[#333333] text-center">{day}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between py-2 pl-2 min-w-[30px]">
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-start">50</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-center">40</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-center">30</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-center">20</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-center">10</p>
                <p className="font-['Raleway'] text-[9.6px] text-[#333333] h-[calc(100%/6)] flex items-end">0</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameHistorySection;