const soap = require('soap-as-promised');
const pino = require('pino')();

let client = null;

module.exports = {
  create: async (uuid) => {
    pino.info(uuid);
    try {
      client = await soap.createClient(
        'https://ladcloud.ru/admincloud/ws/DBDistribution.1cws?wsdl',
        {
          wsdl_headers: {
            Authorization: 'Basic VXNlcjpiMzIzODZjNDNmZjU0ZTIwYmU4MDkwOTc4ZDA3OGM1Yw==',
          },
        },
      );
      client.addHttpHeader(
        'Authorization',
        'Basic VXNlcjpiMzIzODZjNDNmZjU0ZTIwYmU4MDkwOTc4ZDA3OGM1Yw==',
      );
    } catch (err) {
      err.code = 500;
      return err;
    }
    try {
      const response = await client.GetFreeBase({
        ИдентификаторПользователя: uuid,
        КодКонфигурации: 'retail',
        СтрокаТипаБазы: 'work',
        РеквизитыКлиента: `ladcloudProxy-${process.env.TYPE}`,
      });

      pino.info(response);

      if (response.Ошибка) {
        response.code = 400;
        return response;
      }

      /**
      *   let responseTrade = await client.GetFreeBase({
      *     ИдентификаторПользователя: userId,
      *     КодКонфигурации: 'trade',
      *     СтрокаТипаБазы: 'work',
      *     РеквизитыКлиента: 'ladcloudProxy'
      *  });
      *  console.log('-----------------------------------');
      *  console.log(responseTrade);
      *  console.log('-----------------------------------');
      *
      *  if (responseTrade.Ошибка) {
      *    responseTrade.code = 400;
      *    return response;
      *  }
      */

      const confirmResponse = await client.Confirm({
        АдресБазы: response.return,
      });

      pino.info(confirmResponse);

      if (confirmResponse.Ошибка) {
        response.code = 400;
        return response;
      }

      /**
      * let confirmTrade = await client.Confirm({
      *    АдресБазы: responseTrade.return
      * });
      *
      * console.log(confirmTrade);
      * if (confirmTrade.Ошибка) {
      *   response.code = 400;
      *   return response;
      * }
      */

      pino.info('-----------------------------------');
      pino.info(`База: ${response}`);
      pino.info('-----------------------------------');

      return {
        status: 'success',
        data: {
          url: response.return,
          user: response.ПользовательДляОбмена,
          password: response.ПарольПользователяДляОбмена,
          urlTrade: '',
          userTrade: '',
          passwordTrade: '',
        },
      };
    } catch (err) {
      pino.error(err);
      err.code = 500;
      return err;
    }
  },
};
