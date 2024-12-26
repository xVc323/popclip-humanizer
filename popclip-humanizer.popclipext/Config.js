// #popclip
// name: Humanize
// icon: wand-sparkles
// identifier: com.xvc323.popclip.extension.humanizer
// description: Humanize the selected text using fine-tuned Gemini API
// app: { name: Gemini API, link: 'https://ai.google.dev/docs' }
// popclipVersion: 4586
// keywords: gemini humanize
// entitlements: [network]
// required: [axios]

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
];

// the main humanize action
const humanize = async (input, options) => {
  try {
    // Prepare the messages array with examples and input
    const parts = [...examplePairs, { text: `input: ${input.text.trim()}` }];
    
    const response = await axios({
      method: 'post',
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-exp-1206:generateContent',
      params: {
        key: options.apikey
      },
      data: {
        contents: [{ 
          role: 'user',
          parts 
        }],
        generationConfig
      }
    });

    // Extract humanized text from response
    const humanizedText = response.data.candidates[0].content.parts[0].text;

    // Handle the response based on textMode
    const copy = options.textMode === 'copy' || popclip.modifiers.shift;
    let replace = options.textMode === 'replace';
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

function getErrorInfo(error) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = error.response;
    return `Message from Gemini API (code ${response.status}): ${response.data.error.message}`;
  } else {
    return String(error);
  }
}

// export the actions
export const actions = [
  {
    title: 'Humanize',
    code: humanize,
  },
];