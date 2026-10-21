import React from 'react';

export type VisualCrop =
  | 'hero-face'
  | 'cleansing-foam'
  | 'droplet-glow'
  | 'serum-texture'
  | 'antiage-skin'
  | 'aesthetic-contour'
  | 'cosmetic-cream'
  | 'profile-lip'
  | 'cream-wave'
  | 'tone-texture'
  | 'doctor-elena'
  | 'doctor-anna'
  | 'doctor-marina'
  | 'interior-lounge';

interface RefVisualProps {
  crop: VisualCrop;
  alt: string;
  className?: string;
  priority?: boolean;
}

// Precise percentage bounding boxes in image_72db1020.png (736 x 1308)
const cropStyles: Record<VisualCrop, { top: string; left: string; width: string; height: string }> = {
  'hero-face': {
    top: '0%',
    left: '0%',
    width: '100%',
    height: '20%',
  },
  'cleansing-foam': {
    top: '26.8%',
    left: '2%',
    width: '27%',
    height: '15.5%',
  },
  'droplet-glow': {
    top: '26.8%',
    left: '29.5%',
    width: '14%',
    height: '7.8%',
  },
  'serum-texture': {
    top: '34.5%',
    left: '43.5%',
    width: '11%',
    height: '7.8%',
  },
  'antiage-skin': {
    top: '49%',
    left: '2.5%',
    width: '40%',
    height: '11.8%',
  },
  'aesthetic-contour': {
    top: '49%',
    left: '43.5%',
    width: '40%',
    height: '11.8%',
  },
  'cosmetic-cream': {
    top: '61.5%',
    left: '2.5%',
    width: '81%',
    height: '11.8%',
  },
  'profile-lip': {
    top: '84%',
    left: '2.5%',
    width: '26%',
    height: '8.5%',
  },
  'cream-wave': {
    top: '84%',
    left: '29.5%',
    width: '26%',
    height: '8.5%',
  },
  'tone-texture': {
    top: '84%',
    left: '56.5%',
    width: '26%',
    height: '8.5%',
  },
  'doctor-elena': {
    top: '0%',
    left: '10%',
    width: '75%',
    height: '19%',
  },
  'doctor-anna': {
    top: '26.8%',
    left: '2%',
    width: '35%',
    height: '15.5%',
  },
  'doctor-marina': {
    top: '49%',
    left: '43.5%',
    width: '40%',
    height: '11.8%',
  },
  'interior-lounge': {
    top: '84%',
    left: '29.5%',
    width: '53%',
    height: '8.5%',
  },
};

export const RefVisual: React.FC<RefVisualProps> = ({
  crop,
  alt,
  className = "w-full h-full",
}) => {
  const cfg = cropStyles[crop] || cropStyles['hero-face'];

  // Parse percentages to position the image inside a relative container
  const topPercent = parseFloat(cfg.top);
  const leftPercent = parseFloat(cfg.left);
  const widthPercent = parseFloat(cfg.width);
  const heightPercent = parseFloat(cfg.height);

  const scaleX = 100 / (widthPercent || 100);
  const scaleY = 100 / (heightPercent || 100);
  const transX = -(leftPercent * scaleX);
  const transY = -(topPercent * scaleY);

  return (
    <div className={`relative overflow-hidden bg-[#F3EEE6] ${className}`} role="img" aria-label={alt}>
      <img
        src="/assets/aistudio/image_72db1020.png"
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute pointer-events-none select-none max-w-none will-change-transform"
        style={{
          width: `${scaleX * 100}%`,
          height: `${scaleY * 100}%`,
          left: `${transX}%`,
          top: `${transY}%`,
          objectFit: 'cover',
        }}
      />
      {/* Subtle fine editorial film-grain / light contrast overlay */}
      <div className="absolute inset-0 bg-[#342D27]/[0.02] mix-blend-multiply pointer-events-none" />
    </div>
  );
};
