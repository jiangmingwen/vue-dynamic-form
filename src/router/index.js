import Vue from 'vue'
import VueRouter from 'vue-router'

import {getGatewayValue} from '@/utils/hbUtils';
import { SET_USERMODEL} from '@/constant/mutation-key';
import {USER_MODEL_KEY} from '@/constant/storage-key';
import store from '@/store';

/**不需要登录的白名单页面 */
const whiteList = []
Vue.use(VueRouter);

const routes = [
  // 个人首页
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index/index.vue")
  },
  //考试报名
  {
    path: "/kssignup",
    name: "kssignup",
    component: () => import("@/views/index/kssignup.vue")
  },
  // //报名学校
    // //报名学校--体考
  // {
  //   path: "/gosignup",
  //   name: "gosignup",
  //   component: () => import("@/views/index/Gosignup.vue")
  // },
  // //报名学校--中考
  // {
  //   path: "/gozksignup",
  //   name: "gozksignup",
  //   component: () => import("@/views/index/GoZksignup.vue")
  // },
  {
    path: '/signup/:Type_Code',
    name: 'Signup',
    component: () => import('@/views/signup/Signup.vue')
  },

  //查看报名信息--体考
  {
    path: "/querysignup",
    name: "querysignup",
    component: () => import("@/views/index/Querysignup.vue")
  },
  //查看报名信息--中考
  {
    path: "/queryzksignup",
    name: "queryzksignup",
    component: () => import("@/views/index/QueryZksignup.vue")
  },
  //查看报名结果--体考
  {
    path: "/examinationresults",
    name: "examinationresults",
    component: () => import("@/views/index/Examinationresults.vue")
  },
  //查看报名结果--中考
  {
    path: "/examinationresultszk",
    name: "examinationresultszk",
    component: () => import("@/views/index/ExaminationresultsZK.vue")
  },
  //查看报名记录
  {
    path: "/jl",
    name: "jl",
    component: () => import("@/views/index/jl.vue")
  },
  //阅读须知
  {
    path: "/reading",
    name: "reading",
    component: () => import("@/views/VoluntaryFilling/ReadingInstructions.vue")
  },
  //志愿填报
  {
    path: "/candidate",
    name: "candidate",
    component: () => import("@/views/VoluntaryFilling/Candidate.vue")
  },
  //志愿填报查询
  {
    path: "/fillingquery",
    name: "fillingquery",
    component: () => import("@/views/VoluntaryFilling/Fillingquery.vue")
  },

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
//通过script获取用户信息
const getUserModel = (url, next) => {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.onload = () => {
    store.commit(SET_USERMODEL, window.userModel);
    Vue.ss.set(USER_MODEL_KEY, window.userModel)
    next();
  }
}
/**路由前置守卫 */
router.beforeEach((to, from, next) => {
  //切换路由，浏览器自动回到最上面
  scrollTo(0, 0)
  //不在白名单里的页面需要登录
  if (whiteList.indexOf(to.name) < 0 && to.name) {
    //加载单点登录 js
    if (!store.state.userModel || Object.keys(store.state.userModel).length == 0) {
      let url = `${getGatewayValue('SERVER_JS_SSO')}?AppCode=${window.config.APP_CODE}`;
      getUserModel(url, next)
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;