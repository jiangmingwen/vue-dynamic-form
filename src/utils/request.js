// // import Vue from 'vue'
// import axios from "axios";
// // import store from '@/store'
// import { VueAxios } from "./axios";
// import notification from "ant-design-vue/es/notification";
// // import {  ACCESS_TOKEN } from '@/store/mutation-types'

// // 创建 axios 实例
// const service = axios.create({
//   // withCredentials: true,
//   headers: {
//     "content-type": "application/json;charset=utf-8",
//     timestamp: new Date().getTime(),
//     version: "",
//     device: 0
//   },
//   timeout: 30000 // 请求超时时间
// });

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // 处理BUG  由于单点登录在其他系统退出后本系统没有退出，所有这里不能将单点登录的信息存在localstroage，冲单点登录返回JSON对象中获取
//     // const token = Vue.ls.get(ACCESS_TOKEN)
//     const user = window.userModel;
//     if (user) {
//       const token = window.userModel.access_token;
//       config.headers["token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
//       config.headers["appid"] = window.userModel.AppCode; // AppCode
//     }
//     if (config.method === "get") {
//       config.data = true;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// // response interceptor
// service.interceptors.response.use(
//   response => {
//     if (
//       response.data.ErrorList &&
//       response.data.ErrorList.length > 0 &&
//       response.data.ErrorList[0].Code === "PERMISSION_DENIED_MENU"
//     ) {
//       // 判断是否有菜单权限,没有权限跳转到配置指定页面
//       console.log(window.SYS_CONFIG.Home_Desk);
//       if (window.SYS_CONFIG.Home_Desk) {
//         window.location.href = window.SYS_CONFIG.Home_Desk.Value;
//       } else {
//         alert("没有权限，请联系管理员!");
//       }
//     } else {
//       if (response.data.IsSuccess) {
//         return response.data;
//       } else {
//         if (response.data.ErrorList != null) {
//           for (let i = 0; i < response.data.ErrorList.length; i++) {
//             notification.error({
//               message: "错误",
//               description:
//                 response.data.ErrorList[i].Msg || "请求出现错误，请稍后再试",
//               duration: 4
//             });
//           }
//         } else {
//           response.data.ErrorList = [];
//         }
//         return Promise.reject(response);
//       }
//     }
//   },
//   error => {
//     notification.error({
//       message: "错误",
//       description: error.message
//     });
//     return Promise.reject(error);
//   }
// );

// const installer = {
//   vm: {},
//   install(Vue) {
//     Vue.use(VueAxios, service);
//   }
// };

// export { installer as VueAxios, service as axios };
