// #popclip
// name: Humanize
// icon: wand-sparkles
// identifier: com.xvc323.popclip.extension.humanizer
// description: Humanize the selected text using fine-tuned Gemini API
// app: { name: Gemini API, link: 'https://ai.google.dev/docs' }
// popclipVersion: 4586
// keywords: gemini humanize
// entitlements: [network]

import axios from 'axios';

export const options = [
  {
    identifier: 'apikey',
    label: 'API Key',
    type: 'secret',
    description: 'Your Gemini API key',
  },
  {
    identifier: 'textMode',
    label: 'Response Handling',
    type: 'multiple',
    values: ['append', 'replace', 'copy'],
    valueLabels: ['Append', 'Replace', 'Copy'],
    defaultValue: 'copy',
    description: 'Append the response, replace the selected text, or copy to clipboard.',
  },
] as const;

type Options = InferOptions<typeof options>;

// Example prompt-completion pairs to guide the model
const examplePairs = [
  {
    text: 'input: The morning dew sparkled on the blades of grass under the rising sun.',
  },
  {
    text: 'output: The morning dew was shining on the grass when the sun was rising.',
  },
  {
    text: 'input: A light breeze whispered through the autumn leaves, creating a soothing melody.',
  },
  {
    text: 'output: A light breeze was whispering through the autumn leaves, sounding restful.',
  }
];

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// the main humanize action
const humanize: ActionFunction<Options> = async (input, options) => {
  const gemini = axios.create({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    params: {
      key: options.apikey
    }
  });

  try {
    // Prepare the messages array with examples and input
    const parts = [...examplePairs, { text: `input: ${input.text.trim()}` }];
    
    const { data } = await gemini.post('/models/gemini-exp-1206:generateContent', {
      contents: [{ 
        role: 'user',
        parts 
      }],
      generationConfig
    });

    // Extract humanized text from response
    const humanizedText = data.candidates[0].content.parts[0].text;

    // Handle the response based on textMode
    const copy = options.textMode === 'copy' || popclip.modifiers.shift;
    const replace = options.textMode === 'replace';
    if (popclip.modifiers.option) {
      // if holding option, toggle replace mode
      replace = !replace;
    }

    if (copy) {
      popclip.copyText(humanizedText);
    } else if (replace) {
      popclip.pasteText(humanizedText);
    } else {
      popclip.pasteText(`${input.text}\n${humanizedText}`);
    }

    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
};

export function getErrorInfo(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as any).response;
    return `Message from Gemini API (code ${response.status}): ${response.data.error.message}`;
  } else {
    return String(error);
  }
}

// export the actions
export const actions: Action<Options>[] = [
  {
    title: 'Humanize',
    code: humanize,
  },
];