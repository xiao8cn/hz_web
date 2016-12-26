export class backController{

    constructor($rootScope,$state,$timeout){
        this.$timeout = $timeout;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }

    goBack(e){
        e.target.style.animation = "run 0.2s linear";
        e.target.parentNode.style.animation = "show 0.2s ease-in-out";

        this.$timeout(()=>{
            this.$rootScope.$broadcast('goHome', "day");
            this.$state.go("day",{
            });
        },250);
    }

}