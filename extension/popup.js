let amazonextension = angular.module("amazonextension", ["ui.router"]);

amazonextension.config(function ($stateProvider, $urlRouterProvider) {

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

      $urlRouterProvider.otherwise("/login");

});

amazonextension.controller("popup_controller", ['$scope', '$state', ($scope, $state)=>{

     console.log("Controller is inititalized successfully!");

     $scope.onPopupInit = ()=>{
         console.log('ran $scope.onPopupInit function'); 
         chrome.runtime.sendMessage({type: "popupInit"},
          (res)=>{
              if(res!=null && res.user != null){
                $scope.name = res.user.username;
                $state.go("home");
              }
          });  
     };

     $scope.onPopupInit();

     $scope.login = (formData)=>{
       console.log("Login credentials: ", formData);

       chrome.runtime.sendMessage({type: "login", data: formData},
            (res)=>{
                  console.log('Login response: ', res);
                  if(res.user){
                    $scope.name = res.user.username;
                    $state.go("home");
                  }
            });
     }

     $scope.signup = (formData)=>{
      console.log("Signup credentials: ", formData);
      chrome.runtime.sendMessage({type: "signup", data: formData},
      (res)=>{
            console.log('Signup response: ', res);
            if(res.token){
              $state.go('login');
            }
      });
    }

}]);
