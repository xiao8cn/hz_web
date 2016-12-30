export const HZ_GLOBAL = {
    hz_web_url : {
        indexUrl : "http://localhost:8080/webpack-dev-server/index.html",
        // indexUrl : "http://hozo.datatop.biz:1111/index.html"
    },
    interface_url :{
        login_url : "http://hozo.datatop.biz:2222/cgi-bin/login30.exe",
        // login_url : "http://192.168.1.230/cgi-bin/login30.exe",
        query_url : "http://hozo.datatop.biz:2222/cgi-bin/query30.exe",
        // query_url : "http://192.168.1.230/cgi-bin/query30.exe",
    },
    system_config : {
        channel : "369",
    },
    default_user : {
        login_name : "hozo2",
        password : "hozoer16",
    },
    find_param :[{
        id:0,
        name:"年龄标签",
        value:12,
        class:"first"
    },{
        id:1,
        name:"投诉标签",
        value:17,
        class:"second"
    },{
        id:2,
        name : "渠道",
        value:3,
        class:"third"
    }],
    init_param :[
        {
            id:0,
            name:"咨询业务占比",
            value:0,
            class:"first",
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
        },{
            id:1,
            name:"接通率占比",
            value:17,
            class:"second",
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
            }
        },{
            id:2,
            name : "呼入来源占比",
            value:4,
            class:"third",
            option :{
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
            }
        },{
            id:3,
            name : "投诉比例",
            value:3,
            class:"third",
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
            }
        }
    ]
}