import React, { useState } from 'react';

interface PresenceFormProps {
  onSubmit: (name: string, email: string) => void;
}

export default function PresenceForm({ onSubmit }: PresenceFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }
    onSubmit(name, email);
    setName('');
    setEmail('');
  };

  return (
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
  );
}
