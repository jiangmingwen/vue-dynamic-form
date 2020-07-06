import Vue from 'vue'
import Vuex from 'vuex'
import * as MUTATION_KEYS from '@/constant/mutation-key';
import * as STORAGE_KEYS from '@/constant/storage-key';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    typeList: [],
    typefoor_obj: {},
    userModel: {},
    Dpc: {},
    pcdata: {},
    DpcX: {},
    guradInfo: {},
    tabIndex: 0
  },
  mutations: {
    /**
     * @desc 统一设置state的方法
     * @param data  {state:string,value: any }或者[{state:string,value: any },...]
     */
    SET_STATE: (state, data) => {
      if (Array.isArray(data)) {
        data.forEach(item => {
          state[item.state] = item.value;
        })
      } else {
        state[data.state] = data.value;
      }
    },
    [MUTATION_KEYS.SET_TABINDEX]: (state, data) => {
      state.tabIndex = data || 0;
      Vue.ss.set(STORAGE_KEYS.TABINDEX_KEY, data);
    },
    [MUTATION_KEYS.SET_TYPELIST]: (state, data) => {
      state.typeList = data || [];
      Vue.ss.set(STORAGE_KEYS.TYPELIST_KEY, data);
    },
    [MUTATION_KEYS.SET_TYPEFOOR]: (state, data) => {
      state.typefoor_obj = data || {};
      Vue.ss.set(STORAGE_KEYS.TYPEFOOR_KEY, data);
    },
    [MUTATION_KEYS.SET_USERMODEL]: (state, data) => {
      state.userModel = data || {};
      Vue.ss.set(STORAGE_KEYS.USER_MODEL_KEY, data);
    },
    [MUTATION_KEYS.SET_DPC]: (state, data) => {
      state.Dpc = data || {};
      Vue.ss.set(STORAGE_KEYS.DPC_KEY, data);
    },
    [MUTATION_KEYS.SET_PCDATA]: (state, data) => {
      state.pcdata = data || {};
      Vue.ss.set(STORAGE_KEYS.PCDATA_KEY, data);
    },
    [MUTATION_KEYS.SET_DPCX]: (state, data) => {
      state.DpcX = data || {};
      Vue.ss.set(STORAGE_KEYS.DPX_KEY, data);
    },
    [MUTATION_KEYS.SET_GUARD]: (state, data) => {
      state.guradInfo = data || {};
      Vue.ss.set(STORAGE_KEYS.GUARD_KEY, data);
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    /**
     * 获取 学生类别的typeCode
     * @param {*} state 
     */
    typeCode(state) {
      return state.typefoor_obj.TypeCode
    },
    /**
     * 获取学生类别的TypeName
     * @param {} state 
     */
    typeName(state) {
      return state.typefoor_obj.TypeName
    },
    /**
     * 获取学生id
     * @param {} state 
     */
    studentId(state) {
      if (Array.isArray(state.userModel.UserType)) {
        let index = state.userModel.UserType.indexOf(7);
        if (index >= 0) {
          return state.userModel["UserTypeId"] && state.userModel["UserTypeId"][index];
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    idCard(state) {
      return state.userModel['IdCard'];
    }
  }
})


