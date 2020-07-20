<template>
  <div class="color-container">
    <div ref="colorPicker" class="color-picker-container"></div>
  </div>
</template>

<script>
import Pickr from "@simonwep/pickr/dist/pickr.es5.min"; // es5的版本
import "@simonwep/pickr/dist/themes/monolith.min.css"; 
export default {
  model: {
    prop: 'value',
    event: 'colorChange'
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.initPalette()
  },
  methods: {
    // 初始化调色板
    initPalette() {
      const pickr = new Pickr({
        el: this.$refs.colorPicker,
        container: "body",
        theme: "monolith",
        closeOnScroll: true,
        appClass: "custom-class",
        useAsButton: false,
        padding: 8,
        inline: false,
        autoReposition: true,
        sliders: 'h',
        disabled: false,
        lockOpacity: true,
        outputPrecision: 0,
        comparison: true,
        default: this.value,
        swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7'],
        defaultRepresentation: 'HEX',
        showAlways: false,
        closeWithKey: 'Escape',
        position: 'bottom-middle',
        adjustableNumbers: true,
        components: {
          palette: false,
          preview: true, // Display comparison between previous state and new color
          opacity: false, // Display opacity slider
          hue: true, // Display hue slider
          interaction: {
            hex: false, // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
            rgba: false, // Display 'input/output format as rgba' button (red green blue and alpha)
            hsla: false, // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
            hsva: false, // Display 'input/output format as hsva' button (hue saturation value and alpha)
            cmyk: false, // Display 'input/output format as cmyk' button (cyan mangenta yellow key )
            input: true, // Display input/output textbox which shows the selected color value.
            cancel: true, // Display Cancel Button, resets the color to the previous state
            clear: false, // Display Clear Button; same as cancel, but keeps the window open
            save: true // Display Save Button,
          }
        },
        strings: {
          save: '确认', // Default for save button
          clear: '清除', // Default for clear button
          cancel: '取消' // Default for cancel button
        }
      })
      pickr.on('save', (color, instance) => {
        color = '#' + color.toHEXA().join('')
        pickr.hide()
        this.$emit('colorChange', color)
      })
    }
  }
}
</script>

<style scoped lang="less">
.color-container {
    width: 36px;
  padding: 3px;
  border: 1px solid @border-color-base;
  border-radius: @border-radius-base;
  box-shadow: inset 0px 0px 6px 2px #000000;
}
</style>