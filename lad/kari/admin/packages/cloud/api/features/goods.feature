      #language: ru
      @goods
Функционал: Получить номенклатуру

Структура сценария: Проверка эндпойнта /goods
Когда делается Get запрос на <url>
То <response>

Примеры:
      | url                                        | response                                                   |
      | '/test'                                    | возвращается Work!                                         |
      | '/goods/groups'                            | возврашается массив валидныx групп                         |
      | '/goods/groups?parentId=1'                 | возвращается массив валидных групп с параметром parentId=1 |
      | '/goods/groups?parentId=21'                | возвращается пустой массив                                 |
      | '/goods/groups?parentId=goods'             | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/groups?param=param'                | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/articles'                          | возвращается массив валидных артиклей товаров              |
      | '/goods/articles?groupId=1'                | возвращается массив валидных артиклей товаров c groupId=1  |
      | '/goods/articles?articleId=5'              | возвращается валидный артикль товара с articleId=5         |
      | '/goods/articles?groupId=50'               | возвращается пустой массив                                 |
      | '/goods/articles?articleId=40'             | возвращается ошибка 404 Not found                          |
      | '/goods/articles?groupId=group'            | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/articles?articleId=article'        | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/articles?articleId=345&groupId=12' | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/articles?param=param'              | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/items'                             | возвращается массив валидных товаров                       |
      | '/goods/items?barcode=123456789'           | возвращается то возвращается валидный товар                |
      | '/goods/items?barcode=987654321'           | возвращается ошибка 404 Not found                          |
      | '/goods/items?barcode=item'                | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/items?articleId=12'                | возвращается массив валидных товаров                       |
      | '/goods/items?articleId=article'           | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/items?articleId=12&barcodeId=23'   | возвращается ошибка 406 Not Acceptable                     |
      | '/goods/items?param=param'                 | возвращается ошибка 406 Not Acceptable                     |