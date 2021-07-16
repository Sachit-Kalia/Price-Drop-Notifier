let amazonextension = angular.module("amazonextension", ["ui.router"]);

amazonextension.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider.state("home", {
    url: "/home",
    templateUrl: "home.html",
  });
});
