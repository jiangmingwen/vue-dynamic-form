import formItemList from '../form-item/form-item.config'
/**
 * 根据表单类型，获取表单的默认配置
 * @param {*} id 表单类型
 */
export const getFormConfig = (type) => {
    let defaultField = getdefaultConfig(type);
    let key = Date.now();
    let item = {
        type: type,
        realForm: defaultField.realForm,
        name: defaultField.name,
        key,
        model: type + "_" + key,
        ...(defaultField.default_config || {})
    };
    return item;
}

export const getdefaultConfig = (type) => {
    let fieldsList = getFiedsArray(
        JSON.parse(JSON.stringify(formItemList))
    );
    let defaultField = fieldsList.filter(item => item.type == type)[0];
    return defaultField;
}

export const getFiedsArray = (arr) => {
    let list = [];
    arr.forEach(item => {
        if (item.children && item.children.length) {
            list.push(...item.children);
        }
    });
    return list;
}

/**
 * 复制的时候，递归替换所有栅格里的key和model， 必须唯一，表单才能有唯一的值
 * @param {*} data 需要递归的栅格，
 * @param {*} key key:最高层的key，后面层的向后增加位数为递归索引
 * @param {*} n 把父的索引带上，子子孙孙不会重复
 */
export const recursiveReplace = (data, key, n) => {
    data["key"] = key + "" + n;
    data["model"] = data.type + "_" + data.key;
    if (data.columns) {
        data.columns.forEach((col, index) => {
            if (col.list) {
                col.list.forEach((listItem, lindex) => {
                    recursiveReplace(
                        listItem,
                        data.key,
                        n + "" + index + lindex
                    );
                });
            }
        });
    }
}


/**
 * 将对象数组，转为元素数组
 * @param {*} arr 
 * @param {*} key 
 */
export const arrayObject2ArrayElement = (arr, key) => {
    let results = [];
    if (arr && Array.isArray(arr) && key) {
        arr.forEach(item => {
            results.push(item[key])
        })
    }
    return results;
}


/**
 * 获取表单key和必填项
 * @param {*} arr 表单配置
 */
export const getFormList = (arr) => {
    let result = [];
    recursiveFormConfig(arr,result);
    return result;
}

/**
 * 递归获取
 * @param {*} arr 表单配置
 * @param {*} result 结果的数组
 */
export const recursiveFormConfig = (arr, result) => {
    arr.forEach(item => {
        if (item.realForm) {
            let rules = item.rules || [];
            let required = false;
            rules.forEach(rule => {
                if (rule.required) {
                    required = true;
                }
            })
            result.push({
                field: item.model,
                title: item.title,
                required
            })
        }

        if (item.columns) {
            item.columns.forEach(column => {
                if (column.list) {
                    recursiveFormConfig(column.list, result)
                }
            })
        }
    })
}