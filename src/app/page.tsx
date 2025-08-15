"use client";
import { useState } from "react";
import { Upload, FileText, Trash2, AlertTriangle } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [risks, setRisks] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("pdfFile", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setRisks(data);
    setLoading(false);
  };

  const handleClear = () => {
    setFile(null);
    setRisks(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
          Transfer Compliance OS
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Analizador de Contratos TPO v1.0
        </p>

        {/* Subir contrato */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
          <Upload className="mx-auto mb-3 text-gray-400" size={40} />
          <h2 className="text-lg font-semibold mb-2">
            Subir Contrato (PDF)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Carga un archivo PDF para analizar posibles riesgos de Propiedad de
            Terceros (TPO).
          </p>
          <input
            type="file"
            accept="application/pdf"
            className="mb-4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && (
            <p className="text-sm text-gray-600 mb-4">
              Archivo seleccionado: <strong>{file.name}</strong>
            </p>
          )}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50 flex items-center gap-2"
            >
              <FileText size={18} />
              {loading ? "Analizando..." : "Analizar Contrato"}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <Trash2 size={18} />
              Limpiar
            </button>
          </div>
        </div>

        {/* Resultados */}
        {risks && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Resumen de Riesgo
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="font-medium text-yellow-800">
                <AlertTriangle className="inline-block mr-2" size={20} />
                Nivel: {risks?.risks?.length > 0 ? "Medio" : "Sin riesgos"} ·
                Coincidencias: {risks?.risks?.length || 0}
              </p>
            </div>
            {risks?.risks?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {risks.risks.map((r: string, i: number) => (
                  <li key={i} className="text-gray-600">
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

