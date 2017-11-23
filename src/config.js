export default {
  app_name: 'Member Services Dashboard',
  cognito: {
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
  },
  api: {
    API_URL: process.env.REACT_APP_API_URL,
  },
};
