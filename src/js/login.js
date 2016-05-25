
angular.module('myApp').controller('loginCtrl', ['$scope','$state','$http', function ($scope,$state,$http) {

  $scope.user = {};

  $scope.loginUser = function(){
    $http.post('/login',$scope.user)
        .success(function(data) {
               // $scope.user = {}; // clear the form so our user is ready to enter another

               if(data == "Invalid username or password"){
                    $state.go("main");
                    alert("Invalid username or password");
                }
                else{
                       var deptid = data.split(" ");
                       console.log(typeof(deptid[1]));
                    if(deptid[1]=="0")
                        $state.go("dashboard");
                    else{
                        //alert("other user");
                        $state.go("deptbill",{deptid:deptid[1]});
                    }
                } 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    // console.log("Username:"+user.username);
    // console.log("Password:"+user.password);
    // $state.go("dashboard");
  }
}]);