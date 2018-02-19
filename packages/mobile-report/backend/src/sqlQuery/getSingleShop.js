module.exports = (uuid, ltCloseDate, gtCloseDate, storeUuid, offset) => {
  let min;
  let max;
  const today = ltCloseDate === gtCloseDate;

  if (today) {
    max = `toDateTime(plus(${ltCloseDate}, timeZone))`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${offset})`;
  } else {
    max = `plus(toDateTime(toDate(plus(${ltCloseDate}, timeZone))), ${offset})`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${offset})`;
  }
  return `
  SELECT 
    documentType,
    any(timeZone) as tz,
    min(openDate) AS openedAt,
    max(closeDate) AS closedAt,
    count() AS receiptsCount,
    round(SUM(closeResultSum), 0) AS total,
    round(AVG(closeResultSum), 0) AS average
  FROM (
  SELECT DISTINCT documentUuid, closeResultSum, documentType, closeDate, openDate, timeZone
  FROM documents
  WHERE 
    plus(closeDate, timeZone) < ${max} AND 
    plus(closeDate, timeZone) > ${min} AND 
    userUuid = '${uuid}' AND 
    storeUuid = '${storeUuid}'
  )
  GROUP BY documentType
  `;
};
