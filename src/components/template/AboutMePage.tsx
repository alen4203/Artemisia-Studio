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

  // Build personalities array from translations
  const personalities: Personality[] = PERSONALITY_KEYS.map((key) => ({
    title: t(`${key}.title`),
    description: t(`${key}.desc`),
  }));

  return (
    <div className="w-full flex flex-col">
      {/* About me background section */}
      <div className="w-full bg-[rgb(242,226,212)] pb-[168px]">
        <div className="pt-12 pb-0 px-4">
          <div className="max-w-2xl bg-[#F9F3ED] rounded-lg px-6 pt-6 pb-8 mx-auto text-[#896948] text-center">
            <h2 className="text-[36px] font-bold mb-6">{t('aboutMe.background.title')}</h2>
            <hr className="border-t-2 border-[#896948] mb-6 w-2/3 mx-auto" />
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[24px]">{t('aboutMe.background.point1.title')}</h3>
                <p>{t('aboutMe.background.point1.line1')}</p>
                <p>{t('aboutMe.background.point1.line2')}</p>
              </div>

              <div>
                <h3 className="font-bold text-[24px]">{t('aboutMe.background.point.title')}</h3>
                <p>{t('aboutMe.background.point.line1')}</p>
                <p>{t('aboutMe.background.point.line2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved transition - true circular arc, white curves upward into beige */}
      <div className="w-full -mt-[120px]" style={{ backgroundColor: 'transparent' }}>
        <svg
          className="w-full"
          viewBox="0 0 1600 240"
          preserveAspectRatio="none"
          style={{ display: 'block', height: '120px' }}
        >
          <path
            d="M0,240 A1600,1600 0 0,1 1600,240 L1600,240 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Personality section - white background */}
      <div className="bg-white mx-4 tablet:mx-10 flex flex-col items-center">
        {/* Cat Animation with Personality Orbit */}
        <div className="relative" style={{ width: 450, height: 450 }}>
          <DotLottieReact
            src="/images/catAnimation.lottie"
            style={{ width: 450, height: 450 }}
            loop
            autoplay
          />
          <PersonalityOrbit personalities={personalities} radius={180} />
        </div>
      </div>
    </div>
  );
}
