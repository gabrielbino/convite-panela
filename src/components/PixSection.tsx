import React from 'react';

interface PixSectionProps {
  pixKey: string;
}

export default function PixSection({ pixKey }: PixSectionProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      alert('Chave Pix copiada com sucesso!');
    } catch (err) {
      alert('Não foi possível copiar a chave Pix.');
    }
  };

  return (
    <section className="bg-white text-center mt-12 px-4 py-8 rounded shadow border border-[#9CB983] max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#354B25] mb-4">Deseja nos abençoar com um Pix?</h2>
      <p className="text-[#9CB983] mb-6">Use a chave abaixo para enviar seu presente 💖</p>

      <div className="grid grid-cols-[1fr_auto] max-w-md mx-auto bg-[#f3f3f3] border border-[#9CB983] rounded overflow-hidden">
        <span className="px-4 py-2 text-sm text-gray-800 truncate">{pixKey}</span>
        <button
          onClick={handleCopy}
          className="bg-[#6CBD46] hover:bg-[#426221] text-white text-sm px-4 py-2 transition"
        >
          Copiar
        </button>
      </div>

      <p className="text-sm text-[#9CB983] mt-4">Daniel Fernandes Bino - NU Pagamentos S.A.</p>
      <p className="text-sm text-[#9CB983] mt-4 italic">Toda forma de carinho será recebida com amor</p>
    </section>
  );
}
