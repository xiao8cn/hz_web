import './result.css';
import template from "./result.html";
import {resultController} from "./result.controller";

export const resultComponent = {
    template: template,
    bindings: {
        option: "<"
    },
    controllerAs:"ctrl",
    controller : resultController
    /*controller: function ($scope, $timeout) {
        /!**
         * 生命周期的加载
         *!/
        this.$onInit = () => {

        }
    }*/
}