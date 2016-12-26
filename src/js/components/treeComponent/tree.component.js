import  "./tree.css";
import template from "./tree.html";
import {treeController} from "./tree.controller";

export const treeComponent = {
    template,
    bindings: {
        option : "<"
    },
    controllerAs:"ctrl",
    controller : treeController
    /*controller: function ($scope, $http,ajaxService,$rootScope,$state,$mdDialog,$timeout,commonService) {
        let self = this;
        let HZ_GLOBAL = commonService.getHzGlobal();

        this.currentNavItem = "day";

        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {
            $rootScope.$on('goHome',(e, res)=>{
               $scope.currentNavItem = res;
            });

            let user = {
                loginName : HZ_GLOBAL.default_user.login_name,
                password : HZ_GLOBAL.default_user.password,
            };

            /!**
             * 获得hz用户session
             *!/
            ajaxService.getHzSession(user)
                .then(res =>{
                    /!**
                     * 获取所有数据的最大日期和最小日期，进行设置
                     *!/
                    let
                        // url = "http://192.168.1.230/cgi-bin/query30.exe",
                        url = HZ_GLOBAL.interface_url.query_url,
                        channel = HZ_GLOBAL.system_config.channel,
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

                    ajaxService.searchPost(option)
                        .then(res=>{
                            option.param = [
                                'settime',
                                '.head_www',
                            ]

                            ajaxService.searchPost(option)
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
                            ajaxService.viewPost(option)
                                .then(res=>{
                                    let jsonRes = ajaxService.transformJson(res),
                                        dates = [];
                                    dates = ajaxService.getMaxMinDate(jsonRes);
                                    $rootScope.dates = dates;
                                    $scope.minDate = $scope.minDate2 = new Date(dates[0].substring(0,4),dates[0].substring(4,6)-1,dates[0].substring(6,8));
                                    $scope.maxDate = $scope.maxDate2 = new Date(dates[1].substring(0,4),dates[1].substring(4,6)-1,dates[1].substring(6,8));
                                })
                            $timeout(()=>{
                                $state.go('day',{});
                            },10);
                        })

                })
        }

        this.dateChange = res=>{
            $scope.startDate = res.startDate || $scope.startDate;
            $scope.endDate = res.endDate || $scope.endDate;
            $state.go('day',{option:{
                startDate : $scope.startDate,
                endDate : $scope.endDate
            }});
        }

        /!**
         * 页面跳转
         * @param value
         *!/
        this.gotoView = value =>{
            $state.go(value);
        }

        /!* 对话框 *!/
        this.showAdvanced = ev=> {
            let arr = {
                param : self.option
            };
            let dialog = document.querySelector("scm-sel");
            if(!dialog){
            $mdDialog.show({
                controller: DialogController,
                template: `<scm-sel option='${JSON.stringify(arr)}'></scm-sel>`,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
            }
        };

        function DialogController($scope, $mdDialog){
            $scope.hide = ()=> {
                $mdDialog.hide();
            };

            $scope.cancel = ()=> {
                $mdDialog.cancel();
            };
        }

        this.toggle = (item, list)=> {
            let idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        this.enter=(e)=>{
                var keycode = window.event?e.keyCode:e.which;
                if(keycode==13){
                    $state.go('search',{});
                }
            };

        this.zan=()=>{
            $state.go('search',{});
        }
        this.userMenu=(ev)=> {

        }

    }*/

};
