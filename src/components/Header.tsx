import React, { useState } from 'react';
import Countdown from './Countdown.tsx';

interface HeaderProps {
  bride: string;
  groom: string;
  date: string;
  location: string;
  onAdminClick: () => void;
  isPasswordVisible: boolean;
  password: string;
  setPassword: (password: string) => void;
}

export default function Header({
  bride,
  groom,
  date,
  location,
  onAdminClick,
  password,
  setPassword,
}: HeaderProps) {
  const [showInput, setShowInput] = useState(false);

  return (
    <header
      className="text-white py-6 px-4 rounded-b-xl relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/fundo-cha.jpeg)' }}
    >
      <div className="absolute right-4 top-4">
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="bg-[#426221] hover:bg-[#6CBD46] text-white text-sm px-4 py-1 rounded shadow transition"
          >
            Entrar como admin
          </button>
        ) : (
          <div className="flex gap-2 items-center">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#6CBD46] text-black rounded px-2 py-1 text-sm"
            />
            <button
              onClick={onAdminClick}
              className="bg-[#5B8C3C] hover:bg-[#6CBD46] text-white text-sm px-3 py-1 rounded shadow transition"
            >
              Entrar
            </button>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <h2 className="text-3xl font-bold drop-shadow-sm text-[#426221]"> 
          Chá de Panela
        </h2>
        <h1 className="text-3xl font-bold italic drop-shadow-sm text-[#354B25]"
        style={{ fontFamily: 'Literaturnaya, serif' }}>
          {groom} & {bride}
        </h1>
        <p className="font-medium text-[#6CBD46] mt-1">
          {location} - {new Date(date + 'T00:00:00-03:00').toLocaleDateString('pt-BR')} às 17:30h
        </p>
        <Countdown />
      </div>
    </header>
  );
}
