module.exports = {
  get: (request, reply) => {
    const token = request.payload.token;
    const uuid = request.payload.userUuid;


    request.db.User.update({ evotorUuid: uuid }, {
      $set: {
        evoToken: token,
      } }).then(() => {
        reply().code(200);
        return true;
      }).catch((error) => {
        reply(error);
        return null;
      });
  },
};
