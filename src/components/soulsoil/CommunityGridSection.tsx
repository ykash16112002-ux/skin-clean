import React from 'react';

export const CommunityGridSection: React.FC = () => {
  const cards = [
    {
      img: 'assets/soulsoil/grid_man_2x.png',
      alt: 'Bahamian community grower smiling in lush island flora',
      caption: 'Meet Our Local Growers',
    },
    {
      img: 'assets/soulsoil/grid_compost_2x.png',
      alt: 'Fresh kitchen produce scraps tipped into compost aerator tumbler',
      caption: 'Organic Scraps in Action',
    },
    {
      img: 'assets/soulsoil/grid_graphic_2x.png',
      alt: "Let's get trashy - What is composting infographic",
      caption: 'Educational Workshops & Guides',
    },
    {
      img: 'assets/soulsoil/grid_truck_2x.png',
      alt: 'Soul & Soil collection truck with yellow compost buckets',
      caption: 'Weekly Island Route Pickups',
    },
  ];

  return (
    <section id="community" className="w-full bg-[#FFFDF9] py-10 sm:py-14 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#506D44]/30 shadow-md group cursor-pointer bg-[#506D44]/10"
            >
              <img
                src={card.img}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="font-mono-custom text-[11px] text-white font-semibold">
                  {card.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
