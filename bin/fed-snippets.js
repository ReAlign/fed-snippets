#!/usr/bin/env node
'use strict';

const PF = require('./../lib/file/parse-file');
const log = require('n-s-logs');

const _obj = PF.get('./../sample/js/func.js');
log.json(_obj);