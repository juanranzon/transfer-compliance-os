import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { detectRisks } from '@/lib/riskDetection';
import { Buffer } from 'buffer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdfFile');

    if (!pdfFile || !(pdfFile instanceof File)) {
      return NextResponse.json(
        { error: 'No se ha subido ningún archivo PDF.' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const data = await pdf(fileBuffer);

    // 1. Extraemos el texto del PDF
    const extractedText = data.text;

    // 2. Usamos nuestra función para detectar riesgos
    const risks = detectRisks(extractedText);

    // Retornamos tanto el texto como los riesgos detectados
    return NextResponse.json(
      { text: extractedText, risks: risks },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al procesar el PDF:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
