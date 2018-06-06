      #language: ru
      @sale
Функционал: Отправка чека на печать

Структура сценария: Проверка эндпойнта /sale
Допустим payload: <payload>
Когда делается Post запрос на <url>
То <response>

Примеры:
      | url     | payload                                                                  | response                     |
      | '/sale' | '{"name": "Тестовый товар", "price": 100.5, "count": 5}'                 | возвращается 200 Ok          |
      | '/sale' | '{"name": "Тестовый товар", "price": 100.5}'                             | возвращается 400 Bad Request |
      | '/sale' | '{"name": "Тестовый товар", "price": 100.5, "count": 5, "test": "test"}' | возвращается 400 Bad Request |