"use client";
import { useState } from "react";

interface SolidarityFormProps {
  onCalculate: (result: number) => void;
}

export default function SolidarityForm({ onCalculate }: SolidarityFormProps) {
  const [playerName, setPlayerName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [transferAmount, setTransferAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount) return;

    // Cálculo básico de ejemplo: 5% del monto
    const result = Number(transferAmount) * 0.05;
    onCalculate(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Jugador
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Nacimiento del Jugador
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Transferencia
        </label>
        <input
          type="date"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monto de la Transferencia
        </label>
        <input
          type="number"
          value={transferAmount}
          onChange={(e) =>
            setTransferAmount(e.target.value ? Number(e.target.value) : "")
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Calcular
      </button>
    </form>
  );
}
