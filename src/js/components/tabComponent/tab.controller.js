export class tabController{
    constructor($scope, $stateParams,$mdSidenav,ajaxService,commonService,chartService){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.ajaxService = ajaxService;
        this.$mdSidenav = $mdSidenav;
        this.chartService = chartService;
        this.HZ_GLOBAL = commonService.getHzGlobal();
        this.selectedId = "1";
        this.selecteds = [];
        this.params = commonService.getFindParam();
        this.tabIndex = 0;
    }

    $onInit(){
        this.$scope.params = this.$stateParams.option.params;
        this.refreshTab(this.$scope.params);
    }

    refreshTab(params,legendFilter){
        this.tabs=[];
        let echart_index=0;

        params.forEach((param,barindex)=>{
            /**
             * 基础查询
             */
            let
                url = this.HZ_GLOBAL.interface_url.query_url,
                channel = this.HZ_GLOBAL.system_config.channel,
                option = {
                    url : url,
                    channel : channel,
                    param : param,
                },
                transform_data = [],
                lengends = [],
                xDatas = [],
                datas = [],
                keys = [],
                options = [],
                xData,
                data,
                lengendKey,
                arrlength = 99;

            this.ajaxService.viewPost(option)
                .then(res=>{
                    let jsonRes = JSON.parse(res.split("<timer>")[0]);
                    for(let key in jsonRes.body){
                        keys.push(key);
                        let arr = [],
                            data = [];
                        jsonRes.body[key].cdata.forEach(value=>{
                            data.push(value[0]);
                            if(arr.indexOf(value[0]) == -1){
                                arr.push(value[0]);
                            }
                        })
                        transform_data.push({
                            key: key,
                            data : data
                        })
                        if(arr.length < arrlength){
                            arrlength = arr.length;
                            lengendKey = key;
                        }
                    }

                    jsonRes.body[keys[0]].cdata.forEach((res,index)=>{
                        if(!lengends || lengends[lengends.length-1] != res){
                            if(xData){
                                xDatas.push(xData);
                            }
                            if(data){
                                datas.push(data);
                            }
                            xData = [];
                            data = [];
                            lengends.push(res[0]);
                            xData.push(jsonRes.body[keys[1]].cdata[index][0]);
                            data.push(jsonRes.body[keys[2]].cdata[index][0]);
                        }else {
                            xData.push(jsonRes.body[keys[1]].cdata[index][0]);
                            data.push(jsonRes.body[keys[2]].cdata[index][0]);
                            if(jsonRes.body[keys[0]].cdata.length-1 == index){
                                xDatas.push(xData);
                                datas.push(data);
                            }
                        }
                    })

                    if(legendFilter){
                        lengends = lengends.filter(res=>{
                            return res == legendFilter;
                        })
                    }

                    lengends.forEach((res,index)=>{
                        let in_option = {
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            title:{
                                text:""
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'直接访问',
                                    type:'bar',
                                    barWidth: '60%',
                                    data:[10, 52, 200, 334, 390, 330, 220]
                                }
                            ]
                        };
                        in_option.xAxis[0].data = xDatas[index];
                        in_option.series[0].data = datas[index];
                        in_option.title.text = res;
                        options.push({option:in_option,id:"bar"+echart_index++,clickFn: true,});
                    })


                    this.tabs.push({
                        label: "bar"+barindex,
                        param: options
                    });

                })
        });
    }

    toggleRight(e){
        e.target.parentNode.style.position="relative";
        e.target.parentNode.style.zIndex="100";

        this.$mdSidenav('right')
            .toggle()
            .then(function () {
            });
    }

    toggle(item,linde){
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

    mdTabSelect(index){
        this.tabIndex = index;
    }

    /**
     * 表点选赞
     */
    tabSearch(){
        let select_head_value = this.params[this.selectedId].value,
            param = this.$scope.params[this.tabIndex].map(res=>res),
            paramarr = param[1].split(" "),
            newParam = "",
            echartParam = this.chartService.getClickParam();

        paramarr[0] = paramarr[1];
        paramarr[1] = select_head_value;
        paramarr.forEach(res=>{
            newParam +=res+" "
        })
        param[1] = newParam;

        this.$scope.params.push(param);
        this.$mdSidenav('right').toggle();
        window.localStorage.setItem(`${this.ajaxService.getUserName()}params`,JSON.stringify(this.$scope.params));
        this.refreshTab(this.$scope.params);
    }

}