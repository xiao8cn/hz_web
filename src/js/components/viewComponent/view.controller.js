export class viewController{
    constructor(ajaxService,$rootScope,$stateParams,$mdSidenav,commonService){
        this.$stateParams = $stateParams;
        this.ajaxService = ajaxService;
        this.$rootScope = $rootScope;
        this.$mdSidenav = $mdSidenav;
        this.commonService = commonService;
        this.HZ_GLOBAL = commonService.getHzGlobal();
        this.selectedId = "1";
        this.selecteds = [];
        this.init_params = commonService.getInitParam();
        this.tabIndex = 0;
    }

    $onInit(){
        let startDate,
            endDate,
            dateType = this.dateType;

        if(this.$stateParams.option){
            startDate = this.$stateParams.option.startDate?this.$stateParams.option.startDate:this.$stateParams.option.endDate;
            endDate = this.$stateParams.option.endDate?this.$stateParams.option.endDate:this.$stateParams.option.startDate;
            startDate = this.ajaxService.getStringDate(startDate);
            endDate = this.ajaxService.getStringDate(endDate);
        }else{
            switch (dateType){
                case "day" :
                    startDate = this.$rootScope.dates[1]-1;
                    endDate = this.$rootScope.dates[1];
                    break;
                case "week" :
                    startDate = this.$rootScope.dates[1]-7;
                    endDate = this.$rootScope.dates[1];
                    break;
                case "month" :
                    startDate = this.$rootScope.dates[1]-30;
                    endDate = this.$rootScope.dates[1];
                    break;
            }
        }

        /**
         * 基础查询
         */
        let
            url = this.HZ_GLOBAL.interface_url.query_url,
            channel = this.HZ_GLOBAL.system_config.channel,
            param =[
                'settime',
                '88888888 set-auxfn',
                'start-batch',
                '1 0 set-bstype',
                `sw" ${startDate}:${endDate}" 20 1 (find-work)`,
                'end-batch',
            ];
        this.search_option = {
            url : url,
            channel : channel,
            param : param,
        }

        this.$rootScope.$broadcast('progress', {state:"start",value:"10"});
        this.ajaxService.searchPost(this.search_option)
            .then(res=>{
                this.$rootScope.$broadcast('progress', {state:"start",value:"30"});
                this.refresh(this.search_option);
            })

        this.options = this.option;
    }

    refresh(option){
        return new Promise((resolve,reject)=>{
            this.option.map((res2,index)=>{
                this.$rootScope.$broadcast('progress', {state:"start",value:"50"});
                /**
                 * 获取每一个图表的param 并且读取数据
                 */
                if(res2.param){
                    option.param = res2.param;
                    this.ajaxService.viewPost(option)
                        .then(res=>{
                            this.$rootScope.$broadcast('progress', {state:"start",value:"70"});
                            let jsonRes = JSON.parse(res.split("<timer>")[0]),
                                legends = [],
                                datas = [];

                            if(jsonRes.body){
                                jsonRes.body[jsonRes.head[0].id].cdata.forEach((res,index)=>{
                                    legends.push(res[0]);
                                    datas.push({
                                        name : res[0],
                                        value : jsonRes.body[jsonRes.head[1].id].cdata[index]
                                    })
                                })
                                res2.option.legend.data = legends;
                                res2.option.series[0].data = datas;
                                this.options = this.option;
                                this.$rootScope.$broadcast('progress', {state:"end",value:"100"});
                                resolve();
                            }else{
                                this.options = this.options.slice(0,index).concat(this.options.slice(index+1));
                                this.$rootScope.$broadcast('progress', {state:"end",value:"100"});
                                resolve();
                            }
                        })
                }
            })
        })
    }

    add_click(){
        this.bindController.$mdSidenav('right')
            .toggle();
    }

    addInitChar(){
        let option = {
                option : this.init_params[this.selectedId].option,
                id : `${this.dateType}${this.commonService.getUuid()}`,
            },
            dateType = this.dateType;

        this.option.push(option);
        this.options = this.option;
        option = this.option;
        this.refresh(this.search_option)
            .then(()=>{
                let initOption = {
                    dataType : dateType,
                    option : option
                }

                initOption.option.map(res=>{
                    delete res.$$hashKey;
                })

                //step 2 浏览器缓存
                window.localStorage.setItem(`${this.ajaxService.getUserName()}${dateType}Option`,JSON.stringify(initOption));
                this.$mdSidenav('right').toggle();
            })
    }

}