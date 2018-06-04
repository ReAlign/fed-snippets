const fs = require('fs');
const PF = require('./../../file/parse-file');
const jsonxml = require('jsontoxml');
const formattor = require('formattor');
const tplXML = require('./parse/base/template');
const parse = require('./parse/parse');

// const log = require('n-s-logs');

const _obj = PF.get('./../../../sample/js/func.js');

// log.error('_obj');
// log.json(_obj);

const _temp = parse.parse(_obj);
const _group = 'JS_INTELLIJ_TEST';

// log.json('_temp');
// log.json(_temp);

const tpl = tplXML({ group: _group, temp: _temp });

let json = formattor(jsonxml(tpl), { method: 'xml' });

fs.writeFile(`./tpl/${_group}.xml`, json);