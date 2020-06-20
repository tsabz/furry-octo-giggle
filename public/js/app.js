const app = angular.module("CommonplaceApp", []);

app.controller("CommonplaceController", ['$http', function($http) {
  this.loggedInUser = false
  this.createForm = {}
  this.loginForm = true;
  this.signupForm = false;
  this.name = null;
  this.body = null;
  this.author = null;
  this.image = null;
  this.tags = null;
  this.public = false;
 


  this.createBookmarkForm = () => {
    this.createBookmarkForm.postedBy = this.loggedInUser._id
    $http({
      method: 'POST',
      url: '/quotes',
      data: this.createBookmarkForm
    }).then(function(response){
        console.log(response);      
      }, function() {
        console.log('error');
      });
  }

  //toggle between signup and login forms
  this.toggleForm = () => {
    this.loginForm = !this.loginForm;
    this.signupForm = !this.signupForm;
  }

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

  //LOGOUT
  this.logout = () => {
    $http({
      url: '/session',
      method: 'DELETE'
    }).then((response) => {
      console.log(response.data)
      this.loggedInUser = false;
    })
  }

}]); //BEYOND THE WALL