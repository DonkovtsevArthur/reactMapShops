const pino = require('pino')();

function prepareError(err, values) {
  let code;
  let reason;
  let subject;
  let value;
  switch (err.type) {
    case 'any.required':
      code = 2002;
      reason = 'missing';
      subject = err.context.key;
      break;
    case 'object.allowUnknown':
      code = 2002;
      reason = 'unexpected';
      subject = err.context.key;
      break;
    default:
      code = 2003;
      reason = 'incorrect';
      subject = err.context.key;
      value = values[err.context.key];
  }
  return {
    code,
    reason,
    subject,
    value,
  };
}

function prettify(errorInfo) {
  pino.info(errorInfo.details);
  const ret = [];
  errorInfo.details.map((el) => {
    ret.push(prepareError(el, errorInfo._object));
    return true;
  });
  return ret;
}

function failAction(request, reply, source, error) {
  pino.info(error.data);
  return reply(prettify(error.data)).code(400);
}

module.exports = failAction;
