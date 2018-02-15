module.exports = errors =>
  ` <h2>Ошибка при работе с 1С Розница</h2>
    <table>
        ${errors}
        <tr>
          <td>
            <br />
            <p>Для поиска и устранения ошибок, вы можете обратиться в службу поддержки по телефону (831) 2-331-331</p>
            <br />
            <p>Полный список некорректных документов можно посмотреть в разделе "НСИ" - "Настройка интеграции с Эвотор" - "Просмотреть список конфликтов"</p>
          </td>
        </tr>
    </table>
  `;