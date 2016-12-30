import echarts from "echarts";

export class chartController {
    constructor($timeout, $state,$mdSidenav, $mdDialog,chartService,ajaxService){
        this.$timeout = $timeout;
        this.chartService = chartService;
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.ajaxService = ajaxService;
    }

    $onInit(){
        let option = this.option.option,
            id = this.option.id,
            flag = this.option.clickFn,
            $mdSidenav = this.$mdSidenav,
            chartService = this.chartService;

        this.$timeout(() => {
            if (document.getElementById(id)) {
                let myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
                if(flag){
                    myChart.on("click",function(params){
                        console.log(this);
                        $mdSidenav('right')
                            .toggle();
                        chartService.setClickParam(params);
                        params.color="#000";
                    });
                }
            }
        }, 10);
    }

    goPage(){
        this.$state.go('tab', {option: this.option});
    }


    showConfirm(ev){

        // Appending dialog to document.body to cover sidenav in docs app
        let confirm = this.$mdDialog.confirm()
            .title('确定删除此模块？')
            .textContent('删除后可以根据需求再次添加')
            .targetEvent(ev)
            .ok('删除')
            .cancel('取消');

        this.$mdDialog.show(confirm).then(()=>{
            let parent = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode,
                box = ev.target.parentNode.parentNode.parentNode.parentNode,
                id = this.option.id,
                userId = this.ajaxService.getUserName(),
                arr = ["day","week","month"];

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
            this.$timeout(()=>{
                parent.removeChild(box);
            },200)
        },()=>{
        });
    }
}