import { useQuery } from "@tanstack/react-query";
import { type GetTextCompletionResponse } from "~/app/api/text-completion/route";
import { useDebouncedValue } from "~/features/keyboard/hooks/useDebouncedValue";

export const useSuggestions = ({ text }: { text: string }) => {
  const debouncedText = useDebouncedValue(text, 1000);

  const { data } = useQuery<GetTextCompletionResponse>({
    queryKey: ["suggestions", debouncedText],
    queryFn: (): Promise<GetTextCompletionResponse> =>
      fetch(`/api/text-completion`, {
        method: "POST",
        body: JSON.stringify({ text: debouncedText }),
      }).then((res) => res.json()),
    enabled: !!debouncedText,
  });

  return { suggestions: data?.slice(0, 3) ?? [] };
};
