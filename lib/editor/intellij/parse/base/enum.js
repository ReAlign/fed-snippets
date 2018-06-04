'use strict';

const ENUM = {
    regEx_single: /\$([\d.]+?)/g,
    regEx_order: /(\$\{([\d.]+?):)[^\}]*(\})/g,
    regEx_enum: /(\$\{([\d.]+?)\|)[^\|\}]*(\|\})/g,
    supportType: ['single', 'order', 'enum']
};

module.exports = ENUM;