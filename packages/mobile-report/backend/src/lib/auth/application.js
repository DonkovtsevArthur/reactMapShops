module.exports = (token, callback) => {
  if (token === process.env.ANALYTICS_TOKEN) {
    return callback(null, true, {});
  }
  return callback(null, false, {});
};
