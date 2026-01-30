
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsights, Temple } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTempleInsights = async (temple: Temple): Promise<AIInsights> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide spiritual insights and queue predictions for ${temple.name} located in ${temple.location}. 
                 Current wait count is ${temple.currentQueueCount} people.
                 Return data in JSON format with these fields: prediction, bestTime, spiritualTip.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.STRING, description: "A prediction about the crowd for the next few hours." },
            bestTime: { type: Type.STRING, description: "The best time to visit for a peaceful darshan today." },
            spiritualTip: { type: Type.STRING, description: "A small spiritual tip or mantra related to the deity." }
          },
          required: ["prediction", "bestTime", "spiritualTip"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return {
      prediction: "The queue is moving steadily. Expect a moderate wait.",
      bestTime: "Early mornings or late evenings are generally quieter.",
      spiritualTip: "Focus on your inner peace while waiting for the divine darshan."
    };
  }
};
