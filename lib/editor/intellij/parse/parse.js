'use strict';

const lodash = require('lodash');
const _ = require('./action');

const Parse = {
    parse(obj = {}) {
        let nObj = lodash.cloneDeep(obj);
        nObj.attrs = {};

        // 添加换行标记
        _.updateBody(nObj);
        // 解析属性
        _.parseSupportType(nObj);
        // 生成函数体
        _.createValue(nObj);

        return nObj;
    }
};

module.exports = Parse;