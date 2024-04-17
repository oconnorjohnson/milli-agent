interface Word {
  word: string;
  start: number;
  end: number;
  confidence: number;
  speaker: number;
  speaker_confidence?: number; // Added to match the JSON structure
  punctuated_word?: string;
}

interface Sentence {
  text: string;
  start: number;
  end: number;
}

interface Paragraph {
  sentences: Sentence[];
  speaker: number;
  num_words: number;
  start: number;
  end: number;
}

interface Alternative {
  transcript: string;
  confidence: number;
  words: Word[];
  paragraphs: Paragraph[];
}

interface Channel {
  alternatives: Alternative[];
  paragraphs: Paragraph[]; // Added to match the JSON structure
}

interface DeepgramResult {
  channels: Channel[];
}

interface DeepgramMetadata {
  transaction_key: string;
  request_id: string;
  sha256: string;
  created: string;
  duration: number;
  channels: number;
  models: string[];
  model_info: {
    [key: string]: {
      name: string;
      version: string;
      arch: string;
    };
  };
}

export interface DeepgramResponse {
  metadata: DeepgramMetadata;
  results: DeepgramResult;
}

export interface SpeakerSegment {
  speaker: number;
  text: string;
}
