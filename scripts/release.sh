#!/bin/sh
set -e

# Run np from the plugin directory (handles version bump, tests, publish)
cd packages/tailwind-clamp
pnpm exec np "$@"

# Commit the version bump and tag from the repo root
cd ../..
VERSION=$(node -p "require('./packages/tailwind-clamp/package.json').version")
git add packages/tailwind-clamp/package.json
git commit -m "v$VERSION"
git tag "v$VERSION"
git push --follow-tags
