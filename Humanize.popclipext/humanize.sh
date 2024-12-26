#!/bin/bash

# Get the selected text from PopClip
TEXT="$POPCLIP_TEXT"

# Your Gemini API endpoint and key
API_KEY="YOUR_API_KEY"
MODEL="gemini-exp-1206"

# Create the request payload
PAYLOAD="{\"contents\":[{\"parts\":[{\"text\":\"input: $TEXT\"}]}]}"

# Make the API request
RESPONSE=$(curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Extract and process the response
PROCESSED_TEXT=$(echo "$RESPONSE" | grep -o '"text":"[^"]*"' | cut -d'"' -f4)

# Copy the result to clipboard
echo -n "$PROCESSED_TEXT" | pbcopy