import './sel.css';
import template from "./sel.html";
import {selController} from "./sel.controller";

export const selComponent = {
    template: template,
    bindings: {
        option: "<"
    },
    controllerAs:"ctrl",
    controller : selController
    /*controller: function ($scope, $timeout,$state,$mdDialog,ajaxService,commonService) {
        let HZ_GLOBAL = commonService.getHzGlobal();

        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {
            /!**
             * 加载列
             *!/
            this.selecteds = [];

            let params = this.option.param,
                url = HZ_GLOBAL.interface_url.query_url,
                channel = HZ_GLOBAL.system_config.channel,
                select_cards = [];


            params.forEach((res,index)=>{
                let param =[
                    'settime',
                    '88888888 set-auxfn',
                    'start-batch',
                    '1 0 set-bstype',
                    `sw" *" ${res.value} 1 (find-work)`,
                    'end-batch',
                ],
                    option = {
                        url : url,
                        channel : channel,
                        param : param,
                    };

                /!**
                 * 根据列读取对应的内容
                 *!/
                ajaxService.searchPost(option)
                    .then(data=>{
                        let param = ['settime',`${res.value} 1 0 0 set-dfl`,'1 0 88888888 (fwex)'],
                            card = [];
                        option.param = param;
                        ajaxService.searchPost(option)
                            .then(value=>{
                                let valueJson = JSON.parse(value.split("<timer>")[0]);
                                valueJson.body[valueJson.head[0].id].cdata.forEach(vs=>card.push(vs[0]));
                                select_cards.push({
                                    name : res.name,
                                    class : res.class,
                                    cards : card,
                                    value : res.value
                                })
                                this.selectCards = select_cards;
                            })
                    })
            })
        }

        this.goSearch = selecteds =>{
            console.log(selecteds);
            $mdDialog.hide();
            $state.go("table",{
                selecteds : selecteds
            });

        }

        this.toggle = (item,lindex)=>{
            if(this.selecteds.length>0 && this.selecteds.filter(res=>res.id==lindex).length>0){
                this.selecteds.filter(res=>{
                    return res.id == lindex;
                }).map(res=>{
                    res.values.push(item)
                })
            }else{
                let selected = {
                    id : lindex,
                    values:[item]
                };
                this.selecteds.push(selected);
            }
        }

    }*/
}