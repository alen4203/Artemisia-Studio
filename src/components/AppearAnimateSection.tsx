import { useEffect, useRef, useState, ReactNode } from 'react';

interface AppearAnimateSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AppearAnimateSection({ children, delay = 0, className = '' }: AppearAnimateSectionProps) {
  const [appear, setAppear] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, owner) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeoutIdRef.current = setTimeout(() => {
            setAppear(true);
            owner.unobserve(entry.target);
          }, delay);
        }
      });
    }, { threshold: 0.1 });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={targetRef} className={`transition duration-1000 ${appear ? 'opacity-100 translate-y-0' : '-translate-y-10 opacity-0'} ${className}`}>
      {children}
    </div>
  );
}
