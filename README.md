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

### For Users
1. Download the latest `popclip-humanizer.popclipextz` from the releases page
2. Double-click the downloaded file to install in PopClip
3. When prompted, enter your Gemini API key
4. Select your preferred text handling mode (copy/append/replace)

### For Developers
1. Clone this repository
2. Make changes in the `popclip-humanizer.popclipext` directory
3. Test directly with PopClip by loading the .popclipext directory
4. To create installable extension:
   ```bash
   zip -r popclip-humanizer.popclipextz popclip-humanizer.popclipext
   ```

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

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have suggestions:
1. Check the existing issues in this repository
2. Create a new issue with details about your problem
3. Include your PopClip version and macOS version in bug reports