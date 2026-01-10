import { FC, ReactComponentElement, useEffect, useState } from 'react';
import Image from 'next/image';


interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageGallery({ images }: ImageGalleryProps): ReactComponentElement<FC, ImageGalleryProps> {
  const [currentImage, setCurrentImage] = useState(0);

  const goTo = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === images.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="w-full relative overflow-hidden">
        <div
          className={`flex w-[${100 * images.length}%] transition-transform duration-500`}
          style={{ transform: `translateX(${-100 * currentImage}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative min-w-full h-[600px]`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover`}
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentImage ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

