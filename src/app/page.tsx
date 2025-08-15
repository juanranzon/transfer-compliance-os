"use client";
import SolidarityForm from "../components/forms/SolidarityForm";
import SolidarityResultCard from "../components/ui/SolidarityResultCard";
import { useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState<number | null>(null);
  
  const handleCalculate = (value: number) => {
    setResult(value);
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg space-y-6">
        <SolidarityForm onCalculate={handleCalculate} />
        {result !== null && <SolidarityResultCard result={result} />}
      </div>
    </div>
  );
}
