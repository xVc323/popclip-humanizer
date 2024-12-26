# PopClip Humanizer Extension

A PopClip extension that uses your fine-tuned Gemini model to make text sound more natural and human-like. When you select any text, this extension will send it to your Gemini model and replace it with a more natural-sounding version.

## Features

- One-click text humanization using Gemini's AI
- Preserves the original meaning while making text more natural
- Instant feedback with clipboard integration
- Works with any text selection in any application

## Prerequisites

Before you can use this extension, make sure you have:

- [PopClip](https://pilotmoon.com/popclip/) installed on your Mac
- A Gemini API key (Get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
- curl (pre-installed on macOS)
- Your fine-tuned Gemini model ID (default: gemini-exp-1206)

## Quick Start

1. Download the extension:
   ```bash
   git clone https://github.com/xVc323/popclip-humanizer.git
   cd popclip-humanizer
   ```

2. Set up your API key:
   - Open `Humanize.popclipext/Config.yaml`
   - Replace `YOUR_API_KEY` with your actual Gemini API key

3. Make the script executable:
   ```bash
   chmod +x Humanize.popclipext/humanize.sh
   ```

4. Install the extension:
   - Double-click the `Humanize.popclipext` folder
   - PopClip will ask to install the extension
   - Click "Install"

## Usage

1. Select any text in any application
2. Click the "H" icon that appears in PopClip
3. The humanized version will automatically replace your clipboard content

Example:
```
Original: "The experimental results demonstrated a significant correlation between the studied variables."
Humanized: "The experimental results proved a significative correlation between studied variables."
```

## Customization

Check out the [Advanced Customization Guide](ADVANCED.md) for:
- Detailed configuration options
- Model parameter tuning
- Multiple action setup
- Custom icons
- Debugging tips

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Share your improvements

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [issues](https://github.com/xVc323/popclip-humanizer/issues) page
2. Create a new issue if your problem isn't already reported
3. Include your PopClip version and macOS version in bug reports