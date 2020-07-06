<template>
  <div style="background-color:#fff;height:100%">
    <div class="mainBox">
      <a-steps :current="current" style="width: 600px;margin: 0 auto;padding: 40px 0px;">
        <a-step title="考生基本信息"></a-step>
        <a-step title="志愿填报"></a-step>
        <a-step title="完成"></a-step>
      </a-steps>

      <div>
        <!-- 基本信息 -->
        <information v-if="current===0" @returnval="getval" />
        <!-- 填报 -->
        <Fillin v-if="current===1" :getvalmodel='getvalmodel.model'/>
      </div>
    </div>
  </div>
</template>

<script>
import information from "./information";
import Fillin from "./Fillin";
export default {
  components: {
    information,
    Fillin
  },
  data() {
    return {
      current: 0,
      disabledbtn: true,
      getvalmodel:{}
    };
  },
  methods: {
    zytb() {
      this.current = this.current + 1;
    },
    getval(model) {
      this.current = model.num;
      console.log(model)
      this.getvalmodel  =model 
    }
  }
};
</script>
<style  lang="less" scoped>
.mainBox {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  margin-top: 64px;
  padding-top: 10px;
}
</style>
