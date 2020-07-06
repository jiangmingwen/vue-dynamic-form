import generate from '@ant-design/colors/lib/generate'
import client from 'webpack-theme-color-replacer/client'

const getAntdSerials = color => {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill(0).map((t, i) => {
        return client.varyColor.lighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
    return lightens.concat(colorPalettes).concat(rgb)
}

/**
 * 修改主题
 * @param {*} newColor 新的颜色
 */
export const changeColor = newColor => {
    const options = {
        newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
        changeUrl(cssUrl) {
            return `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
        }
    }
    return client.changer.changeColor(options, Promise)
}