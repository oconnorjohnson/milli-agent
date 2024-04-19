"use server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getFormattedTranscriptionByMeetingId } from "@/server/db/read";
import { updateTranscriptionWithChunkedResponses } from "@/server/db/update";

const opeani = new OpenAI();

export async function chunkTranscript({ MeetingId}: { MeetingId: number}): Promise<boolean> {
    let responses = [];
    try { 
        const fullScript = await getFormattedTranscriptionByMeetingId({ MeetingId: MeetingId })
        // console.log(`Full script length: ${fullScript!.length}`);
        // console.log("full script:", fullScript);
        // split the full transcript into chunks of 10000 characters
        if (!fullScript || fullScript.length <= 10000) { 
            // console.log("full script is smaller than 10000 characters");
            const completion = await opeani.chat.completions.create({ 
                messages: [
                    {
                        role: "system",
                        content: "Process Overview:\nThis system is specifically designed to analyze transcript chunks from extended brainstorming sessions that span several hours. Each provided chunk, which should be no more than 50,000 characters, represents just a portion of a much larger conversation. The system focuses exclusively on identifying core topics and summarizing them without generating unnecessary explanatory text. It's important to recognize that each chunk may contain discussions that begin before and end after the provided text, so contextual continuity should be considered.\n\nSteps:\n\nScan the Transcript: Carefully review the transcript chunk provided. Pay special attention to shifts in the conversation and variations in discussion points that reflect a change in thematic emphasis. Recognize that topics might not begin or conclude within the chunk and may extend across multiple chunks.\nDetect Topics: Analyze the text to isolate distinct discussion topics, noting transitions and sustained themes within the given segment. Focus on sections where a particular theme is evident, even if it's not fully enclosed within the current chunk.\nSummarize Topics: For each identified topic:\nTitle: Generate a succinct and descriptive title that captures the essence of the discussion within the segment.\nFirst Sentence: Extract the first sentence where the topic is clearly introduced in the chunk.\nLast Sentence: Identify the last sentence in the chunk that relates to the topic, even if the discussion continues beyond this segment.\nOutput Structure: The response should consist of a list of topics, each with the designated title, first sentence, and last sentence. This format ensures a concise and useful summary for easy referencing and facilitates continuity in follow-up discussions across multiple chunks.\n\nExample Application:\n\nTranscript Chunk Example:\n\n\"During today's meeting, we continued our dialogue about the protagonist's background and motivations, which we began in our last session. We revisited the idea of a tragic backstory, which was initially introduced before... As we debated, consensus was reached on its necessity for depth. Later, we turned our attention to setting choices, exploring urban environments as dynamic backdrops for our narrative. The discussion on these settings was extensive, but not conclusive... We rounded off by leaning towards a blend of high-tech and traditional elements to captivate our audience.\"\n\nExpected Output:\n\nTopic 1: Protagonist's Background\n\nTitle: \"Continuing the Discussion on the Protagonist's Background\"\nFirst Sentence: \"During today's meeting, we continued our dialogue about the protagonist's background and motivations, which we began in our last session.\"\nLast Sentence: \"As we debated, consensus was reached on its necessity for depth.\"\nTopic 2: Setting Choices\n\nTitle: \"Exploring Urban Settings for the Narrative\"\nFirst Sentence: \"Later, we turned our attention to setting choices, exploring urban environments as dynamic backdrops for our narrative.\"\nLast Sentence: \"We rounded off by leaning towards a blend of high-tech and traditional elements to captivate our audience.\""
                    },
                    {
                        role: "user", 
                        content: fullScript || ""
                    },
                ],
                model: "gpt-4-turbo",
            });
            responses.push(completion.choices[0].message.content);
            // console.log(completion.choices[0].message.content); 
            // console.log(responses);
        if (responses.length > 0) {
            const filteredResponses = responses.filter((response): response is string => response !== null);

            const updated = await updateTranscriptionWithChunkedResponses({ Responses: filteredResponses, MeetingId: MeetingId });
            if (updated) { 
                return true;
            }
        }
        } else { 
            const chunks = fullScript.match(/.{1,10000}/gs);
            // console.log("Total chunks: ", chunks!.length);
            chunks!.forEach((chunk, index) => {
                console.log(`Chunk ${index + 1} length: ${chunk.length}`);
            });
            if (chunks) {
                for (const chunk of chunks) { 
                    console.log(`Chunk length: ${chunk.length}`); 
                    const completion = await opeani.chat.completions.create({ 
                        messages: [
                            {
                                role: "system",
                                content: "Process Overview:\nThis system is specifically designed to analyze transcript chunks from extended brainstorming sessions that span several hours. Each provided chunk, which should be no more than 50,000 characters, represents just a portion of a much larger conversation. The system focuses exclusively on identifying core topics and summarizing them without generating unnecessary explanatory text. It's important to recognize that each chunk may contain discussions that begin before and end after the provided text, so contextual continuity should be considered.\n\nSteps:\n\nScan the Transcript: Carefully review the transcript chunk provided. Pay special attention to shifts in the conversation and variations in discussion points that reflect a change in thematic emphasis. Recognize that topics might not begin or conclude within the chunk and may extend across multiple chunks.\nDetect Topics: Analyze the text to isolate distinct discussion topics, noting transitions and sustained themes within the given segment. Focus on sections where a particular theme is evident, even if it's not fully enclosed within the current chunk.\nSummarize Topics: For each identified topic:\nTitle: Generate a succinct and descriptive title that captures the essence of the discussion within the segment.\nFirst Sentence: Extract the first sentence where the topic is clearly introduced in the chunk.\nLast Sentence: Identify the last sentence in the chunk that relates to the topic, even if the discussion continues beyond this segment.\nOutput Structure: The response should consist of a list of topics, each with the designated title, first sentence, and last sentence. This format ensures a concise and useful summary for easy referencing and facilitates continuity in follow-up discussions across multiple chunks.\n\nExample Application:\n\nTranscript Chunk Example:\n\n\"During today's meeting, we continued our dialogue about the protagonist's background and motivations, which we began in our last session. We revisited the idea of a tragic backstory, which was initially introduced before... As we debated, consensus was reached on its necessity for depth. Later, we turned our attention to setting choices, exploring urban environments as dynamic backdrops for our narrative. The discussion on these settings was extensive, but not conclusive... We rounded off by leaning towards a blend of high-tech and traditional elements to captivate our audience.\"\n\nExpected Output:\n\nTopic 1: Protagonist's Background\n\nTitle: \"Continuing the Discussion on the Protagonist's Background\"\nFirst Sentence: \"During today's meeting, we continued our dialogue about the protagonist's background and motivations, which we began in our last session.\"\nLast Sentence: \"As we debated, consensus was reached on its necessity for depth.\"\nTopic 2: Setting Choices\n\nTitle: \"Exploring Urban Settings for the Narrative\"\nFirst Sentence: \"Later, we turned our attention to setting choices, exploring urban environments as dynamic backdrops for our narrative.\"\nLast Sentence: \"We rounded off by leaning towards a blend of high-tech and traditional elements to captivate our audience.\""
                            },
                            {
                                role: "user", 
                                content: chunk
                            },
                        ],
                        model: "gpt-4-turbo",
                    });
                    responses.push(completion.choices[0].message.content);
                    console.log(completion.choices[0].message.content);
                }
            } 
        }
        // console.log(responses);
        if (responses.length > 0) {
            const filteredResponses = responses.filter((response): response is string => response !== null);

            const updated = await updateTranscriptionWithChunkedResponses({ Responses: filteredResponses, MeetingId: MeetingId });
            if (updated) { 
                return true;
            }
        }
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

