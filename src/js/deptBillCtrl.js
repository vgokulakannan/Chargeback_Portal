angular.module('myApp').controller('deptBillCtrl', ['$scope','$state','$http', '$stateParams',function ($scope,$state,$http,$stateParams) {
 //console.log($stateParams.deptid);
 var dept_id = $stateParams.deptid;
 // $scope.users = {};
 //console.log(dept_id);

 // $http({
 //    url: '/deptBill', 
 //    method: "GET",
 //    params: {deptid: dept_id}
 // });
 
    $http.get('/deptBill/'+dept_id+'').success(function(response){ 
    $scope.users = response;  //ajax request to fetch data into $scope.data
    });


}]);