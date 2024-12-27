// #popclip
// name: Humanize
// icon: wand-sparkles
// identifier: com.pilotmoon.popclip.extension.humanizer
// description: Humanize the selected text using fine-tuned Gemini API
// app: { name: Gemini API, link: 'https://ai.google.dev/docs' }
// popclipVersion: 4586
// keywords: gemini humanize
// entitlements: [network]
// required: [axios]

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

define({
  options: [
    {
      identifier: 'apikey',
      label: 'API Key',
      type: 'string',
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
  ],

  actions: [
    {
      title: 'Humanize',
      code: async (input, options) => {
        try {
          // Clean and prepare input text
          const cleanInput = input.text.trim();
          
          // Prepare request body
          const parts = [...examplePairs, { text: `input: ${cleanInput}` }];
          
          // Make API request
          const response = await axios({
            method: 'post',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-exp-1206:generateContent',
            params: { key: options.apikey },
            data: {
              contents: [{ role: 'user', parts }],
              generationConfig
            }
          });

          // Extract response text
          const humanizedText = response.data.candidates[0].content.parts[0].text.trim();
          if (!humanizedText) {
            throw new Error('Empty response from API');
          }

          // Handle output based on mode and modifiers
          const copy = options.textMode === 'copy' || popclip.modifiers.shift;
          let replace = options.textMode === 'replace';
          if (popclip.modifiers.option) {
            replace = !replace;
          }

          if (copy) {
            popclip.copyText(humanizedText);
          } else if (replace) {
            popclip.pasteText(humanizedText);
          } else {
            popclip.pasteText(`${cleanInput}\n${humanizedText}`);
          }

          popclip.showSuccess();
        } catch (e) {
          const errorMsg = getErrorInfo(e);
          popclip.showText(errorMsg);
        }
      },
    },
  ],
});

function getErrorInfo(error) {
  if (error?.response?.data?.error?.message) {
    return `Gemini API Error: ${error.response.data.error.message}`;
  }
  return `Error: ${error.message || 'Unknown error occurred'}`;
}