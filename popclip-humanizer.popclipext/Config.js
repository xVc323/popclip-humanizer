// #popclip
// name: Humanize
// icon: wand-sparkles
// identifier: com.xvc323.popclip.extension.humanizer
// description: Humanize the selected text using fine-tuned Gemini API
// app: { name: Gemini API, link: 'https://ai.google.dev/docs' }
// popclipVersion: 4586
// keywords: gemini humanize
// entitlements: [network]

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
      type: 'string',  // Using string instead of secret to avoid keychain issues
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
      code: function(input, options) {
        // Clean and prepare input text
        const cleanInput = input.text.trim();
        
        // Prepare request body
        const parts = [...examplePairs, { text: `input: ${cleanInput}` }];
        
        // Make API request using XMLHttpRequest
        const xhr = new XMLHttpRequest();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-exp-1206:generateContent?key=${options.apikey}`;
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              try {
                const response = JSON.parse(xhr.responseText);
                const humanizedText = response.candidates[0].content.parts[0].text.trim();
                
                if (!humanizedText) {
                  popclip.showText('Error: Empty response from API');
                  return;
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
                popclip.showText(`Error parsing response: ${e.message}`);
              }
            } else {
              try {
                const errorResponse = JSON.parse(xhr.responseText);
                popclip.showText(`API Error: ${errorResponse.error.message}`);
              } catch (e) {
                popclip.showText(`Error: HTTP ${xhr.status}`);
              }
            }
          }
        };
        
        try {
          xhr.send(JSON.stringify({
            contents: [{ role: 'user', parts }],
            generationConfig
          }));
        } catch (e) {
          popclip.showText(`Error sending request: ${e.message}`);
        }
      },
    },
  ],
});