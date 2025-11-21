import React from "react";
import { useSelectedPlayer } from "../contexts/SelectedPlayerContext";

const PerformanceRadarChart: React.FC = () => {
  const { currentPlayer } = useSelectedPlayer();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    let mounted = true;
    const ensureChartJs = async () => {
      if ((window as any).Chart) return (window as any).Chart;
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Gagal memuat Chart.js"));
        document.body.appendChild(script);
      });
      return (window as any).Chart;
    };

    const init = async () => {
      try {
        const Chart = await ensureChartJs();
        if (!mounted || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const data = [85, 70, 100, 75, 80, 65];

        // Custom plugin untuk spider web effect menggunakan koordinat skala radial
        const spiderWebPlugin = {
          id: 'spiderWeb',
          beforeDraw(chart: any) {
            const { ctx, scales: { r } } = chart;
            if (!r) return;

            const centerX = r.xCenter;
            const centerY = r.yCenter;
            const axes = chart.data.labels?.length || 6;

            ctx.save();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 0.8;

            // Radial lines (pusat ke titik lingkar luar)
            for (let i = 0; i < axes; i++) {
              const outer = (r as any).getPointPositionForValue(i, r.max);
              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(outer.x, outer.y);
              ctx.stroke();
            }

            // Polygon konsentris (3 level sama jarak)
            const levels = 3;
            const step = (r.max - r.min) / levels;
            for (let level = 1; level <= levels; level++) {
              const value = r.min + step * level;
              ctx.beginPath();
              for (let i = 0; i < axes; i++) {
                const p = (r as any).getPointPositionForValue(i, value);
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
              }
              ctx.closePath();
              ctx.stroke();
            }

            ctx.restore();
          }
        };

        chartRef.current = new Chart(ctx, {
          type: "radar",
          plugins: [spiderWebPlugin],
          data: {
            labels: [
              "Keseluruhan",
              "Ketangkasan",
              "Fokus",
              "Koordinasi",
              "Keseimbangan",
              "Memori",
            ],
            datasets: [
              {
                label: "Performa",
                data: data,
                backgroundColor: "rgba(8, 78, 197, 0.1)",
                borderColor: "rgb(8, 78, 197)",
                borderWidth: 1.5,
                pointBackgroundColor: "rgb(8, 78, 197)",
                pointBorderColor: "#EDF8FF",
                pointStyle: 'rectRot',
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 1.5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                min: 0,
                max: 100,
                startAngle: -Math.PI / 2, // label pertama di atas
                ticks: {
                  display: false,
                },
                angleLines: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                pointLabels: {
                  // centerPointLabels: true,
                  font: {
                    family: "'Raleway', sans-serif",
                    size: 14,
                    weight: "700",
                  },
                  color: "#084ec5",
                  padding: 5,
                },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function(context: any) {
                    return `Skor: ${context.raw}`;
                  }
                }
              }
            },
            elements: {
              line: { tension: 0 },
            },
            layout: {
              padding: { top: 0, bottom: 22, left: 12, right: 12 }
            }
          },
        });

        setTimeout(() => {
          if (chartRef.current) {
            chartRef.current.resize();
          }
        }, 100);

      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    };

    init();
    return () => {
      mounted = false;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [currentPlayer]);

  return (
    <div className="bg-transparent p-3 ml-2">
      <div className="flex justify-between items-start">
        <h2 className="font-raleway font-bold text-lg text-[#084EC5]">
          Performa
        </h2>
          </div>

      <div className="w-full flex items-center justify-center">
        <div className="w-full h-[270px]"> 
          <canvas 
            ref={canvasRef} 
            style={{ 
              display: 'block',
              boxSizing: 'border-box',
              width: '100%',
              height: '100%'
            }}
          />
          </div>
        </div>
    </div>
  );
};

export default PerformanceRadarChart;
