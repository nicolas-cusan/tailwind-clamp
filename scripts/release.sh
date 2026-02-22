#!/bin/sh
set -e

# Run np from the plugin directory (handles version bump, tests, publish)
cd packages/tailwind-clamp
pnpm exec np "$@"

# Sync version to tailwind-clamp-merge and publish it
cd ../..
VERSION=$(node -p "require('./packages/tailwind-clamp/package.json').version")
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('packages/tailwind-clamp-merge/package.json', 'utf8'));
pkg.version = '$VERSION';
fs.writeFileSync('packages/tailwind-clamp-merge/package.json', JSON.stringify(pkg, null, 2) + '\n');
"
cd packages/tailwind-clamp-merge
pnpm run build
pnpm publish --no-git-checks

# Commit the version bump and tag from the repo root
cd ../..
git add packages/tailwind-clamp/package.json packages/tailwind-clamp-merge/package.json
git commit -m "v$VERSION"
git tag "v$VERSION"
git push --follow-tags
