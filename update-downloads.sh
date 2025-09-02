#!/bin/bash

set -e

echo "Fetching latest release data from GitHub..."
RELEASE_DATA=$(curl -s "https://api.github.com/repos/igmcdowell/WriteTime-releases/releases/latest")

MAC_URL=$(echo "$RELEASE_DATA" | grep '"browser_download_url":' | grep 'Mac.*\.dmg"' | grep -v 'blockmap' | cut -d'"' -f4)
WINDOWS_URL=$(echo "$RELEASE_DATA" | grep '"browser_download_url":' | grep 'Windows.*\.exe"' | grep -v 'blockmap' | cut -d'"' -f4)

if [ -z "$MAC_URL" ] || [ -z "$WINDOWS_URL" ] || [ "$MAC_URL" = "null" ] || [ "$WINDOWS_URL" = "null" ]; then
    echo "Error: Could not find Mac or Windows download URLs"
    exit 1
fi

echo "Found Mac URL: $MAC_URL"
echo "Found Windows URL: $WINDOWS_URL"

echo "Updating index.html with download links..."

# Update the JavaScript download links in the existing file
sed -i.bak "s|mac: '[^']*'|mac: '$MAC_URL'|g" index.html
sed -i.bak "s|windows: '[^']*'|windows: '$WINDOWS_URL'|g" index.html
rm index.html.bak

echo "Successfully updated index.html with latest download links!"
echo "Mac URL: $MAC_URL"
echo "Windows URL: $WINDOWS_URL"

# Commit and push changes
echo "Committing changes..."
git add index.html
git commit -m "Update download links to latest release

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "Pushing changes..."
git push

echo "✅ Successfully updated and pushed download links!"