import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'

export default {
    name: '多行文本域',
    type: 'Textarea',
    realForm: true,
    default_config: {
        title: '多行文本域',
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
        minRows: 3,
        maxRows: 6,
        statistics: false,
    },
    config_render_list: [{
            fields: 'title',
            type: 'Text',
            title: '标题'
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
            title: '默认值',
            placeholder: "控件默认值"
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
            fields: 'minRows',
            type: 'Number',
            title: '最小行数'
        },
        {
            fields: 'maxRows',
            type: 'Number',
            title: '最大行数'
        },
        {
            fields: 'statistics',
            type: 'Checkbox',
            title: '字数统计'
        },
    ]
}