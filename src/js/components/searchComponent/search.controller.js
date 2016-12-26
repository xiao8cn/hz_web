export class searchController{
    constructor($scope, $timeout,$state){
        this.$state = $state;
        this.options = this.option;
    }

    goResult(){
        this.$state.go('result',{
        });
    }

    delCheck(){
        let checkeds = document.querySelector('[class="md-checked"]');
        for(let i=0;i<checkeds.length;i++){
            let check=checkeds[i];
            check.parentNode.parentNode.parentNode.removeChild(check.parentNode.parentNode);
        }
    }

}