import {
    ALIGN_OPTIONS,
    VERTICAL_OPTIONS,
} from '../common.config'
export default {
    name: '时间选择器',
    type: 'Time',
    realForm: true,
    default_config: {
        title: '时间选择器',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: null,
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: undefined,
        rules: [],
        placeholder: '请选择',
        showMode: false
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
            type: 'Time',
            title: '默认值'
        },
        {
            fields: 'showMode',
            type: 'Radio',
            title: '显示模式',
            options: [{
                label: '24小时制',
                value: false
            }, {
                label: '12小时制',
                value: true
            }, ]
        },
        {
            fields: 'placeholder',
            type: 'Text',
            title: '提示文字',
            placeholder: '请输入提示文字'
        },
        {
            fields: 'rules',
            type: 'Rules',
            title: '校验规则'
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