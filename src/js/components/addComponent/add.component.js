import './add.css';
import template from "./add.html";
import {addController} from "./add.controller";

export const addComponent = {
    template: template,
    bindings: {
        scmClick : "<",
        bindController : "<"
    },
    controllerAs:"ctrl",
    controller : addController
}