import { Sandbox} from "@e2b/code-interpreter";
import { openai, createAgent, Agent } from "@inngest/agent-kit";
import { inngest } from "./client";
import { getSandBox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxid = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("ai-webapp-builder");
      return sandbox.sandboxId;
    });

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You write readable, maintainable code. Your write simple Next.js & React snippets.",
      model: openai({ model: "openai/gpt-oss-120b:together", apiKey: process.env.HF_TOKEN, baseUrl: "https://router.huggingface.co/v1" })
    });

    const output = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );
    
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandBox(sandboxid);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });
    
    return { output, sandboxUrl };
  },
);