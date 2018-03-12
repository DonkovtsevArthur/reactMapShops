module.exports = (uuid, ltCloseDate, gtCloseDate, storeUuids, offset) => {
  const storeString = storeUuids.map(store => `storeUuid = '${store}'`);
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
    storeUuid, 
    count() AS receiptsCount,
    round(SUM(closeResultSum), 0) AS total,
    round(AVG(closeResultSum), 0) AS average
  FROM (
  SELECT DISTINCT documentUuid, closeResultSum, storeUuid
  FROM documents
  WHERE 
    plus(closeDate, timeZone) < ${max}
    AND plus(closeDate, timeZone) > ${min}
    AND userUuid = '${uuid}'
    AND (${storeString.join(' OR ')})
    AND documentType = 'SELL'
  )
  GROUP BY storeUuid
  `;
};
