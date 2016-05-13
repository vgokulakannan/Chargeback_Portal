
angular.module('myApp').controller('loginCtrl', ['$scope','$state', function ($scope,$state) {

  $scope.user = {};

  $scope.loginUser = function(user){
    $http.post('api/login',$scope.user)
        .success(function(data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    console.log("Username:"+user.username);
    console.log("Password:"+user.password);
    $state.go("dashboard");
  }
}]);