"use server";
import { getTranscriptionAndResponsesByMeeting } from "@/server/db/read";
import { createTopicChunks } from "@/server/db/create";

interface ResponseChunk {
    TITLE: string;
    START: string;
    END: string;
}

/**
 * Function to chunk a transcript by topic.
 * Takes a `MeetingId` parameter and returns a boolean value indicating success.
 * It retrieves the meeting's transcript and responses, parses them into structured chunks by topic,
 * and saves these chunks to the database.
 */
export async function chunkTranscriptByTopic({ MeetingId }: { MeetingId: number }): Promise<boolean> {
    
    // Retrieve the transcript and responses for the given meeting ID from the database.
    // Assumes that the meeting ID is valid and that the database call will return the necessary data.
    const { formattedText, responses } = await getTranscriptionAndResponsesByMeeting({ MeetingId: MeetingId });

    // Initialize an array to hold the chunks of text associated with each topic.
    const chunks: Array<{ topic: string; chunk: string }> = [];
    
    // Parse the responses string to extract TITLE, START, and END for each topic.
    // This is crucial for identifying the specific sections of the transcript that relate to each topic.
    const responseChunks = parseResponses(responses!);
   
    // Loop through each response chunk to extract and store the relevant text from the transcript.
    responseChunks.forEach(({ TITLE, START, END }) => {
        
        // Create a regular expression pattern to match the text between START and END markers, across multiple lines.
        // This allows us to accurately extract topic-specific sections from the transcript.
        const pattern = new RegExp(`${escapeRegExp(START)}([\\s\\S]*?)${escapeRegExp(END)}`, 'g');
        
        // Use the pattern to find the corresponding text chunk in the formatted transcript.
        const match = pattern.exec(formattedText!);
        
        // If a matching text chunk is found, add it to the chunks array with its associated topic.
        if (match) {
            const chunkText = match[0];
            chunks.push({ topic: TITLE, chunk: chunkText });
        }
    });
    
    // If any chunks were identified and extracted, save them to the database.
    // This step is crucial for persisting the structured data for future use.
    if (chunks.length > 0) {
       await createTopicChunks({ TopicChunkData: chunks })
    }
    return true;
}

/**
 * Utility function to escape special characters in a string for use in regular expressions.
 * This is necessary to ensure that characters which have special meaning in regex (e.g., '.', '*', '?')
 * are treated as literal characters when dynamically generating regex patterns from user input or database data.
 */
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

/**
 * Utility function to parse the responses string to extract TITLE, START, and END for each topic.
 * Splits the responses string into segments at each occurrence of "TITLE" and extracts the relevant markers.
 * This structured extraction is key for later identifying and extracting the corresponding text chunks from the transcript.
 */
function parseResponses(responsesString: string): ResponseChunk[] {
    // Split the responses string into segments at each occurrence of "TITLE".
    // This allows us to handle each topic's metadata individually.
    const segments = responsesString.split(/(?=TITLE:)/g);
     
    // Initialize an array to hold the extracted data for each topic.
    const chunks: ResponseChunk[] = [];
    
    // Loop through each segment, extracting the TITLE, START, and END markers using a regular expression.
    segments.forEach(segment => {
        if (segment.trim() === '') return;
         
        // Match the TITLE, START, and END markers within the segment.
        // This regex captures the essential metadata for each topic within the responses string.
        const regex = /TITLE: (.*?)\. START: (.*?)\. END: (.*?)\./gs;
        const match = regex.exec(segment);
       
        // If a match is found, add the extracted data to the chunks array.
        // This structured format allows for easy access and manipulation in subsequent processing steps.
        if (match) {
            chunks.push({
                TITLE: match[1].trim(),
                START: match[2].trim(),
                END: match[3].trim(),
            });
        }
    });
    return chunks;
}