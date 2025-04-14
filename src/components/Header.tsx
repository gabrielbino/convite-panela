import React, { useEffect, useState } from 'react';

interface HeaderProps {
  bride: string;
  groom: string;
  date: string;
  location: string;
}

export default function Header({ bride, groom, date, location }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  useEffect(() => {
    const targetDate = new Date(date + 'T00:00:00-03:00');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, finished: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="text-center mt-6">
      <h1 className="text-3xl font-bold">
        {bride} <span className="text-pink-500">&</span> {groom}
      </h1>
      <p className="font-medium text-gray-600 mt-1">
        {location} - {new Date(date + 'T00:00:00-03:00').toLocaleDateString('pt-BR')} às 16h
      </p>


      {timeLeft.finished ? (
        <p className="mt-2 text-green-600 font-semibold">Hoje é o grande dia! 🎉</p>
      ) : (
        <div className="mt-4 flex justify-center gap-4 text-lg font-semibold">
          <div className="flex flex-col items-center animate-pulse">
            <span>{timeLeft.days}</span>
            <span className="text-xs text-gray-500">dias</span>
          </div>
          <div className="flex flex-col items-center animate-pulse">
            <span>{timeLeft.hours}</span>
            <span className="text-xs text-gray-500">horas</span>
          </div>
          <div className="flex flex-col items-center animate-pulse">
            <span>{timeLeft.minutes}</span>
            <span className="text-xs text-gray-500">min</span>
          </div>
          <div className="flex flex-col items-center animate-pulse">
            <span>{timeLeft.seconds}</span>
            <span className="text-xs text-gray-500">seg</span>
          </div>
        </div>
      )}
    </div>
  );
}
