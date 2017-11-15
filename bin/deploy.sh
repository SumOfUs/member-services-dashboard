#!/bin/bash
set -eu

yarn build

echo "Deploying static assets to production..."

BUCKET_NAME=services.sumofus.org
WEBSITE_URL=https://services.sumofus.org
CF_DISTRIBUTION_ID=E2QLZWJLGWMLYK

aws s3 sync --acl 'public-read' --delete ./build/ "s3://${BUCKET_NAME}/"

aws cloudfront create-invalidation \
  --distribution-id ${CF_DISTRIBUTION_ID} \
  --paths '/*'


echo "Deployed to ${WEBSITE_URL}"
