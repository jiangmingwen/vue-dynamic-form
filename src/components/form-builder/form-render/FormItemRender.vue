<template>
  <div class="form-item-render">
    <a-form-item
      v-if="formItem.realForm"
      :label="formItem.hideTitle ?'': formItem.title"
      :label-col="{span:  formItem.labelCol || config.labelCol || 5 }"
      :wrapper-col="{span: formItem.wraperCol || config.wraperCol || 12}"
      :class="[ 
        formItem.labelAlign || config.labelAlign || 'right',
        formItem.labelOverflow,
        formItem.labelVertical || config.labelVertical || 'top',
      ]"
    >
      <HbInput
        v-if="formItem.type === 'Input'"
        :formItem="formItem"
        :mode="mode"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbTextarea
        v-else-if="formItem.type === 'Textarea'"
        :formItem="formItem"
        :config="config"
        :mode="mode"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbNumber
        v-else-if="formItem.type === 'Number'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbDatetime
        v-else-if="formItem.type === 'Datetime'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbMonth
        v-else-if="formItem.type === 'Month'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbWeek
        v-else-if="formItem.type === 'Week'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbDateRange
        v-else-if="formItem.type === 'DateRange'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbTime
        v-else-if="formItem.type === 'Time'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbTag
        v-else-if="formItem.type === 'Tag'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbPcd
        v-else-if="formItem.type === 'Pcd'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { rules: (formItem.rules || []) ,
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbSwitch
        v-else-if="formItem.type === 'Switch'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
            initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbRate
        v-else-if="formItem.type === 'Rate'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbRadio
        v-else-if="formItem.type === 'Radio'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbCheckbox
        v-else-if="formItem.type === 'Checkbox'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbSelect
        v-else-if="formItem.type === 'Select'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbMultiSelect
        v-else-if="formItem.type === 'MultiSelect'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbTagSelect
        v-else-if="formItem.type === 'TagSelect'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />

      <HbUploadImg
        v-else-if="formItem.type === 'UploadImg'"
        :mode="mode"
        :formItem="formItem"
        :config="config"
        v-decorator="[
            `${formItem.model}`,
            { 
              rules: (formItem.rules || []) ,
              initialValue: formItem.defaultValue  
            },
        ]"
      />
    </a-form-item>
    <template v-else>
      <HbDivider v-if="formItem.type === 'Divider'" :formItem="formItem" :config="config" />
      <HbText v-else-if="formItem.type === 'Text'" :formItem="formItem" :config="config" />
    </template>
  </div>
</template>

<script>
import * as FormItemMap from "../form-item";
export default {
  props: ["formItem", "form", "config", "activeKey", "mode"],
  components: { ...FormItemMap },
  mounted() {
    console.log(FormItemMap);
  },
  methods: {
    gogo() {}
  }
};
</script>

<style lang="less" scoped>

.form-item-render {
  overflow: hidden;
  /deep/ .ant-row {
    display: flex;
    .ant-form-item-label {
      word-break: break-all;
      white-space: normal;
    }
    &.ellipsis {
      .ant-form-item-label {
        label {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    &.right {
      .ant-form-item-label {
        justify-content: flex-end;
      }
    }

    &.center {
      .ant-form-item-label {
        justify-content: center;
      }
    }

    &.left {
      .ant-form-item-label {
        justify-content: flex-start;
      }
    }

    &.top {
      .ant-form-item-label {
        display: flex;
        align-items: flex-start;
      }
    }

    &.middle {
      .ant-form-item-label {
        display: flex;
        align-items: center;
      }
    }

    &.bottom {
      .ant-form-item-label {
        display: flex;
        align-items: flex-end;
      }
    }

    .ant-col-1 {
      flex: 0 0 4.16666667%;
    }
    .ant-col-2 {
      flex: 0 0 8.33333333%;
    }
    .ant-col-3 {
      flex: 0 0 12.5%;
    }
    .ant-col-4 {
      flex: 0 0 16.66666667%;
    }
    .ant-col-5 {
      flex: 0 0 20.83333333%;
    }
    .ant-col-6 {
      flex: 0 0 25%;
    }
    .ant-col-7 {
      flex: 0 0 29.16666667%;
    }
    .ant-col-8 {
      flex: 0 0 33.33333333%;
    }
    .ant-col-9 {
      flex: 0 0 37.5%;
    }
    .ant-col-10 {
      flex: 0 0 41.66666667%;
    }
    .ant-col-11 {
      flex: 0 0 45.83333333%;
    }
    .ant-col-12 {
      flex: 0 0 50%;
    }
    .ant-col-13 {
      flex: 0 0 54.16666667%;
    }
    .ant-col-14 {
      flex: 0 0 58.33333333%;
    }
    .ant-col-15 {
      flex: 0 0 62.5%;
    }
    .ant-col-16 {
      flex: 0 0 66.66666667%;
    }
    .ant-col-17 {
      flex: 0 0 70.83333333%;
    }
    .ant-col-18 {
      flex: 0 0 75%;
    }
    .ant-col-19 {
      flex: 0 0 79.16666667%;
    }
    .ant-col-20 {
      flex: 0 0 83.33333333%;
    }
    .ant-col-21 {
      flex: 0 0 87.5%;
    }
    .ant-col-22 {
      flex: 0 0 91.66666667%;
    }
    .ant-col-23 {
      flex: 0 0 95.83333333%;
    }

    .ant-col-24 {
      flex: 0 0 100%;
    }
  }
}
</style>