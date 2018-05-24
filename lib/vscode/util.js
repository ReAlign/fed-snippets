'use strict';
const fs = require('fs');
const path = require('path');
const log = require('n-s-logs');

const _ = {
    updateFile(key, json) {
        fs.writeFile(key, JSON.stringify(json, null, 4), (err) => {
            if(err) {
              log.error(err);
            } else {
              log.ok(`JSON saved to ${key}`);
            }
        });
    },
    mkdir(key, json) {
        const dir = path.dirname(key);
        fs.mkdir(dir, (err) => {
            if(err) {
                log.error(err);
            }

            _.updateFile(key, json);
        });
    },
    convertEvt: async (key, json) => {
        fs.existsSync(key, json)
            ? await _.updateFile(key, json)
            : await _.mkdir(key, json);
    }
};

module.exports = _;