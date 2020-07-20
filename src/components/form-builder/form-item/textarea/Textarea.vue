<template>
  <div class="hb-textarea">
    <template v-if="mode !== 'detail'">
      <a-textarea
        v-model="data"
        @change="onChange"
        :placeholder="formItem.placeholder"
        :autoSize="{minRows: (formItem.minRows && formItem.minRows >=3)?formItem.minRows:3 ,maxRows:
      (formItem.maxRows && formItem.maxRows >=3)?formItem.maxRows: 100
      }"
      />
      <span class="statistics" v-if="formItem.statistics">已输入{{data?data.length:0}}字</span>
    </template>
    <template v-else>{{value}}</template>
  </div>
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

<style lang="less" scoped>

.hb-textarea {
  position: relative;
  .statistics {
    position: absolute;
    right: 12px;
    bottom: -4px;
    font-size: 12px;
    color: #d1d1d1;
  }
}
</style>