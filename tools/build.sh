#!/usr/bin/env bash
# Builds the GitHub Pages bundle into _site/ and a ZIP per site into _site/downloads/.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf _site && mkdir -p _site/downloads
cp -r index.html i18n.js style.css assets vendor sites .nojekyll _site/
for dir in sites/*/; do
  name=$(basename "$dir")
  (cd "$dir" && zip -qr "../../_site/downloads/$name.zip" . -x '*.DS_Store')
done
echo "Built _site with $(ls _site/downloads | wc -l) zips"
