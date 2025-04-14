import React, { useState } from 'react';
import { saveGuest } from '../services/firebaseGuestsService.ts';
import { sendGuestEmail } from '../services/emailService.ts';

interface PresenceFormProps {
  onSubmit: (name: string, email: string) => void;
}

export default function PresenceForm({ onSubmit }: PresenceFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }

    await saveGuest(name, email, true);
    await sendGuestEmail(name, email, true); // presença confirmada, sem presente

    onSubmit(name, email);

    setName('');
    setEmail('');
    alert("Presença confirmada com sucesso!");
  };

  return (
    <section className='mt-10'>
      <h2 className="text-2xl font-semibold mb-4">Lista de Presença</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Confirmar Presença
        </button>
      </form>
    </section>
  );
}
