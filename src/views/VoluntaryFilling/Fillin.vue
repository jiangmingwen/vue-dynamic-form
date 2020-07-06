<template>
  <div>
    <a-collapse
      :expandIconPosition="right"
      size="mini"
      v-for="(item,index) in getdata"
      :key="index"
      defaultActiveKey="1"
      class="marginbuttom10"
    >
      <a-collapse-panel key="1">
        <span slot="header">
          {{item.batchName}}
          <span class="header-right-text-remark">{{item.batchRemark}}</span>
        </span>
        <span slot="extra">
          <a-switch defaultChecked @change="onChange($event,item)" v-model="item.isAllowWrite" />
        </span>
        <div v-for="n in item.volunteerCategorie" :key="n.id">
          <div class="linesets">
            <div>
              <a-row>
                <a-col :span="12">
                  <div class="spanicons"></div>
                  <div class="linesettitletexts">{{n.name}}</div>
                  <div class="linesettitletexts" v-if="n.navigation">({{n.navigation}})</div>
                </a-col>
                <a-col :span="12" style=" text-align: right;" v-if="n.isOpenDeploy">
                  <div class="linesettitletexts">
                    愿否调配:
                    <a-switch
                      :disabled="!item.isAllowWrite"
                      defaultChecked
                      @change="onChange"
                      v-model="n.Is_Seployment"
                    />
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
          <a-table
            :columns="columns"
            :dataSource="n.volunteerCategorie"
            size="small"
            :rowKey="n => n.id"
            :pagination="false"
            defaultExpandAllRows
            :rowClassName="rowClassNamefun"
          >
            <a slot="isFill" slot-scope="text,record" v-if="checkIsLastNode(record)">
              <a-select
                style="width: 150px"
                v-model="record.isFill"
                :defaultValue="text"
                :disabled="!item.isAllowWrite"
                @change="handleselectChange($event,record)"
              >
                <a-select-option :value="true">填报</a-select-option>
                <a-select-option :value="false">不填报</a-select-option>
              </a-select>
            </a>
            <a slot="tbxx" slot-scope="text,record" v-if="checkIsLastNode(record)">
              <a-select
                placeholder="请选择"
                v-model="record.school"
                :mode="modemultiple[record.zdyindex]"
                style="width:150px"
                labelInValue
                :class="item.isAllowWrite?record.isFill !==false?record.state && !record.school?'borderred':'':'':''"
                @focus="handleChangeVal($event,record,'schoollist','SCHOOL')"
                @select="(value)=> {handleclickVal(value,record,'SCHOOL')}"
                :disabled="!record.isFill|| !item.isAllowWrite"
              >
                <a-select-option
                  v-for="item in schoollist[record.zdyindex]"
                  :value="item.Code"
                  :key="item.Code"
                >{{ item.Name }}</a-select-option>
              </a-select>
            </a>
            <a slot="major" slot-scope="text,record" v-if="checkIsLastNode(record)">
              <a-select
                placeholder="请选择"
                v-model="record.major"
                style="width:150px"
                labelInValue
                :disabled="!record.isFill||!record.canSelect||!item.isAllowWrite"
                @focus="handleChangeVal($event,record,'majorllist')"
                @select="(value)=> {handleclickzyVal(value,record)}"
              >
                <a-select-option
                  v-for="item in majorllist[record.zdyindex]"
                  :value="item.Code"
                  :key="item.Code"
                >{{ item.Name }}</a-select-option>
              </a-select>
            </a>
            <span slot="name" slot-scope="text,record">
              <a-row>
                <a-col :span="1">
                  <span
                    v-if="record.isMust"
                    :class="(record.isMust&&item.isAllowWrite)?(record.school&&record.isFill?'xred':'xred1'):''"
                  >*</span>
                </a-col>
                <a-col :span="22">{{text}}</a-col>
              </a-row>
            </span>
          </a-table>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <a-row>
      <a-col :span="24" class="textcenter">
        <a-button type="primary" @click="showModal">提交</a-button>
      </a-col>
    </a-row>

    <a-modal v-model="visible" :footer="null">
      <span slot="title">
        <a-icon type="check-circle" class="sumbit_success_check" />提交成功
      </span>
      <p>提交结果审核后，可以到【报名查询】页面查看进度。</p>
      <p class="btn_return_personal_page">
        <a-button type="primary" @click="$router.push({ name: 'index' })">返回个人首页</a-button>
      </p>
    </a-modal>
  </div>
