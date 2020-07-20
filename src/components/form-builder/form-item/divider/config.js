import {
    ALIGN_OPTIONS,
} from '../common.config'

export default {
    name: '分割线',
    type: 'Divider',
    default_config: {
        dashed: false,
        orientation: 'left',
        text: undefined
    },
    config_render_list: [{
            fields: 'dashed',
            type: 'Checkbox',
            title: '是否虚线',
        },
        {
            fields: 'orientation',
            type: 'Radio',
            options: ALIGN_OPTIONS,
            title: '分割线标题的位置'
        },
        {
            fields: 'text',
            type: 'Text',
            title: '分割线上文字'
        }
    ]
}