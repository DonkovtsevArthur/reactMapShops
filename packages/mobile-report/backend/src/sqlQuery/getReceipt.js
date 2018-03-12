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
  const getSession = sessionNumber =>
    sessionNumber ? `AND sessionNumber = '${sessionNumber}'` : '';
  return `
  SELECT DISTINCT
    documentUuid,
    plus(closeDate, timeZone) as date,
    closeResultSum,
    productName,
    price,
    quantity,
    number,
    multiply(price, quantity) as cost,
    paymentType
  FROM documents
  WHERE 
  plus(closeDate, timeZone) <= ${max} AND 
  plus(closeDate, timeZone) >= ${min} AND 
  userUuid = '${uuid}' AND 
  storeUuid = '${storeUuid}' AND
  (documentType = 'SELL' OR documentType = 'PAYBACK') ${getSession(session)}
  ORDER BY number DESC
  `;
};
