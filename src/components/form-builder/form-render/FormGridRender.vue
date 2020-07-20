<template>
  <div class="form-grid-render">
    <a-row
      type="flex"
      :align="formItem.align || 'top'"
      :justify="formItem.justify || 'start'"
      class="form-grid-editor-row"
    >
      <a-col
        v-for="(colItem,index) in formItem.columns"
        class="col-item"
        :offset="mock?(colItem[mock]?colItem[mock].offset:colItem.offset)  :colItem.offset"
        :span="mock? (colItem[mock]?colItem[mock].span:colItem.span)  :colItem.span"
        :pull="colItem.pull"
        :push="colItem.push"
        :xs="mock?{}:colItem.isResponvive && banner?colItem.xs:colItem.span"
        :sm="mock?{}:colItem.isResponvive && banner?colItem.sm:colItem.span"
        :md="mock?{}:colItem.isResponvive && banner?colItem.md:colItem.span"
        :lg="mock?{}:colItem.isResponvive && banner?colItem.lg:colItem.span"
        :xl="mock?{}:colItem.isResponvive && banner?colItem.xl:colItem.span"
        :xxl="mock?{}:colItem.isResponvive && banner?colItem.xxl:colItem.span"
        :key="index"
      >
        <template v-for="(colListItem,cIndex) in colItem.list">
          <FormGridRender
            v-if="colListItem.type == 'Grid'"
            :mode="mode"
            :key="cIndex"
            :formItem="colListItem"
            :activeKey="activeKey"
            :form="form"
            :index="cIndex"
            :config="config"
            :banner="banner"
          />
          <FormItemRender
            v-else
            :mode="mode"
            :key="cIndex"
            :formItem="colListItem"
            :form="form"
            :activeKey="activeKey"
            :config="config"
            :index="cIndex"
          />
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FormItemRender from "./FormItemRender";

export default {
  name: "FormGridRender",
  props: [
    "formItem",
    "form",
    "config",
    "activeKey",
    "index",
    "mode",
    "banner",
    "mock"
  ],
  components: { FormItemRender }
};
</script>

<style lang="less">

</style>