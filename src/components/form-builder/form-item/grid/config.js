export default {
    name: '栅格布局',
    type: 'Grid',
    default_config: {
        align: 'top',
        justify: 'start',
        columns: [{
                list: [],
                offset: 0,
                pull: 0,
                push: 0,
                span: 12,
                isResponvive: false,
                xs: {
                    span: 12,
                    offset: 0
                },
                sm: {
                    span: 12,
                    offset: 0
                },
                md: {
                    span: 12,
                    offset: 0
                },
                lg: {
                    span: 12,
                    offset: 0
                },
                xl: {
                    span: 12,
                    offset: 0
                },
                xxl: {
                    span: 12,
                    offset: 0
                }
            },
            {
                list: [],
                offset: 0,
                pull: 0,
                push: 0,
                span: 12,
                isResponvive: false,
                xs: {
                    span: 12,
                    offset: 0
                },
                sm: {
                    span: 12,
                    offset: 0
                },
                md: {
                    span: 12,
                    offset: 0
                },
                lg: {
                    span: 12,
                    offset: 0
                },
                xl: {
                    span: 12,
                    offset: 0
                },
                xxl: {
                    span: 12,
                    offset: 0
                }
            },
        ]
    },
    config_render_list: [{
            fields: 'align',
            title: '垂直对齐方式',
            type: 'Options',
            options: [{
                    label: '顶部对齐',
                    value: 'top'
                },
                {
                    label: '居中对齐',
                    value: 'middle'
                },
                {
                    label: '底部对齐',
                    value: 'bottom'
                }
            ]
        },
        {
            fields: 'justify',
            title: '水平对齐方式',
            type: 'Options',
            options: [{
                    label: '左对齐',
                    value: 'start'
                },
                {
                    label: '居中对齐',
                    value: 'end'
                },
                {
                    label: '右对齐',
                    value: 'center'
                },
                {
                    label: '均分对齐',
                    value: 'space-around'
                },
                {
                    label: '两端对齐',
                    value: 'space-between'
                }
            ]
        },
        {
            fields: 'columns',
            type: 'GridColumn',
            title: '栅格列（总数24）'
        }
    ]
}