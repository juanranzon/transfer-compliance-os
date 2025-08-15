import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
// import { detectRisks } from '@/lib/riskDetection'; // Comentar temporalmente

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdfFile') as File;
    
    if (!pdfFile) {
      return NextResponse.json({ error: 'No se proporcionó archivo PDF' }, { status: 400 });
    }

    const bytes = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const data = await pdf(buffer);
    
    // Temporal: usar array vacío en lugar de detectRisks
    const risks: string[] = [];
    
    return NextResponse.json({
      text: data.text,
      risks: risks
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Error al procesar el archivo PDF' },
      { status: 500 }
    );
  }
}
