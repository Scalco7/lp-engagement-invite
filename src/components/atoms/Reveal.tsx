import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
}

export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const delayClass = delay === 1 ? 'reveal-delay-1' : delay === 2 ? 'reveal-delay-2' : delay === 3 ? 'reveal-delay-3' : '';

  return (
    <div
      ref={ref}
      className={`reveal ${isIntersecting ? 'active' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
