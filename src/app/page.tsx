"use client";

import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SolidarityForm from "../components/forms/SolidarityForm";
import SolidarityResultCard from "../components/ui/SolidarityResultCard";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (solidarityPayment: number) => {
    setResult(solidarityPayment);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <SolidarityForm onCalculate={handleCalculate} />
          <SolidarityResultCard result={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
