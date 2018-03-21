module.exports = (token, callback) => {
  if (token === process.env.INTEGRATION_TOKEN) {
    return callback(null, true, {});
  }
  return callback(null, false, {});
};
