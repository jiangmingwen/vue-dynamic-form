
/**
 * localstorage 工具函数
 */
export const local = {
    install: function (Vue, options = {}) {
        options = {
            namespace: options.namespace || 'hb_', // key键前缀
            name: options.name || 'ls', // 命名Vue变量.[ls]或this.[$ls],
            expire: options.expire //过期时间。。。  秒
        }
        const webstorage = {
            get: function (key) {
                if (key) {
                    let localData = JSON.parse(window.localStorage.getItem(options.namespace + key) || '{}');
                    if (options.expire) {
                        //判断过期与否
                        if (Date.now() - localData.expire > options.expire) {//已经过期
                            return null;
                        } else {
                            return localData.value;
                        }
                    } else {
                        return localData.value;
                    }
                }
            },
            set: function (key, data) {
                if (key == undefined) {
                    console.error("Local set param key is required")
                    return;
                }

                //存储storege
                window.localStorage.setItem(options.namespace + key,
                    JSON.stringify({
                        value: data,//真实数据
                        expire: options.expire ? Date.now() : null //过期时间
                    })
                );
            },
            remove: function (key) {
                key && window.localStorage.removeItem(options.namespace + key);
            },
            clear: function () {
                window.localStorage.clear();
            },
            refresh: function (key) {//重新刷新过期时间
                if (options.expire) {
                    let localData = JSON.parse(window.localStorage.getItem(options.namespace + key)||'{}');
                    localData.expire = Date.now();
                    window.localStorage.setItem(options.namespace + key,
                        JSON.stringify(localData)
                    );
                }
            }
        }

        Vue[options.name] = webstorage
        Vue.prototype['$' + options.name] = webstorage

    }
}

/**
 * sessionStorage 工具函数
 */
export const session = {
    install: function (Vue, options = {}) {
        options = {
            namespace: options.namespace || 'hb_', // key键前缀
            name: options.name || 'ss', // 命名Vue变量.[ls]或this.[$ls],
            expire: options.expire //过期时间。。。  秒
        }
        const webstorage = {
            get: function (key) {
                if (key) {
                    let localData = JSON.parse(window.sessionStorage.getItem(options.namespace + key) || '{}');
                    if (options.expire) {
                        //判断过期与否
                        if (Date.now() - localData.expire > options.expire) {//已经过期
                            return null;
                        } else {
                            return localData.value;
                        }
                    } else {
                        return localData.value;
                    }
                }
            },
            set: function (key, data) {
                if (key == undefined) {
                    console.error("session set param key is required")
                    return;
                }

                //存储storege
                window.sessionStorage.setItem(options.namespace + key,
                    JSON.stringify({
                        value: data,//真实数据
                        expire: options.expire ? Date.now() : null //过期时间
                    })
                );
            },
            remove: function (key) {
                key && window.sessionStorage.removeItem(options.namespace + key);
            },
            clear: function () {
                window.sessionStorage.clear();
            },
            refresh: function (key) {//重新刷新过期时间
                if (options.expire) {
                    let localData = JSON.parse(window.sessionStorage.getItem(options.namespace + key)||'{}');
                    localData.expire = Date.now();
                    window.sessionStorage.setItem(options.namespace + key,
                        JSON.stringify(localData)
                    );
                }
            }
        }
        Vue[options.name] = webstorage
        Vue.prototype['$' + options.name] = webstorage
    }
}