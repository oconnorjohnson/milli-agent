"use server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getFormattedTranscriptionByMeetingId } from "@/server/db/read";
import { updateTranscriptionWithChunkedResponses } from "@/server/db/update";
import { getTranscriptionAndResponsesByMeeting } from "@/server/db/read";

const opeani = new OpenAI();

/**
 * Processes a transcript by breaking it into manageable chunks and using OpenAI to analyze each chunk.
 * This function takes a MeetingId, retrieves the associated transcript, splits it into chunks (if necessary),
 * sends each chunk to OpenAI for processing, and then updates the database with the processed responses.
 * OpenAI returns responses with a TITLE, START, and END marker, which are used to identify the corresponding text chunks in @/server/actions/transcripts/chunk-finder.ts.
 * @param {MeetingId: number} - The ID of the meeting whose transcript needs to be chunked and processed.
 * @returns {Promise<boolean>} - A promise that resolves to true if the operation was successful.
 */

export async function chunkTranscript({ MeetingId}: { MeetingId: number}): Promise<boolean> {
    let responses = [];
    try { 
        // Retrieve the full transcript for the given meeting ID.
        const fullScript = await getFormattedTranscriptionByMeetingId({ MeetingId: MeetingId })
        
        // Check if the full transcript is less than or equal to 10000 characters.
        if (!fullScript || fullScript.length <= 10000) { 
           // If the transcript is small enough, process it in a single chunk.
            const completion = await opeani.chat.completions.create({ 
                messages: [
                    {
                        role: "system",
                        content: "Please review the provided transcript chunk and identify the various topics of the conversation pertaining brainstorming story development. For each topic identified, return a short title to summarize the topic, a copy of the first sentence to identify the start of the topic, and a copy of the last sentence to identify the end of the topic. Do not include any markdown or html formatting like line breaks, lists, or asterisks aka * for titles or otherwise. Responses should be a nonbreaking string paragraph and should remove formatting from the transcript. Be careful to copy and paste the start and end sentence TEXT exactly as it appears in the transcript. Also, your entire response per chunk should be a single paragraph. Do not separate topics with line breaks. Example Response => TITLE: Discussing Story Ideas and Character Details. START: Speaker 0: That's afters. END: Speaker 1: Yeah. TITLE: Developing Security Character Concept. START: Speaker 0: Oh, yeah. END: Speaker 1: What happened to slinging juice? TITLE: Exploring Scene Details and Script Dialogue. START: Speaker 1: Chili causing an electric frenzy inside of him. END: Speaker 1: And stream it. TITLE: Considering Book Adaptation of the Script. START: Speaker 0: I know. END: Speaker 1: We have checked it. TITLE: Envisioning Technical Challenges in Filming. START: Speaker 0: Just visualize just visualize an outcome. END: Speaker 1: You got a tab that the butcher wants to settle. TITLE: Discussing Introduction and Development of Characters. START: Speaker 1: So one note, I think, the stuff with Dodge and the Butcher kinda come out of nowhere. END: Speaker 1: They went back to it."
                    },
                    {
                        role: "user", 
                        content: fullScript || ""
                    },
                ],
                model: "gpt-4-turbo",
            });
            responses.push(completion.choices[0].message.content);
        if (responses.length > 0) {
            const filterResponses = responses.filter((response): response is string => response !== null);
            const removeNewLines = (str: string) => str.replace(/\n/g, "");
            const filteredResponses = filterResponses.map(removeNewLines);
            // function to concatenate all the filteredResponses in array into a single string
            const concatResponses = filteredResponses.join(" ");
            const updated = await updateTranscriptionWithChunkedResponses({ Responses: concatResponses, MeetingId: MeetingId });
            if (updated) { 
                return true;
            }
        }
        } else { 
            // If the transcript is too long, split it into chunks of 10000 characters and process each chunk.
            const chunks = fullScript.match(/.{1,10000}/gs);
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
                                content: "Please review the provided transcript chunk and identify the various topics of the conversation pertaining brainstorming story development. For each topic identified, return a short title to summarize the topic, a copy of the first sentence to identify the start of the topic, and a copy of the last sentence to identify the end of the topic. Do not include any markdown or html formatting like line breaks, lists, or asterisks aka * for titles or otherwise. Responses should be a nonbreaking string paragraph and should remove formatting from the transcript. Be careful to copy and paste the start and end sentence TEXT exactly as it appears in the transcript. Also, your entire response per chunk should be a single paragraph. Do not separate topics with line breaks. Example Response => TITLE: Discussing Story Ideas and Character Details. START: Speaker 0: That's afters. END: Speaker 1: Yeah. TITLE: Developing Security Character Concept. START: Speaker 0: Oh, yeah. END: Speaker 1: What happened to slinging juice? TITLE: Exploring Scene Details and Script Dialogue. START: Speaker 1: Chili causing an electric frenzy inside of him. END: Speaker 1: And stream it. TITLE: Considering Book Adaptation of the Script. START: Speaker 0: I know. END: Speaker 1: We have checked it. TITLE: Envisioning Technical Challenges in Filming. START: Speaker 0: Just visualize just visualize an outcome. END: Speaker 1: You got a tab that the butcher wants to settle. TITLE: Discussing Introduction and Development of Characters. START: Speaker 1: So one note, I think, the stuff with Dodge and the Butcher kinda come out of nowhere. END: Speaker 1: They went back to it."
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
        if (responses.length > 0) {
            const filterResponses = responses.filter((response): response is string => response !== null);
            // function to remove all \n from filteredResponses
            const removeNewLines = (str: string) => str.replace(/\n/g, "");
            const filteredResponses = filterResponses.map(removeNewLines);
            // function to concatenate all the filteredResponses in array into a single string
            const concatResponses = filteredResponses.join(" ");
            const updated = await updateTranscriptionWithChunkedResponses({ Responses: concatResponses, MeetingId: MeetingId });
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

