export default {
  name: {
    pattern: /^[\u4E00-\u9FA5]{2,4}$/,
    message: '请输入2-4字中文名称'
  },
  idcard: {
    pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    message: '请输入正确身份证号'
  },
  phone: {
    pattern: /^1[3456789]\d{9}$/,
    message: '请输入正确手机号'
  },
  call: {
    pattern: /^0\d{2,3}?\d{7,8}$/,
    message: '请输入正确固定电话'
  },
  postcode: {
    pattern: /^[0-9]{6}$/,
    message: '请输入正确邮编'
  },
  schoolCode: { //毕业学校代码
    pattern: /^[a-zA-Z0-9]{8}$/,
    message: '毕业学校代码长度为8'
  }
}