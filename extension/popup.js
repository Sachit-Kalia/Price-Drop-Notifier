let amazonextension = angular.module("amazonextension", ["ui.router"]);

amazonextension.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "./views/home.html",
    })
    .state("login", {
      url: "/login",
      templateUrl: "./views/login.html",
    })
    .state("signup", {
      url: "/signup",
      templateUrl: "./views/signup.html",
    });
});
amazonextension.controller("popup_controller", [
  "$scope",
  "$state",
  ($scope, $state) => {
    console.log("Controller initialised successfully");

    $scope.onPopupInit = () => {
      console.log("ran popup init function called");
    };
    $scope.onPopupInit();

    $scope.login = (formData) => {
      console.log("login credentials: ", formData);
      chrome.runtime.sendMessage({ type: "login", data: formData }, (res) => {
        console.log("Login response: ", res);
      });
    };
    $scope.signup = (formData) => {
      console.log("Signup credentials: ", formData);
      chrome.runtime.sendMessage({ type: "signup", data: formData }, (res) => {
        console.log(" response: ", res);
      });
    };
  },
]);
