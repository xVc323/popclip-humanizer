// #popclip
// name: Humanizer
// icon: wand-sparkles-icon.svg
// identifier: com.xvc323.popclip.extension.humanizer
// description: Humanize the selected text using Gemini API.
// app: { name: Gemini API }
// popclipVersion: 4586
// keywords: gemini humanizer
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "apikey",
    label: "API Key",
    type: "secret",
    description: "Your Gemini API key",
  },
  {
    identifier: "model",
    label: "Model",
    type: "string",
    defaultValue: "gemini-exp-1206",
    description: "The model ID from AI Studio",
  }
] as const;

type Options = InferOptions<typeof options>;

// typescript interfaces for Gemini API
interface Message {
  role: "user";
  parts: Array<{text: string}>;
}

interface Response {
  candidates: [{content: {parts: [{text: string}]}}];
}

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// the main humanize action
const humanize: ActionFunction<Options> = async (input, options) => {
  const gemini = axios.create({
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    headers: { Authorization: `Bearer ${options.apikey}` },
  });

  // prepare the input in the format expected by your fine-tuned model
  const messages: Array<Message> = [{
    role: "user",
    parts: [
      {text: "input: " + input.text.trim()},
    ]
  }];

  try {
    const { data }: { data: Response } = await gemini.post(
      `/models/${options.model}:generateContent`,
      {
        contents: messages,
        generationConfig,
      }
    );

    // extract the humanized text from the response
    const humanizedText = data.candidates[0].content.parts[0].text.trim();
    
    // copy the result to clipboard
    popclip.copyText(humanizedText);
    popclip.showSuccess();

  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
};

export function getErrorInfo(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as any).response;
    return `Message from Gemini API (code ${response.status}): ${response.data.error.message}`;
  } else {
    return String(error);
  }
}

// export the actions
export const actions: Action<Options>[] = [
  {
    title: "Humanize",
    code: humanize,
  }
];