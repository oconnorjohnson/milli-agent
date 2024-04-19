import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import kv from "@vercel/kv";


// create an OpenAI API client 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) { 
    const { messages } = await req.json();
    // const key = JSON.stringify(messages);

    // Check if we have a cached response
//   const cached = await kv.get(key);
//   if (cached) {
//     return new Response(cached);
 
    // Optional: Emulate streaming by breaking the cached response into chunks
 
    // const chunks = cached.split(' ');
    // const stream = new ReadableStream({
    //   async start(controller) {
    //     for (const chunk of chunks) {
    //       const bytes = new TextEncoder().encode(chunk + ' ');
    //       controller.enqueue(bytes);
    //       await new Promise((r) =>
    //         setTimeout(
    //           r,
    //           // get a random number between 10ms and 50ms to simulate a random delay
    //           Math.floor(Math.random() * 40) + 10
    //         )
    //       );
    //     }
    //     controller.close();
    //   },
    // });
    // return new StreamingTextResponse(stream);
  // }

    // ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        stream: true,
        messages,
    });
    // conver the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Convert the response into a friendly text-stream
    // const stream = OpenAIStream(response, {
    // async onFinal(completion) {
      // Cache the response. Note that this will also cache function calls.
     //  await kv.set(key, completion);
     //  await kv.expire(key, 60 * 60);
  //   },
 // });

    // Respond with the stream
    return new StreamingTextResponse(stream);
}