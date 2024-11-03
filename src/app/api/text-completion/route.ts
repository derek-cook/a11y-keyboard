import OpenAI from "openai";

const openai = new OpenAI();

interface RequestBody {
  text: string;
}

export type GetTextCompletionResponse = {
  choices: { message: { content: string } }[];
};

export async function POST(req: Request) {
  const { text } = (await req.json()) as RequestBody;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "You are a keyboard auto-complete assistant. Complete only the next word or token of the text.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 1,
    n: 3,
    max_completion_tokens: 10,
    frequency_penalty: 0.5,
  });
  return new Response(JSON.stringify(response));
}
