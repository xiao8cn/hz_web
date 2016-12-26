import './login.css';
import template from "./login.html";
import {loginController} from "./login.controller";

export const loginComponent = {
    template : template,
    controllerAs:"ctrl",
    controller : loginController,
}