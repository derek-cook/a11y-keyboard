import { useQuery } from "@tanstack/react-query";
import { type GetTextCompletionResponse } from "~/app/api/text-completion/route";
import { useDebouncedValue } from "~/lib/hooks/useDebouncedValue";

export const useSuggestions = ({ text }: { text: string }) => {
  const debouncedText = useDebouncedValue(text, 1000);

  const { data, isError, error } = useQuery<GetTextCompletionResponse>({
    queryKey: ["suggestions", debouncedText],
    queryFn: async (): Promise<GetTextCompletionResponse> => {
      const res = await fetch(`/api/text-completion`, {
        method: "POST",
        body: JSON.stringify({ text: debouncedText }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch suggestions: ${res.statusText}`);
      }

      const json = (await res.json()) as unknown;
      
      // Ensure we have an array before returning
      if (!Array.isArray(json)) {
        throw new Error("Invalid response format: expected an array");
      }

      return json as GetTextCompletionResponse;
    },
    enabled: !!debouncedText,
  });

  // Only use slice for successful responses with valid array data
  const suggestions = Array.isArray(data) ? data.slice(0, 3) : [];

  return { 
    suggestions,
    error: isError ? error : null,
  };
};
