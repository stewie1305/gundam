import { GoogleGenAI, Type } from "@google/genai";

// Always initialize GoogleGenAI as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBuildAdvice = async (userPrompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction:
          "You are an expert Gunpla (Gundam Plastic Model) builder and shop assistant. Your name is 'Haro'. Provide concise, helpful build tips, model recommendations, and series information. Use a friendly tone with occasional Gundam references like 'Engaging systems!' or 'Target locked!'.",
      },
    });
    // Fix: Access the .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The system is currently undergoing maintenance. Please try again later, pilot!";
  }
};

export const generateGundamArt = async (prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: `Gundam box art style, highly detailed robotic design, cinematic lighting, masterpiece: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    // Fix: Iterate through all parts to find the image part as per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

export const analyzeKit = async (kitName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 pro-level build tips specifically for the ${kitName} model kit. Focus on articulation, nub removal, or painting.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });
    // Fix: Access the .text property directly
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [
      "Clean your nippers regularly",
      "Use fine-grit sandpaper",
      "Test fit parts before glue",
    ];
  }
};

export const generateProductDescription = async (
  name: string,
  grade: string
) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a 2-sentence marketing description for a new ${grade} ${name} Gundam model kit.`,
    });
    // Fix: Access the .text property directly
    return response.text;
  } catch (error) {
    return "A high-quality mobile suit kit perfect for any collection.";
  }
};
