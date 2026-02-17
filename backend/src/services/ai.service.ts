import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate an AI-powered lesson using OpenAI GPT-4o
 * @param prompt - The learning topic or question from the user
 * @returns AI-generated lesson as a string
 * @throws Error if OpenAI API call fails
 */
export const generateLesson = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a professional learning assistant that explains topics clearly and structured like a lesson.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};
