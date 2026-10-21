import React, { useState } from 'react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubscriptions: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onOpenSubscriptions }) => {
  const [householdSize, setHouseholdSize] = useState('2-3 people');
  const [cookingFrequency, setCookingFrequency] = useState('Daily cooking');
  const [hasGarden, setHasGarden] = useState('Yes, lawn or potted herbs');

  if (!isOpen) return null;

  const estimatedPounds = householdSize === '1 person' ? 240 : householdSize === '2-3 people' ? 520 : 880;
  const methaneDiverted = Math.round(estimatedPounds * 0.45);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFDF9] border-2 border-[#506D44] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#506D44] hover:text-[#263514] p-1 cursor-pointer font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="font-mono-custom text-[11px] font-bold text-[#8EA654] uppercase tracking-widest block">
            Bahamas Waste Impact
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#506D44] uppercase tracking-tight mt-1">
            Calculate Your Soil Footprint
          </h3>
          <p className="font-mono-custom text-xs text-[#6B6358] mt-1.5">
            See how much kitchen waste you can rescue from landfills each year.
          </p>
        </div>

        <div className="space-y-4 font-mono-custom text-xs">
          <div>
            <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
              Household Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['1 person', '2-3 people', '4+ people'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHouseholdSize(opt)}
                  className={`py-2 px-1 text-center rounded-xl border text-[11px] cursor-pointer transition-colors ${
                    householdSize === opt
                      ? 'bg-[#506D44] text-white border-[#506D44]'
                      : 'bg-white border-[#D5CDBD] text-[#47433E]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
              Cooking Habit
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Few times a week', 'Daily cooking'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCookingFrequency(opt)}
                  className={`py-2 px-2 text-center rounded-xl border text-[11px] cursor-pointer transition-colors ${
                    cookingFrequency === opt
                      ? 'bg-[#506D44] text-white border-[#506D44]'
                      : 'bg-white border-[#D5CDBD] text-[#47433E]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Impact Results Card */}
          <div className="p-4 bg-[#FAF7F0] border-2 border-[#CAD86B] rounded-2xl text-center space-y-2 mt-4">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8EA654]">
              Your Annual Island Impact:
            </span>
            <div className="flex items-center justify-around pt-1">
              <div>
                <span className="font-display font-black text-3xl text-[#506D44] block">
                  {estimatedPounds} lbs
                </span>
                <span className="text-[10px] text-[#706B63] uppercase">Scraps Composted</span>
              </div>
              <div className="w-[1px] h-10 bg-[#DCD4C6]" />
              <div>
                <span className="font-display font-black text-3xl text-[#FFA800] block">
                  {methaneDiverted} kg
                </span>
                <span className="text-[10px] text-[#706B63] uppercase">CO2e Emissions Saved</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSubscriptions();
              }}
              className="w-full py-3.5 bg-[#FFA800] hover:bg-[#F09C00] text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer text-xs sm:text-sm"
            >
              Start Composting Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
