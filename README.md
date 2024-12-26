# PopClip Humanizer Extension

A PopClip extension that uses a fine-tuned Gemini model to make your text sound more human and natural.

## Features

- One-click text humanization using Google's Gemini API
- Maintains consistent style through example-based prompting
- Multiple output options:
  - Replace original text
  - Append below original
  - Copy to clipboard
- Keyboard modifier support:
  - Hold Shift to force copy mode
  - Hold Option to toggle replace/append mode

## Requirements

- PopClip for macOS
- Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Internet connection

## Installation

1. Download the latest release from the releases page
2. Double-click the downloaded file to install in PopClip
3. When prompted, enter your Gemini API key
4. Select your preferred text handling mode (copy/append/replace)

## Usage

1. Select any text you want to humanize
2. Click the Humanize icon in PopClip's menu
3. The humanized version will be handled according to your settings

### Examples

Original: "The experimental results demonstrated a significant correlation between the studied variables."
Humanized: "The experimental results proved a significative correlation between studied variables."

Original: "The literature review encompasses a wide range of sources relevant to the research topic."
Humanized: "The article encapsulated a vast amount of relevant sources for the research topic."

## Development

This extension is built with:
- PopClip Extension JavaScript API
- Google's Generative AI API (Gemini)
- axios for API requests

To modify or contribute:
1. Clone this repository
2. Modify the source in `src/Humanize.js`
3. Test using PopClip's extension development tools
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have suggestions:
1. Check the existing issues in this repository
2. Create a new issue if needed
3. Include your PopClip version and macOS version in bug reports