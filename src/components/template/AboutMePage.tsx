import ImageGallery from '@/components/organism/ImageGallery/ImageGallery';
import PersonalityOrbit from '@/components/molecule/PersonalityOrbit';
import { Personality } from '@/components/molecule/LightPoint';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTranslation } from 'next-export-i18n';

// Personality data with i18n keys
const PERSONALITY_KEYS = [
  'aboutMe.personality.point1',
  'aboutMe.personality.point2',
  'aboutMe.personality.point3',
  'aboutMe.personality.point4',
  'aboutMe.personality.point5',
] as const;

export default function AboutMePage() {
  const { t } = useTranslation();

  const homeImages = [
    { src: '/images/1600x900.svg', alt: 'Candle Collection 1' },
    { src: '/images/1600x900.svg', alt: 'Candle Collection 2' },
    { src: '/images/1600x900.svg', alt: 'Candle Collection 3' },
  ];

  // Build personalities array from translations
  const personalities: Personality[] = PERSONALITY_KEYS.map((key) => ({
    title: t(`${key}.title`),
    description: t(`${key}.desc`),
  }));

  return (
    <div className="w-full flex flex-col">
      <ImageGallery images={homeImages} />
      <div className="mx-4 tablet:mx-10 flex flex-col items-center">
        {/* Cat Animation with Personality Orbit */}
        <div className="relative" style={{ width: 300, height: 300 }}>
          <DotLottieReact
            src="/images/catAnimation.lottie"
            style={{ width: 300, height: 300 }}
            loop
            autoplay
          />
          <PersonalityOrbit personalities={personalities} radius={130} />
        </div>
      </div>
    </div>
  );
}
