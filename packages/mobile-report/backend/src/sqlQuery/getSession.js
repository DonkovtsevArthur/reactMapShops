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
    floor(sum(closeResultSum), 2) as sum,
    minIf(openDate, documentType ='OPEN_SESSION') as openDate,
    maxIf(closeDate, documentType ='CLOSE_SESSION') as closeDate,
    count(documentUuid) as receipts,
    any(userUuid) as user,
    countIf(documentUuid, documentType = 'PAYBACK') as paybacks,
    floor(sumIf(closeResultSum, documentType = 'PAYBACK'), 2) as paybacksSum,
    floor(sumIf(closeResultSum, and(paymentType = 'CASH', documentType = 'PAYBACK')), 2) as sumCashPayback,
    floor(sumIf(closeResultSum, and(paymentType = 'CARD', documentType = 'PAYBACK')), 2) as sumCardPayback,
    floor(sumIf(closeResultSum, and(paymentType = 'CASH', documentType = 'SELL')), 2) as sumCashSell,
    floor(sumIf(closeResultSum, and(paymentType = 'CARD', documentType = 'SELL')), 2) as sumCardSell
  FROM (
    SELECT * FROM documents
    WHERE 
      plus(closeDate, timeZone) <= ${max} AND 
      plus(closeDate, timeZone) >= ${min} AND 
      userUuid = '${uuid}' AND 
      storeUuid = '${storeUuid}'
  )
  GROUP BY
    sessionNumber
  `;
};
