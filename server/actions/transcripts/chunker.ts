"use server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getFormattedTranscriptionByMeetingId } from "@/server/db/read";

const opeani = new OpenAI();

// step 1: take full transcript return from getFormattedTranscriptionByMeetingId and break into chunks of 10000 characters

export async function chunkTranscript({ MeetingId}: { MeetingId: number}) {
    let responses = [];
    try { 
        const fullScript = await getFormattedTranscriptionByMeetingId({ MeetingId: MeetingId })
        // split the full transcript into chunks of 10000 characters
        if (fullScript && fullScript.length > 10000) { 
            const chunks = fullScript.match(/.{1,10000}/g);
            if (chunks) {
                for (const chunk of chunks) { 
                    
                    const completion = await opeani.chat.completions.create({ 
                        messages: [
                            {
                                role: "system",
                                content: "1. Read through the transcript chunk: Thoroughly review the provided text, focusing on shifts in discussion or thematic changes.\n2. Identify distinct topics: Determine the main ideas or topics that are being discussed throughout the transcript. Look for keywords, thematic shifts, and changes in speaker focus as indicators.\n3. Generate titles for each topic: Create clear and descriptive titles for each identified topic to encapsulate the main idea effectively.\n4. Extract sentences: For each topic, provide the first sentence where the topic is introduced and the last sentence that concludes the discussion on that topic. This will help in understanding the scope and boundaries of each topic discussed.\n5. Structure the output: Organize the information in a clear format, listing each topic title followed by the first and last sentence of its respective discussion. This structured summary will aid in quick reference and clarity.\n\nExample:\n\nExample Transcript Chunk:\n\n\"Okay, let's start with our main character. We've discussed making her a young detective, fresh out of the academy. Thoughts? ... I think that gives us a lot of room to explore her growth. Maybe her first big case could set the tone for the series. ... Moving on, we should consider the setting. A big city, perhaps? It provides the perfect backdrop for high-stakes crime solving. ... Yes, and don't forget about the tech aspect. Integrating modern technology into our detective's toolkit could really set our show apart. ... Lastly, what about secondary characters? We need a strong supporting cast. Maybe a seasoned detective as a mentor? That could add a nice dynamic to the show.\"\n\nExpected Output:\n\nTopic 1: Main Character Introduction\n- Title: \"Introduction of Main Character\"\n- First Sentence: \"Okay, let's start with our main character.\"\n- Last Sentence: \"Maybe her first big case could set the tone for the series.\"\n\nTopic 2: Setting\n- Title: \"Choice of Setting for the Show\"\n- First Sentence: \"Moving on, we should consider the setting.\"\n- Last Sentence: \"It provides the perfect backdrop for high-stakes crime solving.\"\n\nTopic 3: Technological Elements\n- Title: \"Incorporating Technology in the Plot\"\n- First Sentence: \"Yes, and don't forget about the tech aspect.\"\n- Last Sentence: \"Integrating modern technology into our detective's toolkit could really set our show apart.\"\n\nTopic 4: Secondary Characters\n- Title: \"Development of Secondary Characters\"\n- First Sentence: \"Lastly, what about secondary characters?\"\n- Last Sentence: \"That could add a nice dynamic to the show.\"",
                            },
                            {
                                role: "user", 
                                content: chunk
                            },
                        ],
                        model: "gpt-4-turbo",
                        // response_format: { type: "json_object" },
                    });
                    responses.push(completion.choices[0].message.content);
                    console.log(completion.choices[0].message.content);
                }
            } 
        }
        console.log(responses);
        return responses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


