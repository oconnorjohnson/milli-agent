"use server";
import OpenAI from "openai";
import { getChunksByMeetingId } from "@/server/db/read";
import { createChunkAnalyses } from "@/server/db/create";

const opeani = new OpenAI();

{/* This is a function that takes in a MeetingId and returns a boolean value of success upon analyzation of all chunks. */}
export async function chunkAnalyzer({ MeetingId }: { MeetingId: number }) {
  console.log("called chunkAnalyzer with MeetingId: ", MeetingId);
  const chunks = await getChunksByMeetingId({ MeetingId: MeetingId });
  console.log("chunks: ", chunks);
  // promise.all function that sends each chunk to the summarizer, theme analyzer, decision tracker, sentiment trackerand idea tracker in parallel, and then returns an object for each chunk with the results of each analysis as a value in the object.
  const promise = await Promise.all(chunks.map(async (chunk) => {
    const summarizer = await summarizerFunc({ chunk: chunk!, MeetingId: MeetingId });
    const themeTracker = await themeAnalyzerFunc({ chunk: chunk!, MeetingId: MeetingId });
    const decisionTracker = await decisionTrackerFunc({ chunk: chunk!, MeetingId: MeetingId });
    const sentimentTracker = await sentimentTrackerFunc({ chunk: chunk!, MeetingId: MeetingId });
    const ideaTracker = await ideaTrackerFunc({ chunk: chunk!, MeetingId: MeetingId });
    // save the results for each chunk in the database using the createChunkAnalyses function
    await createChunkAnalyses([
      {
        summarizer: summarizer,
        themeTracker: themeTracker,
        decisionTracker: decisionTracker,
        sentimentTracker: sentimentTracker,
        ideaTracker: ideaTracker,
        MeetingId: MeetingId,
      },
    ]);
  }));
  if (promise) { 
    return true;
  }
}

{/* Summarizer */}
const summarizerFunc = async ({ chunk, MeetingId }: {chunk: string, MeetingId: number }): Promise<string | null> => { 
    const completion = await opeani.chat.completions.create({ 
        messages: [
            {
                role: "system",
                content: "The following is an excerpt from a transcription of a meeting in which two people are brainstorming the development of a sci fi tv show. Summarize the discussion, making sure to not leave out any details. Only shorten your response in contrast to the excerpt by leaving out filler words and small talk that does not pertain to the brainstorming session. Skip any boilerplate and assume the user already knows the context of the discussion, so do not say things like `in the summary brainstorming session for a sci-fi tv show...`. Keep your responses concise. If the excerpt does not contain information pertaining to the braintstorming session, simply respond with `VERBOSE IRRELEVANCY`.",
            },
            {
                role: "user", 
                content: chunk || ""
            },
        ],
        model: "gpt-4-turbo",
    });
    return completion.choices[0].message.content;
}

{/* Theme Analyzer */}
const themeAnalyzerFunc = async ({ chunk, MeetingId }: {chunk: string, MeetingId: number }): Promise<string | null> => { 
    const completion = await opeani.chat.completions.create({ 
        messages: [
            {
                role: "system",
                content: "The following is an excerpt from a transcription of a meeting in which two people are brainstorming the development of a sci fi tv show. Analyze the discussion and identify the main themes and topics that were discussed, listing an overview of the main ideas and concepts for each. Do not include any details or specific examples, just a general summary of the themes and topics discussed. Skip any boilerplate and assume the user already knows the context of the discussion. Keep your response concise and skip any boilerplate.",
            },
            {
                role: "user", 
                content: chunk || ""
            },
        ],
        model: "gpt-4-turbo",
    });
    return completion.choices[0].message.content;
}

{/* Decision Tracker */}
const decisionTrackerFunc = async ({ chunk, MeetingId }: {chunk: string, MeetingId: number }): Promise<string | null> => { 
    const completion = await opeani.chat.completions.create({ 
        messages: [
            {
                role: "system",
                content: "The following is an excerpt from a transcription of a meeting in which two people are brainstorming the development of a sci fi tv show. Analyze the discussion and identify decisions or other parts of the discussion that contain actionable points or ideas that can be used to move forward with the project. List the main decisions or points of discussion in a clear and concise manner. Keep your response concise and skip any boilerplate.",
            },
            {
                role: "user", 
                content: chunk || ""
            },
        ],
        model: "gpt-4-turbo",
    });
    return completion.choices[0].message.content;
}

{/* Potential Idea Tracker */}
const ideaTrackerFunc = async ({ chunk, MeetingId }: {chunk: string, MeetingId: number }): Promise<string | null> => { 
    const completion = await opeani.chat.completions.create({ 
        messages: [
            {
                role: "system",
                content: "The following is an excerpt from a transcription of a meeting in which two people are brainstorming the development of a sci fi tv show. Your job is to analyze the discussion for specific unique ideas or concepts that could be used to further develop the project. Identify the main ideas or concepts discussed in the meeting and provide a brief explanation of how they could be applied to the project, based only on the context of the excerpt, without elaborating or hallucinating additional information. List the main ideas or concepts in a clear and concise manner. Keep your response concise and skip any boilerplate.",
            },
            {
                role: "user", 
                content: chunk || ""
            },
        ],
        model: "gpt-4-turbo",
    });
    return completion.choices[0].message.content;
}

{/* Sentiment Tracker */}
const sentimentTrackerFunc = async ({ chunk, MeetingId }: {chunk: string, MeetingId: number }): Promise<string | null> => { 
    const completion = await opeani.chat.completions.create({ 
        messages: [
            {
                role: "system",
                content: "The following is an excerpt from a transcription of a meeting in which two people are brainstorming the development of a sci fi tv show. Your job is to analyze the discussion and identify the speaker's sentiment for each part of the discusison. Your goal is to understand how the speakers are feeling about the concepts being discussed. Return a list of the concepts and their sentiments. Make sure to note if it is obvious if both speakers are agreeing or disagreeing on the value of a concept, and to note if it is wholeheartedly positive, negative, or split. Keep your response concise and skip any boilerplate.",
            },
            {
                role: "user", 
                content: chunk || ""
            },
        ],
        model: "gpt-4-turbo",
    });
    return completion.choices[0].message.content;
}