module.exports = (uuid, ltCloseDate, gtCloseDate, storeUuid, steps, offset, session) => {
  let min;
  let max;
  const today = ltCloseDate === gtCloseDate;
  const free = steps === 'free';
  if (today) {
    max = `toDateTime(plus(${ltCloseDate}, timeZone))`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${free ? 0 : offset})`;
  } else {
    max = `plus(toDateTime(toDate(plus(${ltCloseDate}, timeZone))), ${free ? 0 : offset})`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${free ? 0 : offset})`;
  }
  const getSession = session => session ? `AND sessionNumber = ${session}` : null;
  return `
  SELECT DISTINCT
    documentUuid,
    plus(closeDate, timeZone) as date,
    closeResultSum,
    productName,
    price,
    quantity,
    number,
    multiply(price, quantity) as cost
  FROM documents
  WHERE 
  plus(closeDate, timeZone) <= ${max} AND 
  plus(closeDate, timeZone) >= ${min} AND 
  userUuid = '${uuid}' AND 
  storeUuid = '${storeUuid}' AND
  documentType = 'SELL' ${getSession(session)}
  `;
};
