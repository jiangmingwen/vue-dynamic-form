<template>
  <span>
    <a-divider
      :dashed="formItem.dashed"
      v-if="formItem.orientation !== 'center' "
      :orientation="formItem.orientation"
    >{{formItem.text || undefined}}</a-divider>
    <a-divider :dashed="formItem.dashed" v-if="formItem.orientation === 'center' ">{{formItem.text||undefined}}</a-divider>
  </span>
</template>

<script>
export default {
      props: ["formItem", "form", "config"],
};
</script>

<style>
</style>