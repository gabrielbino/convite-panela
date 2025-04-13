import React, { useState } from 'react';
import { Gift, Guest } from '../types';
import { sendConfirmationEmail } from '../services/email';

interface GiftListProps {
  guest: Guest | null;
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  isAdmin: boolean;
}

export default function GiftList({ guest, gifts, setGifts, isAdmin }: GiftListProps) {
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);

  const handleGiftConfirm = () => {
    if (!guest || !guest.name || !guest.email || selectedGiftId === null) {
      alert("Você precisa confirmar presença com nome e e-mail antes de escolher um presente.");
      return;
    }

    const updatedGifts = gifts.map(gift =>
      gift.id === selectedGiftId
        ? { ...gift, taken: true, chosenBy: guest.name, email: guest.email }
        : gift
    );

    setGifts(updatedGifts);

    const selectedGift = updatedGifts.find(g => g.id === selectedGiftId);
    if (selectedGift) {
      sendConfirmationEmail(guest.name, guest.email, selectedGift.name);
    }

    setSelectedGiftId(null);
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Lista de Presentes</h2>
      <ul className="space-y-4">
        {gifts.map(gift => (
          <li key={gift.id} className="border p-4 rounded flex justify-between items-center">
            <span>{gift.name}</span>
            {gift.taken ? (
              <span className="text-green-600 font-bold">
                {isAdmin && gift.chosenBy ? `Escolhido por ${gift.chosenBy}` : 'Indisponível'}
              </span>
            ) : selectedGiftId === gift.id ? (
              <button
                onClick={handleGiftConfirm}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Confirmar presente
              </button>
            ) : (
              <button
                onClick={() => setSelectedGiftId(gift.id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Presentear
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
