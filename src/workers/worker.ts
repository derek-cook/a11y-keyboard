import {
  pipeline,
  type TextGenerationPipeline,
} from "@huggingface/transformers";

class PredictiveTextGenerator {
  task = "text-generation" as const;
  model_id = "Xenova/gpt2" as const;
  generator: TextGenerationPipeline | null = null;

  constructor() {
    this.generator = null;
  }

  async initialize() {
    this.generator ??= await pipeline(
      this.task,
      this.model_id, // or your specific model
      {
        progress_callback: (data) => {
          self.postMessage(data);
        },
        model_file_name: "decoder_model_merged",
        device: "webgpu",
        dtype: "fp32",
      },
    );
  }

  async predictNextTokens(inputText: string) {
    if (!this.generator) {
      await this.initialize();
    }

    try {
      const result = await this.generator!(inputText, {
        max_new_tokens: 1, // Limit to 1-2 tokens
        do_sample: true, // Enable diverse sampling
        top_k: 3, // Top-k sampling
        top_p: 0.9, // Nucleus sampling
        num_return_sequences: 3,
        return_full_text: false,
        use_cache: false,
      });
      console.log({ result });

      self.postMessage({
        type: "complete",
        data: result,
      });

      return result;
    } catch (error) {
      console.error("Error generating text:", error);
      // throw error;
    }
  }
}

// Usage example
const textGenerator = new PredictiveTextGenerator();
void textGenerator.predictNextTokens("Hello, how are");

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data.type === "generate") {
    void textGenerator.predictNextTokens(event.data.text);
  } else if (event.data.type === "load") {
    void textGenerator.initialize();
  }
});
