import React, { useEffect, useMemo, useState } from 'react';

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
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Countdown() {
  const targetDate = useMemo(() => new Date('2025-05-24T00:00:00-03:00'), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []); // ✅ Agora sem targetDate na dependência

  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-[#9CB983]">Faltam</p>

      <div className="flex justify-center gap-6 text-2xl font-bold text-[#6CBD46]">
        <div className="flex flex-col items-center animate-pulse">
          <span>{timeLeft.days}</span>
          <span className="text-xs font-medium text-[#9CB983]">dias</span>
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <span>{timeLeft.hours}</span>
          <span className="text-xs font-medium text-[#9CB983]">horas</span>
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <span>{timeLeft.minutes}</span>
          <span className="text-xs font-medium text-[#9CB983]">min</span>
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <span>{timeLeft.seconds}</span>
          <span className="text-xs font-medium text-[#9CB983]">seg</span>
        </div>
      </div>

      <p className="text-sm mt-2 text-[#9CB983]">para o nosso chá de panela!</p>
    </div>
  );
}
