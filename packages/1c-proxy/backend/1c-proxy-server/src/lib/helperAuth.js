module.exports = (request) => {
  const url = request.auth.credentials.url;
  const user = request.auth.credentials.user;
  const password = request.auth.credentials.password;
  const urlTrade = request.auth.credentials.urlTrade;
  const userTrade = request.auth.credentials.userTrade;
  const passwordTrade = request.auth.credentials.passwordTrade;

  let hash = new Buffer(`${user}:${password}`);
  let hashTrade = new Buffer(`${userTrade}:${passwordTrade}`);

  hash = hash.toString('base64');
  hashTrade = hashTrade.toString('base64');

  return { hash, hashTrade, url, urlTrade };
};
