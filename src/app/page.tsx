"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolidarityForm from "@/components/SolidarityForm";
import SolidarityResultCard from "@/components/SolidarityResultCard";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (data: {
    playerName: string;
    birthDate: string;
    transferDate: string;
    transferAmount: number;
  }) => {
    // Ejemplo simple de cálculo (3% del monto transferido)
    const solidarityFee = data.transferAmount * 0.03;
    setResult(solidarityFee);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <SolidarityForm onCalculate={handleCalculate} />
          <SolidarityResultCard result={result ?? undefined} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
