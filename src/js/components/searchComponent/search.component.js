import './search.css';
import template from "./search.html";
import {searchController} from "./search.controller";

export const searchComponent = {
    template: template,
    bindings: {
        option: "<"
    },
    controllerAs:"ctrl",
    controller : searchController
    /*controller: function ($scope, $timeout,$state) {
        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {

        }

        this.goResult = () =>{
            $state.go('result',{
            });
        }

        this.options = this.option;

        this.delCheck = ()=>{
           let checkeds = document.querySelector('[class="md-checked"]');
           for(let i=0;i<checkeds.length;i++){
               let check=checkeds[i];
               check.parentNode.parentNode.parentNode.removeChild(check.parentNode.parentNode);
           }
        }

    }*/
}