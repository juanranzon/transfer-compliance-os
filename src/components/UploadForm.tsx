'use client';
import { useState } from 'react';
export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [risks, setRisks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo PDF.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('pdfFile', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error al procesar el archivo. Inténtalo de nuevo.');
      }
      const data = await response.json();
      setExtractedText(data.text);
      setRisks(data.risks); // Guardamos la lista de riesgos

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analizador de Contratos</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdf-file">
            Subir Contrato (PDF)
          </label>
          <input
            type="file"
            id="pdf-file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-green-600'
          }}
        >
          {isLoading ? 'Procesando...' : 'Analizar Contrato'}
        </button>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
      {risks.length > 0 && (
        <div className="bg-red-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-red-700">Riesgos Detectados:</h2>
          <ul className="list-disc list-inside text-sm text-red-800">
            {risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
      {extractedText && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Texto Extraído:</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-800">{extractedText}</p>
        </div>
      )}
    </div>
  );
}
