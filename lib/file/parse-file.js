const fs = require('fs');
const path = require('path');
const log = require('n-s-logs');

const _ = {
    separator: '######',
    RegEx: /\r\n|\r|\n/,
    descSepa: ' ',
    getFileAsStringArray(absPath = '', { encoding = 'utf-8' } = {}) {
        if(!fs.existsSync(absPath)) {
            log.error('no file!');
            return null;
        }

        const str = fs.readFileSync(absPath, encoding).toString();

        return str.split(_.RegEx);
    },
    getName(absPath) {
        return path.basename(absPath).split('.')[0] || '';
    },
    getDesc(list = []) {
        const _index = list.findIndex(item => (item || '').trim() === _.separator);
        if(_index <= 0) {
            return '';
        }
        return list.slice(0, _index).filter(item => item.length).join(_.descSepa);
    },
    getBody(list = []) {
        if(!list.length) {
            return '';
        }
        const _index = list.findIndex(item => (item || '').trim() === _.separator);
        if(_index === list.length - 1) {
            return '';
        }
        return list.slice(_index + 1);
    }
};

const PF = {
    get(absPath = '', opt = {}) {
        const strArr = _.getFileAsStringArray(absPath, opt);

        if(!strArr) {
            return null;
        }

        const name = _.getName(absPath);
        const desc = _.getDesc(strArr);
        const body = _.getBody(strArr);

        return {
            name,
            desc,
            body
        }
    }
};

module.exports = PF;