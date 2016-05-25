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

