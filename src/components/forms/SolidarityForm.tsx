"use client";
import React, { useState } from 'react';

interface SolidarityFormProps {
  onSubmit?: (data: SolidarityData) => void;
  onCalculate?: (result: number) => void; // Mantener compatibilidad con la interfaz anterior
}

interface SolidarityData {
  senderName: string;
  receiverName: string;
  amount: number;
  currency: string;
  purpose: string;
  country: string;
}

const SolidarityForm: React.FC<SolidarityFormProps> = ({ onSubmit, onCalculate }) => {
  const [formData, setFormData] = useState<SolidarityData>({
    senderName: '',
    receiverName: '',
    amount: 0,
    currency: 'USD',
    purpose: '',
    country: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Si existe onSubmit (nueva interfaz), usarla
      if (onSubmit) {
        await onSubmit(formData);
      }
      // Si existe onCalculate (interfaz anterior), mantener compatibilidad
      else if (onCalculate && formData.amount) {
        const result = formData.amount * 0.05; // Cálculo de ejemplo
        onCalculate(result);
      }
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Verificación de Cumplimiento de Transferencia
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Remitente *
          </label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            required
            value={formData.senderName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ingrese el nombre completo"
          />
        </div>

        <div>
          <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Beneficiario *
          </label>
          <input
            type="text"
            id="receiverName"
            name="receiverName"
            required
            value={formData.receiverName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ingrese el nombre completo"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Monto *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
            Moneda *
          </label>
          <select
            id="currency"
            name="currency"
            required
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USD">USD - Dólar Estadounidense</option>
            <option value="EUR">EUR - Euro</option>
            <option value="COP">COP - Peso Colombiano</option>
            <option value="MXN">MXN - Peso Mexicano</option>
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            País de Destino *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="País de destino"
          />
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
            Propósito de la Transferencia *
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            required
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descripción del propósito"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Verificando...' : 'Verificar Cumplimiento'}
      </button>
    </form>
  );
};

export default SolidarityForm;
export type { SolidarityData };
