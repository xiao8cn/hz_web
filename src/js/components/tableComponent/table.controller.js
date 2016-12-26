export class tableController{

    constructor($scope,$stateParams,ajaxService,$timeout){
        this.self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.ajaxService = ajaxService;
        this.$timeout = $timeout;
        this.page = 1;
        this.total = 0;
        this.limitOption = [10, 20, 50,{label: 'All',value:()=>88888888}];
        this.limit = this.limitOption[0];
        this.label = {
            of : "总计",
            page : "页",
            rowsPerPage : "每页条数",
        }
    }

    $onInit(){

        let table = document.querySelector("md-table-container");

        table.oncontextmenu = function ()
        {
            return false;
        }

        let selecteds = this.$stateParams.selecteds,
            batchparam = "",
            searchParam = "";

        /**
         * 循环处理seleeds 去获取数据
         */
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

        this.promise = this.ajaxService.searchPost(option)
            .then(search=>{
                option.param = ['settime',searchParam,`1 0 ${this.limit} (fwex)`];
                this.option = option;
                this.refresh(option);
            })
    }

    refresh(option){
        this.ajaxService.searchPost(option)
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
                this.$scope.theadrows = theadrows;
                this.$scope.bodyrows = arrs;
                this.total = resJson.title.groupCount;
            })
    }

    loadStuff(){
        this.promise = this.$timeout(()=> {}, 2000);
    }

    openMenu($mdOpenMenu, ev){
        let originatorEv = ev;
        $mdOpenMenu(ev);
    }

    orderColumn(index,num){
        let theadrow = this.$scope.theadrows[index],
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

    getDesserts(e,pageSize){
        this.boundaryLinks.limit = pageSize;
        let param = this.boundaryLinks.option.param;
        param[param.length-1] = `1 ${(e-1)*pageSize} ${pageSize} (fwex)`;
        this.boundaryLinks.refresh(this.boundaryLinks.option);
    }

    toggleNotifications(){
        alert("未开发。。。");
    }


}
