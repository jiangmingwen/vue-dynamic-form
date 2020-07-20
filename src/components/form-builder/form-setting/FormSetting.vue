<template>
  <div class="form-setting-container">
    <template v-if="defaultField">
      <div class="setting-item" v-if="defaultField && defaultField.realForm">
        <div class="setting-label">控件字段</div>
        <div class="setting-control">
          <Field v-model="activeItem['model']" />
        </div>
      </div>
      <div
        class="setting-item"
        v-for="(item,index) in defaultField.config_render_list"
        :key="index"
      >
        <div class="setting-label">{{item.title}}</div>
        <div class="setting-control">
          <a-input
            v-if="item.type == 'Text' "
            v-model="activeItem[item.fields]"
            @change="valueChange"
            :disabled="item.relationField && (activeItem[item.relationField] == item.relationValue)"
            :placeholder="item.placeholder || item.title"
          />

          <a-input-number
            v-else-if="item.type == 'Number'"
            v-model="activeItem[item.fields]"
            :min="item.min"
            :max="item.max"
            @change="valueChange"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          />

          <a-checkbox
            v-else-if="item.type == 'Checkbox'"
            v-model="activeItem[item.fields]"
            @change="valueChange"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          >{{item.label}}</a-checkbox>

          <a-select
            v-else-if="item.type == 'Options'"
            v-model="activeItem[item.fields]"
            :defaultValue="activeItem[item.fields]"
            @change="valueChange"
            style="width:100%"
            :disabled="item.relationField && data[item.relationField] == item.relationValue"
          >
            <a-select-option
              v-for="(option,index) in item.options"
              :key="index"
              :value="option.value"
            >{{option.label}}</a-select-option>
          </a-select>

          <a-select
            mode="multiple"
            v-else-if="item.type == 'MultiSelect'"
            :maxTagCount="2"
            :maxTagPlaceholder="'等'+activeItem[item.fields].length+'项已选择' "
            v-model="activeItem[item.fields]"
            :defaultValue="activeItem[item.fields]"
            @change="valueChange"
            style="width:100%"
            :disabled="item.relationField && data[item.relationField] == item.relationValue"
          >
            <a-select-option
              v-for="(option,index) in item.options"
              :key="index"
              :value="option.value"
            >{{option.label}}</a-select-option>
          </a-select>

          <a-textarea
            v-else-if="item.type == 'Textarea'"
            v-model="activeItem[item.fields]"
            :defaultValue="activeItem[item.fields]"
            :placeholder="item.placeholder || item.title"
            @change="valueChange"
            :rows="3"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          />
          <a-radio-group
            v-else-if="item.type == 'RadioButton'"
            v-model="activeItem[item.fields]"
            :defaultValue="activeItem[item.fields]"
            buttonStyle="solid"
            @change="valueChange"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          >
            <a-radio-button
              v-for="(option,index) in item.options"
              :key="index"
              :value="option.value"
            >{{option.label}}</a-radio-button>
          </a-radio-group>

          <a-radio-group
            v-else-if="item.type == 'Radio'"
            v-model="activeItem[item.fields]"
            :defaultValue="activeItem[item.fields]"
            @change="valueChange"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          >
            <a-radio
              v-for="(option,index) in item.options"
              :key="index"
              :value="option.value"
            >{{option.label}}</a-radio>
          </a-radio-group>

          <GridColumn
            v-else-if="item.type == 'GridColumn'"
            v-model="activeItem[item.fields]"
            @change="valueChange"
            :disabled="item.relationField && activeItem[item.relationField] == item.relationValue"
          />

          <Rule
            v-else-if="item.type == 'Rules'"
            v-model="activeItem[item.fields]"
            @change="valueChange"
          />
          <Color
            v-else-if="item.type == 'Color'"
            v-model="activeItem[item.fields]"
            @change="valueChange"
          />

          <HbDatetime
            v-else-if="item.type == 'Datetime'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title,showTime: activeItem['showTime']}"
            @change="valueChange"
          />

          <HbMonth
            v-else-if="item.type == 'Month'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title}"
            @change="valueChange"
          />

          <HbWeek
            v-else-if="item.type == 'Week'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title}"
            @change="valueChange"
          />

          <HbDateRange
            v-else-if="item.type == 'DateRange'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title,showTime: activeItem['showTime']}"
            @change="valueChange"
          />

          <HbTime
            v-else-if="item.type == 'Time'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title,showMode: activeItem['showMode']}"
            @change="valueChange"
          />

          <HbTag
            v-else-if="item.type == 'Tag'"
            v-model="activeItem[item.fields]"
            @change="valueChange"
          />
          <HbPcd
            v-else-if="item.type == 'Pcd'"
            v-model="activeItem[item.fields]"
            :formItem="{placeholder: item.placeholder || item.title,showSearch: true}"
            @change="valueChange"
          />

          <HbSwitch
            v-else-if="item.type == 'Switch'"
            v-model="activeItem[item.fields]"
            :formItem="{  
              checkedChildren: activeItem['checkedChildren'],
              unCheckedChildren: activeItem['unCheckedChildren'],
              dbCheckedValue: activeItem['dbCheckedValue'],
              dbUnCheckedValue: activeItem['dbUnCheckedValue'],
             }"
            @change="valueChange"
          />

          <HbRate
            v-else-if="item.type == 'Rate'"
            v-model="activeItem[item.fields]"
            :formItem="{allowHalf:activeItem['allowHalf']}"
            @change="valueChange"
          />

          <HbRadio
            v-else-if="item.type == 'Radio'"
            v-model="activeItem[item.fields]"
            :formItem="{allowHalf:activeItem['allowHalf']}"
            @change="valueChange"
          />

          <EditOptions
            v-else-if="item.type == 'EditOption'"
            v-model="activeItem[item.fields]"
            :formItem="{allowHalf:activeItem['allowHalf']}"
            @change="valueChange"
          />

          <!-- <EditOption
              v-model="data[item.fields]"
              @change="valueChange"
              v-else-if="item.type == 'EditOptions'"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
          />-->

          <!-- <FormRule
              v-model="data[item.fields]"
              @change="valueChange"
              v-else-if="item.type == 'Rules'"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
          />-->

          <!-- <div
              class="color-box"
              v-else-if="item.type == 'Color'"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
            >
              <div class="color-value">{{data[item.fields]}}</div>
              <ColorPicker @change="valueChange" v-model="data[item.fields]" />
          </div>-->

          <!-- <Columns
              v-model="data"
              @change="valueChange"
              v-else-if="item.type == 'Columns'"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
            />
            <TableColumns
              v-model="data[item.fields]"
              @change="valueChange"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
              v-else-if="item.type == 'TableColumns'"
            ></TableColumns>
            <StatisticExpress
              v-model="data[item.fields]"
              @change="valueChange"
              :disabled="item.relationField && data[item.relationField] == item.relationValue"
              v-else-if="item.type == 'StatisticExpress'"
          ></StatisticExpress>-->
          <!-- <RelOption
              v-model="data[item.fields]"
              :model="data.model"
              :options="data.options"
              :controls="controls"
          v-else-if="item.type == 'RelOption'"-->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getdefaultConfig } from "../utils/form-config.util";
