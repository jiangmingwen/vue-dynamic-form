import Vue from 'vue';
import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import {
	getGatewayValue
} from '@/utils/hbUtils';
import store from '@/store';

// axios.defaults.withCredentials = true; //允许携带http携带cookie,session

Vue.prototype.$progressInstance = 0;
Vue.prototype.$gatewayLoadCount = 0;

const PERMISSION_DENIED_MENU = "PERMISSION_DENIED_MENU";

/**
 * get 请求
 * @param {String | Object} api   /api
 * @param {Object} param requestParam {key:value}=>?key=value 
 * @param {String} apiKey 默认为config.defaultApikey
 * @param {headers:Object,[key]:value} options httpOptions
 */
const get = (api, param = {}, options = {}) => request('get', api, param, null, options);

/**
 * post 请求
 * @param {String | Object} api /api
 * @param {Object} body /requestBody 
 * @param {headers:Object,[key]:value} options httpOptions
 */
const post = (api, body, options = {}) => request('post', api, null, body, options);

/**
 * delete 请求
 * @param {String | Object} api /api
 * @param {Object} param param requestParam {key:value}=>?key=value 
 * @param {headers:Object,[key]:value} options httpOptions
 */
const DELETE = (api, param = {}, options = {}) => request('delete', api, param, null, options);

/**
 * put 请求
 * @param {String | Object} api /api
 * @param {Object} body /requestBody 
 * @param {headers:Object,[key]:value} options httpOptions
 */
const put = (api, body = {}, options = {}) => request('put', api, null, body, options);

/**
 * head 请求
 * @param {String | Object} api /api
 * @param {Object} body /requestBody 
 * @param {headers:Object,[key]:value} options httpOptions
 */
const head = (api, body = {}, options = {}) => request('head', api, null, body, options);

/**
 * patch 请求
 * @param {String | Object} api /api
 * @param {Object} body /requestBody 
 * @param {headers:Object,[key]:value} options httpOptions
 */
const patch = (api, body = {}, options = {}) => request('patch', api, null, body, options);

const handlerException = (handError, error) => {
	if (handError) {
		if (typeof error === 'string') {
			notification.error({
				message: '提示',
				description: error
			})
		} else if (typeof error === 'object') {
			if (Array.isArray(error) && error.length) {
				notification.error({
					message: '提示',
					description: error[0].Msg || error[0].Code || '其他错误'
				})
			}
		}
	}
}

/**
 * 根据API生成URL
 * @param {String | Object} api API地址
 */
export const generateUrl = (api) => {
	let url = '';
	if (typeof api === 'string') {
		url = window.config.gateway + api;
	} else if (typeof api === 'object') {
		if (api['gateway_key']) { //配置了网关字段
			url = '/' + getGatewayValue(api['gateway_key']) + api.value;
		} else {
			url = api.value; //没有配置网关字段
		}
		if (!api['fullMatch']) { //不是全地址
			url = window.config.gateway + url;
		}
	}
	return url;
}

/**
 * 统一处理请求，自定义拦截器
 * @param {*} method 请求方法
 * @param {*} api api接口
 * @param {*} params requestParam
 * @param {*} data requestBody
 * @param {*} options httpOptions
 */
const request = (method, api, params, data, options) => {
	let hbHeaders = {
		timestamp: Date.now()
	};
	const user = store.state.userModel;
	if (user) {
		hbHeaders["token"] = user.access_token; // 让每个请求携带自定义 token 请根据实际情况自行修改
		hbHeaders["appid"] = user.AppCode; // AppCode
	}
	let url = generateUrl(api)

	options.headers = {
		'Content-Type': 'application/json;charset=utf-8', //默认的content-type = applicaiton/json
		...(options.headers || {}),
		...hbHeaders
	}
	let handError = options.handError === false ? false : true;
	delete options.handError;

	return new Promise((resolve, reject) => {

		axios({
			url,
			method,
			params,
			data,
			...options
		}).then(res => {
			if (!res.data.IsSuccess && res.data.ErrorList && res.data.ErrorList.length > 0) { //如果存在权限错误要跳转配置和权限错误
				//是不是存在权限错误
				let existPermissionError = res.data.ErrorList.some(item => item.Code == PERMISSION_DENIED_MENU);
				if (existPermissionError) { //如果存在权限错误
					if (window.config.permission_redirect) { //如果存在配置了权限错误重定向到那个页面,//跳向页面
						window.location.href = window.GlobalConfig[window.config.permission_redirect].Value;
					} else {
						let msg = "没有权限，请联系管理员";
						handlerException(handError, msg);
						reject({
							state: false,
							code: -2,
							msg,
							data: res.data.ErrorList
						})
					}
				} else {
					handlerException(handError, res.data.ErrorList);
					reject({
						state: false,
						code: -3,
						msg: '请求错误',
						data: res.data.ErrorList
					})
				}
			} else {
				resolve(res.data.Data);
			}
		}).catch(err => {
			let msg = "请求失败";
			handlerException(handError, msg);
			reject({
				state: false,
				code: -1,
				msg,
				data: err || '未知错误'
			});
		})

	})
}



export default {
	install: function (Vue) {

		Vue.prototype['$http'] = {
			get,
			post,
			delete: DELETE,
			put,
			head,
			patch,
			request
		}
	}
}