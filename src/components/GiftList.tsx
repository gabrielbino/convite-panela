import React, { useState } from 'react';
import { Gift, Guest } from '../types';
import { sendGuestEmail } from '../services/emailService.ts';
import { saveGuest } from '../services/firebaseGuestsService.ts';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebaseService.ts';

interface GiftListProps {
  guest: Guest | null;
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  isAdmin: boolean;
}

export default function GiftList({ guest, gifts, setGifts, isAdmin }: GiftListProps) {
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [presenceAnswer, setPresenceAnswer] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const checkDuplicateEmail = async (email: string) => {
    const q = query(collection(db, 'guests'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleGiftConfirm = async () => {
    const userName = guest?.name || name;
    const userEmail = guest?.email || email;
    const confirmed = guest ? true : !!presenceAnswer;

    if (!userName || !userEmail || selectedGiftId === null) {
      alert("Por favor, preencha nome, e-mail e selecione um presente.");
      return;
    }

    const alreadyExists = await checkDuplicateEmail(userEmail);
    if (alreadyExists) {
      alert("Este e-mail já foi utilizado para confirmação.");
      return;
    }

    const updatedGifts = gifts.map(gift =>
      gift.id === selectedGiftId
        ? { ...gift, taken: true, chosenBy: userName, email: userEmail }
        : gift
    );

    setGifts(updatedGifts);

    const selectedGift = updatedGifts.find(g => g.id === selectedGiftId);
    if (selectedGift) {
      await saveGuest(userName, userEmail, confirmed, selectedGift.name);
      await sendGuestEmail(userName, userEmail, confirmed, selectedGift.name);
      setSuccessMessage("Presente e presença registrados com sucesso!");
    }

    setSelectedGiftId(null);
    setPresenceAnswer(null);
    setName('');
    setEmail('');
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Lista de Presentes</h2>
      <ul className="space-y-4">
        {gifts.map(gift => (
          <li key={gift.id} className="border p-4 rounded transition-all duration-300">
            <div className="flex justify-between items-center">
              <span>{gift.name}</span>
              {gift.taken ? (
                <span className="text-green-600 font-bold">
                  {isAdmin && gift.chosenBy ? `Escolhido por ${gift.chosenBy}` : 'Indisponível'}
                </span>
              ) : (
                <button
                  onClick={() => setSelectedGiftId(gift.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Presentear
                </button>
              )}
            </div>

            {selectedGiftId === gift.id && !gift.taken && (
              <div className="mt-4 border-t pt-4 animate-fade-in">
                {!guest && (
                  <>
                    <p className="mb-2">Você irá comparecer ao casamento?</p>
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setPresenceAnswer(true)}
                        className={`px-3 py-1 rounded text-white ${presenceAnswer === true ? 'bg-green-700' : 'bg-green-500'}`}
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => setPresenceAnswer(false)}
                        className={`px-3 py-1 rounded text-white ${presenceAnswer === false ? 'bg-red-700' : 'bg-red-500'}`}
                      >
                        Não
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border p-2 rounded w-full mb-2"
                    />
                    <input
                      type="email"
                      placeholder="Seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border p-2 rounded w-full mb-4"
                    />
                  </>
                )}

                <button
                  onClick={handleGiftConfirm}
                  className="bg-green-600 text-white px-4 py-2 rounded"
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
