import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate an AI-powered lesson using OpenAI GPT-4o
 * @param category - Selected category name
 * @param subCategory - Selected subcategory name
 * @param prompt - The learning question from the user
 * @returns AI-generated structured lesson
 */
export const generateLesson = async (
  category: string,
  subCategory: string,
  prompt: string
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
You are a professional learning assistant.

The student selected:
Category: ${category}
Subcategory: ${subCategory}

Always answer in the context of the selected topic.
Structure the response clearly as a lesson:

1. Clear explanation
2. Key concepts
3. Simple example (if relevant)
4. Short summary
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};
