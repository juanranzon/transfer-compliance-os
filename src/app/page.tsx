"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolidarityForm from "@/components/forms/SolidarityForm";
import SolidarityResultCard from "@/components/ui/SolidarityResultCard";
import { useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState<number | undefined>(undefined);

  const handleCalculate = (value: number) => {
    setResult(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <SolidarityForm onCalculate={handleCalculate} />
          <SolidarityResultCard result={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
