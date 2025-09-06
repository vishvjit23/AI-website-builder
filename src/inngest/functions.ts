import { openai, createAgent, Agent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You write readable, maintainable code. Your write simple Next.js & React snippets.",
      model: openai({ model: "openai/gpt-oss-120b:together", apiKey: process.env.HF_TOKEN, baseUrl: "https://router.huggingface.co/v1" })
    });

    const output = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );
    
    console.log("Output:", output);
    return { output };
  },
);