import { pubsub } from '@/utils/commonUtils.js';

const loadGateway = () => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${config.gateway}/api/sysconfig/GetJs`
    script.onload = () => {
        pubsub.next('app-start', window.SYS_CONFIG)
    }
    document.getElementsByTagName("head")[0].appendChild(script);
}
loadGateway();
