import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// create an OpenAI API client 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) { 
    const { messages } = await req.json();
    // ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        stream: true,
        messages,
    });
    // conver the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}