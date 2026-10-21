import React, { useState } from 'react';

interface PngPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PngPreviewModal: React.FC<PngPreviewModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'clean-site' | 'presentation'>('clean-site');

  if (!isOpen) return null;

  const currentImage =
    selectedFormat === 'clean-site'
      ? 'assets/soul_soil_site_hd.png'
      : 'assets/soul_soil_presentation_hd.png';

  const downloadFilename =
    selectedFormat === 'clean-site'
      ? 'soul-and-soil-full-website.png'
      : 'soul-and-soil-presentation-mockup.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#1C2814] border-2 border-[#8EA654] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3B5232] bg-[#24331A]">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              PNG всего сайта целиком
            </h3>
            <p className="font-mono-custom text-xs text-[#CAD86B] mt-0.5">
              Точный рендер сайта в высоком разрешении (PNG)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={currentImage}
              download={downloadFilename}
              className="px-4 py-2 bg-[#FFA800] hover:bg-[#F09C00] text-white font-mono-custom font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>📥</span>
              <span>Скачать PNG</span>
            </a>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-2 text-xl font-bold cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-6 py-3 bg-[#172211] border-b border-[#3B5232] flex items-center gap-3 font-mono-custom text-xs">
          <button
            onClick={() => setSelectedFormat('clean-site')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedFormat === 'clean-site'
                ? 'bg-[#CAD86B] text-[#1C2814]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            1. Чистый сайт целиком (без фона)
          </button>
          <button
            onClick={() => setSelectedFormat('presentation')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedFormat === 'presentation'
                ? 'bg-[#CAD86B] text-[#1C2814]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            2. Презентация на фоне листьев (как на фото)
          </button>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0E160A] flex justify-center items-start">
          <div className="max-w-[480px] sm:max-w-[560px] bg-white shadow-2xl rounded-lg overflow-hidden border border-white/20">
            <img
              src={currentImage}
              alt="Soul & Soil Composting Full Website PNG"
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#24331A] border-t border-[#3B5232] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-custom text-white/80">
          <span>
            {selectedFormat === 'clean-site' ? 'Разрешение: 880 × 2320 px (HD)' : 'Разрешение: 1472 × 2616 px (HD)'}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={currentImage}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#CAD86B]"
            >
              Открыть в новой вкладке ↗
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
