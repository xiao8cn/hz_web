export class selController{

    constructor($scope, $timeout,$state,$mdDialog,ajaxService,commonService){
        this.HZ_GLOBAL = commonService.getHzGlobal();
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.ajaxService = ajaxService;
    }

    $onInit(){
        this.selecteds = [];

        let params = this.option.param,
            url = this.HZ_GLOBAL.interface_url.query_url,
            channel = this.HZ_GLOBAL.system_config.channel,
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

            /**
             * 根据列读取对应的内容
             */
            this.ajaxService.searchPost(option)
                .then(data=>{
                    let param = ['settime',`${res.value} 1 0 0 set-dfl`,'1 0 88888888 (fwex)'],
                        card = [];
                    option.param = param;
                    this.ajaxService.searchPost(option)
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

    goSearch(selecteds){
        this.$mdDialog.hide();
        this.$state.go("table",{
            selecteds : selecteds
        });
    }

    toggle(item,lindex){
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

}