import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'
export default {
    name: '文本',
    type: 'Text',
    default_config: {
        bgColor: '#FFFFFF',
        color: '#333333',
        height: 60,
        fontSize: 16,
        value: "文本内容",
        textAlign: 'left',
        lineHight: 'inherit',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        padding: '16px',
    },
    config_render_list: [{
            fields: 'value',
            type: 'Textarea',
            title: '内容',
            placeholder: "请输入文本内容"
        },
        {
            fields: 'fontSize',
            type: 'Number',
            min: 12,
            title: '字体大小(单位：像素)'
        },
        {
            fields: 'bgColor',
            type: 'Color',
            title: '背景颜色'
        },
        {
            fields: 'color',
            type: 'Color',
            title: '字体颜色'
        },
        {
            fields: 'textAlign',
            title: '对齐方式',
            type: 'Radio',
            options: ALIGN_OPTIONS
        },
        {
            fields: 'lineHight',
            type: 'Text',
            title: '行高',
            placeholder: '如：30px或1.5'
        },
        {
            fields: 'fontWeight',
            title: '字体粗细',
            type: 'Radio',
            options: [{
                    label: '粗体',
                    value: 'bold'
                },
                {
                    label: '正常',
                    value: 'normal'
                },
                {
                    label: '继承',
                    value: 'inherit'
                },
                {
                    label: '600',
                    value: '600'
                },
                {
                    label: '500',
                    value: '500'
                },
                {
                    label: '400',
                    value: '400'
                },
                {
                    label: '300',
                    value: '300'
                },
                {
                    label: '200',
                    value: '200'
                },
                {
                    label: '100',
                    value: '100'
                },
            ]
        },
        {
            fields: 'fontStyle',
            title: '字体样式',
            type: 'Radio',
            options: [{
                    label: '正常',
                    value: 'normal'
                },
                {
                    label: '继承',
                    value: 'inherit'
                },
                {
                    label: '斜体',
                    value: 'italic'
                },
            ]
        },
        {
            fields: 'textDecoration',
            title: '字体装饰',
            type: 'Radio',
            options: [{
                    label: '默认',
                    value: 'none'
                },
                {
                    label: '下划线',
                    value: 'underline'
                },
                {
                    label: '上划线',
                    value: 'overline'
                },
                {
                    label: '删除线',
                    value: 'line-through'
                },
            ]
        },
    ]
}