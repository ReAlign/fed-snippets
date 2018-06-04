'use strict';

const ENUM = require('./base/enum');
const _ = require('./base/util');
// const log = require('n-s-logs');

const ACTION = {
    updateBody(obj = {}) {
        if(!(obj.body && obj.body.length)) {
            return null;
        }

        obj.body = _.addVerticalTabCharacter(obj.body);

        return obj;
    },
    parseSupportType(obj = {}) {
        ENUM.supportType.forEach(item => {
            ACTION.parseAttrs(obj, item);
        });
    },
    createValue(obj = {}) {
        if(!(obj.body && obj.body.length)) {
            return null;
        }

        obj.value = obj.body.join('');

        (Object.keys(obj.originKey) || []).forEach(k => {
            obj.value = obj.value.replace(k, obj.originKey[k]);
        });

        return obj;
    },
    parseAttrs(obj = {}, type = 'single') {
        if(!(obj.body && obj.body.length)) {
            return obj;
        }

        const bodyStr = obj.body.join('');

        const cacheList = bodyStr.match(ENUM[`regEx_${type}`]) || [];
        // log.ok(`cacheList_${type}`);
        // log.show(cacheList);

        Object.assign(obj.attrs, _.parseExpression(cacheList, type));

        // log.ok(`cacheList_${type}_parseExpression`);
        // log.show(obj.attrs);

        obj.originKey = _.reversalOriginKey(obj.attrs);

        return obj;
    }
};

module.exports = ACTION;