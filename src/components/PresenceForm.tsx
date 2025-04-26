import React, { useState } from 'react';
import { saveGuest } from '../services/firebaseGuestsService.ts';
import AlertBox from './AlertBox.tsx'; // <<< Importa o AlertBox aqui

interface PresenceFormProps {
  onSubmit: (name: string) => void;
}

export default function PresenceForm({ onSubmit }: PresenceFormProps) {
  const [name, setName] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({ message: 'Por favor, preencha o nome.', type: 'error' });
      return;
    }

    try {
      await saveGuest(name, true); // apenas presença
      onSubmit(name);
      setAlert({ message: 'Presença confirmada com sucesso!', type: 'success' });
      setName('');

      setTimeout(() => {
        setAlert(null); // limpa o alerta depois de 3 segundos
      }, 3000);
      
    } catch (error) {
      console.error(error);
      setAlert({ message: 'Erro ao confirmar presença.', type: 'error' });
    }
  };

  return (
    <section className="mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#354B25]">Confirme sua presença</h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Seu nome completo (obrigatório)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-[#9CB983] px-4 py-2 rounded w-full sm:w-64 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6CBD46]"
        />
        <button
          type="submit"
          className="bg-[#426221] hover:bg-[#6CBD46] text-white font-semibold px-6 py-2 rounded transition"
        >
          Confirmar
        </button>
      </form>

      {alert && (
        <div className="mt-4">
          <AlertBox message={alert.message} type={alert.type} />
        </div>
      )}
    </section>
  );
}
