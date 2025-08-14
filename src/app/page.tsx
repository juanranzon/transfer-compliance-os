"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolidarityForm from "@/components/forms/SolidarityForm";
import SolidarityResultCard from "@/components/ui/SolidarityResultCard";

export default function Home() {
  const [result, setResult] = useState<number>();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <SolidarityForm onCalculate={(res) => setResult(res)} />
        <SolidarityResultCard result={result} />
      </main>

      <Footer />
    </div>
  );
}
