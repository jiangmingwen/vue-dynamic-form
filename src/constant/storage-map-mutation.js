import * as MUTATIONS from './mutation-key';
import * as STORAGES from './storage-key';

/**
 * 项目启动的时候，自动把storage里的信息，挂载到store上的配置
 */
export default {
    [MUTATIONS.SET_USERMODEL]: STORAGES.USER_MODEL_KEY,
}