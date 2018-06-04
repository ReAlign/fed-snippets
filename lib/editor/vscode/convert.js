const PF = require('./../../file/parse-file');
const _ = require('./util');

const _obj = PF.get('./../../../sample/js/func.js');

let tplJson = {};

tplJson[_obj.name] = {
    prefix: _obj.name,
    body: _obj.body,
    description: _obj.desc
};

const outputFileName = './tpl/vscode.json';

_.convertEvt(outputFileName, tplJson);