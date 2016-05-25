
angular.module('myApp').controller('adminCtrl', ['$scope','$state','$http', function ($scope,$state,$http) {
 
    $http.get('./www/templates/departments.json').success(function(data) {
      $scope.departments = data;
    });


    $scope.viewDeptBill = function(dept){
     //console.log(dept.id);
     $state.go('deptbill',{deptid:dept.id});
      
  }
    
    $scope.viewBill = function(){
      $state.go("bill");
      
  }
  
  // $scope.sort = function(keyname){
  //   $scope.sortKey = keyname;   //set the sortKey to the param passed
  //   $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  // }
  $scope.registerService = function(){
        $state.go("addservice");
    }
    

    
}]);