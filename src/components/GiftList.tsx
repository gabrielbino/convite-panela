import React, { useState } from 'react';
import { Gift, Guest } from '../types';
import { saveGuest } from '../services/firebaseGuestsService.ts';
import AlertBox from './AlertBox.tsx';

interface GiftListProps {
  guest: Guest | null;
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  isAdmin: boolean;
}

export default function GiftList({ guest, gifts, setGifts, isAdmin }: GiftListProps) {
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const handleGiftConfirm = async () => {
    const userName = guest?.name || name;
  
    if (!userName || selectedGiftId === null) {
      setAlert({ message: 'Por favor, preencha o nome antes de confirmar o presente.', type: 'error' });
      return;
    }
  
    const selectedGift = gifts.find(g => g.id === selectedGiftId);
  
    if (selectedGift) {
      try {
        await saveGuest(userName, false, selectedGift.name, selectedGift.id, selectedGift.allowMultiple);
        setAlert({ message: 'Presente registrado com sucesso!', type: 'success' });
  
        setTimeout(() => {
          const updatedGifts = gifts.map(gift =>
            gift.id === selectedGiftId
              ? gift.allowMultiple
                ? gift
                : { ...gift, taken: true, chosenBy: userName }
              : gift
          );
  
          setGifts(updatedGifts);
          setSelectedGiftId(null);
          setName('');
        }, 1500);
      } catch (error: any) {
        setAlert({ message: error.message || 'Erro ao confirmar o presente.', type: 'error' });
      }
    }
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
              {gift.taken && !gift.allowMultiple ? (
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

            {selectedGiftId === gift.id && (
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

                {showSuccess && <AlertBox message="Presente registrado com sucesso!" type="success" />}
                {alert && <AlertBox message={alert.message} type={alert.type} />}
              </div>
            )}
          </li>
        ))}
      </ul>

    </section>
  );
}