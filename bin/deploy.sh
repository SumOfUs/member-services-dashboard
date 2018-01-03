#!/bin/bash
set -eu

ENV=$1

if [ "$ENV" == "production" ]; then
  BUCKET_NAME=services.sumofus.org
  WEBSITE_URL=https://services.sumofus.org
  CF_DISTRIBUTION_ID=E2QLZWJLGWMLYK
  REACT_APP_API_URL=''
elif [ "$ENV" == "staging" ]; then
  BUCKET_NAME=member-services-staging.sumofus.org
  WEBSITE_URL=https://member-services-staging.sumofus.org
  CF_DISTRIBUTION_ID=E67T5UQJH9BML
  REACT_APP_API_URL='https://qglxytlgti.execute-api.us-east-1.amazonaws.com/staging'
else
  echo "Don't know how to deploy ${ENV} environment"
  exit 1
fi

yarn build

echo "###################################"
echo "Deploying static assets to ${ENV}..."

aws s3 sync --acl 'public-read' --delete ./build/ "s3://${BUCKET_NAME}/"

aws cloudfront create-invalidation \
  --distribution-id ${CF_DISTRIBUTION_ID} \
  --paths '/*'

echo "Deployed to ${WEBSITE_URL}"
