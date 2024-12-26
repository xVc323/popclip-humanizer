# PopClip Humanizer Extension

A PopClip extension that humanizes text using a fine-tuned Gemini API model.

## Features

- Humanizes selected text using Gemini's fine-tuned model
- Multiple response handling options (append/replace/copy)
- Keyboard modifiers support (Shift for copy, Option to toggle replace)
- Built-in example prompts for consistent results

## Installation

1. Obtain a Gemini API key from Google AI Studio
2. Install the extension in PopClip
3. Configure your API key in the extension settings

## Usage

1. Select any text you want to humanize
2. Click the Humanize icon in PopClip
3. The humanized text will be handled according to your settings

## Configuration

- API Key: Your Gemini API key
- Response Handling: Choose how to handle the humanized text
  - Append: Add below original text
  - Replace: Replace selected text
  - Copy: Copy to clipboard

## Development

Built with:
- PopClip Extension API
- Gemini API
- axios for HTTP requests