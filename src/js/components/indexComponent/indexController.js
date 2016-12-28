export class indexController {

    constructor($scope,$rootScope,$interval,commonService,ajaxService,$timeout){
        let loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
        this.ajaxService = ajaxService;
        this.loginName = loginInfo?loginInfo.uid:"";
        this.password = loginInfo?loginInfo.passwd:"";
        this.$scope = $scope;
        this.$scope.loginFlag = true;
        this.$timeout = $timeout;

        if(loginInfo){
            this.$scope.loginFlag = false;
        }

        $scope.progress_flag = false;
        $rootScope.$on('progress',(e, res)=>{
            if(res.value == 100 || res.value == 0){
                $interval(()=>{
                    $scope.progress_flag = false;
                },500)
            }else{
                $scope.progress_flag = true;
            }
            $scope.determinateValue = res.value;
        });

        this.params = commonService.getFindParam();
    }

    doLogin(userName,password){
        if(this.loginName && this.password){
            this.ajaxService.doLogin(userName,password)
                .then(res=>{
                    let jsonRes = JSON.parse(res);
                    if(jsonRes.advice){
                        alert("用户锁死，请刷新页面或登陆其他账号！");
                        window.location.reload();
                    }else{
                        window.localStorage.setItem("loginInfo",res.trim());
                        this.$timeout(()=>{
                            this.$scope.loginFlag = false;
                        },10)
                    }
                })
        }else{
            alert("用户名@密码录入");
            return;
        }
    }

    enter(e){
        let keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            this.doLogin(this.loginName,this.password);
        }
    }

}
