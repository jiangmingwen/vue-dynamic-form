import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'

export default {
    name: '数字输入框',
    type: 'Number',
    realForm: true,
    default_config: {
        title: '数字输入框',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: undefined,
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: undefined,
        rules: [],
        placeholder: '请输入',
        max: undefined,
        min: undefined,
        precision: undefined,
        decimalSeparator: undefined,
        step: 1,
        parser: undefined,
        formatter: undefined
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
            fields: 'step',
            type: 'Number',
            title: '每次改变步数，可以为小数',
        },
        {
            fields: 'parser',
            type: 'Textarea',
            title: '指定从formatter 里转换回数字的方式，和formatter搭配使用',
            placeholder: "如：value => value.replace('%', '')"
        },
        {
            fields: 'formatter',
            type: 'Textarea',
            title: '指定输入框展示值的格式',
            placeholder: '如：value => `${value}%`'
        },
        {
            fields: 'max',
            type: 'Number',
            title: '最大值',
        },
        {
            fields: 'min',
            type: 'Number',
            title: '最小值',
        },
        {
            fields: 'precision',
            type: 'Number',
            title: '数值精度',
        },
        {
            fields: 'decimalSeparator',
            type: 'Number',
            title: '小数点',
        },
    ]
}