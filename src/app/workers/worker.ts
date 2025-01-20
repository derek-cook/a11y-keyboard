"use client";
import {
  pipeline,
  type TextGenerationPipeline,
} from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "text-generation" as const;
  static model_id = "Xenova/distilgpt2";
  static instance: Promise<TextGenerationPipeline> | null = null;

  static async getInstance() {
    this.instance ??= pipeline(this.task, this.model_id, {
      progress_callback: (data) => {
        self.postMessage(data);
      },
      model_file_name: "decoder_model_merged",
      device: "webgpu",
    });

    return this.instance;
  }
}

type WorkerEvent = {
  type: "generate";
  text: string;
};

const generateText = async (event: MessageEvent<WorkerEvent>) => {
  const pipeline = await PipelineSingleton.getInstance();
  const text = event.data.text?.trim();

  if (!text) {
    return;
  }

  const result = await pipeline(text, {
    max_new_tokens: 1,
    num_beams: 3,
    temperature: 1,
    do_sample: true,
    top_k: 3,
    // num_return_sequences: 3, // Doesn't work right now https://github.com/huggingface/transformers.js/issues/1007
  });
  console.log({ result });

  self.postMessage({
    type: "complete",
    data: result,
  });
};
// Listen for messages from the main thread
self.addEventListener("message", (event: MessageEvent<WorkerEvent>) => {
  if (event.data.type === "generate") {
    void generateText(event);
  } else if (event.data.type === "load") {
    void PipelineSingleton.getInstance();
  }
});
