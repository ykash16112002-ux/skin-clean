import React, { useState } from 'react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Residential Bi-Weekly',
      price: billingCycle === 'monthly' ? '$24' : '$20',
      period: '/ month',
      description: 'Ideal for 1-2 person households generating modest food scraps.',
      features: [
        '1 airtight 5-gallon bucket',
        'Bi-weekly doorstep pickup',
        'Compostable plant-based liners',
        'Free spring cured compost reward (10 lbs)',
      ],
      popular: false,
    },
    {
      name: 'Residential Weekly',
      price: billingCycle === 'monthly' ? '$39' : '$32',
      period: '/ month',
      description: 'Best for active cooking families committed to zero kitchen waste.',
      features: [
        '1 or 2 airtight 5-gallon buckets',
        'Weekly doorstep pickup',
        'Fresh sanitized swap every cycle',
        'Unlimited organic scraps acceptance',
        'Free 25 lbs nutrient-dense soil annually',
      ],
      popular: true,
    },
    {
      name: 'Commercial & Hospitality',
      price: billingCycle === 'monthly' ? '$140' : '$120',
      period: '/ month',
      description: 'For cafes, restaurants, resorts, and school meal kitchens.',
      features: [
        'Rolling 32-gallon aerated bins',
        'Up to 3x weekly commercial collection',
        'Certified landfill diversion metrics',
        'Kitchen staff training workshop',
        'Priority island delivery service',
      ],
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFDF9] border-2 border-[#506D44] rounded-3xl p-6 sm:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#506D44] hover:text-[#263514] p-1 cursor-pointer font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <span className="font-mono-custom text-[11px] font-bold text-[#8EA654] uppercase tracking-widest block">
            Choose A Plan
          </span>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-[#506D44] uppercase tracking-tight mt-1">
            Composting Subscriptions
          </h3>
          <p className="font-mono-custom text-xs text-[#6B6358] mt-2 max-w-xl mx-auto">
            Doorstep bin delivery, odorless swap pickups, and restorative soil returned to Bahamian gardens.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-2 mt-5 p-1 bg-[#FAF7F0] border border-[#506D44]/30 rounded-xl font-mono-custom text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                billingCycle === 'monthly' ? 'bg-[#506D44] text-white' : 'text-[#506D44]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                billingCycle === 'annual' ? 'bg-[#506D44] text-white' : 'text-[#506D44]'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl flex flex-col justify-between border transition-all ${
                p.popular
                  ? 'border-2 border-[#506D44] bg-[#FAF7F0] shadow-md relative scale-102'
                  : 'border-[#DCD4C6] bg-white'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#FFA800] text-white font-mono-custom font-bold text-[10px] uppercase rounded-full tracking-wider shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <h4 className="font-mono-custom font-bold text-sm text-[#263514] uppercase">
                  {p.name}
                </h4>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#506D44]">
                    {p.price}
                  </span>
                  <span className="font-mono-custom text-xs text-[#706B63]">
                    {p.period}
                  </span>
                </div>
                <p className="font-mono-custom text-[11px] text-[#706B63] mb-4 leading-relaxed">
                  {p.description}
                </p>

                <ul className="space-y-2 border-t border-[#EBE3D7] pt-4 font-mono-custom text-[11px] text-[#47433E]">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <span className="text-[#506D44] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    onSelectPlan(p.name);
                    onClose();
                  }}
                  className={`w-full py-2.5 font-mono-custom font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    p.popular
                      ? 'bg-[#506D44] hover:bg-[#3B5232] text-white shadow-xs'
                      : 'bg-[#FAF7F0] hover:bg-[#506D44] hover:text-white text-[#263514] border border-[#506D44]/30'
                  }`}
                >
                  Get Your Compost Bin
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
