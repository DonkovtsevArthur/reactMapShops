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
  SELECT
  toUInt32OrZero(sessionNumber) as sessionNumber,
  floor(sum(docSum), 2) as sum,
  floor(sum(docTotal), 2) as total,
  max(docOpenDate) as openDate,
  max(docCloseDate) as closeDate,
  countIf(documentUuid, docDocumentType = 'SELL') as receipts,
  any(docUser) as user,
  countIf(documentUuid, docDocumentType = 'PAYBACK') as paybacks,
  floor(sum(docPaybacksSum), 2) as paybacksSum,
  floor(sum(docSumCashPayback), 2) as sumCashPayback,
  floor(sum(docSumCardPayback), 2) as sumCardPayback,
  floor(sum(docSumCashSell), 2) as sumCashSell,
  floor(sum(docSumCardSell), 2) as sumCardSell
FROM (
  SELECT
      any(sessionNumber) as sessionNumber,
      anyIf(closeResultSum, documentType ='SELL') as docSum,
      anyIf(closeResultSum, or(documentType ='SELL', documentType ='PAYBACK')) as docTotal,
      plus(anyIf(openDate, documentType ='OPEN_SESSION'), any(timeZone)) as docOpenDate,
      plus(anyIf(closeDate, documentType ='CLOSE_SESSION'), any(timeZone)) as docCloseDate,
      documentUuid,
      any(documentType) as docDocumentType,
      any(userUuid) as docUser,
      anyIf(closeResultSum, documentType = 'PAYBACK') as docPaybacksSum,
      anyIf(closeResultSum, and(paymentType = 'CASH', documentType = 'PAYBACK')) as docSumCashPayback,
      anyIf(closeResultSum, and(paymentType = 'CARD', documentType = 'PAYBACK')) as docSumCardPayback,
      anyIf(closeResultSum, and(paymentType = 'CASH', documentType = 'SELL')) as docSumCashSell,
      anyIf(closeResultSum, and(paymentType = 'CARD', documentType = 'SELL')) as docSumCardSell
  FROM documents
  WHERE 
    plus(closeDate, timeZone) <= ${max} AND 
    plus(closeDate, timeZone) >= ${min} AND 
    userUuid = '${uuid}' AND 
    storeUuid = '${storeUuid}'
  GROUP BY documentUuid
)
GROUP BY
  sessionNumber
ORDER BY sessionNumber DESC`;
};
