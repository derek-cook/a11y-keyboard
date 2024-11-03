import { useQuery } from "@tanstack/react-query";
import { type GetTextCompletionResponse } from "~/app/api/text-completion/route";
import { useDebouncedValue } from "~/lib/hooks/useDebouncedValue";

export const useSuggestions = ({ text }: { text: string }) => {
  const debouncedText = useDebouncedValue(text, 1000);

  const { data } = useQuery<{
    choices: { message: { content: string } }[];
  }>({
    queryKey: ["suggestions", debouncedText],
    queryFn: (): Promise<GetTextCompletionResponse> =>
      fetch(`/api/text-completion`, {
        method: "POST",
        body: JSON.stringify({ text: debouncedText }),
      }).then((res) => res.json()),
    enabled: !!debouncedText,
  });

  const choices = data?.choices.map(
    (choice) => choice.message.content.split(" ")[0],
  );
  const topChoices = choices ? choices.slice(0, 3) : [];

  console.log({ data });
  return { suggestions: topChoices };
};