import * as SettingMap from "./setting-components";
import {
  HbDatetime,
  HbMonth,
  HbWeek,
  HbDateRange,
  HbTime,
  HbTag,
  HbPcd,
  HbSwitch,
  HbRate,
  HbRadio
} from "../form-item";
export default {
  props: ["activeItem"],
  components: {
    ...SettingMap,
    HbDatetime,
    HbMonth,
    HbWeek,
    HbDateRange,
    HbTime,
    HbTag,
    HbPcd,
    HbSwitch,
    HbRate,
    HbRadio
  },
  data() {
    return {
      defaultField: null,
      scroll: null
    };
  },
  watch: {
    activeItem: {
      handler(v) {
        //根据type获取表单的默认配置，渲染设置页面
        if (v && v.type) {
          this.defaultField = getdefaultConfig(v.type);
          console.log(this.defaultField, "this.defaultField");
        } else {
          this.defaultField = null;
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    valueChange(e) {
      console.log(this.activeItem, "设置改变");
      this.$emit("change", this.activeItem);
    }
  }
};
</script>

<style lang="less" scoped>

@primary-color: #1890ff;
.form-setting-container {
  flex: 1;
  .setting-item {
    padding: 16px 8px;
    border-bottom: 1px dashed #d8d8d8;
    .setting-label {
      &::before {
        content: "";
        display: inline-block;
        height: 10px;
        width: 3px;
        margin-right: 5px;
        background-color: @primary-color;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>