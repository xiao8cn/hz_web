export class treeController {
    constructor($scope,ajaxService,$rootScope,$state,$mdDialog,$timeout,commonService){
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.ajaxService = ajaxService;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.HZ_GLOBAL = commonService.getHzGlobal();
        this.currentNavItem = "day";
        this.userName = ajaxService.getUserName();
    }

    DialogController($scope, $mdDialog){
        $scope.hide = ()=> {
            $mdDialog.hide();
        };

        $scope.cancel = ()=> {
            $mdDialog.cancel();
        };
    }

    $onInit(){
        this.$rootScope.$on('goHome',(e, res)=>{
            this.$scope.currentNavItem = res;
        });

        /**
         * 获取所有数据的最大日期和最小日期，进行设置
         */
        let
            // url = "http://192.168.1.230/cgi-bin/query30.exe",
            url = this.HZ_GLOBAL.interface_url.query_url,
            channel = this.HZ_GLOBAL.system_config.channel,
            param =[
                'settime',
                '88888888 set-auxfn',
                'start-batch',
                '1 0 set-bstype',
                'sw" *" 20 1 (find-work)',
                'end-batch',
            ],
            option = {
                url : url,
                channel : channel,
                param : param,
            }

        this.ajaxService.searchPost(option)
            .then(res=>{
                if(res.indexOf("Bad session") != -1){
                    window.location.href=this.HZ_GLOBAL.hz_web_url.loginUrl;
                }
                option.param = [
                    'settime',
                    '.head_www',
                ]

                this.ajaxService.searchPost(option)
                    .then(res=>{
                        // console.log(res);
                    })


                let param = [
                    'settime',
                    '20 1  (sort-detail)',
                    '20 1 0 0 set-dfl',
                    '1 0 88888888 (fwex)'
                ]
                option.param = param;
                this.ajaxService.viewPost(option)
                    .then(res=>{
                        let jsonRes = this.ajaxService.transformJson(res),
                            dates = [];
                        dates = this.ajaxService.getMaxMinDate(jsonRes);
                        this.$rootScope.dates = dates;
                        this.$scope.minDate = this.$scope.minDate2 = new Date(dates[0].substring(0,4),dates[0].substring(4,6)-1,dates[0].substring(6,8));
                        this.$scope.maxDate = this.$scope.maxDate2 = new Date(dates[1].substring(0,4),dates[1].substring(4,6)-1,dates[1].substring(6,8));
                    })
                this.$timeout(()=>{
                    this.$state.go('day',{});
                },10);
            })

    }

    dateChange(res){
        this.$scope.startDate = res.startDate || $scope.startDate;
        this.$scope.endDate = res.endDate || $scope.endDate;
        this.$state.go('day',{option:{
            startDate : this.$scope.startDate,
            endDate : this.$scope.endDate
        }});
    }

    gotoView(value){
        this.$state.go(value);
    }

    showAdvanced(ev){
        let arr = {
            param : this.option
        };
        let dialog = document.querySelector("scm-sel");
        if(!dialog){
            this.$mdDialog.show({
                controller: this.DialogController,
                template: `<scm-sel option='${JSON.stringify(arr)}'></scm-sel>`,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        }
    }

    toggle(item, list){
        let idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    }

    enter(e){
        let keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            this.$state.go('search',{});
        }
    }

    zan(){
        this.$state.go('search',{});
    }

    userMenu(ev){

    }

    logouting(){
        window.location.href=this.HZ_GLOBAL.hz_web_url.loginUrl;
    }

}