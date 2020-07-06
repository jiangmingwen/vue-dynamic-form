<template>
  <div class="signup-container">
    <div class="header-school">
      报名学校: {{data.School_Name}}
      <div
        class="status-box"
        :class="$route.query.Audit_Status=='ADOPT'&&'pass'"
      >{{Audit_Status||Sing_Up_Status}}</div>
    </div>
    <a-form :form="form">
      <div class="form-container">
        <div class="upload-container">
          <div class="upload-controller" :class="Photo_File_Url && 'has-img'">
            <a-upload
              :action="action"
              :headers="headers"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
              :beforeUpload="beforeUpload"
            >
              <div style="margin: 30px;">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </div>
          <div class="img-box">
            <img :src="Photo_File_Url" alt="头像" />
            <div class="button-upload">
              <a-button size="small" type="primary">
                <a-icon :type="Photo_File_Url?'edit':'plus'" />
                {{Photo_File_Url?'修改':'上传'}}
              </a-button>
            </div>
          </div>
        </div>
        <div class="form-item" v-if="!config || !config['Name'] || !config['Name'].hidden">
          <a-form-item label="姓名">
            <a-input
              v-if="!config['Name']||!config['Name'].disabled"
              v-decorator="['Name', { 
                rules: [
                  { required: true, message: '必填项' },
                  regExp.name
                ] ,
                 initialValue: initFormData['Name'],
              }]"
            />
            <span v-else>{{initFormTitle['Name'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Sex'] || !config['Sex'].hidden">
          <a-form-item label="性别">
            <a-select
              placeholder="请选择"
              v-if="!config['Sex']||!config['Sex'].disabled"
              v-decorator="['Sex', { rules: [
                { required: true, message: '必选项' }
                ],
                initialValue: initFormData['Sex'] 
              }
              ]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Sex']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>
            <span v-else>{{initFormTitle['Sex'] || '---'}}</span>
          </a-form-item>
        </div>

        <div class="form-item" v-if="!config || !config['Grade_Id'] || !config['Grade_Id'].hidden">
          <a-form-item label="年级名称">
            <a-select
              @change="onGradeChange"
              placeholder="请选择"
              v-if="!config['Grade_Id']||!config['Grade_Id'].disabled"
              v-decorator="['Grade_Id', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Grade_Id']}]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Grade_Id']"
                :value="item.Id"
                :key="index"
              >{{item.NJMC}}</a-select-option>
            </a-select>

            <span v-else>{{initFormTitle['Grade_Id'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Class_Id'] || !config['Class_Id'].hidden">
          <a-form-item label="班级名称">
            <a-select
              @change="onClassChange"
              placeholder="请选择"
              v-if="!config['Class_Id']||!config['Class_Id'].disabled"
              v-decorator="['Class_Id', { rules: [{ required: true, message: '必选项' }] ,
                initialValue: initFormData['Class_Id']}]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Class_Id']"
                :value="item.Id"
                :key="index"
              >{{item.BJMC}}</a-select-option>
            </a-select>

            <span v-else>{{initFormTitle['Class_Id'] || '---'}}</span>
          </a-form-item>
        </div>

        <div
          class="form-item"
          v-if="!config || !config['Id_Number'] || !config['Id_Number'].hidden"
        >
          <a-form-item label="身份证件号">
            <a-input
              v-if="!config['Id_Number']||!config['Id_Number'].disabled"
              v-decorator="['Id_Number', { rules: [{ required: true, message: '必填项' },regExp.idcard],
                initialValue: initFormData['Id_Number'] }]"
            />
            <span v-else>{{initFormTitle['Id_Number'] || '---'}}</span>
          </a-form-item>
        </div>

        <div
          class="form-item"
          v-if="!config || !config['Student_Status'] || !config['Student_Status'].hidden"
        >
          <a-form-item label="学籍号">
            <a-input
              v-if="!config['Student_Status']||!config['Student_Status'].disabled"
              v-decorator="['Student_Status', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Student_Status'] }]"
            />
            <span v-else>{{initFormTitle['Student_Status'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Nation_Code'] || !config['Nation_Code'].hidden"
        >
          <a-form-item label="民族">
            <a-select
              placeholder="请选择"
              v-if="!config['Nation_Code']||!config['Nation_Code'].disabled"
              v-decorator="['Nation_Code', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Nation_Code'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Nation_Code']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>
            <span v-else>{{initFormTitle['Nation_Code'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Phone'] || !config['Phone'].hidden">
          <a-form-item label="联系电话">
            <a-input
              v-if="!config['Phone']||!config['Phone'].disabled"
              v-decorator="['Phone', { rules: [{ required: true, message: '必填项' },regExp.phone],
                initialValue: initFormData['Phone'] }]"
            />
            <span v-else>{{initFormTitle['Phone'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Current_Address'] || !config['Current_Address'].hidden"
        >
          <a-form-item label="现家庭居住地">
            <a-cascader
              v-if="!config['Current_Address']||!config['Current_Address'].disabled"
              v-decorator="['Current_Address', { rules: [{ required: true, message: '必选项' }], 
              initialValue: initFormData['Current_Address'] }]"
              :options="city"
              placeholder="请选择"
            />
            <span v-else>{{initFormTitle['Current_Address'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Current_Address_Detail'] || !config['Current_Address_Detail'].hidden"
        >
          <a-form-item label="详细地址">
            <a-input
              v-if="!config['Current_Address_Detail'] || !config['Current_Address_Detail'].disabled"
              v-decorator="['Current_Address_Detail', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Current_Address_Detail'] }]"
            />
            <span v-else>{{initFormTitle['Current_Address_Detail'] || '---'}}</span>
          </a-form-item>
        </div>

        <div
          class="form-item"
          v-if="!config || !config['Examinee_Type_Code'] || !config['Examinee_Type_Code'].hidden"
        >
          <a-form-item label="考生类别">
            <a-select
              placeholder="请选择"
              v-if="!config['Examinee_Type_Code']||!config['Examinee_Type_Code'].disabled"
              v-decorator="['Examinee_Type_Code', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Examinee_Type_Code'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Examinee_Type_Code']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>
            <span v-else>{{initFormTitle['Examinee_Type_Code'] || '---'}}</span>
          </a-form-item>
        </div>

        <div
          class="form-item"
          v-if="!config || !config['Body_Exam_Number'] || !config['Body_Exam_Number'].hidden"
        >
          <a-form-item label="体考号">
            <a-input
              v-if="!config['Body_Exam_Number']||!config['Body_Exam_Number'].disabled"
              v-decorator="['Body_Exam_Number', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Body_Exam_Number'] }]"
            />
            <span v-else>{{initFormTitle['Body_Exam_Number'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Headmaster_Name'] || !config['Headmaster_Name'].hidden"
        >
          <a-form-item label="班主任姓名">
            <a-input
              v-if="!config['Headmaster_Name']||!config['Headmaster_Name'].disabled"
              v-decorator="['Headmaster_Name', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Headmaster_Name'] }]"
            />
            <span v-else>{{initFormTitle['Headmaster_Name'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Test_Number'] || !config['Test_Number'].hidden"
        >
          <a-form-item label="考号">
            <a-input
              v-if="!config['Test_Number']||!config['Test_Number'].disabled"
              v-decorator="['Test_Number', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Test_Number'] }]"
            />
            <span v-else>{{initFormTitle['Test_Number'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Headmaster_Phone'] || !config['Headmaster_Phone'].hidden"
        >
          <a-form-item label="班主任联系电话">
            <a-input
              v-if="!config['Headmaster_Phone']||!config['Headmaster_Phone'].disabled"
              v-decorator="['Headmaster_Phone', { rules: [{ required: true, message: '必填项' },regExp.phone],
                initialValue: initFormData['Headmaster_Phone'] }]"
            />
            <span v-else>{{initFormTitle['Headmaster_Phone'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Is_Unsuitable_Exercise'] || !config['Is_Unsuitable_Exercise'].hidden"
        >
          <a-form-item label="不宜运动情况">
            <a-select
              placeholder="请选择"
              v-if="!config['Is_Unsuitable_Exercise']||!config['Is_Unsuitable_Exercise'].disabled"
              v-decorator="['Is_Unsuitable_Exercise', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Is_Unsuitable_Exercise'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Is_Unsuitable_Exercise']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>
            <span v-else>{{initFormTitle['Is_Unsuitable_Exercise'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Is_Apply_Exempt_Examination'] || !config['Is_Apply_Exempt_Examination'].hidden"
        >
          <a-form-item label="是否申请免考">
            <a-switch
              :checked="initFormData['Is_Apply_Exempt_Examination']"
              @change="initFormData['Is_Apply_Exempt_Examination'] = $event"
              v-if="!config['Is_Apply_Exempt_Examination']||!config['Is_Apply_Exempt_Examination'].disabled"
              v-decorator="['Is_Apply_Exempt_Examination',{
                initialValue: initFormData['Is_Apply_Exempt_Examination']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />

            <span v-else>{{initFormTitle['Is_Apply_Exempt_Examination'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Sf_Ssmz'] || !config['Sf_Ssmz'].hidden">
          <a-form-item label="是否少数民族考生">
            <a-switch
              :checked="initFormData['Sf_Ssmz']"
              @change="initFormData['Sf_Ssmz'] = $event"
              v-if="!config['Sf_Ssmz']||!config['Sf_Ssmz'].disabled"
              v-decorator="['Sf_Ssmz',{
                initialValue: initFormData['Sf_Ssmz']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Ssmz'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Sf_Gq_Hqzn'] || !config['Sf_Gq_Hqzn'].hidden"
        >
          <a-form-item label="是否归侨、华侨子女考生">
            <a-switch
              :checked="initFormData['Sf_Gq_Hqzn']"
              @change="initFormData['Sf_Gq_Hqzn'] = $event"
              v-if="!config['Sf_Gq_Hqzn']||!config['Sf_Gq_Hqzn'].disabled"
              v-decorator="['Sf_Gq_Hqzn',{
                initialValue: initFormData['Sf_Gq_Hqzn']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Gq_Hqzn'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Sf_Twj'] || !config['Sf_Twj'].hidden">
          <a-form-item label="是否台湾籍考生">
            <a-switch
              :checked="initFormData['Sf_Twj']"
              @change="initFormData['Sf_Twj'] = $event"
              v-if="!config['Sf_Twj']||!config['Sf_Twj'].disabled"
              v-decorator="['Sf_Twj',{
                initialValue: initFormData['Sf_Twj']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Twj'] || '---'}}</span>
          </a-form-item>
        </div>

        <div
          class="form-item label-long"
          v-if="!config || !config['Sf_Jr_Xf'] || !config['Sf_Jr_Xf'].hidden"
        >
          <a-form-item label="是否享受优待现役军人（消防员）、一至四级因公伤残军人（消防员）子女考生">
            <a-switch
              :checked="initFormData['Sf_Jr_Xf']"
              @change="initFormData['Sf_Jr_Xf'] = $event"
              v-if="!config['Sf_Jr_Xf']||!config['Sf_Jr_Xf'].disabled"
              v-decorator="['Sf_Jr_Xf',{
                initialValue: initFormData['Sf_Jr_Xf']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Jr_Xf'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item label-long"
          v-if="!config || !config['Sf_Ga_Jw'] || !config['Sf_Ga_Jw'].hidden"
        >
          <a-form-item label="是否公安英模、一至四级因公伤残公安民警子女考生">
            <a-switch
              :checked="initFormData['Sf_Ga_Jw']"
              @change="initFormData['Sf_Ga_Jw'] = $event"
              v-if="!config['Sf_Ga_Jw']||!config['Sf_Ga_Jw'].disabled"
              v-decorator="['Sf_Ga_Jw',{
                initialValue: initFormData['Sf_Ga_Jw']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Ga_Jw'] || '---'}}</span>
          </a-form-item>
        </div>
        <div
          class="form-item"
          v-if="!config || !config['Is_Slow_Examination'] || !config['Is_Slow_Examination'].hidden"
        >
          <a-form-item label="是否申请缓考">
            <a-switch
              :checked="initFormData['Is_Slow_Examination']"
              @change="initFormData['Is_Slow_Examination'] = $event"
              v-if="!config['Is_Slow_Examination']||!config['Is_Slow_Examination'].disabled"
              v-decorator="['Is_Slow_Examination',{
                initialValue: initFormData['Is_Slow_Examination']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Is_Slow_Examination'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Sf_Lzzn'] || !config['Sf_Lzzn'].hidden">
          <a-form-item label="是否烈士子女考生">
            <a-switch
              :checked="initFormData['Sf_Lzzn']"
              @change="initFormData['Sf_Lzzn'] = $event"
              v-if="!config['Sf_Lzzn']||!config['Sf_Lzzn'].disabled"
              v-decorator="['Sf_Lzzn',{
                initialValue: initFormData['Sf_Lzzn']
              }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
            <span v-else>{{initFormTitle['Sf_Lzzn'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Zzmm'] || !config['Zzmm'].hidden">
          <a-form-item label="政治面貌">
            <a-select
              placeholder="请选择"
              v-if="!config['Zzmm']||!config['Zzmm'].disabled"
              v-decorator="['Zzmm', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Zzmm'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Zzmm']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>

            <span v-else>{{initFormTitle['Zzmm'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Csrq'] || !config['Csrq'].hidden">
          <a-form-item label="出生日期">
            <a-date-picker
              v-if="!config['Csrq']||!config['Csrq'].disabled"
              v-decorator="['Csrq', { rules: [{ required: true, message: '必填项' }],
                initialValue: initFormData['Csrq'] }]"
            />
            <span v-else>{{initFormTitle['Csrq'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if=" !config || !config['Byxxdm'] || !config['Byxxdm'].hidden">
          <a-form-item label="毕业学校代码">
            <a-input
              v-if="!config['Byxxdm']||!config['Byxxdm'].disabled"
              v-decorator="['Byxxdm', { rules: [{ required: true, message: '必填项' },regExp.schoolCode],
                initialValue: initFormData['Byxxdm'] }]"
            />
            <span v-else>{{initFormTitle['Byxxdm'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Wyyzdm'] || !config['Wyyzdm'].hidden">
          <a-form-item label="外语语种代码">
            <a-select
              placeholder="请选择"
              v-if="!config['Wyyzdm']||!config['Wyyzdm'].disabled"
              v-decorator="['Wyyzdm', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Wyyzdm'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Wyyzdm']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>

            <span v-else>{{initFormTitle['Wyyzdm'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Mzyydj'] || !config['Mzyydj'].hidden">
          <a-form-item label="民族语言答卷">
            <a-select
              placeholder="请选择"
              v-if="!config['Mzyydj']||!config['Mzyydj'].disabled"
              v-decorator="['Mzyydj', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Mzyydj'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Mzyydj']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>
            <span v-else>{{initFormTitle['Mzyydj'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Bylbdm'] || !config['Bylbdm'].hidden">
          <a-form-item label="毕业类别代码">
            <a-select
              placeholder="请选择"
              v-if=" !config['Bylbdm']||!config['Bylbdm'].disabled"
              v-decorator="['Bylbdm', { rules: [{ required: true, message: '必选项' }],
                initialValue: initFormData['Bylbdm'] }]"
              style="width: 180px"
            >
              <a-select-option
                v-for="(item,index) in columnsMap['Bylbdm']"
                :value="item.Value"
                :key="index"
              >{{item.NameC}}</a-select-option>
            </a-select>

            <span v-else>{{initFormTitle['Bylbdm'] || '---'}}</span>
          </a-form-item>
        </div>

        <div class="form-item" v-if="!config || !config['Yzbm'] || !config['Yzbm'].hidden">
          <a-form-item label="邮政编码">
            <a-input
              v-decorator="['Yzbm', { rules: [{ required: true, message: '请输入' },regExp.postcode] ,
                initialValue: initFormData['Yzbm']}]"
              v-if="!config['Yzbm']||!config['Yzbm'].disabled"
            />
            <span v-else>{{initFormTitle['Yzbm'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Lxr'] || !config['Lxr'].hidden">
          <a-form-item label="联系人">
            <a-input
              v-if="!config['Lxr']||!config['Lxr'].disabled"
              v-decorator="['Lxr', { rules: [{ required: true, message: '请输入' },regExp.name],
                initialValue: initFormData['Name'] }]"
            />
            <span v-else>{{initFormTitle['Lxr'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Bz1'] || !config['Bz1'].hidden">
          <a-form-item label="备用信息一">
            <a-textarea
              v-if="!config['Bz1']||!config['Bz1'].disabled"
              v-decorator="['Bz1', { rules: [{ required: true, message: '请输入' }] ,
                initialValue: initFormData['Bz1']}]"
            />
            <span v-else>{{initFormTitle['Bz1'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Bz2'] || !config['Bz2'].hidden">
          <a-form-item label="备用信息二">
            <a-textarea
              v-if="!config['Bz2']||!config['Bz2'].disabled"
              v-decorator="['Bz2', { rules: [{ required: true, message: '请输入' }],
                initialValue: initFormData['Bz2'] }]"
            />
            <span v-else>{{initFormTitle['Bz2'] || '---'}}</span>
          </a-form-item>
        </div>
        <div class="form-item" v-if="!config || !config['Bz3'] || !config['Bz3'].hidden">
          <a-form-item label="备用信息三">
            <a-textarea
              v-if="!config['Bz3']||!config['Bz3'].disabled"
              v-decorator="['Bz3', { rules: [{ required: true, message: '请输入' }],
                initialValue: initFormData['Bz3'] }]"
            />
            <span v-else>{{initFormTitle['Bz3'] || '---'}}</span>
          </a-form-item>
        </div>
      </div>
      <div class="btn-group">
        <a-button @click="onCancel">取消</a-button>
        <a-button
          type="primary"
          @click="onSubmit"
          :disabled="!normalRunFlag"
          :loading="saveLoading"
        >提交</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import API from "@/api";
import regExp from "@/utils/regExp";
import { getEnumByKey, getNameCBykey } from "@/utils/hbUtils.js";
import moment from "moment";
import { generateUrl } from "@/utils/httpUtils";
import city from "@/utils/city.js";
import { initFormData, initFormTitle } from "./data.model";
import { DIC_MAP, booleanKeyList, columnsMap } from "./field.config";
export default {
  data() {
    return {
       headers: {
        timestamp: new Date().getTime(),
        appid: window.userModel.AppCode,
        token: window.userModel.access_token
      },
      fileList: [],
      normalRunFlag: false,
      data: {},
      city,
      booleanKeyList,
      columnsMap,
      initFormTitle,
      initFormData,
      regExp,
      DIC_MAP,
      action: generateUrl(API.Upload),
      saveLoading: false,
      Photo_File: "",
      Photo_File_Url: "",
      config: {},
      form: this.$form.createForm(this, { name: "dynamicForm" }),
      Audit_Status: "",
      Sing_Up_Status: ""
    };
  },
  created() {
    console.log(this.$route.query);
    console.log(this.$route.params);

    let typeList = ["PHYSICAL", "SENIORHIGH"];
    if (typeList.includes(this.$route.params.Type_Code)) {
      this.normalRunFlag = true;
      if (this.$DynamicTableFields) {
        //体考
        let config =
          this.$DynamicTableFields[this.$route.params.Type_Code] || {};
        this.config = config["C"]; //C端的配置
      } else {
        this.config = {};
      }
      for (let key in this.columnsMap) {
        if (this.DIC_MAP[key]) {
          this.columnsMap[key] = getEnumByKey(this.DIC_MAP[key]);
        }
      }

      this.initData();
    } else {
      this.$message.error("考试类别代码错误");
      this.normalRunFlag = false;
    }
  },
  methods: {
    onCancel() {},
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) {
          this.$message.warn("请先完成表单填写");
        } else {
          //验证通过  提交数据
          //提交数据前处理
          //验证通过  提交数据
          //提交数据前处理
          let dbFormData = { ...this.initFormData, ...values };
          for (let key in dbFormData) {
            if (this.booleanKeyList.includes(key)) {
              dbFormData[key] = dbFormData[key] ? "TRUE" : "FALSE";
            }
            if (key == "Current_Address") {
              dbFormData["Current_Address"] = dbFormData[key].join(",");
            }
          }
          //将班级和年级名称传给后端
          if (dbFormData["Class_Id"]) {
            let existData = this.columnsMap["Class_Id"].filter(
              item => item.Id == dbFormData["Class_Id"]
            );
            if (existData && existData.length) {
              dbFormData["Class_Name"] = existData[0].BJMC || "";
            } else {
              dbFormData["Class_Name"] = "";
            }
          }
          if (dbFormData["Grade_Id"]) {
            let existData = this.columnsMap["Grade_Id"].filter(
              item => item.Id == dbFormData["Grade_Id"]
            );
            if (existData && existData.length) {
              dbFormData["Grade_Name"] = existData[0].NJMC || "";
            } else {
              dbFormData["Grade_Name"] = "";
            }
          }
          dbFormData["Photo_File"] = this.Photo_File || "";
          dbFormData["Photo_File_Url"] = this.Photo_File_Url || "";

          this.saveData(dbFormData);
        }
      });
    },
     //班级改变
    onClassChange(data) {
      console.log(data, '班级')
      let existData = this.columnsMap['Class_Id'].filter(item => item.Id == data)
      if (existData && existData.length) {
        this.data['Headmaster_Id'] = existData[0].BZRXXId
        this.initFormData['Headmaster_Name'] = existData[0].ClassTeacher
        this.initFormTitle['Headmaster_Name'] = existData[0].ClassTeacher
      }
    },
    //年级改变
    onGradeChange(data) {
      console.log(data, '年级')
      // this.form.setFieldsValue({
      //   Class_Id:null
      // });
    },
    saveData(data) {
      this.saveLoading = true;
      this.$http
        .post(API.studentreport, {
          model: {
            Id: this.data.Id,
            School_Id: this.data.School_Id,
            School_Name: this.data.School_Name,
            Student_Id: this.data.Student_Id,
            Headmaster_Id: this.data.Headmaster_Id,
            Examination_Code: this.data.Examination_Code,
            Expain: this.data.Expain || " ",
            Photo_File_Url: this.Photo_File_Url || "",
            Photo_File: this.Photo_File || "",
            ...data
          }
        })
        .then(res => {
          this.$message.success("保存成功");
          this.$router.push({
            name: "kssignup"
          });
        })
        .catch(err => {
          this.$message.success("保存失败");
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
    initData() {
      this.Audit_Status = getNameCBykey(
        this.DIC_MAP["Audit_Status"],
        this.$route.query.Audit_Status
      );
      this.Sing_Up_Status = getNameCBykey(
        this.DIC_MAP["Sing_Up_Status"],
        this.$route.query.Sing_Up_Status
      );

      this.$http
        .post(API.getmodelbyid, {
          id: this.$route.query.ExamStudentId
        })
        .then(res => {
          console.log(res, "res");
          this.data = res || {};
          this.GetClassList(res.School_Id);
          this.GetNJList(res.School_Id);

          console.log(res, "res");
          for (let key in this.initFormData) {
            this.initFormData[key] = res[key];
            this.initFormTitle[key] = res[key];

            if (this.DIC_MAP[key]) {
              this.initFormTitle[key] = getNameCBykey(
                this.DIC_MAP[key],
                this.initFormData[key]
              );
            }
            if (this.booleanKeyList.includes(key)) {
              this.initFormTitle[key] =
                this.initFormData[key] == "TRUE" ? "是" : "否";
              this.initFormData[key] =
                this.initFormData[key] == "TRUE" ? true : false;
            }
            if (key == "Csrq" && this.initFormData[key]) {
              this.initFormData[key] = moment(this.initFormData[key]);
            }
          }
          if (this.initFormData.Current_Address) {
            this.initFormData.Current_Address = this.initFormData.Current_Address.split(
              ","
            );
          } else {
            this.initFormData.Current_Address = [];
          }
          this.Photo_File = res.Photo_File;
          this.Photo_File_Url = res.Photo_File_Url;
        });
    },
    //班级改变
    onClassChange(data) {
      console.log(data, "班级");
      let existData = this.columnsMap["Class_Id"].filter(
        item => item.Id == data
      );
      if (existData && existData.length) {
        this.data["Headmaster_Id"] = existData[0].BZRXXId;
      }
    },

    //获取班级
    GetClassList(SchoolId) {
      this.$http
        .post(API.GetClassPageList, {
          PageIndex: 1,
          PageSize: 100,
          SchoolId: [SchoolId]
        })
        .then(res => {
          this.columnsMap["Class_Id"] = res.Data || [];
        });
    },
    // 获取年级
    GetNJList(SchoolId) {
      this.$http
        .post(API.GetGradePageList, {
          PageIndex: 1,
          PageSize: 100,
          SchoolId: [SchoolId]
        })
        .then(res => {
          this.columnsMap["Grade_Id"] = res.Data || [];
        });
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
    },
    handleChange({ file, fileList, event }) {
      if (fileList.length == 0) {
        this.fileList = [];
        this.previewImage = "";
      } else {
        this.fileList = fileList;
        file.response && (this.Photo_File = file.response.Data.FileId);
        file.response &&
          (this.Photo_File_Url = file.response.Data.FileNetworkPath);
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("请上传正确的图片格式:png/jpg");
        isJpgOrPng = "";
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("请上传少于20MB!");
        isLt2M = "";
      }
      return isJpgOrPng && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.signup-container {
  height: 300px;
  .header-school {
    width: 1200px;
    margin: 20px auto 30px auto;
    height: 50px;
    border-bottom: 1px solid #d8d8d8;
    display: flex;
    align-items: center;
    font-size: 26px;
    position: relative;
    .status-box {
      position: absolute;
      right: 30px;
      top: 5px;
      font-size: 16px;
      padding: 5px 20px;
      color: #fff;
      background-color: #eb2f96;
      border-radius: 3px;
      &.pass {
        background-color: #52c41a;
      }
    }
    &::before {
      width: 4px;
      height: 20px;
      display: block;
      background: #009999;
      content: " ";
      margin-right: 20px;
    }
  }
  .form-container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .upload-container {
      position: absolute;
      right: 130px;
      top: 20px;
      width: 130px;
      height: 178px;
      .upload-controller {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        /deep/ .ant-upload.ant-upload-select-picture-card {
          width: 130px;
          height: 178px;
        }
        &.has-img {
          opacity: 0;
        }
      }
      .img-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        img {
          width: 115px;
          height: 148px;
        }
        .button-upload {
          position: absolute;
          height: 30px;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
        }
      }
    }
    .form-item {
      width: 33.33%;
      padding: 0 15px;
      min-height: 30px;
      /deep/ .ant-form-item-label {
        text-align: left;
        text-overflow: ellipsis;
        width: 100%;
      }
      &:nth-child(2),
      &:nth-child(4) {
        width: auto;
        &::after {
          content: " ";
          width: 420px;
          height: 1px;
          display: block;
        }
      }
      &.label-long {
        width: 50%;
      }
    }
  }
  .btn-group {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ button {
      margin: 0 15px;
    }
  }
}
</style>