// const log = require('n-s-logs');

const _ = {
    map: {
        context: {
            js: [
                {
                    name: 'option',
                    attrs: { name: 'JAVA_SCRIPT', value: 'true' }
                },
                {
                    name: 'option',
                    attrs: { name: 'JS_EXPRESSION', value: 'true' }
                },
                {
                    name: 'option',
                    attrs: { name: 'JSX_HTML', value: 'true' }
                },
                {
                    name: 'option',
                    attrs: { name: 'JS_STATEMENT', value: 'true' }
                }
            ],
            html: [
                {
                    name: 'option',
                    attrs: { name: 'HTML', value: 'true' }
                }
            ]
        }
    },
    renderVars(attrs) {
        let _arr = [];
        Object.keys(attrs).forEach(item => {
            _arr.push(_._render(item.substring(1, item.length - 1), attrs[item]));
        });

        return _arr;
    },
    EXP: {
        single: () => {
            return '';
        },
        order: () => {
            return '';
        },
        enum: (value = []) => {
            let _e = [];

            value.forEach(that => {
                _e.push(`&quot;${that}&quot;`);
            });

            return `enum(${_e.join(',')})`;
        }
    },
    _expression(item) {
        return _.EXP[item.type](item.value || []);
    },
    _default(item = {}) {
        return item.value === undefined ? '' : `&quot;${item.value}&quot;`;
    },
    _render(name, item) {
        return {
            name: 'variable',
            attrs: {
                name,
                expression: _._expression(item),
                defaultValue: _._default(item),
                alwaysStopAt: 'true'
            }
        };
    },
    template(type = '', { name = '', value = '', desc = '', attrs = null } = {}) {
        return {
            name: 'template',
            attrs: {
                name: name,
                value: value,
                description: desc,
                toReformat: 'true',
                toShortenFQNames: 'true'
            },
            children: [_.renderVars(attrs), _.context(type)]
        }
    },
    context(type = 'js') {
        let _children = _.map.context[type] || null;

        if(!_children) {
            return null;
        }

        return {
            name: 'context',
            children: _children
        };
    }
};

module.exports = ({ type = 'js', group = 'JS', temp = {} } = {}) => {
    const _arr = [_.template(type, temp)];

    return [{
        name: 'templateSet',
        attrs: {
            group: group
        },
        children: _arr
    }];
};