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
      })
      .state("show", {
        url: "/show",
        templateUrl: "./views/show.html",
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


amazonextension.controller("Scraper", ['$scope', '$state', ($scope, $state)=>{

       $scope.checkPriceDrop = (user)=>{
            chrome.runtime.sendMessage({type: "checkPriceDrop", user: user},
            (res)=>{
              console.log("Checking price drop response: ", res);
              if(res.error){
                let em = response.data.responseJSON.error;
                console.log('Error is :',em);
                $scope.errorMessage = em;
                $scope.error = true; 
              }
            });
       }

      //  $scope.showProductsDrop = ()=>{
      //       chrome.runtime.sendMessage({type: "showProductsDrop"},
      //       (res)=>{
      //            console.log("Showing responses: ", res);
      //            $scope.type = "show";
      //       })
      //  }
   
}]);