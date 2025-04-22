import React, { useEffect, useState } from 'react';

interface AlertBoxProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
}

export default function AlertBox({ message, type = 'success', duration = 10000 }: AlertBoxProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const baseClasses = 'mt-6 px-4 py-3 rounded text-center animate-fade-in border';
  const typeClasses = {
    success: 'bg-green-100 border-green-300 text-green-700',
    error: 'bg-red-100 border-red-300 text-red-700',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-700',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
}
