[{
    name: 'templateSet',
    attrs: {
        group: 'RA_JS'
    },
    children: [{
            name: 'template',
            attrs: {
                name: 'func',
                value: 'function($PARAM$) {&#10;    $END$&#10;}',
                description: 'Inserts function expression',
                toReformat: 'true',
                toShortenFQNames: 'true'
            },
            children: [{
                name: 'variable',
                attrs: {
                    name: 'PARAM',
                    expression: '',
                    defaultValue: '&quot;&quot;',
                    alwaysStopAt: 'true'
                }
            }]
        },
        {
            name: 'context',
            childre: [{
                    name: 'option',
                    attrs: {
                        name: 'JAVA_SCRIPT',
                        value: 'true'
                    }
                },
                {
                    name: 'option',
                    attrs: {
                        name: 'JS_EXPRESSION',
                        value: 'true'
                    }
                },
                {
                    name: 'option',
                    attrs: {
                        name: 'JSX_HTML',
                        value: 'true'
                    }
                },
                {
                    name: 'option',
                    attrs: {
                        name: 'JS_STATEMENT',
                        value: 'true'
                    }
                }
            ]
        }
    ]
}]