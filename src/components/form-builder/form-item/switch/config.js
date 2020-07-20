import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'

export default {
    name: '开关',
    type: 'Switch',
    realForm: true,
    default_config: {
        title: '开关',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: null,
        labelBlock: false,
        labelAlign: null,
        labelVertical: null,
        labelCol: null,
        wraperCol: null,
        checkedChildren: '是',
        unCheckedChildren: '否',
        dbCheckedValue: 'True',
        dbUnCheckedValue: 'False'
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
            type: 'Switch',
            title: '默认值'
        },
        {
            fields: 'checkedChildren',
            type: 'Text',
            title: '选中时显示文字'
        },
        {
            fields: 'unCheckedChildren',
            type: 'Text',
            title: '未选中时显示文字'
        },

        {
            fields: 'dbCheckedValue',
            type: 'Text',
            title: '选中时输出的值（给后端）'
        },
        {
            fields: 'dbUnCheckedValue',
            type: 'Text',
            title: '未选中时输出的值（给后端）'
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