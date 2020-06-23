# CommonPlace


## Commonplace book
### (noun) 1. a book in which noteworthy quotations, comments, etc., are written.

---
### Preview

![](./public/assets/commonplace-signin-signup.gif)


### Purpose

This project replicates the the function of a commonplace book, allowing users to log in, put together a collection of quotes,  view the commonplace books of others as well as their own. 

### View Live App 
https://commonplace333.herokuapp.com/

### Approach Taken
We worked in a group of three developers to tackle this project. To stay in sync on a tight deadline, we had a morning stand and afternoon debrief every day where we looked over our todo tasks on the trello board and assigned them to team members. This helped us stay organized and make steady progress. 

For the heavy lifting at the beginning of the project, we took a hybrid approach of splitting the work and co-coding. Tonia set up the server.js and part of the controller files, Hannah set up the models directory and MongoDB Atlas, and Madeline set up the app.js and the user controller files for auth. We then co-coded to deploy the app to Heroku and finalize the auth set up for our login and sign up page. As this set up was occuring, we were able to take a flexible approach of holding one-on-one or group zoom meetings as needed to debug any problems and quickly get our app deployed with basic functionality by the end of the weekend. 

After deploy, we began working within the public directory to connect our routes to functionality on the user interface. Madeline took over perfecting authentication - from fixing any bugs in user validation to inserting custom error messages onto the page - while Hannah worked on deveoping a show page of quotes specific to the logged in user and Tonia set up the home page of all quotes held in the database. We ran into several issues along the way that furthered our understanding of git and the MEAN stack - from merge conflicts and reverting pull requests to understanding how Angularjs scope can interfere with successful routing. Design and Front-end development with Sass was split between Tonia (horizontal banner, index page) and Hannah (login/signup page, show page) while Madeline went through functionality testing and setting up search filtering by tag. 

### Installation Instructions
After visiting the deployed app on Heroku, you'll need to register for an account in order to view the rest of the application pages. 

### Features and Technology Used

JavaScript, Sass / SCSS, Materialize CSS, Node.js, Expressjs, bcrypt, express-session, Angularjs, MongoDB, MongoDB Atlas, Mongoose

Features of this app include: 
* User authentication with password encryption using bcrypt
* Full CRUD for quotes model and partial CRUD for user model
* Express-session is used to store the logged-in user, allowing for the current user's id to be attached to the quotes they create. Upon login, the user's quotes are pulled into an array and displayed in the "My CommonPlace Book" tab. 
* Users are able to mark quotes as public or private. private quotes will appear on their show page with a padlock icon. Private quotes will not appear on the quote feed. 
* partials used for the html and scss files - Angularjs includes 
* responsive pages

### Unsolved Problems 
* User is not able to change their information or delete their account, this could be added with further routes in the future
* Expand features to include -- being able to see other users pages (similar to pinterest), have a "copy to my commonplace book feature" that adds another users quote to your commonplace book, add like buttons and track likes in the quotes model. 
