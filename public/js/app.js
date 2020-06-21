const app = angular.module("CommonplaceApp", []);

app.controller("CommonplaceController", ['$http', function($http) {
  this.loggedInUser = false
  this.loginForm = true;
  this.signupForm = false;

  this.createForm = {}
  this.createBookmarkForm = {}
  this.allQuotes = []
  this.userQuotes = []

  this.includePath = 'partials/card-section.html';
  this.changePath= (path) => {
    this.includePath = 'partials/' + path
  }


  this.getQuotes = () => {
    $http(
      {
        method: 'GET',
        url: '/quotes'
      }
    ).then (
      function(response){        
        console.log(response);
        this.allQuotes = response.data
        console.log(this.allQuotes);
      }
    )
  }

  this.getUserQuotes = () => {
    $http(
      {
        method: 'GET',
        url: '/session/quotes'
      }
    ).then(
      response => {
        this.userQuotes = response.data
        console.log(this.userQuotes);       
      },
      error => {
        console.log(error.message);
        
      }
    )
  }

  this.createBookmark = () => {
    this.createBookmarkForm.postedBy = this.loggedInUser._id
    console.log(this.createBookmarkForm);
    $http({
      method: 'POST',
      url: '/quotes',
      data: this.createBookmarkForm
    }).then(function(response){
        console.log(response); 
        this.allQuotes.unshift(response.data)
        this.createBookmarkForm = {}     
      }, function() {
        console.log('error');
      });
  }

  //toggle between signup and login forms
  this.toggleForm = () => {
    this.loginForm = !this.loginForm;
    this.signupForm = !this.signupForm;
  }

  //sets login or signup active via buttons on nav
  this.setLogin = () => {
    this.loginForm = true;
    this.signupForm = false;
  }

  this.setSignup = () => {
    this.signupForm = true;
    this.loginForm = false;
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
      this.getUserQuotes()
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
        this.getUserQuotes()
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

  this.getQuotes()


}]); //BEYOND THE WALL