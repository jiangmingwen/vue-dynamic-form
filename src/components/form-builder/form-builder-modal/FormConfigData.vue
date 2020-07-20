<template>
  <a-modal
    :width="width"
    title="表单配置"
    wrapClassName="preview-modal"
    v-model="modalVisible"
    :footer="null"
    :maskClosable="false"
    @cancel="$emit('close',false)"
  >
    <a-tabs @change="onChange">
      <a-tab-pane key="1" tab="表单界面配置数据">
        <div :style="{height:height+'px'}">
          <textarea ref="uiDom" :value="strUiConf"></textarea>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="表单字段配置数据">
        <div :style="{height:height+'px'}">
          <textarea ref="dbDom" :value="strDbConf"></textarea>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import * as CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript.js";

export default {
  props: ["visible", "uiConf", "dbConf"],
  data() {
    return {
      width: window.innerWidth,
      modalVisible: false,
      CodeMirrorEditorUi: null,
      height: window.innerHeight - 120,
      CodeMirrorEditorDb: null
    };
  },
  watch: {
    visible: {
      handler(v) {
        this.modalVisible = v;
      },
      immediate: true
    }
  },
  computed: {
    strUiConf() {
      return JSON.stringify(this.uiConf,null,'\t');
    },
    strDbConf() {
      return JSON.stringify(this.dbConf,null,'\t');
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.CodeMirrorEditorUi = CodeMirror.fromTextArea(this.$refs.uiDom, {
        lineNumbers: true, //是否显示每一行的行数
        cursorHeight: 1,
        mode: { name: "text/javascript" },
        theme: "darcula",
        styleActiveLine: true, // 当前行背景高亮
        smartIndent: true
      });
    });
  },
  methods: {
    onChange(e) {
      if (e == 2 && !this.CodeMirrorEditorDb) {
        this.$nextTick(() => {
          this.CodeMirrorEditorDb = CodeMirror.fromTextArea(this.$refs.dbDom, {
            lineNumbers: true, //是否显示每一行的行数
            cursorHeight: 1,
            mode: { name: "text/javascript" },
            theme: "darcula",
            styleActiveLine: true, // 当前行背景高亮
            smartIndent: true
          });
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>

@import "~codemirror/lib/codemirror.css";
@import "~codemirror/theme/darcula.css";
/deep/ .CodeMirror {
  height: 100%;
}
</style>