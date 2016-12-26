import './index.css';
import template from "./index.html";
import indexController from "./indexController";

export const indexComponent = {
    template : template,
    controllerAs:"ctrl",
    controller : indexController,
}