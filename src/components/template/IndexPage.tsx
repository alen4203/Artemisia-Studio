import { ReactComponentElement, FC } from 'react';

import ImageGallery from '@/components/organism/ImageGallery/ImageGallery';
import BrandIntro from '@/components/organism/BrandIntro/BrandIntro';

export default function IndexPage(): ReactComponentElement<FC, null> {
  const homeImages = [
    { src: '/images/1600x900.svg', alt: 'Candle Collection 1' },
    { src: '/images/1600x900.svg', alt: 'Candle Collection 2' },
    { src: '/images/1600x900.svg', alt: 'Candle Collection 3' },
  ];

  return (
    <div className="w-full flex flex-col">
      <ImageGallery images={homeImages} />
      <div className="mx-4 tablet:mx-10 flex flex-col items-center">
        <BrandIntro />
      </div>
    </div>
  );
}
