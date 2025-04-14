import React, { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

export default function Countdown() {
  const targetDate = new Date('2025-06-07T00:00:00-03:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mt-6 text-center text-gray-700">
      <p className="text-sm">Faltam</p>
      <div className="flex justify-center gap-4 text-2xl font-bold">
        <div className="flex flex-col items-center">
          <span className="animate-pulse">{timeLeft.days}</span>
          <span className="text-xs font-normal text-gray-500">dias</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="animate-pulse">{timeLeft.hours}</span>
          <span className="text-xs font-normal text-gray-500">horas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="animate-pulse">{timeLeft.minutes}</span>
          <span className="text-xs font-normal text-gray-500">min</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="animate-pulse">{timeLeft.seconds}</span>
          <span className="text-xs font-normal text-gray-500">seg</span>
        </div>
      </div>
      <p className="text-sm mt-2">para o grande dia!</p>
    </div>
  );
}
