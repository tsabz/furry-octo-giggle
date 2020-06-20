const app = angular.module("CommonplaceApp", []);

app.controller("CommonplaceController", ['$http', function($http) {
  this.loggedInUser = false
  this.createForm = {}

  //SIGNUP
  this.signup = () => {
    $http({
      url: '/user',
      method: 'POST',
      data: this.createForm
    }).then((response) => {
      console.log(response.data)
      this.loggedInUser = response.data
      this.createForm = {}
    })
  }

  //LOGIN
  this.login = () => {
    $http({
      url: '/session',
      method: 'POST',
      data: this.createForm
    }).then((response) => {
      if (response.data.username){
        console.log(response.data)
        this.loggedInUser = response.data
        this.createForm = {}
      } else {
        this.createForm = {}
      }
    })
  }

}]); //BEYOND THE WALL