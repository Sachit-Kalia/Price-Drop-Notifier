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
