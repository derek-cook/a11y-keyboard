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

  console.log({ response });

  const arrayBuffer = await response.arrayBuffer();
  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "audio/mp3",
    },
  });
}

// Catch-all for other methods to debug 405 errors
export async function GET() {
  return new Response("Method not allowed. Use POST.", { status: 405 });
}

export async function PUT() {
  return new Response("Method not allowed. Use POST.", { status: 405 });
}

// Handle OPTIONS for CORS preflight requests (common in production)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
