import { HZ_GLOBAL } from "../global_val";

class ajaxService {
    constructor($http){
        this.$http = $http;
    };

    /**
     * 请求
     * @param href url
     * @param param 参数
     * @returns {Promise}
     */
    getPost(href,param){
        let url = href,
            input = param,
            promise = new Promise((resolve,reject)=>{
                if(window.XMLHttpRequest) {
                    var xmlHttp=new XMLHttpRequest();
                }
                else if(window.ActiveXObject) {
                    var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                if(!xmlHttp) {
                    alert("No HTTP request support");
                    return "";
                }

                xmlHttp.open("POST", url, false);

                let t0=(new Date()).getTime();
                xmlHttp.send(input);

                if (xmlHttp.status == 200) {
                    let restxt=xmlHttp.responseText;
                    if(restxt.indexOf("Bad session") != -1){
                        window.location.href = HZ_GLOBAL.hz_web_url.loginUrl;
                        reject();
                    }else{
                        resolve(restxt);
                    }

                }
            })
        return promise;
    }

    /**
     * 获取数据集的最大最小日期
     * @param data  json数据
     * @returns {Array} 返回，最大 和最小日期的数组
     */
    getMaxMinDate(data){
        let dates = [];
        dates.push(data.body[data.head[0].id].cdata[0]+"");
        dates.push(data.body[data.head[0].id].cdata[data.body[data.head[0].id].cdata.length-1]+"");
        return dates;
    }

    /**
     * 处理时间数据返回string类型的数据
     * @param date
     * @returns {string}
     */
    getStringDate(date){
        let year = date.getFullYear(),
            month = (date.getMonth()+1+"").length==1?"0"+(date.getMonth()+1):date.getMonth()+1,
            day = (date.getDate()+"").length==1?"0"+date.getDate():date.getDate();
        return year+""+month+day;
    }

    /**
     * 转换成json
     * @param res
     */
    transformJson(res){
        return JSON.parse(res.split("<timer>")[0]);
    }

    /**
     * 获得 session
     * @param user
     */
    getHzSession(user){
        let uid = user.loginName || HZ_GLOBAL.default_user.login_name,
            pass = user.password || HZ_GLOBAL.default_user.password,
            browser = this.appInfo() || "zh",
            option = {},
            promise = new Promise((resolve,reject)=>{
                option.uid = uid;
                option.pass = pass;
                option.browser = browser.appname+"_"+browser.version;

                this.loginPost(option)
                    .then(res=>{
                        localStorage.setItem("loginInfo",res.trim());
                        resolve(JSON.parse(res).sessionID);
                    })
            })

        return promise;
    }

    searchPost(option){
        let
            url = option.url || HZ_GLOBAL.interface_url.query_url,
            channel = option.channel || HZ_GLOBAL.system_config.channel,
            param = this.getUserInfoParam()+"\n";

        option.param.forEach(res=>{
            param += res+'\n'
        });

        param += ".selapsed";
        url = url+"?channel="+channel;
        return this.getPost(url,param);
    }

    viewPost(option){
        let url = option.url || HZ_GLOBAL.interface_url.query_url,
            channel = option.channel || HZ_GLOBAL.system_config.channel,
            param = this.getUserInfoParam()+"\n";

        option.param.forEach(res=>{
            param += res+'\n'
        });

        param += ".selapsed";
        url = url+"?channel="+channel;

        return this.getPost(url,param);
    }

    getUserInfoParam(){
        let userInfo = JSON.parse(localStorage.getItem("loginInfo"));
        let userString = `${userInfo.userNo} ${userInfo.sessionID} ${userInfo.userId}`
        return userString;
    }

    getUserName(){
        let userInfo = JSON.parse(localStorage.getItem("loginInfo"));
        if(userInfo){
            return userInfo.userId;
        }
        window.location.href = HZ_GLOBAL.hz_web_url.loginUrl;
    }

    /**
     * 登陆post
     * @param option
     * @returns {Promise}
     */
    loginPost(option){
        let
            url = option.url || HZ_GLOBAL.interface_url.login_url,
            channel = option.channel || HZ_GLOBAL.system_config.channel,
            uid = option.uid,
            pass = option.pass,
            browser = option.browser;
        return this.getPost(`${url}?channel=${channel}`,`uid=${uid}\npass=${pass}\nbrowser=${browser}`)
    }

    doLogin(userName,password){
        let
            browser = this.appInfo() || "zh",
            option = {
                uid : userName,
                pass : password,
                browser : browser.appname+"_"+browser.version
            };

        return this.loginPost(option);
    }

    /**
     * 获取浏览器信息
     * @returns {{appname: string, version: number}}
     */
    appInfo(){
        let browser = {appname: 'unknown', version: 0},
            userAgent = window.navigator.userAgent.toLowerCase();
    //IE,firefox,opera,chrome,netscape
        if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){
            browser.appname = RegExp.$1;
            browser.version = RegExp.$2;
        } else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari
            browser.appname = 'safari';
            browser.version = RegExp.$2;
        }
        return browser;
    }

}

export default ajaxService;