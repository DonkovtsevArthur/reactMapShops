async function validate(token, callback) {
  const user = await this.db.User.findOne({ token });
  if (!user) {
    return callback(null, false, {});
  }
  return callback(null, true, user);
}

module.exports = validate;
