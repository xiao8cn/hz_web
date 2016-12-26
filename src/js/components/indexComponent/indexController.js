class indexController {

    constructor($scope,$rootScope,$interval,commonService){
        $scope.progress_flag = false;
        $rootScope.$on('progress',(e, res)=>{
            if(res.value == 100 || res.value == 0){
                $interval(()=>{
                    $scope.progress_flag = false;
                },500)
            }else{
                $scope.progress_flag = true;
            }
            $scope.determinateValue = res.value;
        });

        this.params = commonService.getFindParam();
    }

}

export default indexController;
