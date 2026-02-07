
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeContent(
  text: string, 
  videoBase64?: string
): Promise<AnalysisResult> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are a Misinformation and Harmfulness Analysis engine.
    Your task is to analyze user-provided text and video context to detect misinformation and calculate a harmfulness score (0-100).
    
    Hate speech, Violence, Medical Misinformation, and Political Manipulation are the key metrics for harmfulness.
    
    Risk Level Mapping:
    0-30: LOW
    31-70: MEDIUM
    71-100: HIGH

    Respond ONLY in the specified JSON format.
  `;

  const prompt = `
    Analyze the following input:
    Text: ${text || "None provided"}
    ${videoBase64 ? "A video file was also provided." : "No video provided."}

    If video is provided, simulate a speech-to-text transcript if needed or analyze its themes.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      combined_text: { type: Type.STRING, description: "Aggregated transcript and input text" },
      misinformation_label: { type: Type.STRING, description: "REAL or MISINFORMATION" },
      harmfulness_score: { type: Type.NUMBER, description: "0-100 score" },
      risk_level: { type: Type.STRING, description: "LOW, MEDIUM, or HIGH" },
      input_sources: { type: Type.ARRAY, items: { type: Type.STRING } },
      breakdown: {
        type: Type.OBJECT,
        properties: {
          hate_speech: { type: Type.NUMBER },
          violence: { type: Type.NUMBER },
          medical: { type: Type.NUMBER },
          political: { type: Type.NUMBER },
        },
        required: ["hate_speech", "violence", "medical", "political"]
      },
      explanation: { type: Type.STRING }
    },
    required: ["combined_text", "misinformation_label", "harmfulness_score", "risk_level", "input_sources", "breakdown", "explanation"]
  };

  const contents: any[] = [{ text: prompt }];
  if (videoBase64) {
    contents.push({
      inlineData: {
        mimeType: 'video/mp4',
        data: videoBase64
      }
    });
  }

  const result = await ai.models.generateContent({
    model,
    contents: { parts: contents },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema,
    }
  });

  try {
    return JSON.parse(result.text || '{}');
  } catch (e) {
    throw new Error("Failed to parse AI analysis results.");
  }
}
