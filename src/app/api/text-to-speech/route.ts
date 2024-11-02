import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI();

// Add type for request body
interface RequestBody {
  text: string;
}

export async function POST(req: Request) {
  const { text } = (await req.json()) as RequestBody;

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    response_format: "mp3",
    input: text,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/mp3",
      "Transfer-Encoding": "chunked",
    },
  });
}
