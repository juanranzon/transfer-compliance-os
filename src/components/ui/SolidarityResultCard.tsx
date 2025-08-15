import React from 'react';

// Interfaces para el nuevo sistema de cumplimiento
interface ComplianceResult {
  isCompliant: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  checks: ComplianceCheck[];
  recommendations?: string[];
}

interface ComplianceCheck {
  name: string;
  passed: boolean;
  description: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

// Props que mantienen compatibilidad con ambas interfaces
interface SolidarityResultCardProps {
  result?: number | ComplianceResult | null; // Mantener compatibilidad
  isLoading?: boolean;
}

const SolidarityResultCard: React.FC<SolidarityResultCardProps> = ({ result, isLoading }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si result es undefined o null
  if (result === undefined || result === null) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-center">
          Complete el formulario para ver los resultados
        </p>
      </div>
    );
  }

  // Si result es un número (interfaz anterior - cálculo de solidaridad)
  if (typeof result === 'number') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Cálculo de Solidaridad
        </h2>
        <p className="text-3xl font-bold text-green-600">
          USD {result.toFixed(2)}
        </p>
      </div>
    );
  }

  // Si result es un objeto ComplianceResult (nueva interfaz)
  const complianceResult = result as ComplianceResult;

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'text-green-600 bg-green-100';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100';
      case 'HIGH':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCheckIcon = (passed: boolean, severity: string) => {
    if (passed) {
      return (
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    if (severity === 'ERROR') {
      return (
        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    
    return (
      <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Resultado de Cumplimiento
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(complianceResult.riskLevel)}`}>
            {complianceResult.isCompliant ? '✓ CUMPLE' : '⚠ NO CUMPLE'}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Nivel de Riesgo</p>
            <p className={`font-semibold ${getRiskColor(complianceResult.riskLevel).split(' ')[0]}`}>
              {complianceResult.riskLevel === 'LOW' ? 'BAJO' : 
               complianceResult.riskLevel === 'MEDIUM' ? 'MEDIO' : 'ALTO'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Puntuación</p>
            <p className="font-semibold text-blue-600">{complianceResult.score}/100</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Verificaciones de Cumplimiento</h4>
        {complianceResult.checks?.map((check, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
            {getCheckIcon(check.passed, check.severity)}
            <div className="flex-1">
              <p className="font-medium text-gray-900">{check.name}</p>
              <p className="text-sm text-gray-600">{check.description}</p>
            </div>
          </div>
        ))}
      </div>

      {complianceResult.recommendations && complianceResult.recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h4 className="font-semibold text-blue-900 mb-2">Recomendaciones</h4>
          <ul className="space-y-1">
            {complianceResult.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800">• {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SolidarityResultCard;
export type { ComplianceResult, ComplianceCheck };
