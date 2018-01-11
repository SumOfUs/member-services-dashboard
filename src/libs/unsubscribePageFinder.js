// @flow weak

export default (langResource: string) => {
  const langId = langResource.split('/').filter(Number)[0];

  switch (langId) {
    case '103':
      return 'unsubscribe_french';
      break;
    case '101':
      return 'unsubscribe_german';
      break;
    default:
      return 'unsubscribe';
  }
};
