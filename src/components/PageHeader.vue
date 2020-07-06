<template>
  <div class="headermainBox">
    <a-row>
      <a-col :span="12">
        <div
          class="headertitle"
          style="text-align:left; cursor: pointer;"
        >
          {{ title }}
        </div>
      </a-col>
      <a-col :span="12" style="text-align:right;">
        <div class="headerRight">
          <div class="userindex" @click="$router.push({ name: 'index' })">
            <a-icon type="home"></a-icon> 个人首页
          </div>
          <div class="loginOut" @click="loginOut">
            <a-icon type="poweroff"></a-icon> 退 出
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    showindex: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      title: "开州招生报名信息平台"
    };
  },
  computed: {
    ...mapState(["userModel"])
  },
  methods: {
    loginOut() {
      this.$confirm({
        title: "退出",
        content: "你确定要退出吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          var hbsoft = new HBSignIn();
          hbsoft.LoginOut(this.userModel.AppCode, this.userModel.Id);
          this.$ss.clear();
        },
        onCancel() {
          // console.log("Cancel");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.headermainBox {
  width: 100%;
  height: 64px;
  background: #002140;
  box-shadow: 0px 1px 4px #001529;
  opacity: 1;
  color: #fff;
  box-sizing: border-box;
  padding: 0 calc((100% - 1136px) / 2);
  line-height: 63px;
  position: fixed;
  top: 0;
  z-index: 999;
}
.headertitle {
  font-size: 18px;
  font-family: FZZDHJW;
  letter-spacing: 3px;
  img {
    width: 40px;
  }
}
.headerRight {
  display: flex;
  justify-content: flex-end;
  align-content: center;

  .userindex {
    margin-top: 15px;
    border-radius: 2px;
    font-size: 14px;
    width: 120px;
    height: 32px;
    line-height: 32px;
    background: #a6a6a6;
    opacity: 0.4;
    border-radius: 2px;
    text-align: center;
    margin-right: 30px;
    cursor: pointer;
  }
  .loginOut {
    cursor: pointer;
  }
}
</style>