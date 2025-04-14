import React from "react";

interface PixSectionProps {
  pixKey: string;
}

export default function PixSection({ pixKey }: PixSectionProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave Pix copiada com sucesso!");
  };

  return (
    <section className="mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-2">Deseja nos abençoar com um Pix?</h2>
      <p className="text-gray-700 mb-4">
        Use a chave abaixo para enviar seu presente 💖
      </p>

      <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-3 rounded shadow-sm">
        <span className="font-mono text-sm select-all">{pixKey}</span>
        <button
          onClick={handleCopy}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
        >
          Copiar
        </button>
      </div>
      <p className="text-gray-500 mt-4">
        Daniel Fernandes Bino - NU Pagamentos S.A.
      </p>
    </section>
  );
}
