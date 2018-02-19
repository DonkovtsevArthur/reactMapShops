module.exports = {
  putDocuments: {
    description: 'Отправить документы',
    notes: 'Принимает массив документов из Эвотора. Авторизация по токену пользователя.',
    tags: ['api', 'evotor'],
  },
  createUser: {
    description: 'Регистрация пользователя в сервиси статистики',
    notes: 'Принимает объект где uuid - пользователя (организации), token - пользователя(организации). Авторизация по токену приложения.',
    tags: ['api', 'cloud'],
  },
  statusUser: {
    description: 'Изменение статуса пользователя',
    notes: 'Принимает объект где uuid - пользователя (организации), active (true, false) - активен или нет пользователь (организация). Авторизация по токену приложения.',
    tags: ['api', 'cloud'],
  },
  putDevices: {
    description: 'Отправить кассы',
    notes: 'Принимает от стороннего сервера массив касс из Эвотора. Авторизация по токену пользователя.',
    tags: ['api', 'evotor'],
  },
  putStores: {
    description: 'Отправить магазины',
    notes: 'Принимает от стороннего сервера массив магазинов из Эвотора. Авторизация по токену пользователя.',
    tags: ['api', 'evotor'],
  },
  putEmployees: {
    description: 'Отправить сотрудников',
    notes: 'Принимает массив магазинов из Эвотора. Авторизация по токену пользователя.',
    tags: ['api', 'evotor'],
  },
  getPoints: {
    description: 'Получить точки для построения графика для всех магазинов',
    notes: 'Принимает запрос от пользователя где в query параметрах interval - todey, yesterday, week, month. Авторизация по jwt пользователя.',
    tags: ['api', 'user'],
  },
  getPointsSingleStore: {
    description: 'Получить точки для построения графика для одного магазина',
    notes: 'Принимает запрос от пользователя где в query параметрах interval - todey, yesterday, week, month. Авторизация по jwt пользователя.',
    tags: ['api', 'user'],
  },
  getShop: {
    description: 'Получить информацию о всех магазинах',
    notes: 'Принимает запрос от пользователя где в query параметрах interval - todey, yesterday, week, month. Авторизация по jwt пользователя.',
    tags: ['api', 'user'],
  },
  getSingleShop: {
    description: 'Получить информацию об одном магазине',
    notes: 'Принимает запрос от пользователя где в query параметрах interval - todey, yesterday, week, month. Авторизация по jwt пользователя.',
    tags: ['api', 'user'],
  },
  settingsFillStore: {
    description: 'Заполняет базу документов данными за 30 дней',
    notes: 'Принимает от стороннего сервера объект где uuid - uuid пользователя, token - токен пользователя от REST API Эвотора. Авторизация по токену приложения.',
    tags: ['api', 'application'],
  },
  getDocuments: {
    description: 'Получить все документы из clickhouse. Для отладки. Авторизация по токену приложения.',
    tags: ['api', 'settings'],
  },
  delete: {
    description: 'Удаляет таблицу documents. Для отладки. Авторизация по токену приложения.',
    tags: ['api', 'settings'],
  },
  storeOpen: {
    description: 'Изменение время открытия смены.',
    notes: 'Изменение время открытия смены. принимает время в формате от "000" до "2359". Авторизация по токену пользователя.',
    tags: ['api', 'settings'],
  },
};
