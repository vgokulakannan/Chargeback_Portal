'use strict';

var app = angular.module('myApp',['ui.router','angularUtils.directives.dirPagination','chart.js']);

app.run(function ($state){

  $state.go("main");
});




app.config(function ($stateProvider, $urlRouterProvider) {

$stateProvider
      .state('dashboard', {
            url: "/dashboard",
            views : {
              'application':{
                  templateUrl: "./www/templates/admindashboard.html",
                  controller: 'adminCtrl'
                }
              }
            }
        )

      .state('deptbill', {
        url : "/getBill/:deptid",
        views : {
          'application':{
            templateUrl : "./www/templates/bill.html",
            controller : 'deptBillCtrl'
            // params:{
            //   deptid : null
            // }
          }
        }
      }
      )

      .state('bill', {
        url : "/usage_bill",
        views : {
          'application':{
            templateUrl : "./www/templates/bill.html",
            controller : 'billCtrl'
          }
        }
      }
      )

      .state('addservice', {
        url : "/add",
        views : {
          'application':{
            templateUrl : "./www/templates/form.html",
            controller : 'insertCtrl'
          }
        }
      }
      )

      .state('main',{
        url : "/menu",
        views : {
          'application':{
                    templateUrl : "./www/templates/main.html",
                    controller : 'loginCtrl'
                  }
                }
      })

     
});



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
angular.module('myApp').controller('billCtrl', ['$scope','$state','$http', function ($scope,$state,$http) {
 
 $scope.users = {};
    $http.get('/getBill').success(function(response){ 
    $scope.users = response;  //ajax request to fetch data into $scope.data
    });

    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

$scope.sort = function(keyname){
  $scope.sortKey = keyname;
  $scope.reverse = !$scope.reverse;
}

}]);
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