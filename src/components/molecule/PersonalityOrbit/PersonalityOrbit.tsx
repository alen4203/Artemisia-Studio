import LightPoint, { Personality } from '@/components/molecule/LightPoint';

interface PersonalityOrbitProps {
  personalities: Personality[];
  /** Radius of the orbit in pixels */
  radius?: number;
}

/**
 * Renders light points in a semi-circle (upper half) around the center.
 * Points are distributed evenly from 180° to 0° (left to right on top).
 */
export default function PersonalityOrbit({
  personalities,
  radius = 120,
}: PersonalityOrbitProps) {
  const pointCount = personalities.length;

  // Calculate positions for each light point on the upper semi-circle
  // Angles go from 180° (left) to 0° (right), distributed evenly
  const getPointPosition = (index: number) => {
    // Distribute points evenly across the upper semi-circle
    const angle = Math.PI - (index * Math.PI) / (pointCount - 1);

    // Calculate x, y relative to center (0, 0)
    // x: positive = right, y: negative = up (CSS coordinates)
    const x = Math.cos(angle) * radius;
    const y = -Math.sin(angle) * radius; // Negative because CSS y-axis is inverted

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {personalities.map((personality, index) => (
        <div key={index} className="pointer-events-auto">
          <LightPoint
            personality={personality}
            style={getPointPosition(index)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
