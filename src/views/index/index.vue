<template>
  <div style="background-color:#fff;height:100%">
    <div class="mainBox">
      <!-- <div class="lineset">
        <div>
          <div class="spanicon"></div>
          <div class="linesettitletext">功能操作区</div>
        </div>
      </div>-->
      <div class="Warningalert">
        <a-alert type="warning" message="温馨提示：此次报名为模拟考试，数据仅作为测试流程使用" showIcon />
      </div>
      <div class="indexsteps">
        <a-steps :current="1" progressDot>
          <!-- <a-popover slot="progressDot" slot-scope="{ index, status, prefixCls }">
            <template slot="content">
              <span>step {{ index }} status: {{ status }}</span>
            </template>
            <span :class="`${prefixCls}-icon-dot`"></span>
          </a-popover>-->
          <a-step title="考试报名" description="2020-4-26" />
          <a-step title="志愿填报" description="2020-4-26" />
          <a-step title="考试成绩公开" description="2020-4-26" />
          <a-step title="录取结果公开" description="2020-4-26" />
        </a-steps>
      </div>
      <div class="indexbody">
        <div class="bodytitle">
          <div>
            <img src="@/assets/index/in1.png" />
          </div>
          <div>2019-2020学年（当前学年）</div>
        </div>
      </div>
      <div class="indexbody-bottom">
        <a-row :gutter="36">
          <a-col :span="14">
            <div class="bottomtitle">
              <div>
                <img src="@/assets/index/in8.png" />
              </div>
              <div>考试功能</div>
            </div>
            <a-row :gutter="20">
              <a-col :span="12">
                <router-link :to="{ name: 'kssignup' }">
                  <a-card :hoverable="true" class="acradsytle">
                    <div class="acradsytlebody">
                      <div>
                        <img src="@/assets/index/in2.png" />
                      </div>
                      <div>
                        <div class="acradsytletitle">考试报名</div>
                        <div class="acradsytletext">根据学生类型进行报名中考、体育考试查看报名状态</div>
                      </div>
                    </div>
                  </a-card>
                </router-link>
              </a-col>
              <a-col :span="12">
                <a-card :hoverable="true" class="acradsytle">
                  <div class="acradsytlebody">
                    <div>
                      <img src="@/assets/index/in5.png" />
                    </div>
                    <div>
                      <div class="acradsytletitle">成绩查询</div>
                      <div class="acradsytletext">成绩公布后查询当前考试的成绩分数结果</div>
                    </div>
                  </div>
                </a-card>
              </a-col>
            </a-row>
            <div class="bottomtitle">
              <div>
                <img src="@/assets/index/in7.png" />
              </div>
              <div>志愿功能</div>
            </div>
            <div>
              <a-row :gutter="20">
                <a-col :span="12">
                  <a-card :hoverable="true" class="acradsytle" @click="navtozy" v-if="shownav">
                    <div class="acradsytlebody">
                      <div>
                        <img src="@/assets/index/in3.png" />
                      </div>
                      <div>
                        <div class="acradsytletitle">志愿填报</div>
                        <div class="acradsytletext">考生按政策规定填报各批次志愿（含志愿征集）</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card :hoverable="true" class="acradsytle" v-if="shownav" @click="navtoquery">
                    <div class="acradsytlebody">
                      <div>
                        <img src="@/assets/index/in6.png" />
                      </div>
                      <div>
                        <div class="acradsytletitle">填报查询</div>
                        <div class="acradsytletext">查询本人志愿信息、录取信息和打印录取通知单</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <!-- right -->
          <a-col :span="10">
            <div class="bodyrightbox">
              <a-row :gutter="28">
                <a-col :span="12">
                  <div class="rightnav">
                    <div class="navtext">
                      <img src="@/assets/index/in10.png" />
                      <span>操作指南</span>
                    </div>
                    <div>
                      <img src="@/assets/index/in4.png" />
                    </div>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="rightnav">
                    <div class="navtext">
                      <img src="@/assets/index/in9.png" />
                      <span>问题反馈</span>
                    </div>
                    <div>
                      <img src="@/assets/index/in4.png" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="bodyrightbottom">
              <a-card title="公告通知" class="rightbottombox">
                <a href="#" slot="extra">
                  <a-icon type="dash" />
                </a>
                <div class="listbox">
                  <div class="listsub">
                    <a-row :gutter="10">
                      <a-col :span="19">
                        <div class="listsubtext">
                          <span></span>
                          <div>关于推迟2020年秋季城区义务教育阶段学校招生工作</div>
                        </div>
                      </a-col>
                      <a-col :span="5">
                        <div class="listsubtextright">2020-4-26</div>
                      </a-col>
                    </a-row>
                  </div>
                  <div class="listsub">
                    <a-row :gutter="10">
                      <a-col :span="19">
                        <div class="listsubtext">
                          <span></span>
                          <div>关于调整城区义务教育阶段招生政策做好城区义务教</div>
                        </div>
                      </a-col>
                      <a-col :span="5">
                        <div class="listsubtextright">2020-4-26</div>
                      </a-col>
                    </a-row>
                  </div>
                  <div class="listsub">
                    <a-row :gutter="10">
                      <a-col :span="19">
                        <div class="listsubtext">
                          <span></span>
                          <div>考试报名通知</div>
                        </div>
                      </a-col>
                      <a-col :span="5">
                        <div class="listsubtextright">2020-4-26</div>
                      </a-col>
                    </a-row>
                  </div>
                </div>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api";