</template>

<script>
import API from "@/api";
import { getEnumByKey } from "@/utils/hbUtils";

export default {
  props: {
    getvalmodel: {
      type: Object
    }
  },
  data() {
    return {
      visible: false,
      modemultiple: [],
      columns: [
        {
          title: "志愿名称",
          dataIndex: "name",
          key: "name",
          scopedSlots: {
            customRender: "name"
          },
          align: "center"
        },
        {
          title: "是否填报",
          dataIndex: "isFill",
          key: "isFill",
          scopedSlots: {
            customRender: "isFill"
          },
          align: "center"
        },
        {
          title: "填报学校",
          dataIndex: "tbxx",
          key: "tbxx",
          scopedSlots: {
            customRender: "tbxx"
          },
          align: "center",
          width: 300
        },
        {
          title: "专业",
          dataIndex: "major",
          key: "major",
          scopedSlots: {
            customRender: "major"
          },
          align: "center",
          width: 300
        }
      ],
      getdata: [],
      schoollist: [], //学校list
      majorllist: [], //专业list
      FillinModel: {
        ...this.getvalmodel,
        volunteerInfos: []
      },
      num: 0,
      bon_batch_obj: {
        bon_batch_code: [],
        isFill: null,
        index_code: ""
      },
      bon_batch_code: [],
      majorXXZYM: getEnumByKey("XXZYM")
    };
  },
  mounted() {
    this.$router.onReady(() => {
      if (this.$route.query.EntranceSectionCode) {
        this.$http
          .get(API.getvolunteerreport, {
            requestParam: {
              sectionCode: this.$route.query.EntranceSectionCode, // '7682c63e51c648acb32da8121a36a7df', //
              recoredCode: this.$route.query.RecordCode //'5c227f3bafb34c9dba101a1587ac4d4d' //
            }
          })
          .then(res => {
            this.getdata = this.setstate(res.volunteerReport);
          });
      }
    });
  },
  computed: {
    rowClassNamefun() {
      return function(row) {
        if (!row.volunteerCategorie) {
          return "noExpand";
        }
      };
    }
  },
  methods: {
    setstate(data) {
      let flag = true;
      let that = this;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        e.zdyindex = that.num++;
        if (e.volunteerCategorie && e.volunteerCategorie.length) {
          that.setstate(e.volunteerCategorie);
        } else {
          e.state = false;
          e.zdyindex = that.num++;
          if (e.school) {
            let keyV = e.school;
            e.school = { key: keyV, label: e.schoolName };
          }
          if (e.major) {
            let keyV = e.major;
            e.major = { key: keyV, label: e.majorName };
            e["canSelect"] = true;
          } else {
            e.major = "";
            e["canSelect"] = false;
          }
        }
      });
      return data;
    },
    //是否填报志愿
    onChange(val, row) {
      event.stopPropagation(); //防止冒泡
      this.ruleisAllowWrite(
        this.getdata,
        val,
        row.batchCode,
        "isAllowWrite",
        "batchCode"
      ); //是否填报志愿
      this.FillinModel.volunteerInfos = [];
    },
    //提交志愿填报
    showModal() {
      this.composeData(this.getdata);
      //this.senddate(this.getdata);
      //验证必填
      let n = document.getElementsByClassName("borderred");
      let m = document.getElementsByClassName("xred1");
      if ((n && n.length) || (m && m.length)) {
        this.$message.error("请选择必填项");
      } else if (n && n.length == 0 && m && m.length == 0) {
        this.FillinModel.volunteerInfos = this.forData(
          this.getdata,
          this.FillinModel.volunteerInfos
        );
        this.$http
          .post(API.volunteerinsert, {
            model: {
              ...this.FillinModel
            }
          })
          .then(res => {
            this.visible = true;
          });
      }
    },
    forData(data, data2) {
      data.forEach(e => {
        data2.forEach(n => {
          if (n.batchCode === e.batchCode) {
            n.volunteer_batch_id = e.batchCode;
            n.volunteer_batch_name = e.batchName;
            n.is_register = e.isAllowWrite;
            n.remarks = e.batchRemark;
          }
        });
      });
      return data2;
    },
    //组合提交数据
    composeData(data) {
      let res = [];
      data.forEach(item => {
        if (item.isAllowWrite) {
          let obj = {};
          // "Volunteer_Batch_Id": "string",志愿填报批次id
          // "Volunteer_Batch_Name": "string",志愿填报批次name
          // "Batch_Rules_Code": "string",批次规则code
          // "Is_Register": true,是否报考
          // "Batch_Type_Code": "string",批次分类code
          // "Batch_Type_Name": "string",批次分类name
          // "Is_Seployment": true,是否愿意调配
          // "Volunteer_Code": "string",志愿名称code
          // "Volunteer_Name": "string",志愿名称name
          // "Is_Fill": true,是否填报
          // "School_Key": "string",填报学校key
          // "School_Name": "string",填报学校name
          // "Major_Name": "string",申报专业name
          // "Major_Code": "string",申报专业code
          // "Remarks": "string"备注
          //第一层能取到的数据
          obj["Volunteer_Batch_Id"] = item.batchCode;
          obj["Volunteer_Batch_Name"] = item.batchName;
          obj["Remarks"] = item.batchRemark;
          obj["Is_Register"] = item.isAllowWrite;
          //第二层能取到的数据
          item.volunteerCategorie?.forEach(e => {
            obj["Batch_Type_Name"] = e.name;
            obj["Batch_Type_Code"] = e.typeCode;
            obj["Is_Seployment"] = e.Is_Seployment;
            e.volunteerCategorie?.forEach(a => {
              let objRes = {};
              obj["Batch_Rules_Code"] = a.batch_rules_code;
              obj["Volunteer_Code"] = a.categoryCode;
              obj["Volunteer_Name"] = a.name;
              obj["Is_Fill"] = a.isFill;
              let school = this.handleSchoolData(a.school);
              obj["School_Key"] = school.key;
              obj["School_Name"] = school.label;
              obj["Major_Code"] = a.major?.key;
              obj["Major_Name"] = a.major?.label;
              Object.assign(objRes, obj);
              if (a.isFill && a.school) {
                a.state = false;
                res.push(objRes);
              } else {
                a.state = true;
              }
            });
          });
        }
      });
      this.FillinModel.volunteerInfos = res;
    },
    //处理学校下拉数据
    handleSchoolData(data) {
      let school = {};
      if (data.length && data.length >= 1) {
        school["key"] = data.map(c => c.key).join(",");
        school["label"] = data.map(c => c.label).join(",");
      } else school = data;
      return school;
    },
    hideModal() {
      this.visible = false;
    },
    //填报和不填报
    handleselectChange(val, row) {
      this.FillinModel.volunteerInfos = [];
      this.ruleValidate(this.getdata, val, row);
      let arr = [];
      if (row.isFill === "1" || row.isFill === true) {
        arr = this.addarrfun(this.bon_batch_code, row.bon_batch_code);
      } else {
        arr = this.removearrfun(row.bon_batch_code, this.bon_batch_code);
      }
      this.isAllowWritefun(this.getdata, arr, row); //用来互斥的处理
      this.$forceUpdate();
    },
    //填报和不填报递--处理数据
    ruleValidate(data, val, row) {
      let flag = true;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        if (e.volunteerCategorie && e.volunteerCategorie.length) {
          this.ruleValidate(e.volunteerCategorie, val, row);
        } else {
          if (val == "0") {
            if (row.zdyindex === e.zdyindex) {
              e.school = "";
              e.major = "";
              e.state = false;
            }
          }
        }
      });
      return data;
    },
    //根据互相排斥重置是否填报
    isAllowWritefun(data, arr, row) {
      let val = row.isFill;
      let thisBatchIsFill = val;
      data
        .find(c => c.batchCode == row.batchCode)
        .volunteerCategorie.forEach(a => {
          a.volunteerCategorie.forEach(c => {
            if (c.isFill) thisBatchIsFill = c.isFill;
          });
        });
      data.forEach(e => {
        if (arr && arr.length) {
          arr.forEach(n => {
            if (e.batchCode == n) {
              if (thisBatchIsFill === true) {
                e.isAllowWrite = false;
                this.ruleisAllowWrite(
                  this.getdata,
                  false,
                  e.batchCode,
                  "isAllowWrite",
                  "batchCode"
                );
              } else {
                e.isAllowWrite = true;
                this.ruleisAllowWrite(
                  this.getdata,
                  true,
                  e.batchCode,
                  "isAllowWrite",
                  "batchCode"
                );
              }
            }
          });
        }
      });
      return data;
    },
    //数组方法
    addarrfun(arr1, arr2) {
      let hj = Array.from(new Set([...arr1, ...arr2])); //合集
      return hj;
    },
    /**
     * 判断是否为最后一级节点
     */
    checkIsLastNode(record) {
      if (!record.volunteerCategorie) return true;
      return false;
    },
    //数组方法
    removearrfun(arr1, arr2) {
      let _arr2Set = new Set(arr2);
      let diff = arr1.filter(item => !_arr2Set.has(item)); //差集
      return diff;
    },
    ruleisAllowWrite(data, val, code, name, gz) {
      let flag = true;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        if (this.checkIsLastNode(e)) {
          if (e[gz] == code) {
            e[name] = val;
          }
          this.ruleisAllowWrite(e.volunteerCategorie, val, code, name, gz);
        } else {
          if (e[gz] == code) {
            e[name] = val;
          }
        }
      });
      return data;
    },
    //选择学校或者专业
    handleChangeVal(val, record, name) {
      this.$http
        .get(API.dropdowndatalist, {
          batch_rules_code: record.batch_rules_code
          //School(单选), Single(单选), Multiple(双选)
        })
        .then(res => {
          if (res.ComponentSelectType === "Multiple") {
            this.modemultiple[record.zdyindex] = "multiple";
          } else {
            this.modemultiple[record.zdyindex] = "default";
          }
          if (name === "majorllist") {
            this["schoollist"][record.zdyindex] = res.items;
            this.handleclickVal(
              {
                key:
                  typeof record.school == "object"
                    ? record.school.key
                    : record.school
              },
              record
            );
          } else {
            this[name][record.zdyindex] = res.items;
            this.$forceUpdate();
          }
        });
    },
    //切换学校后清空专业，让专业重选
    handleclickVal(val, record, type) {
      let arr = [];
      for (let n in this.schoollist[record.zdyindex]) {
        if (this.schoollist[record.zdyindex][n].Code == val.key) {
          arr = this.schoollist[record.zdyindex][n].Major;
        }
      }
      if (!arr) return;
      let arr2 = [];
      for (let m in this.majorXXZYM) {
        arr.forEach(e => {
          if (e == this.majorXXZYM[m].Value) {
            arr2.push({
              Name: this.majorXXZYM[m].NameC,
              Code: this.majorXXZYM[m].Value
            });
          }
        });
      }
      //this.majorllist = arr2; //专业的数组
      if (arr2.length) {
        this.majorllist[record.zdyindex] = arr2;
        record.canSelect = true;
      } else {
        record.canSelect = false;
      }
      if (type === "SCHOOL") {
        this.ruleisAllowWrite(
          this.getdata,
          "",
          record.zdyindex,
          "major",
          "zdyindex"
        );
      } else this.$forceUpdate();
    },
    //选择的专业
    handleclickzyVal(val, record) {
      this.ruleisAllowWrite(
        this.getdata,
        val.key,
        record.zdyindex,
        "major",
        "zdyindex"
      );
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="less" scoped>
.linesets {
  height: 50px;
  line-height: 50px;
  text-align: left;
  position: relative;
}

.linesettitletexts {
  display: inline-block;
  text-indent: 14px;
  font-size: 14px;
}

.spanicons {
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

.textcenter {
  text-align: center;
  margin: 20px 0px;
}

/deep/ .noExpand {
  .ant-table-row-expand-icon {
    display: none;
  }

  tr.ant-table-expanded-row,
  tr.ant-table-expanded-row {
    display: none;
  }
}

.marginbuttom10 {
  margin-bottom: 10px;
}

.xred {
  color: red;
}
.xred1 {
  color: red;
}
/deep/ .borderred {
  .ant-select-selection {
    border: 1px solid red;
  }
}
.header-right-text-remark {
  margin-left: 70px;
  font-size: 12px;
  color: gray;
}
.btn_return_personal_page {
  width: 120px;
  margin: 0 auto;
}
.sumbit_success_check {
  color: green;
  font-size: 18px;
  margin-right: 5px;
}
</style>
