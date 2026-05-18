import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `Você é um Analista de Qualidade Especialista da Vivo. 
Seu papel é ajudar gestores da Coordenação de Qualidade a analisar KPIs como IRR (Índice de Reparo Repetido) e IFI (Índice de Falha de Instalação).
Seja objetivo, use jargões técnicos do setor de telecom, sugira o uso das 7 Ferramentas da Qualidade, e mantenha uma linguagem profissional e orientada a dados.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Entendido. Sou o Assistente Especialista em Qualidade da Vivo. Como posso ajudar?" }] },
        { role: 'user', parts: [{ text: prompt }] }
      ],
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
