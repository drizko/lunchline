angular.module('lunchline.auth', [])


.controller('authController', function($scope, Auth, User, $firebaseObject, $firebaseAuth, $state, Geolocation) {
  var ref = new Firebase('https://instalunchline.firebaseio.com');
  var authRef = new Firebase("https://instalunchline.firebaseio.com/.info/authenticated");

  $scope.user = {};

  $scope.login = function(){
    ref.authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }, function(error, authData){
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            console.log("The specified user account email is invalid.");
            break;
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error logging user in:", error);
        }
      } else {
        User.getUser(authData)
        console.log("Authenticated successfully with payload:", authData);
        $state.go('menu.list');
      }
    })
  }

  $scope.signup = function(){
    ref.createUser({email: $scope.user.email, password: $scope.user.password}, function(error, user){
      if (error === null) {
        user.favorites = [];
        user.firstname = $scope.user.firstname;
        user.lastname = $scope.user.lastname;
        user.image_url = $scope.user.image_url;
        console.log($scope.user);
        User.sendUser(user);
        console.log(user);
        $state.go('menu.list');
      } else {
        console.log("Error creating user:", error);
      }
    })
  }

  $scope.auth = function(){
    Auth.checkAuth();
  }

  $scope.fbLogin = function(){
    Auth.fbLogin()
  }

  $scope.logout = function(){
    Auth.logout();
  }

  $scope.locationInfo = function() {
    Geolocation.locationInfo();
  };
  $scope.locationInfo();

})
