<template>
  <div
    :style="{
            'background-color': formItem.bgColor,
            'color':formItem.color,
            'fontSize': formItem.fontSize+'px',
            'font-weight':formItem.fontWeight,
            'font-style':formItem.fontStyle,
            'line-height': formItem.lineHight,
            'text-align':formItem.textAlign,
            'text-decoration':formItem.textDecoration,
            'padding':'8px 0 8px 4px'
    }"
  >{{formItem.value}}</div>
</template>
<script>
export default {
    props:['formItem']
}
</script>