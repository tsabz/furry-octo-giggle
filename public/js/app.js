const app = angular.module("CommonplaceApp", []);

app.controller("CommonplaceController", ['$http', function($http) {
  this.loggedInUser = false
  this.loginForm = true;
  this.signupForm = false;
  this.createQuoteForm = {}
  this.createForm = {}
  this.allQuotes = []

  //VARS FOR ERROR HANDLING
  this.errorExists = false;
  this.errorMessage = "";

  //CLEAR ERROR 
  this.clearError = () => {
    this.errorExists = false;
    this.errorMessage = ""
  }

  //CHANGE PATH ON CLICK
  this.includePath = 'partials/card-section.html';
  this.changePath= (path) => {
    this.includePath = 'partials/' + path
    this.showDropdown = false;
    this.isSwitchedOn = true;
  }

  // MAKE NAV BAR RESPONSIVE
  this.showDropdown = false;
  this.toggleDropdown = () => {
    this.showDropdown = !this.showDropdown
  }

  // SHOW PAGE
  this.userQuotes = []
  this.updatedQuoteForm = {}
  this.updateForm = null;

  // Switch Behavior on form 
  this.isSwitchedOn = true;

  // OPEN AND CLOSE EDIT FORM ON SHOW-PAGE.HTML
  this.openUpdateForm = (quoteIndex) => {
    this.updateForm = quoteIndex;
    this.isSwitchedOn = true;
  }

  this.closeUpdateForm = () => {
    this.updateForm = null;
  }

  //GET ALL QUOTES IN COLLECTION
  this.getQuotes = () => {
    console.log('===================== Getting all quotes ===============');
    $http(
      {
        method: 'GET',
        url: '/quotes'
      }
    ).then (
      response => {        
        console.log(response);
        this.allQuotes = response.data
        console.log(`loading all quotes... ${JSON.stringify(this.allQuotes[0])}`);
      }
    )
  }

  // GET ALL QUOTES BY LOGGED IN USER
  this.getUserQuotes = () => {
    console.log('===================== Getting user quotes ===============');
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
    this.createQuoteForm.public = this.isSwitchedOn;
    $http({
      method: 'POST',
      url: '/quotes',
      data: this.createQuoteForm
    }).then( 
        response => {
        console.log(response); 
        this.allQuotes.unshift(response.data)
        this.userQuotes.unshift(response.data)
        this.createQuoteForm = {};
        this.changePath('show-page.html')
      }, error => 
      {
        console.log(error);
      });
  }

  // EDIT QUOTES
  this.editQuote = (quote) => {
    this.updatedQuoteForm.public = this.isSwitchedOn;
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
        this.closeUpdateForm();
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
      this.getQuotes()
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
        this.getQuotes()
        console.log(`quotes array ${this.allQuotes}`)
        console.log(`size of all quotes array ${this.userQuotes.length}`)

      } else {
        console.log(response.data.errorMessage)
        this.errorMessage = response.data.errorMessage;
        this.errorExists = true;
        this.createForm = {}
      }
    }, error => {
      console.log(error)
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