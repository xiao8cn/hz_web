export class ChartService{

    constructor(){
        this.click_param;
    }

    setClickParam(param){
        this.click_param = param;
    }

    getClickParam(){
        return this.click_param;
    }

}
