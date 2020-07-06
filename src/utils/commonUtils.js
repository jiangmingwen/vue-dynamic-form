/**
 * 订阅者-观察者 设计模式
 */
export const pubsub = {
    typeMap: {},//{type:[] }
    next(type, data) {
        if (Array.isArray(this.typeMap[type])) {
            this.typeMap[type].forEach((item) => {
                item(data);
            })
        }
    },
    subscribe(type, fn) {
        if (this.typeMap[type]) {
            this.typeMap[type].push(fn);
        } else {
            this.typeMap[type] = [fn];
        }
    }
}

/**
 * 防抖 工具函数
 * @param {function} func 需要防抖的函数
 * @param {number} wait 延迟执行时间
 * @param {boolean} immediate 第一次是否立即执行
 */
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

/**
 * @desc 获取url里的key字段的值
 * @param {String} key 
 * @returns {string} 值
 */
export const getUrlParam = (key) => {
    if (window.location.href.indexOf("?") !== -1) {
        let query = window.location.href.split("?")[1]; //获取url中"?"符后的字串，截取？后的字符串
        let pair = query.split("="); //获取每一个参数
        if (pair[0] == key) return pair[1]; //获取参数值
    } else {
        return null;
    }
}
