interface SolidarityResultCardProps {
  result?: number;
}

export default function SolidarityResultCard({ result }: SolidarityResultCardProps) {
  if (result === undefined) return null;

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
