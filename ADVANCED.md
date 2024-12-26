# Advanced Customization Guide

This guide covers advanced configuration options for the PopClip Humanizer extension.

## Basic Configuration

The main configuration file is `Config.yaml`. Here's an explanation of each field:

```yaml
name: Humanize            # Name shown in PopClip menu
icon: H                   # Menu icon
after: paste-result       # Action after processing
requirements:
  - paste                 # Required capabilities
```

## Customization Options

### 1. Icon Customization
Choose from:
- Single character: `icon: H`
- Emoji: `icon: 💬`
- Image file: `icon: icon.png` (PNG, 256×256px recommended)

### 2. Model Settings
Adjust the Gemini model behavior in `humanize.sh`:

```bash
MODEL="gemini-exp-1206"  # Your model ID
PAYLOAD="{
  \"contents\":[{
    \"parts\":[{\"text\":\"input: $TEXT\"}]
  }],
  \"generationConfig\": {
    \"temperature\": 0.7,    # Adjust creativity (0.0-1.0)
    \"topK\": 40,           # Number of tokens to consider
    \"topP\": 0.95,         # Nucleus sampling
    \"maxOutputTokens\": 1024
  }
}"
```

### 3. Action Behavior
Control what happens after processing:
```yaml
after: paste-result    # Replace selected text
after: copy-result     # Just copy to clipboard
```

### 4. Multiple Actions
Add variations of the humanizer:
```yaml
actions:
  - name: Humanize
    icon: H
    script: humanize.sh
  - name: Formal
    icon: F
    script: formalize.sh
```

## Debugging Tips

1. Enable debug mode:
   ```bash
   defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES
   ```

2. Check Console.app for logs
3. Test API calls separately using `curl`
4. Verify file permissions (`chmod +x`)