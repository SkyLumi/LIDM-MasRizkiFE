import React from "react";

// Definisi Tipe Props (Biar nerima data dari luar)
interface AnalyticsStats {
  fokus: number;
  koordinasi: number;
  waktu_reaksi: number;
  keseimbangan: number;
  ketangkasan: number;
  memori: number;
}

interface PerformanceRadarChartProps {
  stats?: AnalyticsStats | null; // Data bisa null saat loading
}

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({ stats }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<any>(null);

  // 1. Persiapkan Data (Logic Konversi)
  const chartDataValues = React.useMemo(() => {
    if (!stats) return [0, 0, 0, 0, 0, 0, 0]; // Default 0 semua

    // a. Konversi Waktu Reaksi (ms) ke Skor (0-100)
    // 0ms = 100, 10000ms = 0
    const rawReaction = stats.waktu_reaksi || 0;
    let reactionScore = 0;
    
    if (rawReaction > 0) {
       reactionScore = Math.max(0, Math.min(100, ((10000 - rawReaction) / 10000) * 100));
    }

    // b. Ambil skill lain (udah 0-100)
    const { ketangkasan, fokus, koordinasi, keseimbangan, memori } = stats;

    // c. Hitung "Keseluruhan" (Rata-rata dari 6 skill)
    // Total 6 skill: Ketangkasan, Fokus, Koordinasi, Keseimbangan, Memori, Waktu Reaksi(Score)
    const totalScore = ketangkasan + fokus + koordinasi + keseimbangan + memori + reactionScore;
    const overallScore = Math.round(totalScore / 6);

    // d. Return Array sesuai urutan Label
    // Urutan: [Keseluruhan, Ketangkasan, Fokus, Koordinasi, Keseimbangan, Memori, Waktu Reaksi]
    return [
      overallScore, 
      Math.round(ketangkasan), 
      Math.round(fokus), 
      Math.round(koordinasi), 
      Math.round(keseimbangan), 
      Math.round(memori), 
      Math.round(reactionScore)
    ];
  }, [stats]);


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

        // Custom plugin untuk spider web effect
        const spiderWebPlugin = {
          id: 'spiderWeb',
          beforeDraw(chart: any) {
            const { ctx, scales: { r } } = chart;
            if (!r) return;

            const centerX = r.xCenter;
            const centerY = r.yCenter;
            const axes = chart.data.labels?.length || 7; // Update jadi 7 sumbu

            ctx.save();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 0.8;

            // Radial lines
            for (let i = 0; i < axes; i++) {
              const outer = (r as any).getPointPositionForValue(i, r.max);
              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(outer.x, outer.y);
              ctx.stroke();
            }

            // Polygon konsentris
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

        // Hancurkan chart lama jika ada biar gak numpuk
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: "radar",
          plugins: [spiderWebPlugin],
          data: {
            // Label Wajib Sama Urutannya dengan `chartDataValues`
            labels: [
              "Keseluruhan",
              "Ketangkasan",
              "Fokus",
              "Koordinasi",
              "Keseimbangan",
              "Memori",
              "Waktu Reaksi", // <-- Tambahan Baru
            ],
            datasets: [
              {
                label: "Performa",
                data: chartDataValues, // Gunakan Data Dinamis
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
                startAngle: -Math.PI / 2,
                ticks: { display: false },
                angleLines: { display: false },
                grid: { display: false },
                pointLabels: {
                  font: {
                    family: "'Raleway', sans-serif",
                    size: 11, // Sedikit diperkecil biar muat 7 label
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
  }, [chartDataValues]); // Re-render kalau data berubah

  return (
    <div className="bg-transparent p-3 ml-2 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-raleway font-bold text-lg text-[#084EC5]">
          Performa
        </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="w-full h-full relative"> 
          <canvas 
            ref={canvasRef} 
            style={{ 
              display: 'block',
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