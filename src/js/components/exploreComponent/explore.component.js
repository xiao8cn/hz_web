import './explore.css';
import template from "./explore.html";
import {exploreController} from "./explore.controller";

export const exploreComponent = {
    template: template,
    bindings: {
        option: "<"
    },
    controllerAs:"ctrl",
    controller : exploreController
}