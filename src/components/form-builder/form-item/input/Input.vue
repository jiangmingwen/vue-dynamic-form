<template>
  <span>
    <a-input
      v-if="mode !== 'detail'"
      v-model="data"
      @change="onChange"
      :placeholder="formItem.placeholder"
    >
      <template v-if="formItem.prefix" slot="prefix">
        <a-tooltip v-if="formItem.prefixTooltip" :title="formItem.prefixTooltip">
          <a-icon v-if="formItem.prefixType == 'icon'" :type="formItem.prefix" />
          <span v-else>{{ formItem.prefix }}</span>
        </a-tooltip>
        <template v-else>
          <a-icon v-if="formItem.prefixType == 'icon'" :type="formItem.prefix" />
          <span v-else>{{ formItem.prefix }}</span>
        </template>
      </template>
      <template v-if="formItem.suffix" slot="suffix">
        <a-tooltip v-if="formItem.suffixTooltip" :title="formItem.suffixTooltip">
          <a-icon v-if="formItem.suffixType == 'icon'" :type="formItem.suffix" />
          <span v-else>{{ formItem.suffix }}</span>
        </a-tooltip>
        <template v-else>
          <a-icon v-if="formItem.suffixType == 'icon'" :type="formItem.suffix" />
          <span v-else>{{ formItem.suffix }}</span>
        </template>
      </template>
    </a-input>
    <template v-else>{{value}}</template>
    <span v-if="formItem.dsb">大傻逼</span>
  </span>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  watch: {
    value: {
      handler(v) {
        this.data = v;
      },
      immediate: true
    }
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    onChange(data) {
      this.$emit("change", data);
    }
  }
};
</script>

<style>
</style>