import ajaxService from "./service/ajax.service";
import commonService from "./service/common.service";
import {ChartService} from "./service/chart.service";


/**
 * 公共服务，包含service,module,provider,factory
 */
const ServiceModule = angular.module("serviceCommon",[])
    .service("ajaxService",ajaxService)
    .service("commonService",commonService)
    .service("chartService",ChartService);

export default ServiceModule;