import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseService.ts';
import { corrigirGiftId } from '../utils/corrigirGiftId.ts';

interface GuestEntry {
  name: string;
  confirmed: boolean;
  gift?: string;
}

export default function AdminPanel() {
  const [guests, setGuests] = useState<GuestEntry[]>([]);
  console.log(guests)
  const [status, setStatus] = useState('');

  const handleCorrigir = async () => {
    const resultado = await corrigirGiftId();
    setStatus(resultado);
  };

  useEffect(() => {
    const q = query(collection(db, 'guests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as GuestEntry);
      setGuests(data);
    });

    return () => unsubscribe();
  }, []);

  const confirmedGuests = guests.filter(g => g.confirmed);
  const giftedGuests = guests.filter(g => g.gift);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel do Admin 👑</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Convidados confirmados</h2>
        {confirmedGuests.length === 0 ? (
          <p className="text-gray-600">Nenhuma confirmação ainda.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
            {confirmedGuests.map((g) => (
              <li>
                {g.name} 
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Presentes recebidos</h2>
        {giftedGuests.length === 0 ? (
          <p className="text-gray-600">Nenhum presente registrado ainda.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
            {giftedGuests.map((g, i) => (
              <li key={i}>
                {g.name} - {g.gift}
              </li>
            ))}
          </ul>
        )}
      </section>
      <button
        onClick={handleCorrigir}
        className="bg-[#426221] hover:bg-[#6CBD46] text-white px-4 py-2 rounded mt-4"
      >
        Corrigir giftId dos convidados
      </button>

      {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
    </div>
  );
}
