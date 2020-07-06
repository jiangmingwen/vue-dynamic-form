<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <page-header showindex="1"></page-header>
      <div class="page-container">
      <router-view />
      </div>
    </div>
  </a-config-provider>
</template>
<script>
import API from "@/api";
import { DICTIONARY_KEY } from "@/constant/storage-key";
import store from "@/store";
import keyMap from "@/constant/storage-map-mutation";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    "page-header": PageHeader
  },
  data() {
    return {
      locale: zhCN
    };
  },
  created() {
    this.getDic();
    this.initAppStore();
  },
  methods: {
    /**
     * 获取字典
     */
    getDic() {
      //存入字典到local
      this.$http.get(API.GET_DIC).then(res => {
        this.$http
          .get(API.GET_KZDIC)
          .then(kzRes => {
            this.$ls.set(DICTIONARY_KEY, Object.assign({}, res, kzRes));
          })
          .catch(() => {
            //如果开州字典失败，直接存通用字典
            this.$ls.set(DICTIONARY_KEY, res);
          });
      });
    },
    /**
     * 项目启动，挂载storage信息到store上
     */
    initAppStore() {
      this.updateAppTitle();
      for (let key in keyMap) {
        let data = this.$ss.get(keyMap[key]);
        data && store.commit(key, data);
      }
    },
    updateAppTitle() {
      document.getElementById("app-title").innerText =
        window.config.logo_title || "重庆市开州区招生管理服务平台";
    }
  }
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
.comPadding {
  min-height: 100%;
  margin-top: 64px;
  padding: 20px calc((100% - 1136px) / 2);
}
.comBgcolor {
  background-color: #fff;
  min-height: 800px;
  box-sizing: border-box;
}
.lineset {
  height: 50px;
  line-height: 50px;
  margin: 0px 40px 40px 20px;
  text-align: left;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
}
.linesettitletext {
  display: inline-block;
  text-indent: 20px;
  font-size: 18px;
}
.spanicon {
  width: 4px;
  height: 20px;
  display: inline-block;
  background-color: #009999;
  position: absolute;
  margin: 0 auto;
  position: absolute;
  top: 33%;
  left: 0%;
}
.ant-form-item-label {
  text-align: left;
}
.page-container{
   padding-top: 64px;
}
</style>