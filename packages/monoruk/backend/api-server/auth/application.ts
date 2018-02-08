export default (token: string, callback: Function) => {
  if (token === process.env.CONFIG_SERVER_TOKEN) {
    return callback(null, true, {});
  }
  return callback(null, false, {});
};

