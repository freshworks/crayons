#!/usr/bin/env bash

# Update the lock file
npm i --package-lock-only

# Auto-commit files and push tags
HUSKY_SKIP_HOOKS=1 git add .
HUSKY_SKIP_HOOKS=1 git commit -m "chore(release): update lock file and clean up changelogs"
HUSKY_SKIP_HOOKS=1 git push origin next
HUSKY_SKIP_HOOKS=1 git push --tags