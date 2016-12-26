import './chart.css';
import template from "./chart.html";
import {chartController} from "./chart.controller";

export const chartComponent = {
    template: template,
    bindings: {
        option: "<",
        exflag: "<",
    },
    controllerAs: "ctrl",
    controller : chartController
    /*controller: function ($scope, $timeout, $state,$mdSidenav, $mdDialog,chartService,ajaxService) {
        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {
            let option = this.option.option,
                id = this.option.id,
                flag = this.option.clickFn;

            $timeout(() => {
                if (document.getElementById(id)) {
                    let myChart = echarts.init(document.getElementById(id));
                    myChart.setOption(option);
                    if(flag){
                        myChart.on("click",function(params){
                            $mdSidenav('right')
                              .toggle();
                            chartService.setClickParam(params);
                            params.color="#000";
                        });
                    }
                }
            }, 10);

        }

        this.goPage = () => {
            console.log(this.option);
            $state.go('tab', {option: this.option});
        }

        this.showConfirm = ev=>{
            // Appending dialog to document.body to cover sidenav in docs app
            let confirm = $mdDialog.confirm()
                .title('确定删除此模块？')
                .textContent('删除后可以按需求添加.')
                .targetEvent(ev)
                .ok('删除')
                .cancel('取消');

            console.log(ev);

            $mdDialog.show(confirm).then(()=>{
                let parent = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode,
                    box = ev.target.parentNode.parentNode.parentNode.parentNode,
                    id = this.option.id,
                    userId = ajaxService.getUserName(),
                    arr = ["day","week","month"];


                console.log(id);

                arr.forEach(res=>{
                    let newInitOption = [];
                    if(window.localStorage.getItem(`${userId+res}Option`)){
                        let initopiton = JSON.parse(window.localStorage.getItem(`${userId+res}Option`));
                        initopiton.option.map(res=>{
                            if(res.id != id){
                                newInitOption.push(res);
                            }
                        })
                        initopiton.option = newInitOption;
                        window.localStorage.setItem(`${userId+res}Option`,JSON.stringify(initopiton));
                    }
                })
                $timeout(()=>{
                    parent.removeChild(box);
                },10)
            },()=>{
            });
        };

    }*/
}