import './table.css';
import './tabl.less';
import template from "./table.html";
import {tableController} from "./table.controller";

export const tableComponent = {
    template: template,
    bindings: {
        option: "<"
    },
    controllerAs:"ctrl",
    controller : tableController
    /*controller: function ($scope,$stateParams,ajaxService,$timeout) {

        this.page = 1;
        this.total = 0;
        this.limitOption = [10, 20, 50,{label: 'All',value:()=>88888888}];
        this.limit = this.limitOption[0];

        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {
            let table = document.querySelector("md-table-container");

            table.oncontextmenu = function ()
            {
                return false;
            }

            let selecteds = $stateParams.selecteds,
                batchparam = "",
                searchParam = "";

            /!**
             * 循环处理seleeds 去获取数据
             *!/
            selecteds.forEach(seleced=>{
                searchParam += seleced.id +" ";
                batchparam +='sw" ';
                seleced.values.forEach(value=>{
                    batchparam += value+'|'
                })
                batchparam +=`" ${seleced.id} `
            })

            searchParam = searchParam + " 26 " + (selecteds.length+1) + " 0 0 set-dfl";

            let option = {
                    channel :"369",
                    param : [
                        '88888888 set-auxfn',
                        'start-batch',
                        '1 0 set-bstype',
                        batchparam + " " + selecteds.length + " (find-work)",
                        'end-batch'
                    ]
                };

            this.promise = ajaxService.searchPost(option)
                .then(search=>{
                    option.param = ['settime',searchParam,`1 0 ${this.limit} (fwex)`];
                    this.option = option;
                    this.refresh(option);
                })
        }

        this.refresh = option=>{
            ajaxService.searchPost(option)
                .then(res=>{
                    let resJson = JSON.parse(res.split("<timer>")[0]),
                        theadrows = [],
                        bodyrows = [],
                        arrs = [];

                    resJson.head.forEach((res,index)=>{
                        theadrows.push({
                            fno : res.fno,
                            name : res.fname
                        });
                        let body = [];
                        resJson.body[res.id].cdata.forEach(data=>{
                            body.push(data[0]);
                        })
                        bodyrows.push(body);
                    })

                    bodyrows.map(res=>{
                        res.forEach((vs,index)=>{
                            if(arrs[index]){
                                arrs[index].push(vs);
                            }else{
                                let arr = [];
                                arr.push(vs);
                                arrs.push(arr);
                            }
                        })
                    })
                    $scope.theadrows = theadrows;
                    $scope.bodyrows = arrs;
                    this.total = resJson.title.groupCount;
                })
        }

        /!**
         * refu
         *!/
        this.loadStuff = ()=> {
            this.promise = $timeout(()=> {}, 2000);
        }

        this.openMenu= ($mdOpenMenu, ev)=>{
            let originatorEv = ev;
            $mdOpenMenu(ev);
        }

        this.orderColumn = (index,num)=>{
            let theadrow = $scope.theadrows[index],
                fno = theadrow.fno,
                option = this.option,
                param = this.option.param;

            if(fno == 26){
                if(num == 0){
                    num = 6291456;
                }else{
                    num = 6291457;
                }
            }

            let newparam = param.slice(0,1).concat(`${fno} ${num}  (sort-detail)`).concat(param.slice(1,param.length));

            option.param = newparam;
            this.refresh(option);
            option.param = param;

        }

        this.getDesserts = (e,pageSize)=>{
            this.limit = pageSize;
            let param = this.option.param;
            param[param.length-1] = `1 ${(e-1)*pageSize} ${pageSize} (fwex)`;
            this.refresh(this.option);
        }

        this.toggleNotifications = ()=>{
            alert("未开发。。。");
        }

    }*/
}