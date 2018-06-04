'use strict';

const lodash = require('lodash');
const _ = require('./util');

const Parse = {
    parse(obj = {}) {
        let nObj = lodash.cloneDeep(obj);

        // updateBody
        _.updateBody(nObj);

        //  createValue
        _.createValue(nObj);

        nObj.attrs = {};
        // parse attr
        _.supportType.forEach(item => {
            _.parseAttrs(nObj, item);
        });

        // replace body
        (Object.keys(nObj.originKey) || []).forEach(k => {
            nObj.value = nObj.value.replace(k, nObj.originKey[k]);
        });

        return nObj;
    }
};

module.exports = Parse;