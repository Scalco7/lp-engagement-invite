import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const addLeadingZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const timeItems = [
    { label: 'dias', value: timeLeft.days },
    { label: 'horas', value: timeLeft.hours },
    { label: 'minutos', value: timeLeft.minutes },
    { label: 'segundos', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-4 sm:gap-8 my-8 font-sans">
      {timeItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-light text-brand-dark font-serif tracking-wide">
              {addLeadingZero(item.value)}
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest text-brand-accent uppercase mt-2">
              {item.label}
            </span>
          </div>
          {index < timeItems.length - 1 && (
            <span className="text-xl sm:text-3xl font-extralight text-brand-blush mb-6">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Countdown;
