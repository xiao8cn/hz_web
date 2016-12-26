import {viewComponent} from "./viewComponent/view.component";
import {treeComponent} from "./treeComponent/tree.component";
import {addComponent} from "./addComponent/add.component";
import {backComponent} from "./backComponent/back.component";
import {chartComponent} from "./chartComponent/chart.component";
import {resultComponent} from "./resultComponent/result.component";
import {searchComponent} from "./searchComponent/search.component";
import {selComponent} from "./selComponent/sel.component";
import {tabComponent} from "./tabComponent/tab.component";
import {tableComponent} from "./tableComponent/table.component";
import {indexComponent} from "./indexComponent/index.component";

export const Modules = angular.module("scmView",[])
    .component("scmView",viewComponent)
    .component("scmTree",treeComponent)
    .component("scmAdd",addComponent)
    .component("scmBack",backComponent)
    .component("scmChart",chartComponent)
    .component("scmResult",resultComponent)
    .component("scmSearch",searchComponent)
    .component("scmSel",selComponent)
    .component("scmTab",tabComponent)
    .component("scmTable",tableComponent)
    .component("scmIndex",indexComponent);
