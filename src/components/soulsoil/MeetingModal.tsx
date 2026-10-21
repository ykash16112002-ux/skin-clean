import React, { useState } from 'react';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgType, setOrgType] = useState('Home / Household');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFDF9] border-2 border-[#506D44] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#506D44] hover:text-[#263514] p-1 cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="font-mono-custom text-[11px] font-bold text-[#8EA654] uppercase tracking-widest block">
            Bahamian Soil Community
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#506D44] uppercase tracking-tight mt-1">
            Schedule a Meeting
          </h3>
          <p className="font-mono-custom text-xs text-[#6B6358] mt-1.5">
            Let's discuss composting solutions for your home, restaurant, hotel, or school.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#506D44]/30 space-y-2">
            <span className="text-3xl">🌱</span>
            <p className="font-mono-custom font-bold text-sm text-[#506D44]">
              Meeting Request Sent!
            </p>
            <p className="font-mono-custom text-xs text-[#6B6358]">
              Our team will reach out within 24 hours to confirm your time.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-custom text-xs">
            <div>
              <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Sands"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] focus:border-[#506D44] bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@islandmail.bs"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] focus:border-[#506D44] bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
                Account Type
              </label>
              <select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] focus:border-[#506D44] bg-white outline-none"
              >
                <option value="Home / Household">Residential Household</option>
                <option value="Restaurant / Cafe">Restaurant / Cafe / Food Truck</option>
                <option value="School / Academy">School / Educational Program</option>
                <option value="Hotel / Resort">Hotel / Resort Property</option>
              </select>
            </div>

            <div>
              <label className="block text-[#263514] font-bold mb-1 uppercase tracking-wider">
                Notes / Preferred Days
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your weekly organic waste volume..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] focus:border-[#506D44] bg-white outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FFA800] hover:bg-[#F09C00] text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer text-xs sm:text-sm"
            >
              Confirm Meeting Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
