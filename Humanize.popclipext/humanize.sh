#!/bin/bash

# Get the selected text from PopClip
TEXT="$POPCLIP_TEXT"

# Your Gemini API endpoint and key
API_KEY="YOUR_API_KEY"
MODEL="gemini-exp-1206"

# Create the request payload with examples context - using heredoc for better readability
PAYLOAD=$(cat << 'EOF'
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "input: The morning dew sparkled on the blades of grass under the rising sun."
        },
        {
          "text": "output: The morning dew was shining on the grass when the sun was rising."
        },
        {
          "text": "input: A light breeze whispered through the autumn leaves, creating a soothing melody."
        },
        {
          "text": "output: A light breeze was whispering through the autumn leaves, sounding restful."
        },
        {
          "text": "input: POPCLIP_TEXT_PLACEHOLDER"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 1,
    "topK": 64,
    "topP": 0.95,
    "maxOutputTokens": 8192,
    "responseMimeType": "text/plain"
  }
}
EOF
)

# Replace placeholder with actual text
PAYLOAD=${PAYLOAD//POPCLIP_TEXT_PLACEHOLDER/$TEXT}

# Make the API request
RESPONSE=$(curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent?key=$API_KEY" \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD")

# Extract and process the response
PROCESSED_TEXT=$(echo "$RESPONSE" | grep -o '"text":"[^"]*"' | cut -d'"' -f4)

# Copy the result to clipboard
echo -n "$PROCESSED_TEXT" | pbcopy