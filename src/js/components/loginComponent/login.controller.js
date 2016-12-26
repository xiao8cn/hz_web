export class loginController{

    constructor(ajaxService){
        this.ajaxService = ajaxService;
        let loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
        this.loginName = loginInfo?loginInfo.uid:"";
        this.password = loginInfo?loginInfo.passwd:"";
        this.loginFlag = true;
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
                        this.loginFlag = false;
                        window.localStorage.setItem("loginInfo",res.trim());
                        window.location.href = "http://localhost:8080/index.html"
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