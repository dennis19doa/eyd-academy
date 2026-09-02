#!/usr/bin/env bash
set -euo pipefail
rm -rf dist
mkdir -p dist
cp index.html styles.css _headers _redirects dist/
cp -R js assets dist/
