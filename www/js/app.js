'use strict';

var app = angular.module('myApp',['ui.router']);

app.run(function ($state){

  $state.go("main");
});




app.config(function ($stateProvider, $urlRouterProvider) {

$stateProvider
      .state('dashboard', {
            url: "/dashboard",
                  templateUrl: "./www/templates/admindashboard.html"
                  //controller: 'dashCtrl'
                }
        )

      .state('main',{
        url : "/menu",
        // views : {
        //   'login':{
                    templateUrl : "./www/templates/main.html",
                    controller : 'loginCtrl'
                //   }
                // }
      })

     // $urlRouterProvider.otherwise('main')

      // .state('main',{

      //     url:"/",
      //     templateUrl : "templates/main.html"
      //   }
      // )
});



angular.module('myApp').controller('loginCtrl', ['$scope','$state', function ($scope,$state) {

  $scope.user = {};

  $scope.loginUser = function(user){
    console.log("Username:"+user.username);
    console.log("Password:"+user.password);
    $state.go("dashboard");
  }
}]);