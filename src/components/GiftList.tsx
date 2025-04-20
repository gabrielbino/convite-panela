import React, { useState } from 'react';
import { Gift, Guest } from '../types';
import { saveGuest } from '../services/firebaseGuestsService.ts';
import { db } from '../services/firebaseService';

interface GiftListProps {
  guest: Guest | null;
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  isAdmin: boolean;
}

export default function GiftList({ guest, gifts, setGifts, isAdmin }: GiftListProps) {
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGiftConfirm = async () => {
    const userName = guest?.name || name;

    if (!userName || selectedGiftId === null) {
      alert('Por favor, preencha nome e selecione um presente.');
      return;
    }

    const updatedGifts = gifts.map(gift =>
      gift.id === selectedGiftId
        ? gift.allowMultiple
          ? gift // não marca como taken
          : { ...gift, taken: true, chosenBy: userName }
        : gift
    );

    setGifts(updatedGifts);

    const selectedGift = updatedGifts.find(g => g.id === selectedGiftId);
    if (selectedGift) {
      await saveGuest(userName, false, selectedGift.name);
      setSuccessMessage("Presente registrado com sucesso!");
    }

    setSelectedGiftId(null);
    setName('');
  };

  return (
    <section className="mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#354B25]">Lista de Presentes</h2>
      <ul className="space-y-4">
        {gifts.map(gift => (
          <li
            key={gift.id}
            className="border border-[#9CB983] bg-white rounded p-4 shadow-sm transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-left font-medium text-[#354B25]">{gift.name}</span>
              {gift.taken && !gift.allowMultiple ?   (
                <span className="text-[#6CBD46] font-bold">
                  {isAdmin && gift.chosenBy ? `Escolhido por ${gift.chosenBy}` : 'Indisponível'}
                </span>
              ) : (
                <button
                  onClick={() => setSelectedGiftId(gift.id)}
                  className="bg-[#426221] hover:bg-[#6CBD46] text-white px-4 py-1 rounded transition"
                >
                  Presentear
                </button>
              )}
            </div>

            {selectedGiftId === gift.id && !gift.taken && (
              <div className="mt-4 border-t border-[#9CB983] pt-4 animate-fade-in">
                {!guest && (
                  <input
                    type="text"
                    placeholder="Seu nome completo (obrigatório)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[#9CB983] text-black rounded px-3 py-2 w-full mb-4"
                  />
                )}

                <button
                  onClick={handleGiftConfirm}
                  className="bg-[#426221] hover:bg-[#6CBD46] text-white px-6 py-2 rounded transition"
                >
                  Confirmar Presente
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {successMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded text-green-700">
          {successMessage}
        </div>
      )}
    </section>
  );
}
