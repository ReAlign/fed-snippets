'use strict';

const log = require('n-s-logs');

const _ = {
    regEx_single: /\$([\d.]+?)/g,
    regEx_order: /(\$\{([\d.]+?):)[^\}]*(\})/g,
    regEx_enum: /(\$\{([\d.]+?)\|)[^\|\}]*(\|\})/g,
    supportType: ['single', 'order', 'enum'],
    updateBody(obj = {}) {
        if(!(obj.body && obj.body.length)) {
            return null;
        }

        obj.body = _.addVerticalTabCharacter(obj.body);

        // log.ok('updateBody');
        // log.show(obj);
        // log.ok('updateBody ok');

        return obj;
    },
    createValue(obj = {}) {
        if(!(obj.body && obj.body.length)) {
            return null;
        }

        obj.value = obj.body.join('');

        return obj;
    },
    addVerticalTabCharacter(arr = []) {
        if(arr && arr.length) {
            let _arr = [];
            const _lastIndex = arr.length - 1;

            arr.forEach((item, index) => {
                let _str = item;

                if(index !== _lastIndex) {
                    _str = `${_str}&#10;`
                }
                _arr.push(_str);
            });

            return _arr;
        }

        return arr;
    },
    arrayContainsVal(arr = [], val = '') {
        if(!arr || !val) {
            return false;
        }

        return arr.indexOf(val) !== -1;
    },

    parseExpression(list = [], type = '') {
        if(!(list && list.length)) {
            return null;
        }

        let map = {};

        if(_.arrayContainsVal(_.supportType, type)) {
            map = _.formatFunc[type](list, map);
        }

        return map;
    },
    formatItem(type = '', item = '', value = '') {
        return {
            type,
            origin: item,
            value
        };
    },
    formatFunc: {
        single: (list = [], map = {}) => {
            list.forEach((item) => {
                map[`${item}$`] = _.formatItem('single', item);
            });

            return map;
        },
        order: (list = [], map = {}) => {
            list.forEach((item) => {
                // 分割变量名
                const _pos = item.indexOf(':');
                const _key = item.substring(2, _pos);
                const _val = item.substring(_pos + 1, item.length - 1);
                map[`$${_key}$`] = _.formatItem('order', item, _val);
            });

            return map;
        },
        enum: (list = [], map = {}) => {
            list.forEach((item) => {
                // 分割变量名
                const _pos1 = item.indexOf('|');
                const _pos2 = item.indexOf('|}');
                const _key = item.substring(2, _pos1);
                const _str = item.substring(_pos1 + 1, _pos2);
                const _val = _str.length ? _str.split(',') : [];
                map[`$${_key}$`] = _.formatItem('enum', item, _val);
            });

            return map;
        }
    },
    reversalOriginKey(obj = {}) {
        let _obj = {};
        (Object.keys(obj) || []).forEach(k => {
            if(obj[k].origin !== undefined) {
                _obj[obj[k].origin] = k;
            }
        });

        return _obj;
    },
    parseAttrs(obj = {}, type = 'single') {
        if(!(obj.body && obj.body.length)) {
            return obj;
        }

        const bodyStr = obj.body.join('');

        const cacheList = bodyStr.match(_[`regEx_${type}`]) || [];
        log.ok(`cacheList_${type}`);
        log.show(cacheList);

        Object.assign(obj.attrs, _.parseExpression(cacheList, type));

        log.ok(`cacheList_${type}_parseExpression`);
        log.show(obj.attrs);

        obj.originKey = _.reversalOriginKey(obj.attrs);

        return obj;
    }
};

module.exports = _;