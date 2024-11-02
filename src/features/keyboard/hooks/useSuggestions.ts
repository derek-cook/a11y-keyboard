import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDebouncedValue } from "~/lib/hooks/useDebouncedValue";
let done = false;
export const useSuggestions = ({ text }: { text: string }) => {
  const debouncedText = useDebouncedValue(text, 1000);

  const { data, refetch } = useQuery<{
    choices: { message: { content: string } }[];
  }>({
    queryKey: ["suggestions", debouncedText],
    queryFn: async (): Promise<{
      choices: { message: { content: string } }[];
    }> =>
      await fetch(`/api/text-completion`, {
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
