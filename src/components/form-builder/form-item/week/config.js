import {
    ALIGN_OPTIONS,
} from '../common.config'
export default {
    name: '周',
    type: 'Week',
    realForm: true,
    default_config: {
        title: '周',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: undefined,
        labelBlock: false,
        labelAlign: null,labelVertical: null,
        labelCol: null,
        wraperCol: undefined,
        rules: [],
        placeholder: '请选择',
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
        type: 'Week',
        title: '默认值'
    },
    {
        fields: 'placeholder',
        type: 'Text',
        title: '提示文字',
        placeholder:'请输入提示文字'
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
    ]
}