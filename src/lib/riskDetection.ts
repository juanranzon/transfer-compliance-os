export function detectRisks(text: string): string[] {
  const risks: string[] = [];
  const lowercaseText = text.toLowerCase();
  
  // Detectar términos de riesgo básicos
  const riskPatterns = [
    { pattern: /penalti|multa|sanción/i, message: "Se detectaron cláusulas de penalización" },
    { pattern: /terminación|rescisión/i, message: "Cláusulas de terminación del contrato" },
    { pattern: /exclusión|limitación de responsabilidad/i, message: "Limitaciones de responsabilidad" },
  ];
  
  riskPatterns.forEach(({ pattern, message }) => {
    if (pattern.test(text)) {
      risks.push(message);
    }
  });
  
  return risks;
}
