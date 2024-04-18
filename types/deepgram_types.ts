// Define types for the Deepgram response

// {
//   result: {
//     metadata: {
//       transaction_key: 'deprecated',
//       request_id: '22567fb9-67ec-4238-a7ec-883f9e80ce05',
//       sha256: 'ef90355594a546008c6b8872c05b8d3428fb11216e9287439c420237fcff5e5d',
//       created: '2024-04-18T19:10:18.892Z',
//       duration: 84.432,
//       channels: 1,
//       models: [Array],
//       model_info: [Object]
//     },
//     results: { channels: [Array] }
//   },
//   error: null
// }
export type DeepgramResponse = {
  result: {
    metadata: { any: any };
    results: {
      channels: {
        alternatives: {
          transcript: string;
          confidence: number;
          words: Array<{
            word: string;
            start: number;
            end: number;
            confidence: number;
            speaker: number;
            speaker_confidence: number;
            punctuated_word: string;
          }>;
        }[];
      }[];
    };
  };
};

type Channel = {
  alternatives: Alternative[];
  paragraphs: {
    transcript: string;
    paragraphs: Paragraph[];
  };
};

type Alternative = {
  transcript: string;
  confidence: number;
  words: Word[];
};

type Word = {
  word: string;
  start: number;
  end: number;
  confidence: number;
  speaker: number;
  speaker_confidence: number;
  punctuated_word: string;
};

type Paragraph = {
  sentences: Sentence[];
  speaker: number;
  num_words: number;
  start: number;
  end: number;
};

type Sentence = {
  text: string;
  start: number;
  end: number;
};
