#!/bin/bash
set -eu

ENV=$1

if [ "$ENV" == "production" ]; then
  BUCKET_NAME=support.sumofus.org
  WEBSITE_URL=https://support.sumofus.org
  CF_DISTRIBUTION_ID=E1D468MUB70GGE
  REACT_APP_API_URL='https://3ifaupiqp1.execute-api.us-east-1.amazonaws.com/production'
  REACT_APP_SLS_API_URL=https://sls.sumofus.org/sumofus
elif [ "$ENV" == "staging" ]; then
  BUCKET_NAME=support-staging.sumofus.org
  WEBSITE_URL=https://support-staging.sumofus.org
  CF_DISTRIBUTION_ID=E4YZV57TYMVOC
  REACT_APP_API_URL='https://qglxytlgti.execute-api.us-east-1.amazonaws.com/staging'
  REACT_APP_SLS_API_URL=https://sls.sumofus.org/sumofus
else
  echo "Don't know how to deploy ${ENV} environment"
  exit 1
fi

REACT_APP_API_URL=$REACT_APP_API_URL REACT_APP_SLS_API_URL=$REACT_APP_SLS_API_URL yarn build


echo "###################################"
echo "Deploying static assets to ${ENV}..."

aws s3 sync --acl 'public-read' --delete ./build/ "s3://${BUCKET_NAME}/"

aws cloudfront create-invalidation \
  --distribution-id ${CF_DISTRIBUTION_ID} \
  --paths '/*'

echo "Deployed to ${WEBSITE_URL}"
