module.exports = (uuid, ltCloseDate, gtCloseDate, storeUuids, step, offset) => {
  const storeString = storeUuids.map(store => `storeUuid = '${store}'`);
  let min;
  let max;
  const today = ltCloseDate === gtCloseDate;
  const timezone = step === 'days' ? ', any(timeZone) as timezone' : '';
  const time = step === 'hours' ?
    `toHour(minus(plus(closeDate, timeZone), ${offset}))` :
    `toDayOfMonth(minus(plus(closeDate, timeZone), ${offset}))`;
  if (today) {
    max = `toDateTime(plus(${ltCloseDate}, timeZone))`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${offset})`;
  } else {
    max = `plus(toDateTime(toDate(plus(${ltCloseDate}, timeZone))), ${offset})`;
    min = `plus(toDateTime(toDate(plus(${gtCloseDate}, timeZone))), ${offset})`;
  }

  return `
  SELECT ${time} AS x, round(SUM(closeResultSum), 0) AS y ${timezone}
  FROM (
  SELECT DISTINCT documentUuid, closeResultSum, closeDate, timeZone
  FROM documents
  WHERE plus(closeDate, timeZone) <= ${max}
    AND plus(closeDate, timeZone) >= ${min}
    AND userUuid = '${uuid}' AND (${storeString.join(' OR ')})
    AND documentType = 'SELL'
  )
  GROUP BY x
  `;
};
