"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, FileUp, Loader2, ShieldAlert, FileText, Download, RotateCcw } from "lucide-react";

/**
 * Componente de UI completo para la app Analizador de Contratos TPO
 * - Mantiene la misma lógica de UploadForm (subida de PDF -> /api/upload)
 * - Presenta layout profesional con resaltado de palabras clave de riesgo TPO
 * - Listado de riesgos, texto extraído con highlight y acciones (descargar/limpiar)
 *
 * Requisitos:
 * - TailwindCSS configurado en el proyecto
 * - Endpoint /api/upload que devuelva { text: string, risks: string[] }
 */
export default function AnalizadorContratosTPO() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [risks, setRisks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, seleccione un archivo PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setExtractedText("");
    setRisks([]);

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Error al procesar el archivo. Inténtalo de nuevo.");
      const data = await response.json();
      setExtractedText(data.text || "");
      setRisks(Array.isArray(data.risks) ? data.risks : []);
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFile(null);
    setExtractedText("");
    setRisks([]);
    setError("");
  };

  // Palabras clave TPO (misma lógica del detector). Se usan para el resaltado visual del texto.
  const tpoKeywords = useMemo(
    () => [
      "terceros",
      "inversión",
      "porcentaje de una futura venta",
      "derechos económicos",
      "terceros sobre los derechos",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-slate-900 text-white py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-slate-800 shadow-inner">
              <ShieldAlert className="w-6 h-6" aria-hidden />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Analizador de Contratos TPO</h1>
          </div>
          <span className="text-xs md:text-sm opacity-80">v1.0 • Demo UI</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: Carga y Acciones */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileUp className="w-5 h-5" /> Subir Contrato (PDF)
              </h2>
              <p className="text-sm text-gray-600 mt-1">Carga un archivo en formato PDF para analizar riesgos de Propiedad de Terceros (TPO).</p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="flex-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-gray-200 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
                {file && (
                  <p className="text-xs text-gray-600 truncate"><span className="font-medium">Seleccionado:</span> {file.name}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Analizando...
                    </>
                  ) : (
                    <> <FileText className="w-5 h-5" /> Analizar Contrato </>
                  )}
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                  >
                    <RotateCcw className="w-4 h-4" /> Limpiar
                  </button>

                  {extractedText && (
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(extractedText)}`}
                      download={`analisis-contrato.txt`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Download className="w-4 h-4" /> Exportar TXT
                    </a>
                  )}
                </div>

                {error && (
                  <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>
                )}
              </form>
            </div>

            {/* Resumen de Riesgos */}
            <ResumenRiesgosPanel risks={risks} />
          </section>

          {/* Columna derecha: Resultados */}
          <section className="lg:col-span-2 space-y-6">
            <RiesgosDetectadosCard risks={risks} />
            <TextoExtraidoCard text={extractedText} keywords={tpoKeywords} />
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
          <p>Este demo resalta frases asociadas a TPO con fines informativos.</p>
          <p>© {new Date().getFullYear()} Analizador TPO</p>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------- Subcomponentes ------------------------- */

function ResumenRiesgosPanel({ risks }: { risks: string[] }) {
  const nivel = risks.length === 0 ? "Sin riesgos" : risks.length <= 2 ? "Bajo" : risks.length <= 5 ? "Medio" : "Alto";
  const tono =
    risks.length === 0
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : risks.length <= 2
      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
      : risks.length <= 5
      ? "bg-orange-50 text-orange-800 border-orange-200"
      : "bg-red-50 text-red-800 border-red-200";

  return (
    <div className={`mt-6 p-5 border rounded-2xl ${tono}`}>
      <div className="flex items-center gap-2 mb-1">
        <ShieldAlert className="w-5 h-5" />
        <h3 className="text-sm font-bold">Resumen de Riesgo</h3>
      </div>
      <p className="text-sm leading-relaxed">
        Nivel: <span className="font-semibold">{nivel}</span> · Coincidencias: <span className="font-semibold">{risks.length}</span>
      </p>
      {risks.length > 0 && (
        <ul className="text-xs mt-2 list-disc list-inside space-y-1">
          {risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RiesgosDetectadosCard({ risks }: { risks: string[] }) {
  if (!risks || risks.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Riesgos Detectados</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">No se han detectado riesgos. Sube un contrato para comenzar el análisis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 text-red-800">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Riesgos Detectados</h3>
      </div>
      <ul className="mt-3 list-disc list-inside text-red-700 space-y-2">
        {risks.map((risk, index) => (
          <li key={index}>{risk}</li>
        ))}
      </ul>
    </div>
  );
}

function TextoExtraidoCard({ text, keywords }: { text: string; keywords: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 text-slate-800">
        <FileText className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Texto Extraído</h3>
      </div>

      {!text ? (
        <p className="text-sm text-gray-600 mt-2">Aquí aparecerá el contenido del contrato extraído desde el PDF.</p>
      ) : (
        <div className="mt-3 max-h-[32rem] overflow-y-auto leading-relaxed text-sm text-gray-800 whitespace-pre-wrap">
          <Highlighter content={text} keywords={keywords} />
        </div>
      )}
    </div>
  );
}

/* ---------------------- Highlighter utilitario --------------------- */

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlighter({ content, keywords }: { content: string; keywords: string[] }) {
  // Construye una sola regex con todas las palabras/frases (case-insensitive)
  const pattern = useMemo(() => {
    const parts = keywords
      .filter(Boolean)
      .sort((a, b) => b.length - a.length) // priorizar frases largas
      .map((k) => escapeRegExp(k));
    return new RegExp(`(${parts.join("|")})`, "gi");
  }, [keywords]);

  const chunks = useMemo(() => {
    if (!content) return [content];
    const res: Array<{ text: string; match: boolean }> = [];
    let lastIndex = 0;
    for (const m of content.matchAll(pattern)) {
      const start = m.index ?? 0;
      if (start > lastIndex) {
        res.push({ text: content.slice(lastIndex, start), match: false });
      }
      res.push({ text: m[0], match: true });
      lastIndex = start + m[0].length;
    }
    if (lastIndex < content.length) {
      res.push({ text: content.slice(lastIndex), match: false });
    }
    return res;
  }, [content, pattern]);

  return (
    <>
      {chunks.map((c, i) =>
        c.match ? (
          <mark key={i} className="bg-red-100 text-red-800 px-0.5 rounded">
            {c.text}
          </mark>
        ) : (
          <span key={i}>{c.text}</span>
        )
      )}
    </>
  );
}
