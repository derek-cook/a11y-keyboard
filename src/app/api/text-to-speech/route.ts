import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    response_format: "opus",
    input: text,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/ogg",
      "Transfer-Encoding": "chunked",
    },
  });
}
