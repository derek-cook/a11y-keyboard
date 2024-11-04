import OpenAI from "openai";

const openai = new OpenAI();

interface RequestBody {
  text: string;
}

export type GetTextCompletionResponse = string[];

const processLogprobs = (response: OpenAI.Chat.Completions.ChatCompletion) => {
  const { choices } = response;
  const topMessage = choices[0]?.message.content ?? "";
  const nextTopLogprobs =
    choices[0]?.logprobs?.content?.[0]?.top_logprobs.slice(1) ?? []; // first item is the top choice but sometimes it's split into two tokens
  const nextTopMessages = nextTopLogprobs.map((logprob) => logprob.token);

  const topChoices = [topMessage, ...nextTopMessages];
  const normalizedTopMessages = topChoices
    .map((value) => value.toLowerCase())
    .filter((value) => value.length > 1)
    .filter((value) => !value.includes("<|")); // a few results have tokens like <|end|> in it. I could probably handle that to mean the sentence should end with a "."

  const uniqueTopMessages = [];
  const set = new Set<string>();
  for (const message of normalizedTopMessages) {
    if (!set.has(message)) {
      uniqueTopMessages.push(message);
      set.add(message);
    }
  }

  return uniqueTopMessages;
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
    logprobs: true,
    top_logprobs: 10,
    n: 1,
    max_completion_tokens: 2,
    top_p: 0.1,
  });

  return new Response(JSON.stringify(processLogprobs(response)));
}
