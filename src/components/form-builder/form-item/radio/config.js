import {
    ALIGN_OPTIONS,
    VERTICAL_OPTIONS,
    DEMO_OPTIONS
} from '../common.config'

export default {
    name: '单选按钮',
    type: 'Radio',
    realForm: true,
    default_config: {
        title: '单选按钮',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: '',
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: null,
        rules: [],
        placeholder: '请选择',
        options: JSON.parse(JSON.stringify(DEMO_OPTIONS)),
        orientation: 'horizontal',
        radioMode: 'normal'
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
            type: 'Text',
            title: '默认值'
        },
        {
            fields: 'options',
            type: 'EditOption',
            title: '选项设置'
        },
        {
            fields: 'orientation',
            type: 'Radio',
            title: '选项排列方向',
            options: [{
                label: '横向',
                value: 'horizontal'
            }, {
                label: '竖向',
                value: "vertical"
            }]
        },
        {
            fields: 'radioMode',
            type: 'Radio',
            title: '展示风格',
            options: [{
                label: '正常',
                value: 'normal'
            }, {
                label: '按钮',
                value: "button"
            }]
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

    ]
}