# PopClip Humanizer Extension

A PopClip extension that uses your fine-tuned Gemini model to make text sound more natural and human-like.

## Prerequisites

- [PopClip](https://pilotmoon.com/popclip/) installed on your Mac
- A Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Quick Setup

1. Download the extension:
   ```bash
   git clone https://github.com/xVc323/popclip-humanizer.git
   cd popclip-humanizer
   ```

2. Add your API key:
   - Open `Humanize.popclipext/Config.yaml`
   - Replace `YOUR_API_KEY` with your actual Gemini API key

3. Install:
   - Double-click the `Humanize.popclipext` folder
   - PopClip will ask to install the extension
   - Click "Install"

## Usage

1. Select any text
2. Click the "H" icon in PopClip
3. The humanized version will be copied to your clipboard

## Example

```
Input:  "The experimental results demonstrated a significant correlation between the studied variables."
Output: "The experimental results proved a significative correlation between studied variables."
```

## Troubleshooting

If you see errors in PopClip's console:
```bash
defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES
```

## License

[MIT License](LICENSE)