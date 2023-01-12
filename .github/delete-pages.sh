#!/usr/bin/env bash

rm -rf $1

HUSKY_SKIP_HOOKS=1 git add .
HUSKY_SKIP_HOOKS=1 git commit -m "Delete directory that is not required"
HUSKY_SKIP_HOOKS=1 git push origin gh-pages