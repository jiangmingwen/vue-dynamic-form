import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'
export default {
    name: '标签',
    type: 'Tag',
    realForm: true,
    default_config: {
        title: '标签',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: [],
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: undefined,
        rules: [],
    },
    config_render_list: [{
            fields: 'title',
            type: 'Text',
            title: '标题',
            placeholder: '字段别名'
        },
        {
            fields: 'hideTitle',
            type: 'Checkbox',
            title: '隐藏标题'
        },
        {
            fields: 'labelOverflow',
            type: 'Radio',
            options: [{
                    label: '省略号',
                    value: 'ellipsis'
                },
                {
                    label: '换行',
                    value: 'break'
                },
            ],
            title: '标题溢出处理方式'
        },
        {
            fields: 'defaultValue',
            type: 'Tag',
            title: '默认值'
        },
        {
            fields: 'labelCol',
            type: 'Number',
            title: '标题宽度'
        },
        {
            fields: 'wraperCol',
            type: 'Number',
            title: '控件宽度'
        },
        {
            fields: 'labelBlock',
            type: 'Checkbox',
            title: '标题独占一行'
        },
        {
            fields: 'labelAlign',
            type: 'Radio',
            options: ALIGN_OPTIONS,
            title: '标题对齐方式'
        },
        {
            fields: 'labelVertical',
            type: 'Radio',
            options: VERTICAL_OPTIONS,
            title: '标题竖向对齐方式'
        },

    ]
}