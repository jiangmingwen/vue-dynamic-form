import {
    ALIGN_OPTIONS,
   VERTICAL_OPTIONS,
} from '../common.config'

export default {
    name: '图片上传',
    type: 'UploadImg',
    realForm: true,
    default_config: {
        title: '图片上传',
        hideTitle: false,
        labelOverflow: 'ellipsis',
        defaultValue: '',
        labelBlock: false,
        labelAlign: null,labelVertical: null,
        labelCol: null,
        wraperCol: null,
        rules: [],
        placeholder: '请选择',
        uploadText: '上传',
        uploadTextOverflow: 'wrap',
        remark: '',
        remarkOverflow: 'wrap',
        size: 'normal',
        fileTypes: ['jpg', 'png'],
        api: '/oss/FileService/Upload',
        fileLimit: 2048,
        imgWidth: 120,
        imgHeight: 120
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
            fields: 'api',
            title:"文件上传API（特殊情况才修改）",
            type:'Text',
            placeholder:"请勿修改,除非你真的知道你在做什么"
        },
        {
            fields: 'imgWidth',
            title:"控件中图片的宽度",
            type:'Text',
            placeholder:'≤0或者不输入为默认120像素'
        },
        {
            fields: 'imgHeight',
            title:"控件中图片的高度",
            type:'Text',
            placeholder:'≤0或者不输入为默认120像素'
        },
        {
            fields: 'uploadText',
            type: 'Text',
            title: '上传按钮标题',
            placeholder: '上传按钮下的提示文字'
        },
        {
            fields: 'uploadTextOverflow',
            type: 'Radio',
            title: '上传按钮标题太长的显示方式',
            placeholder: '默认换行',
            options:[{
                label:'换行',
                value:'wrap'
            },{
                label:'省略号',
                value:'ellipsis'
            }]
        },
        {
            fields: 'remark',
            type: 'Text',
            title: '备注',
            placeholder: '控件下方的备注文字'
        },
        {
            fields: 'remarkOverflow',
            type: 'Radio',
            title: '备注文字太长的显示方式',
            placeholder: '默认换行',
            options:[{
                label:'换行',
                value:'wrap'
            },{
                label:'省略号',
                value:'ellipsis'
            }]
        },
        
        {
            fields: 'size',
            type: 'Radio',
            title: '控件大小',
            options: [{
                    label: '小',
                    value: 'small'
                }, {
                    label: "正常",
                    value: 'normal'
                },
                {
                    label: '大',
                    value: 'large'
                }
            ]
        },
        {
            fields: 'fileLimit',
            type: 'FileNum',
            title: '文件大小（单位KB）',
            placeholder: '≤0不做限制'
        },
        {
            fields: 'fileTypes',
            type: 'MultiSelect',
            title: '支持文件类型',
            options: [{
                    label: 'jpg/jpeg',
                    value: 'jpg'
                }, {
                    label: 'png',
                    value: 'png'
                },
                {
                    label: 'gif',
                    value: 'gif'
                },
                {
                    label: 'bmp',
                    value: 'bmp'
                },
                {
                    label: 'svg',
                    value: 'svg'
                },
            ]
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