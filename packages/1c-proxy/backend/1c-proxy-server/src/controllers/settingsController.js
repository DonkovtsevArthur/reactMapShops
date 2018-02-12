const agent = require('superagent');
const settingsTemplate = require('../tpl/settings');

module.exports = async (request, reply) => {
  const token = request.query.token;
  const user = await request.db.User.findOne({
    token,
  });
  if (!user) {
    reply('Error').code(404);
    return false;
  }
  agent
    .get(`https://lk-test.lad24.ru/evotor/userInfo?token=${token}`)
    .query({ json: 1 })
    .then((response) => {
      const { login, password } = response.body;
      reply(settingsTemplate(
        user.urlToBase,
        user.urlToBaseTrade,
        user.email,
        user.phone,
        user.token,
        user.evoToken,
        login,
        password,
      ));
      return true;
    });
};
