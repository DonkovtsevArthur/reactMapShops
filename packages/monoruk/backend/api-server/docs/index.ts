export const addAdminUser = {
  description: 'Зарегистрировать разработчика',
  notes: 'Принимат Логин и Пароль разработчика. Возвращает токен для работы в режиме разработчика. Авторизация по интеграционному токену',
  tags: ['api', 'developerUser'],
};

export const loginAdminUser = {
  description: 'Авторизация разработчика',
  notes: 'Принимат Логин и Пароль разработчика. Возвращает токен для работы в режиме разработчика. Авторизация по интеграционному токену',
  tags: ['api', 'developerUser'],
};

export const addLkUser = {
  description: 'Добавить пользователя ЛК',
  notes: 'Принимат id организации. Авторизация по интеграционному токену',
  tags: ['api', 'user'],
};

export const changeStatus = {
  description: 'Поменять статус пользователя ЛК',
  notes: 'Принимает id организации и его статус. Active | Inactive. Авторизация по интеграционному токену',
  tags: ['api', 'user'],
};

export const getAppDoc = {
  description: 'Получить настройки источника данных',
  notes: 'Принимает имя источника данных. Возвращает настройки источника данных. Авторизация по токену разработчика',
  tags: ['api', 'application'],
};

export const addAppDoc = {
  description: 'Добавить приложение',
  notes: 'Принимает конфигурацию приложения. Возвращает { status: "ok" }. Авторизация по токену разработчика',
  tags: ['api', 'application'],
};

export const getAllAppDoc = {
  description: 'Получить настройки всех приложений',
  notes: 'Возвращает настройки всех источников данных. Авторизация по интеграционному токену',
  tags: ['api', 'application'],
};

export const addDataSourceDoc = {
  description: 'Добавить источник данных',
  notes: 'Принимает конфигурационный объект источника данных. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const removeDataSourceDoc = {
  description: 'Удалить источник данных',
  notes: 'Принимает id источника. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const getAllDataSourceDoc = {
  description: 'Возвращает все источники данных пользователя',
  notes: 'Принимает id пользователя. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const addWidgetpDoc = {
  description: 'Добавить виджет',
  notes: 'Принимает id пользователя, id виджета, id источника данных и координаты виджета на активном рабочем столе. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const removeWidgetDoc = {
  description: 'Удалить виджет',
  notes: 'Принимает id виджета и id рабочего стола с которого виджет будет удален. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const updateAppDoc = {
  description: 'Обновить приложение',
  notes: 'Принимает конфигурационный объект приложения. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
  tags: ['api', 'application'],
};

export const deleteAppDoc = {
  description: 'Удалить приложение',
  notes: 'Поринимает имя приложения. Возвращает { status: "ok" } при удачном удалении. Авторизация по токену разработчика',
  tags: ['api', 'application'],
};

export const setStatusDoc = {
  description: 'Изменить статус приложения',
  notes: 'Поринимает имя приложения, id разработчика и статус (Active | Inactive). Возвращает { status: "ok" } при удачном изменении статуса. Авторизация по интеграционному токену',
  tags: ['api', 'application'],
};

export const addUserAppDoc = {
  description: 'Добавить источник данных пользователю ЛК',
  notes: 'Поринимает id источника данных и id пользователя ЛК. Возвращает { status: "ok" } при удачном добавлении. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const setStatusUserAppDoc = {
  description: 'Изменить статус пользовательского приложения',
  notes: 'Поринимает id пользовательского приложения и статус (Active | Inactive). Возвращает { status: "ok" } при удачном изменении статуса. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const getUserAppDoc = {
  description: 'Получить все настройки установленного приложения',
  notes: 'Возвращает все настройки пользовательского приложения. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const getUserConfigDoc = {
  description: 'Получить конфигурационный файл установленнго приложения',
  notes: 'Возвращает настройки пользовательского приложения. Авторизация по токену пользователя',
  tags: ['api', 'userApp'],
};

export const putUserAppDoc = {
  description: 'Изменить пользовательские настройки приложения',
  notes: 'Принимает новые настройки пользовательского приложения. Возвращает { status: "ok" } при удачном изменении настроек. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const getUserTokenDoc = {
  description: 'Получить токен приложения',
  notes: 'Принимает id приложения. Возвращает токен. Авторизация по интеграционному токену',
  tags: ['api', 'userApp'],
};

export const dataClickhouse = {
  description: 'Получение данных для записи в clickhouse из источника',
  notes: 'Принимает данные из источника данных в формате описанном в конфигурационном файле источника. Авторизация по токену пользьзователя',
  tags: ['api', 'clickhouse'],
};

export const getDataClickhouse = {
  description: 'Отдает данные из clickhouse',
  notes: 'Принимает параметр query в котором описан запрос к clickhouse. Запрос должен начинаться с SELECT и выборка должны происходить из "dataSource". Авторизация по токену пользователя',
  tags: ['api', 'clickhouse'],
};

export const addDashboardDoc = {
  description: 'Добавить дашборд пользователю',
  notes: 'Добавляет новый дашборд пользователю. Принимает orgId и alias (id организации и имя рабочего стола). Авторизация по интеграционному токену',
  tags: ['api', 'dashboard'],
};

export const getAllDashboardDoc = {
  description: 'Отдаёт все дашборды пользователя',
  notes: 'Отдает все дашборды пользователя в общем виде. Принимает orgId (id организации). Авторизация по интеграционному токену',
  tags: ['api', 'dashboard'],
};

export const getDashboardDoc = {
  description: 'Отдаёт дашборд пользователя',
  notes: 'Отдаёт один дашборд пользователя со всей информацией о нём. Принимает orgId и dashboardId (id организации и id дашборда). Авторизация по интеграционному токену',
  tags: ['api', 'dashboard'],
};

export const placeDashboardDoc = {
  description: 'Принимает новое местоположение виджета',
  notes: 'Принимает объект настроек виджета на дашборде, его положение и размеры. Авторизация по интеграционному токену',
  tags: ['api', 'dashboard'],
};

export const runPreset = {
  description: 'Запускает сценарий сервера конфигураций',
  notes: 'Принимает orgId и datasourceId, запускает переданные в params сценарий для этого пользователя',
  tags: ['api', 'preset'],
};


