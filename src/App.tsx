import React from 'react';
import { useState } from 'react';

type Gift = {
  id: number;
  name: string;
  taken: boolean;
  chosenBy?: string;
};

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [confirmedGuests, setConfirmedGuests] = useState<string[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: 'Liquidificador Arno Power Max', taken: false },
    { id: 2, name: 'Jogo de Panelas Tramontina', taken: false },
    { id: 3, name: 'Vale Spa para casal', taken: false },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  

  const confirmPresence = () => {
    if (guestName.trim()) {
      setConfirmedGuests([...confirmedGuests, guestName.trim()]);
      setGuestName('');
    }
  };

  const chooseGift = (id: number) => {
    setGifts(
      gifts.map(gift =>
        gift.id === id ? { ...gift, taken: true } : gift
      )
    );
  };

  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [giftUserName, setGiftUserName] = useState('');

  const confirmGiftChoice = () => {
    if (selectedGiftId && giftUserName.trim()) {
      setGifts(
        gifts.map(gift =>
          gift.id === selectedGiftId
            ? { ...gift, taken: true, chosenBy: giftUserName.trim() }
            : gift
        )
      );
      setGiftUserName('');
      setSelectedGiftId(null);
    }
  };  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Juliana & Henrique</h1>
        <p className="text-lg text-gray-600">São Paulo, 25 de Abril de 2025</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Confirmação de Presença</h2>
        <input
          type="text"
          placeholder="Seu nome"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={confirmPresence} className="bg-green-500 text-white p-2 rounded">
          Confirmar presença
        </button>
      </section>

      <div className="mt-6">
        {!isAdmin ? (
          <div className="space-x-2">
            <input
              type="password"
              placeholder="Senha de admin"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              className="bg-gray-700 text-white p-2 rounded"
              onClick={() => {
                if (adminPassword === "123456") { 
                  setIsAdmin(true);
                } else {
                  alert("Senha incorreta");
                }
              }}
            >
              Entrar como admin
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Convidados confirmados:</h3>
            <ul className="mt-4 text-sm text-gray-700">
              {confirmedGuests.map((guest, idx) => (
                <li key={idx}>✔ {guest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Presentes</h2>
        <ul className="space-y-4">
          {gifts.map((gift) => (
            <li key={gift.id} className="border p-4 rounded flex justify-between items-center">
              <span>{gift.name}</span>
              {gift.taken ? (
                <span className="text-green-600 font-bold">
                  {isAdmin && gift.chosenBy ? `Escolhido por ${gift.chosenBy}` : 'Escolhido'}
                </span>
              ) : selectedGiftId === gift.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={giftUserName}
                    onChange={(e) => setGiftUserName(e.target.value)}
                    className="border p-1 rounded text-sm"
                  />
                  <button
                    onClick={confirmGiftChoice}
                    className="bg-green-500 text-white p-1 rounded text-sm"
                  >
                    Confirmar presente
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedGiftId(gift.id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Presentear
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Deseja nos abençoar com um Pix?</h2>
        <p className="text-gray-700 mb-2">
          Use a chave Pix abaixo para enviar seu presente 💖
        </p>

        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded">
          <span className="font-mono select-all text-sm">casamento.juh.henrique@gmail.com</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText("casamento.juh.henrique@gmail.com");
              alert("Chave Pix copiada com sucesso!");
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Copiar
          </button>
        </div>
      </section>

    </div>
  );
}