export default {
  data() {
    return {
      title: "",
      typefoor: "",
      shownav: false
    };
  },
  mounted() {
    this.$http.get(API.getxdlist).then(res => {
      res.forEach(e => {
        if (e.TypeCode === "34" && e.OpenStatus) {
          this.shownav = true;
        } else {
          this.shownav = false;
        }
      });
    });
  },
  methods: {
    navtozy() {
      this.$http
        .get(API.getmodelbysectionenum, {
          sectiontype: "34"
        })
        .then(res => {
          console.log(res);
          if (res) {
            this.$router.push({
              name: "reading"
            });
          } else {
            this.$message.warning("志愿填报未开始");
          }
        });
    },
    navtoquery() {
      this.$http
        .get(API.getmodelbysectionenum, {
          sectiontype: "34"
        })
        .then(res => {
          console.log(res);
          this.obj = res;
          if (res) {
            this.$router.push({
              name: "fillingquery",
              query: {
                examinationRecordCode: this.obj.examinationCode,
                RecordCode: this.obj.RecordCode, //招生记录code,
                EntranceSectionCode: this.obj.EntranceSectionCode //学段code
              }
            });
          } else {
            this.$message.warning("志愿填报未开始");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  margin-top: 64px;
  padding-top: 20px;
}
.Warningalert {
  margin-bottom: 20px;
}
.indexsteps {
  margin: 60px 200px;
}
/deep/ .acradsytle {
  .ant-card-body {
    padding: 0px;
  }
  .acradsytlebody {
    height: 126px;
    padding: 0 28px;
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 20px;
  }
  .acradsytletitle {
    font-size: 16px;
  }
  .acradsytletext {
    color: #909399;
  }
}

.bodytitle {
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: bold;
  color: #000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  font-size: 14px;
  img {
    margin-right: 8px;
  }
}
.indexbody-bottom {
  padding: 10px;
}
.bottomtitle {
  display: flex;
  align-items: center;
  height: 60px;
  color: #409eff;
  font-size: 16px;
  margin-top: 20px;
  img {
    margin-right: 8px;
  }
}
.bodyrightbox {
  margin-top: 10px;
  .rightnav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    background: #5089c3;
    border-radius: 4px;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
    .navtext {
      display: flex;
      align-items: center;
      img {
        margin-right: 14px;
      }
    }
  }
}
.rightnav:hover {
  background: rgba(80, 137, 195, 0.8);
}
.bodyrightbottom {
  margin-top: 17px;
  /deep/ .rightbottombox {
    .ant-card-body {
      padding: 0px;
    }
    .listsub {
      height: 44px;
      line-height: 44px;
      padding: 0 24px;
      border-bottom: 1px solid rgba(216, 216, 216, 0.21);
      cursor: pointer;
      .listsubtext {
        color: #303133;
        display: flex;
        align-items: center;
        span {
          height: 4px;
          width: 4px;
          margin-right: 10px;
          border-radius: 50%;
          background: #303133;
          display: inline-block;
        }
        div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .listsubtextright {
        color: #909399;
      }
    }
  }
}
.listsub:hover .listsubtext,
.listsub:hover .listsubtextright {
  color: #409eff !important;
}
.listbox {
  height: 278px;
}
</style>
