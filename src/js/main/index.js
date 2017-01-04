/**
 * @author jiaoju.wu
 * es6 模块化方法，引入 页面需要的js文件
 */
import "angular-material"

import "angular-ui-router";
import "angular-animate";

import "../common/angular-locale_zh-cn";

/**
 * 引入页面需要用到的组件
 */
import {indexComponent} from "../components/indexComponent/index.component";                 //主页组件
import {ComponentsModule} from "../components/components";        //组件工厂

import ServiceModule from "../common/service.module";                    //service 等其他组件
import FilterModule from "../common/filter.module";                    //filter 等其他组件

let scm_web = angular.module("scm_index",[
    ServiceModule.name,
    FilterModule.name,
    ComponentsModule.name,
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    require('angular-material-data-table')
]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default');
})

scm_web.config(function($stateProvider,$locationProvider) {

    let loginInfo = JSON.parse(window.localStorage.getItem("loginInfo")),
        params = [['settime',"3 8 26 3 0 0 set-dfl",'1 0 99 (fwex)']];

    if(loginInfo)
        params = JSON.parse(window.localStorage.getItem(`${loginInfo.userId}params`))||[['settime',"3 8 26 3 0 0 set-dfl",'1 0 99 (fwex)']];

    let states = [
        {
            name: 'day',    //配置名称
            component : 'scmView', //对应组件
            params:{"option":null},
            resolve: {              //配置传参
                option : function(){
                    let option = [
                        {
                            option : {
                                title : {
                                    text: '咨询业务占比',
                                    subtext: '当日',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip : {
                                    trigger: 'item',
                                    hideDelay : 200
                                },
                                legend: {
                                    x : 'center',
                                    y : 'bottom',
                                    data: ['营销类业务','业务咨询','活动咨询','客户投诉'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series : [
                                    {
                                        type: 'pie',
                                        radius : ['10%','60%'],
                                        center: ['50%', '50%'],
                                        roseType : 'radius',
                                        data:[
                                            {value:1, name:'营销类业务'},
                                            {value:5, name:'业务咨询'},
                                            {value:2, name:'活动咨询'},
                                            {value:1, name:'客户投诉'},
                                        ],
                                        color:['#105F9E','#207FBF','#16A8C7','#54DBDF','#A9E1D4'],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                            },
                                            normal: {
                                                label: {
                                                    textStyle: {
                                                        // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                        fontSize: '14'
                                                    },
                                                },
                                                // labelLine:{show:true,length: 0.001}
                                            },

                                        },
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length: 0.001,
                                                length2: 0.001
                                            }
                                        }
                                    }]
                            },
                            id:"day1",
                            param : ['settime',"3 26 2 0 0 set-dfl",'1 0 99 (fwex)'],
                            params : params
                        },
                        {
                            option:{
                                title : {
                                    text: '接通率占比',
                                    subtext: '当日',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    x : 'center',
                                    y : 'bottom',
                                    data:['接通','未接通'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series: [
                                    {
                                        name:'接通率占比',
                                        type:'pie',
                                        radius: ['50%', '70%'],
                                        center: ['50%', '50%'],
                                        // avoidLabelOverlap: false,
                                        label: {
                                            normal: {
                                                show: false,
                                                position: 'center'
                                            },
                                            emphasis: {
                                                show: true,
                                                textStyle: {
                                                    fontSize: '30',
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        },
                                        labelLine: {
                                            normal: {
                                                show: false
                                            }
                                        },
                                        data:[
                                            {value:100, name:'接通'},
                                            {value:35, name:'未接通'},
                                        ],
                                        color:['#EF2124','#FD8673'],
                                    }
                                ]
                            },
                            id:"day2"

                        },
                        {
                            option:{
                                title: {
                                    text: '呼入来源占比',
                                    subtext: '当日',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    x : 'center',
                                    y : 'bottom',
                                    data: ['微博','微信','手机','固定电话','QQ','其他'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series : [
                                    {
                                        name: '呼入来源占比',
                                        type: 'pie',
                                        radius : '65%',
                                        center: ['50%', '50%'],
                                        data:[
                                            {value:200, name:'微博'},
                                            {value:300, name:'微信'},
                                            {value:100, name:'手机'},
                                            {value:100, name:'固定电话'},
                                            {value:100, name:'QQ'},
                                            {value:150, name:'其他'}
                                        ].sort(function (a, b) { return a.value - b.value}),
                                        roseType: 'angle',
                                        color:['#AFA7B6','#8A7D86','#2E2E2E','#705676','#B594A9'],
                                        label: {
                                            normal: {
                                                textStyle: {
                                                    // color: 'rgba(255, 255, 255, 0.5)'
                                                }
                                            }
                                        },
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            },
                                            normal: {
                                                label: {
                                                    textStyle: {
                                                        // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                        fontSize: '14'
                                                    }
                                                }
                                            }
                                        },
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length: 0.001,
                                                length2: 0.001
                                            }
                                        }
                                    }
                                ]
                            },
                            id:"day3"
                        },
                        {
                            option:{
                                title : {
                                    text: '投诉比例',
                                    subtext: '当日',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    x:"center",
                                    y:"bottom",
                                    data: ['重大投诉','一般投诉','其他','无投诉'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series : [
                                    {
                                        name:'投诉比例',
                                        type:'pie',
                                        radius : '60%',
                                        center: ['50%', '50%'],
                                        data:[
                                            {value:1, name:'重大投诉'},
                                            {value:60, name:'一般投诉'},
                                            {value:10, name:'其他'},
                                            {value:40, name:'无投诉'},
                                        ],
                                        color:['#76A176','#374B26','#3B6B3B','#8FC788','#C3DFB9'],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 20,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(f, f, f, 0.5)'
                                            },
                                            normal: {
                                                label: {
                                                    textStyle: {
                                                        // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                        fontSize: '14'
                                                    }
                                                }
                                            },

                                        },
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length: 0.2,
                                                length2: 0.2
                                            }
                                        }
                                    }
                                ]
                            },
                            id:"day4"}
                    ];
                    return option;
                },
                dateType : ()=>"day",
            }
        },
        {
            name: 'week',
            // url: '/week',
            component : 'scmView', //对应组件
            resolve: {              //配置传参
                option : function(){
                    let option= [
                        {
                            id : "week1",
                            param : ['settime',"3 26 2 0 0 set-dfl",'1 0 99 (fwex)'],
                            option:{
                                title : {
                                    text: '咨询业务占比',
                                    subtext: '近七天',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    x : 'center',
                                    y : 'bottom',
                                    data: ['营销类业务','业务咨询','活动咨询','客户投诉'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series : [
                                    {
                                        name: '访问来源',
                                        type: 'pie',
                                        radius : ['10%','60%'],
                                        center: ['50%', '50%'],
                                        roseType : 'radius',
                                        data:[
                                            {value:1, name:'营销类业务'},
                                            {value:5, name:'业务咨询'},
                                            {value:2, name:'活动咨询'},
                                            {value:1, name:'客户投诉'}
                                        ],
                                        color:['#105F9E','#207FBF','#16A8C7','#54DBDF','#A9E1D4'],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            },
                                            normal: {
                                                label: {
                                                    textStyle: {
                                                        // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                        fontSize: '14'
                                                    }
                                                }
                                            }
                                        }
                                    }]
                            }
                        }
                        ,{option:{
                            title : {
                                text: '接通率占比',
                                subtext: '本周',
                                x:'center',
                                textStyle: {
                                    color: '#13498C',
                                    fontSize: '22',
                                },
                                subtextStyle: {
                                    color: '#ccc',
                                    fontSize: '18',
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                x:"center",
                                y:"bottom",
                                data:['接通','未接通'],
                                textStyle: {
                                    fontSize: '14',
                                    color: '#5985A6'
                                }
                            },
                            series: [
                                {
                                    name:'接通率占比',
                                    type:'pie',
                                    radius: ['50%', '70%'],
                                    center: ['50%', '50%'],
                                    // avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data:[
                                        {value:100, name:'接通'},
                                        {value:35, name:'未接通'},
                                    ],
                                    color:['#EF2124','#FD8673'],
                                }
                            ]
                        },id:"week2"},{option:{
                            title : {
                                text: '呼入来源占比',
                                subtext: '本周',
                                x:'center',
                                textStyle: {
                                    color: '#13498C',
                                    fontSize: '22',
                                },
                                subtextStyle: {
                                    color: '#ccc',
                                    fontSize: '18',
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                x:"center",
                                y:"bottom",
                                data: ['微博','微信','手机','固定电话','其他'],
                                textStyle: {
                                    fontSize: '14',
                                    color: '#5985A6'
                                }
                            },
                            series : [
                                {
                                    name: '呼入来源占比',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '50%'],
                                    data:[
                                        {value:200, name:'微博'},
                                        {value:300, name:'微信'},
                                        {value:100, name:'手机'},
                                        {value:100, name:'固定电话'},
                                        {value:150, name:'其他'}
                                    ].sort(function (a, b) { return a.value - b.value}),
                                    roseType: 'angle',
                                    color:['#AFA7B6','#8A7D86','#2E2E2E','#705676','#B594A9'],
                                    label: {
                                        normal: {
                                            textStyle: {
                                                // color: 'rgba(255, 255, 255, 0.5)'
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        },
                                        normal: {
                                            label: {
                                                textStyle: {
                                                    // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                    fontSize: '14'
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        },id:'week3'},{option:{
                            title : {
                                text: '投诉比例',
                                subtext: '本周',
                                x:'center',
                                textStyle: {
                                    color: '#13498C',
                                    fontSize: '22',
                                },
                                subtextStyle: {
                                    color: '#ccc',
                                    fontSize: '18',
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                x:"center",
                                y:"bottom",
                                data: ['重大投诉','一般投诉','其他','无投诉'],
                                textStyle: {
                                    fontSize: '14',
                                    color: '#5985A6'
                                }
                            },
                            series : [
                                {
                                    name:'投诉比例',
                                    type:'pie',
                                    radius : '60%',
                                    center: ['50%', '50%'],
                                    data:[
                                        {value:1, name:'重大投诉'},
                                        {value:6, name:'一般投诉'},
                                        {value:20, name:'其他'},
                                        {value:40, name:'无投诉'},
                                    ],
                                    color:['#76A176','#374B26','#3B6B3B','#8FC788','#C3DFB9'],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 20,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(f, f, f, 0.5)'
                                        },
                                        normal: {
                                            label: {
                                                textStyle: {
                                                    // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                    fontSize: '14'
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        },id:"week3"}
                    ];
                    return option;
                },
                dateType : ()=>"week",
            }
        },
        {
            name: 'month',
            // url: '/month',
            component: 'scmView',
            resolve: {
                option: function () {
                    let option = [
                        {
                            id : "month1",
                            param : ['settime',"3 26 2 0 0 set-dfl",'1 0 99 (fwex)'],
                            params : params,
                            option:{
                                title : {
                                    text: '咨询业务占比',
                                    subtext: '近三十天',
                                    x:'center',
                                    textStyle: {
                                        color: '#13498C',
                                        fontSize: '22',
                                    },
                                    subtextStyle: {
                                        color: '#ccc',
                                        fontSize: '18',
                                    }
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    x : 'center',
                                    y : 'bottom',
                                    data: ['营销类业务','业务咨询','活动咨询','客户投诉'],
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#5985A6'
                                    }
                                },
                                series : [
                                    {
                                        name: '访问来源',
                                        type: 'pie',
                                        radius : ['10%','60%'],
                                        center: ['50%', '50%'],
                                        roseType : 'radius',
                                        data:[
                                            {value:1, name:'营销类业务'},
                                            {value:5, name:'业务咨询'},
                                            {value:2, name:'活动咨询'},
                                            {value:1, name:'客户投诉'}
                                        ],
                                        color:['#105F9E','#207FBF','#16A8C7','#54DBDF','#A9E1D4'],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            },
                                            normal: {
                                                label: {
                                                    textStyle: {
                                                        // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                        fontSize: '14'
                                                    }
                                                }
                                            }
                                        }
                                    }]
                            }
                        }
                    ]
                    return option;
                },
                dateType : ()=>"month",
            }
        },
        {
            name: 'explore',
            // url: '/explore',
            component : 'scmExplore', //对应组件
            resolve: {              //配置传参
                option : function(){
                    let option= {
                        option: {
                            title: {
                                text: '咨询业务占比',
                                subtext: '本周',
                                x: 'center',
                                textStyle: {
                                    color: '#13498C',
                                    fontSize: '22',
                                },
                                subtextStyle: {
                                    color: '#ccc',
                                    fontSize: '18',
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                x: 'center',
                                y: 'bottom',
                                data: ['营销类业务', '业务咨询', '活动咨询', '客户投诉'],
                                textStyle: {
                                    fontSize: '14',
                                    color: '#5985A6'
                                }
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['10%', '60%'],
                                    center: ['50%', '50%'],
                                    roseType: 'radius',
                                    data: [
                                        {value: 1, name: '营销类业务'},
                                        {value: 5, name: '业务咨询'},
                                        {value: 2, name: '活动咨询'},
                                        {value: 1, name: '客户投诉'}
                                    ],
                                    color: ['#105F9E', '#207FBF', '#16A8C7', '#54DBDF', '#A9E1D4'],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        },
                                        normal: {
                                            label: {
                                                textStyle: {
                                                    // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                                    fontSize: '14'
                                                }
                                            }
                                        }
                                    }
                                }]

                        }
                    };
                    return option;
                }
            }
        },
        {
            name: 'tab',
            // url: '/tab',
            component: 'scmTab',
            params : {option:null},
            resolve: {
                option: function () {
                    let option = {

                    }
                    return option;
                }
            }
        },{
            name: 'search',
            component: 'scmSearch',
            resolve: {
                option: function () {
                    let option = {

                    }
                    return option;
                }
            }
        }, {
            name: 'table',
            component: 'scmTable',
            params : {selecteds : []},
            resolve: {
                option: function () {
                    return 123;
                }
            }
        },{
            name: 'result',
            component: 'scmResult',
            resolve: {
                option: function () {
                    let option = {
                        id:'tav1',
                        option:{
                            title: {
                                text: '活动咨询',
                            },
                            tooltip: {},
                            legend: {
                                data:['咨询量'],
                                textStyle:{
                                    fontSize: "16"
                                }
                            },
                            xAxis: {
                                data: ["最新促销活动","以往促销活动"],
                                axisLabel: {
                                    show: true,
                                    textStyle:{
                                        fontSize: '16'
                                    }
                                },
                                axisLine:{
                                },
                            },
                            yAxis: {
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16'
                                    }
                                }
                            },

                            series: [{
                                name: '咨询量',
                                type: 'bar',
                                data: [20, 5],
                                itemStyle:{
                                    normal:{

                                        color: function (value){ return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); }
                                    }
                                }
                            }]
                        }
                    };
                    return option;
                }
            }
        }




    ];

    // 处理 路由
    if(loginInfo){
        if(window.localStorage.getItem(`${loginInfo.userId}dayOption`)){
            let initOption = JSON.parse(window.localStorage.getItem(`${loginInfo.userId}dayOption`));

            states.map(res=>{
                if(res.name == initOption.dataType){
                    res.resolve.option = ()=>initOption.option;
                }
            })
        }
        if(window.localStorage.getItem(`${loginInfo.userId}weekOption`)){
            let initOption = JSON.parse(window.localStorage.getItem(`${loginInfo.userId}weekOption`));
            states.map(res=>{
                if(res.name == initOption.dataType){
                    res.resolve.option = ()=>initOption.option;
                }
            })
        }
        if(window.localStorage.getItem(`${loginInfo.userId}monthOption`)){
            let initOption = JSON.parse(window.localStorage.getItem(`${loginInfo.userId}monthOption`));

            states.map(res=>{
                if(res.name == initOption.dataType){
                    res.resolve.option = ()=>initOption.option;
                }
            })
        }
    }

    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $locationProvider.html5Mode(true)
});

/**
 * 主页面的组件配置
 */
scm_web.component('app',indexComponent);      //主页