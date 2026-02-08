import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'next-export-i18n';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Layout from '@/components/Layout';
import GoogleCalendarIcon from '@/components/atom/Icon/GoogleCalendarIcon';
import LineIcon from '@/components/atom/Icon/LineIcon';

export default function Service() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const servicesList = [
    { slug: 'PurpleStarAstrology', icon: '🔮' },
    { slug: 'IntegratedEnergyTherapy', icon: '👼' },
    { slug: 'PetTelepathy', icon: '🐕' },
    { slug: 'MagneticFieldCleansing', icon: '🌿' },
    { slug: 'CustomProductConsulting', icon: 'ℹ️' },
    { slug: 'Workshop', icon: '🕯️' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full bg-gray-900 py-32 px-6 flex flex-col items-center text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/1600x900.svg')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            {t('services.heroTitle')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {t('services.heroSubtitle')}
          </p>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200 shadow-lg flex items-center gap-2"
            >
              {t('services.bookConsultation')}
              <span
                className={`transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 text-left overflow-hidden">
                <a
                  href="https://calendar.app.google/wXW1Qkz4N6ErfYMaA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  <GoogleCalendarIcon />
                  {t('services.purpleStarAstrology')}
                </a>
                <a
                  href="https://lin.ee/3hZ6cmk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-default"
                >
                  <LineIcon />
                  {t('services.integratedEnergyTherapy')}
                </a>
                <a
                  href="https://lin.ee/3hZ6cmk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-default"
                >
                  <LineIcon />
                  {t('services.petTelepathy')}
                </a>
                <a
                  href="https://lin.ee/3hZ6cmk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-default"
                >
                  <LineIcon />
                  {t('services.customProductConsulting')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="w-full max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service) => {
            const key =
              service.slug.charAt(0).toLowerCase() + service.slug.slice(1);
            const isPurpleStarAstrology =
              service.slug === 'PurpleStarAstrology';
            return (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                className="block h-full"
              >
                <div className="group relative h-full p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  {isPurpleStarAstrology && (
                    <div className="absolute top-[-64px] right-[-64px] w-32 h-32">
                      <DotLottieReact
                        src="/images/starAnimation.lottie"
                        loop
                        autoplay
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {t(`services.${key}`)}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {t('services.gridDescription')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
