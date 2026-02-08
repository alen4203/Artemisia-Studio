import { useState } from 'react';

export interface Personality {
  title: string;
  description: string;
}

interface LightPointProps {
  personality: Personality;
  style?: React.CSSProperties;
  /** Index for staggered animation delay (0-4) */
  index?: number;
}

// Animation delays for staggered pulsing effect
const ANIMATION_DELAYS = ['0s', '0.4s', '0.8s', '1.2s', '1.6s'];

export default function LightPoint({ personality, style, index = 0 }: LightPointProps) {
  const [isOpen, setIsOpen] = useState(false);
  const animationDelay = ANIMATION_DELAYS[index % ANIMATION_DELAYS.length];

  return (
    <div
      className="absolute"
      style={style}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Light Point */}
      <button
        className="light-point w-2 h-2 rounded-full bg-amber-400 cursor-pointer hover:scale-150 transition-transform relative z-0"
        style={{ animationDelay }}
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={personality.title}
      />

      {/* Tooltip */}
      {isOpen && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          {/* Close Button */}
          <button
            className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <h4 className="font-semibold text-gray-800 text-sm pr-4 mb-1">
            {personality.title}
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            {personality.description}
          </p>

          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}
    </div>
  );
}
