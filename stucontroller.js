"use strict";
var app = angular.module("stuApp", ["ngRoute"]);

app.config(function ($routeProvider) {
     $routeProvider
          .when("/", {
               templateUrl: "welcome.html"
          })
          .when("/form", {
               templateUrl: 'form.html'
          })
          .when("/table", {
               templateUrl: 'table.html'
          })
          .otherwise({
               templateUrl: 'welcome.html'
          });
});

app.controller("stuCtrl", function ($scope, $http) {
     $scope.contacts = [];
     //getting student details from database
     var getStuDtls = function () {
          $http.post('/sturecordview').then((res) => {
               $scope.contacts = res.data;
          }).catch((err) => {
               console.log("err.......")
          })
     }
     getStuDtls();
     //when the form load initially data will bind for example
     $scope.studefaultDetails = function () {
          $scope.stuDetails = {
               fName: "EX:DAVID",
               mName: "EX:J",
               lName: "EX:MILLER",
               mailId: "abc123@gmail.com",
               num: 1234567890,
               dob: undefined,
               gender: undefined,
               univ: undefined,
          }
     };
     //server side form data passing
     var serverData = function () {
          $http.post('/stuformrecord', $scope.stuDetails).then(function (res) {
               if (res.data.code === "DUPLICATE_EXISTS") {
                    alert("the mobile number already registered")
               } else {
                    alert("YOUR FORM SUCESSFULLY SUBMITTED");
                    getStuDtls();
               }
          }).catch(function (err) {
               console.log(err);
          })
     }
     var rowIndex = null; //to identify update or sumbit               
     studefaultDetails();
     //form validation
     $scope.studformValid = function () { //dob validation
          var inputDate = $scope.stuDetails.dob;
          var stuDate = new Date(inputDate);
          var todayDate = new Date();
          var year = todayDate.getFullYear() - stuDate.getFullYear();
          var month = todayDate.getMonth() - stuDate.getMonth();
          var date = todayDate.getDate() - stuDate.getDate();
          if (inputDate == undefined) {
               $scope.errordobMsg = "*please enter your dob";
               return false;
          } else if (month < 0 || (month == 0 && date < 0)) {
               year--;
          }
          if (year < 18) {
               $scope.errordobMsg = "*student age should be above 18";
               return false;
          }
          //gender validation
          if ($scope.stuDetails.gender == undefined) {
               $scope.errorgenderMsg = "*please select gender";
               return false;
          }
          //university validation
          if ($scope.stuDetails.univ == undefined) {
               $scope.erroruniMsg = "*please select your university";
               return false;
          } else {
               $scope.errordobMsg = "";
               $scope.errorgenderMsg = "";
               $scope.erroruniMsg = "";
               return true;
          }
     }
     //user click the submit button
     $scope.stuDatabase = function () {
          if ($scope.studformValid()) {
               // update database
               if (rowIndex == null) {
                    if (confirm("Are you sure to submit your information")) {
                         serverData();
                    }
                    $scope.studefaultDetails();
               }
               //update data
               else {
                    $http.post('/sturecordupdate', $scope.stuDetails).then(function (res) {
                         if (res.data.code === "DUPLICATE_EXISTS") {
                              alert("the mobile number registered")
                         } else {
                              alert("YOUR FORM SUCESSFULLY Updated");
                              getStuDtls();
                              $scope.studefaultDetails();
                              rowIndex = null;
                         }
                    }).catch(function (err) {
                         console.log(err)
                    })
               }
          }
     } //binding the data in UI side
     $scope.stuEdit = function (index) {
          rowIndex = index;
          $scope.stuDetails = angular.copy($scope.contacts[rowIndex]);
          $scope.stuDetails.dob = new Date($scope.stuDetails.dob);
          $scope.isupdateShow = true;
     }
     $scope.stuDelete = function (index) {
          if (confirm(" Are you sure to delete your information")) {
               console.log($scope.contacts[index])
               $http.post('/sturecorddelete', {
                    _id: $scope.contacts[index]._id
               }).then(function (data) {
                    console.log(data)
                    getStuDtls();
                    alert("your form sucessfully deleted")
               }).catch(function (err) {
                    console.log(err);
               })
          }
     }
});
