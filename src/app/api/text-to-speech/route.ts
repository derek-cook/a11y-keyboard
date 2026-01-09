import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI();

// Add type for request body
interface RequestBody {
  text: string;
}

export async function POST(req: Request) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:12',message:'POST handler entry',data:{method:req.method,url:req.url,headers:Object.fromEntries(req.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A,B,C'})}).catch(()=>{/* ignore */});
  // #endregion
  const { text } = (await req.json()) as RequestBody;

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    response_format: "mp3",
    input: text,
  });

  console.log({ response });

  const arrayBuffer = await response.arrayBuffer();
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:30',message:'POST handler exit - success',data:{bufferSize:arrayBuffer.byteLength},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A,B,C'})}).catch(()=>{/* ignore */});
  // #endregion
  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "audio/mp3",
    },
  });
}

// Catch-all for other methods to debug 405 errors
export async function GET() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:40',message:'GET handler called (unexpected)',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
  // #endregion
  return new Response("Method not allowed. Use POST.", { status: 405 });
}

export async function PUT() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:47',message:'PUT handler called (unexpected)',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
  // #endregion
  return new Response("Method not allowed. Use POST.", { status: 405 });
}

// Handle OPTIONS for CORS preflight requests (common in production)
export async function OPTIONS() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:53',message:'OPTIONS handler called (CORS preflight)',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
  // #endregion
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
