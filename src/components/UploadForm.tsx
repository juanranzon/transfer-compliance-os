'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [risks, setRisks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, seleccione un archivo PDF.');
      return;
    }

    setLoading(true);
    setError('');
    setExtractedText('');
    setRisks([]);

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
      setRisks(data.risks);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Analizador de Contratos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subir Contrato (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Analizando...' : 'Analizar Contrato'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-red-600">{error}</p>
      )}

      {risks.length > 0 && (
        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
          <h3 className="text-lg font-bold text-red-800">Riesgos Detectados:</h3>
          <ul className="mt-2 list-disc list-inside text-red-700">
            {risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      )}

      {extractedText && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900">Texto Extraído:</h3>
          <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
}
