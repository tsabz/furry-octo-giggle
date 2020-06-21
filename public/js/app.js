const app = angular.module("CommonplaceApp", []);

app.controller("CommonplaceController", ['$http', function($http) {
  this.loggedInUser = false
  this.loginForm = true;
  this.signupForm = false;
  this.updateForm = null;
  this.createQuoteForm = {}
  this.updatedQuoteForm = {}
  this.createForm = {}
  this.allQuotes = []
  this.userQuotes = []

  //CHANGE PATH ON CLICK
  this.includePath = 'partials/card-section.html';
  this.changePath= (path) => {
    this.includePath = 'partials/' + path
  }

  //GET ALL QUOTES IN COLLECTION
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

  // GET ALL QUOTES BY LOGGED IN USER
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

  // CREATE A QUOTE
  this.createQuote = () => {
    this.tagsArray = this.createQuoteForm.tags.split(',');
    this.createQuoteForm.tags = this.tagsArray;
    this.createQuoteForm.postedBy = this.loggedInUser._id;
    $http({
      method: 'POST',
      url: '/quotes',
      data: this.createQuoteForm
      //{
      //  name: this.name,
      //  body: this.body,
      //  author: this.author,
      //  image: this.image,
      //  tags: this.tagsArray,
      //  public: this.public,
      //  postedBy: this.loggedInUser._id,
    
      //}
    }).then( 
        response => {
        console.log(response); 
        this.allQuotes.unshift(response.data)
        this.userQuotes.unshift(response.data)
        this.createQuoteForm = {};
      }, error => 
      {
        console.log(error);
      });
  }

  // EDIT QUOTES
  this.editQuote = (quote) => {
    $http({
      method: 'PUT',
      url: '/quotes/' + quote._id,  
      data: this.updatedQuoteForm
    }).then(
      response => {
        console.log(response);
        this.getQuotes();
        this.getUserQuotes();
        this.updatedQuoteForm = {};
      }, error => {
          console.log(error);
      }
    )
  }

  // DELETE QUOTE
  this.deleteQuote = (quote) => {
    $http({
      method: 'DELETE',
      url: '/quotes/' + quote._id
    }).then(
        response => {
          console.log(response.data);
          this.getQuotes();
          this.getUserQuotes();
        }, error => { 
          console.log(error);
          
        }
    )
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