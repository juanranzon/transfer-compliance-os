// Define las palabras clave o frases que indican riesgo de TPO (Third-Party Ownership)
const tpoKeywords = [
  'terceros',
  'inversión',
  'porcentaje de una futura venta',
  'derechos económicos',
  'terceros sobre los derechos',
];

// Función que recibe texto y devuelve lista de riesgos detectados
export function detectRisks(text: string): string[] {
  if (!text) {
    return [];
  }

  const detectedRisks: string[] = [];
  const lowerText = text.toLowerCase();

  tpoKeywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      const riskMessage = `Riesgo de Propiedad de Terceros (TPO) detectado con la frase: "${keyword}"`;
      detectedRisks.push(riskMessage);
    }
  });

  return detectedRisks;
}
