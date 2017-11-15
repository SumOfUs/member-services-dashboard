#!/bin/bash
set -eu

yarn build

echo "Deploying static assets to production..."

BUCKET_NAME=services.sumofus.org
WEBSITE_URL=https://services.sumofus.org

aws s3 sync --acl 'public-read' --delete ./build/ "s3://${BUCKET_NAME}/"

echo "Deployed to ${WEBSITE_URL}"
