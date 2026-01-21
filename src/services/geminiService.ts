import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite uses import.meta.env instead of process.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `
You are "Olive," the AI Consultant for Olivesoft.
Olivesoft is a premium French digital agency based in Paris, specializing in custom software development.
Our slogan is "Turning ideas into digital reality."

Your goal is to demonstrate our technical expertise and helpfulness.
Services we offer:
1. Web Development (React, Next.js, High performance)
2. Mobile Apps (iOS, Android, React Native)
3. AI Integration (Gemini, Automation, Data Analysis)
4. Cloud & DevOps (AWS, GCP, Azure)
5. Tech Audits

Key Selling Points:
- French Excellence (Quality, Detail)
- Results-Driven (We care about ROI, not just code)
- Tailor-made solutions (No cookie-cutter templates)

Tone: Professional, Innovative, yet Organic and Welcoming.
Keep responses under 100 words.
If asked about pricing, encourage them to use the contact form for a custom audit.
`; // keep your existing text here

interface ChatMessage {
  role: "user" | "model";
  parts: string | { text: string }[];
}

export const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    // The correct method is getGenerativeModel
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Use a stable model name
      systemInstruction: SYSTEM_INSTRUCTION 
    });

    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: typeof msg.parts === 'string' ? [{ text: msg.parts }] : msg.parts
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing high traffic. Please try again later.";
  }
};
