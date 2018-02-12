module.exports = (errorItem, user, requestType) => {
  const { date, errorCode, name, type, number } = errorItem;
  switch (errorCode) {
    case '01': {
      return `
        <tr>
          "Сотрудник" ${name} не был создан в вашей базе <a href="${user.url}">1С-Розница</a>
        </tr>
      `;
    }
    case '02': {
      return `
        <tr>
          "Магазин" ${name} не был создан в вашей базе <a href="${user.url}">1С-Розница</a>
        </tr>
      `;
    }
    case '03': {
      return `
        <tr>
          "Касса" ${name} не была создана в вашей базе <a href="${user.url}">1С-Розница</a>
        </tr>
      `;
    }
    case '04': {
      if (requestType === 1) {
        return `<tr>Товары не были загружены на терминал из вашей базы <a href="${user.url}">1С Розница</a>, т.к. в базе не обнаружен магазин, к которому привязан терминал</tr>`;
      } else if (requestType === 2) {
        return `<tr>Товары не были загружены из терминала в вашу базу <a href="${user.url}">1С Розница</a> т.к. в базе не обнаружен магазин, к которому привязан терминал</tr>`;
      } else if (requestType === 3) {
        return `<tr>Документы не были загружены из терминала в вашу базу <a href="${user.url}">1С Розница</a> т.к. в базе не обнаружен магазин, к которому привязан терминал</tr>`;
      }
      return false;
    }
    case '05': {
      return `
        <tr>
         "Товар" ${name} не была создана в вашей базе <a href="${user.url}">1С-Розница</a>
        </tr>
      `;
    }
    case '06': {
      return `
        <tr>
          ${type} ${number ? `№ ${number}` : ''} ${date ? `от ${date}` : ''}
        </tr>
      `;
    }
    case '07': {
      return `
        <tr>
          "Документ" ${type} ${number ? `№ ${number}` : ''} ${date ? `от ${date}` : ''} не был загружен в вашу базу <a href="${user.url}">1С-Розница</a>
        </tr>
      `;
    }
    case '08': {
      return `
        <tr>
          "Документ" ${type} ${number ? `№ ${number}` : ''} ${date ? `от ${date}` : ''} не был проведен в вашей базе <a href="${user.url}">1С-Розница</a>
          <strong>Пожалуйста, устраните ошибки и проведите документ, чтобы избежать расхождения в остатках товаров!</strong>
        </tr>
      `;
    }
    default:
      return null;
  }
};
