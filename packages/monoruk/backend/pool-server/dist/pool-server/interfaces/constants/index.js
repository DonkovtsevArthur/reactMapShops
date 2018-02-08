"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_TYPE = ['String', 'Int32', 'Float32', 'Boolean', 'DateTime'];
exports.VALID_STATUS = ['active', 'inactive'];
exports.DATA_SOURCE = 'dataSource';
exports.WIDGET = 'widget';
exports.APPLICATION = 'application';
exports.VALID_APPS_TYPE = [exports.APPLICATION, exports.DATA_SOURCE, exports.WIDGET];
exports.VALID_COLUMN_TYPE = ['String', 'Int32', 'Float32', 'Boolean', 'DateTime'];
exports.VALID_PERIOD = ['notperiodic', 'minute', 'hour', 'day', 'week', 'month', 'year'];
exports.VALID_BUSINESS_TYPE = ['section', 'index'];
exports.SALT_WORK_FACTOR = 10;
exports.DICTIONARIES_PATH = './userDictionaries';
exports.INDEX_ACTIONS = ['', 'sum', 'avg', 'min', 'max', 'count'];
exports.PERIOD = [
    'month',
    'quarter',
    'half-year',
    'year',
    '30days',
    '7days',
    'yesterday',
    'today',
];
exports.ACCESS_VALID_TYPE = ['widget', 'dashboard'];
