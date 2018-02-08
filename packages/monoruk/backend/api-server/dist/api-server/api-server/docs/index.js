"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdminUser = {
    description: 'Зарегистрировать разработчика',
    notes: 'Принимат Логин и Пароль разработчика. Возвращает токен для работы в режиме разработчика. Авторизация по интеграционному токену',
    tags: ['api', 'developerUser'],
};
exports.loginAdminUser = {
    description: 'Авторизация разработчика',
    notes: 'Принимат Логин и Пароль разработчика. Возвращает токен для работы в режиме разработчика. Авторизация по интеграционному токену',
    tags: ['api', 'developerUser'],
};
exports.addLkUser = {
    description: 'Добавить пользователя ЛК',
    notes: 'Принимат id организации. Авторизация по интеграционному токену',
    tags: ['api', 'user'],
};
exports.changeStatus = {
    description: 'Поменять статус пользователя ЛК',
    notes: 'Принимает id организации и его статус. Active | Inactive. Авторизация по интеграционному токену',
    tags: ['api', 'user'],
};
exports.getAppDoc = {
    description: 'Получить настройки источника данных',
    notes: 'Принимает имя источника данных. Возвращает настройки источника данных. Авторизация по токену разработчика',
    tags: ['api', 'application'],
};
exports.addAppDoc = {
    description: 'Добавить приложение',
    notes: 'Принимает конфигурацию приложения. Возвращает { status: "ok" }. Авторизация по токену разработчика',
    tags: ['api', 'application'],
};
exports.getAllAppDoc = {
    description: 'Получить настройки всех приложений',
    notes: 'Возвращает настройки всех источников данных. Авторизация по интеграционному токену',
    tags: ['api', 'application'],
};
exports.addDataSourceDoc = {
    description: 'Добавить источник данных',
    notes: 'Принимает конфигурационный объект источника данных. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.removeDataSourceDoc = {
    description: 'Удалить источник данных',
    notes: 'Принимает id источника. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.getAllDataSourceDoc = {
    description: 'Возвращает все источники данных пользователя',
    notes: 'Принимает id пользователя. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.addWidgetpDoc = {
    description: 'Добавить виджет',
    notes: 'Принимает id пользователя, id виджета, id источника данных и координаты виджета на активном рабочем столе. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.removeWidgetDoc = {
    description: 'Удалить виджет',
    notes: 'Принимает id виджета и id рабочего стола с которого виджет будет удален. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.updateAppDoc = {
    description: 'Обновить приложение',
    notes: 'Принимает конфигурационный объект приложения. Возвращает { status: "ok" }. Авторизация по интеграционному токену',
    tags: ['api', 'application'],
};
exports.deleteAppDoc = {
    description: 'Удалить приложение',
    notes: 'Поринимает имя приложения. Возвращает { status: "ok" } при удачном удалении. Авторизация по токену разработчика',
    tags: ['api', 'application'],
};
exports.setStatusDoc = {
    description: 'Изменить статус приложения',
    notes: 'Поринимает имя приложения, id разработчика и статус (Active | Inactive). Возвращает { status: "ok" } при удачном изменении статуса. Авторизация по интеграционному токену',
    tags: ['api', 'application'],
};
exports.addUserAppDoc = {
    description: 'Добавить источник данных пользователю ЛК',
    notes: 'Поринимает id источника данных и id пользователя ЛК. Возвращает { status: "ok" } при удачном добавлении. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.setStatusUserAppDoc = {
    description: 'Изменить статус пользовательского приложения',
    notes: 'Поринимает id пользовательского приложения и статус (Active | Inactive). Возвращает { status: "ok" } при удачном изменении статуса. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.getUserAppDoc = {
    description: 'Получить все настройки установленного приложения',
    notes: 'Возвращает все настройки пользовательского приложения. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.getUserConfigDoc = {
    description: 'Получить конфигурационный файл установленнго приложения',
    notes: 'Возвращает настройки пользовательского приложения. Авторизация по токену пользователя',
    tags: ['api', 'userApp'],
};
exports.putUserAppDoc = {
    description: 'Изменить пользовательские настройки приложения',
    notes: 'Принимает новые настройки пользовательского приложения. Возвращает { status: "ok" } при удачном изменении настроек. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.getUserTokenDoc = {
    description: 'Получить токен приложения',
    notes: 'Принимает id приложения. Возвращает токен. Авторизация по интеграционному токену',
    tags: ['api', 'userApp'],
};
exports.dataClickhouse = {
    description: 'Получение данных для записи в clickhouse из источника',
    notes: 'Принимает данные из источника данных в формате описанном в конфигурационном файле источника. Авторизация по токену пользьзователя',
    tags: ['api', 'clickhouse'],
};
exports.getDataClickhouse = {
    description: 'Отдает данные из clickhouse',
    notes: 'Принимает параметр query в котором описан запрос к clickhouse. Запрос должен начинаться с SELECT и выборка должны происходить из "dataSource". Авторизация по токену пользователя',
    tags: ['api', 'clickhouse'],
};
exports.addDashboardDoc = {
    description: 'Добавить дашборд пользователю',
    notes: 'Добавляет новый дашборд пользователю. Принимает orgId и alias (id организации и имя рабочего стола). Авторизация по интеграционному токену',
    tags: ['api', 'dashboard'],
};
exports.getAllDashboardDoc = {
    description: 'Отдаёт все дашборды пользователя',
    notes: 'Отдает все дашборды пользователя в общем виде. Принимает orgId (id организации). Авторизация по интеграционному токену',
    tags: ['api', 'dashboard'],
};
exports.getDashboardDoc = {
    description: 'Отдаёт дашборд пользователя',
    notes: 'Отдаёт один дашборд пользователя со всей информацией о нём. Принимает orgId и dashboardId (id организации и id дашборда). Авторизация по интеграционному токену',
    tags: ['api', 'dashboard'],
};
exports.placeDashboardDoc = {
    description: 'Принимает новое местоположение виджета',
    notes: 'Принимает объект настроек виджета на дашборде, его положение и размеры. Авторизация по интеграционному токену',
    tags: ['api', 'dashboard'],
};
exports.runPreset = {
    description: 'Запускает сценарий сервера конфигураций',
    notes: 'Принимает orgId и datasourceId, запускает переданные в params сценарий для этого пользователя',
    tags: ['api', 'preset'],
};
