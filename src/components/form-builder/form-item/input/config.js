import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
    INPUTFIX_OPTIONS
} from '../common.config'
export default {
    name: '文本框',
    type: 'Input',
    realForm: true,
    default_config: {
        title: '文本框',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: null,
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: null,
        rules: [],
        placeholder: '请输入',
        prefix: null,
        prefixTooltip: null,
        prefixType: 'text',
        suffix: null,
        suffixTooltip: null,
        suffixType: 'text',
        dsb: true
    },
    config_render_list: [
        {
            fields: 'dsb',
            type: 'Checkbox',
            title: '是不是大傻逼',
        },
        {
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
            fields: 'prefix',
            type: 'Text',
            title: '前缀',
            placeholder: '输入框前缀(不输入则没有前缀)'
        },
        {
            fields: 'prefixTooltip',
            type: 'Text',
            title: '前缀提示内容',
            placeholder: '前缀的提示信息(不输入则不提示)'
        },
        {
            fields: 'prefixType',
            type: 'Radio',
            title: '前缀类型',
            options: INPUTFIX_OPTIONS
        },
        {
            fields: 'suffix',
            type: 'Text',
            title: "后缀",
            placeholder: '输入框后缀(不输入则没有后缀)'

        },
        {
            fields: 'suffixTooltip',
            type: 'Text',
            title: "后缀提示内容"
        },
        {
            fields: 'suffixType',
            type: 'Radio',
            title: '后缀类型',
            options: INPUTFIX_OPTIONS
        },

    ]
}