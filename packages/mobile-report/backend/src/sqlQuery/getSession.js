module.exports = (uuid, ltCloseDate, gtCloseDate, storeUuid, steps, offset) => {
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
  return `
  SELECT DISTINCT
    sessionNumber,
    sum(closeResultSum) as sum,
    minIf(openDate, documentType ='OPEN_SESSION') as openDate,
    maxIf(closeDate, documentType ='CLOSE_SESSION') as closeDate,
    count(documentUuid) as receipts,
    any(userUuid) as user,
    countIf(documentUuid, documentType = 'PAYBACK') as paybacks,
    sumIf(closeResultSum, documentType = 'PAYBACK') as paybacksSum,
    sumIf(closeResultSum, and(paymentType = 'CASH', documentType = 'PAYBACK')) as sumCashPayback,
    sumIf(closeResultSum, and(paymentType = 'CARD', documentType = 'PAYBACK')) as sumCardPayback,
    sumIf(closeResultSum, and(paymentType = 'CASH', documentType = 'SELL')) as sumCashSell,
    sumIf(closeResultSum, and(paymentType = 'CARD', documentType = 'SELL')) as sumCardSell
  FROM documents
  WHERE 
    plus(closeDate, timeZone) <= ${max} AND 
    plus(closeDate, timeZone) >= ${min} AND 
    userUuid = '${uuid}' AND 
    storeUuid = '${storeUuid}'
  GROUP BY
    sessionNumber, paymentType
  `;
};
