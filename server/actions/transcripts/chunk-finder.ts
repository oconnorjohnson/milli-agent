"use server";
import { getTranscriptionAndResponsesByMeeting } from "@/server/db/read";

interface ResponseChunk {
    TITLE: string;
    START: string;
    END: string;
}
  
export async function chunkTranscriptByTopic({ MeetingId }: { MeetingId: number }): Promise<Array<{ topic: string; chunk: string }>> {
    console.log("called chunkTranscriptByTopic with MeetingId: ", MeetingId);
    const { formattedText, responses } = await getTranscriptionAndResponsesByMeeting({ MeetingId: MeetingId });
    const chunks: Array<{ topic: string; chunk: string }> = [];

    // Parse the responses string to extract TITLE, START, and END for each topic
    const responseChunks = parseResponses(responses!);
    console.log("responseChunks: ", responseChunks);

    responseChunks.forEach(({ TITLE, START, END }) => {
        // Use a regular expression to create a pattern that matches the START and END markers across multiple lines
        const pattern = new RegExp(`${escapeRegExp(START)}([\\s\\S]*?)${escapeRegExp(END)}`, 'g');
        const match = pattern.exec(formattedText!);

        if (match) {
            // Include START and END in the extracted chunk
            const chunkText = match[0];
            chunks.push({ topic: TITLE, chunk: chunkText });
        }
    });

    console.log("chunks: ", chunks);
    return chunks;
}

// Utility function to escape special characters for use in regular expressions
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function parseResponses(responsesString: string): ResponseChunk[] {
    // Split the responses string into segments at each occurrence of "TITLE"
    const segments = responsesString.split(/(?=TITLE:)/g);
    const chunks: ResponseChunk[] = [];

    segments.forEach(segment => {
        if (segment.trim() === '') return; // Skip empty segments

        // Extract TITLE, START, and END using a regular expression
        const regex = /TITLE: (.*?)\. START: (.*?)\. END: (.*?)\./gs;
        const match = regex.exec(segment);

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