import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getAIResponse = async (userPrompt) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: userPrompt },
      ],
    });

    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    throw error;
  }
};