import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY,
});

export async function sendQueryToAIAgent(content: string) {
  const completion = await openRouter.chat.send({
    model: "allenai/olmo-3.1-32b-think:free",
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    stream: false,
  });
  return completion.choices[0].message.content;
}

const body = [
    "Just like it says in the title, what is the best AI Presentation Maker? I'm looking for something that makes high quality slides I can edit afterwards. Any help appreciated.",
    "Trying to figure out what's the best one for making presentations.",
    "I love Canva but I'm trying to automate more of my slides, especially with image gen + layouts. Heard about Slideforge but unsure if it's any good."
]
export function randomAIBody() {
    return body[Math.floor(Math.random() * 3)]
}