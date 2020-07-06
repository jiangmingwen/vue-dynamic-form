
import Vue from 'vue';
import { DICTIONARY_KEY } from '@/constant/storage-key';

/**
 * @desc 获取网关返回的信息
 * @param {string} item 哪个网关
 * @param {string} key 默认获取Value信息
 * @returns {string } 返回查询到的信息
 */
export const getGatewayValue = (item, key = 'Value') => {
    let dataConfig = window[window.config['gatewayConfigKey']];
    if (dataConfig) {
        return dataConfig[item] ? dataConfig[item][key] : ''
    } else {
        return ''
    }
}


/**
 * 根据关系码 获取关系
 * @param {String} gxm 
 * @return {String} 返回获取到的关系。没有查询到返回原gxm
 */
export const getTitleByGxm = (gxm) => {
    let dic = Vue.ls.get(DICTIONARY_KEY);
    if (Array.isArray(dic.JHGX)) {
        let existList = dic.JHGX.filter(item => item.Value === gxm);
        if (existList.length) {
            return existList[0].NameC;
        } else {
            return gxm;
        }
    } else {
        return gxm;
    }
}

/**
 * @desc 查找到字典的名称，返回该名称枚举中key为value时的NameC
 * @param {String} enumKey 字典名称
 * @param {String} value 枚举项的值
 * @param {String} key 枚举项的key
 * @returns {String} 返回该枚举项里的NameC
 */
export const getNameCBykey = (enumKey, value, key = "Value") => {
    let dic = Vue.ls.get(DICTIONARY_KEY);
    if (dic && dic[enumKey] && Array.isArray(dic[enumKey])) {
        let existList = dic[enumKey].filter(item => item[key] === value);
        if (existList.length) {
            return existList[0].NameC;
        } else {
            return value;
        }
    } else {
        return value;
    }
}

/**
 * @desc 根据字段查找字典的枚举列表
 * @param {*} enumKey 
 * @returns 返回查询到的枚举列表
 */
export const getEnumByKey = (enumKey) => {
    let dic = Vue.ls.get(DICTIONARY_KEY);
    if (dic && dic[enumKey]) {
        return dic[enumKey];
    } else {
        return [];
    }
}
/**
 *根据字典返回nameC 
 *
 * */
export const GetdistionaryNameC = (arrname,val) => {
	let dic = Vue.ls.get(DICTIONARY_KEY);
	let NameC = ''
    for(let i in dic[arrname]){
		if(dic[arrname][i].Value == val){
			NameC = dic[arrname][i].NameC
		}
	}
	return NameC
}
/**
 * @desc 验证身份证号是否正确
 * @param {String} idcode 身份证号
 * @returns {Boolean} 验证结果
 */
export const verifyIdentity = (idcode) => {
    // 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
    // 详情查看javascript的数值范围
    // 加权因子
    let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    let check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let code = idcode + "";
    let last = idcode[17];//最后一位

    let seventeen = code.substring(0, 17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    let arr = seventeen.split("");
    let len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    let resisue = num % 11;
    let last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    let format = idcard_patter.test(idcode);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
}

/**
 * @desc 根据身份证号获取生日
 * @param {Stirng} idcard 身份证号
 * @param {String} concatStr 生日连接字符 默认是-;eg: 1991-01-01
 * @returns {String} 获取到的生日
 */
export const getBirthdayByIdcard = (idcard, concatStr = '-') => {
    if (idcard && typeof idcard === 'string' && idcard.length === 18) {
        let chk = verifyIdentity(idcard);
        let codeList = [];
        if (chk) {
            codeList.push(idcard.substr(6, 4), idcard.substr(10, 2), idcard.substr(12, 2))
            return codeList.join(concatStr || '-');
        } else {
            return "";
        }
    } else {
        return "";
    }
};


export function setSession(key,value){
    if(typeof value == "object"){//如果要存储对象，则先转为json串
        value = window.JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
}
export function getSession(key){
    let value = sessionStorage.getItem(key);//字符串或json串
    let json = window.JSON.parse(value);//json串转为js对象
 
    if(typeof json == "object" && json){//利用了一点，当符合json格式，串会成功转为js对象，否则为null
        return json;
    }
    return value;
}
