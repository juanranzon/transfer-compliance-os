// src/lib/riskDetection.ts

export function detectRisks(text: string): string[] {
  const risks: string[] = [];
  const textLowerCase = text.toLowerCase();

  // Palabras clave relacionadas con la Propiedad de Terceros (TPO)
  const tpoKeywords = [
    'third-party ownership',
    'propiedad de terceros',
    'economic rights',
    'derechos económicos',
    'investor',
    'inversor',
    'transfer fee percentage',
    'porcentaje de la transferencia',
  ];

  tpoKeywords.forEach(keyword => {
    if (textLowerCase.includes(keyword)) {
      risks.push(`Posible riesgo de Propiedad de Terceros (TPO) detectado por la palabra clave: "${keyword}".`);
    }
  });

  if (risks.length > 0) {
    return risks;
  } else {
    return ['No se detectaron riesgos de TPO en el contrato.'];
  }
}
