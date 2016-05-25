
angular.module('myApp').controller('insertCtrl', ['$scope','$state','$http', function ($scope,$state,$http) {
  
  $scope.servicedata = {};

  $scope.serviceregister = function(){
      $http.post('/registerservice',$scope.servicedata)
        .success(function(data) {
               // $scope.user = {}; // clear the form so our user is ready to enter another
               console.log("Inserted"+data);
                $state.go("dashboard");
                //alert("Data Inserted Sucessfully");
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


  }



    }]);