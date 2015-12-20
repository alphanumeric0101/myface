var user = new Parse.User();

var getUserName = function() {
    
}

user.set("username", getUserName);
user.set("password", getPassword);
user.set("email", getEmail);

user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});

Parse.User.logIn("myname", "mypass", {
  success: function(user) {
    // Do stuff after successful login.
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});

var currentUser = Parse.User.current();

if (currentUser) {
    // do stuff with the user
} else {
    // show the signup or login page
}

Parse.User.logOut();

var currentUser = Parse.User.current();  // this will now be null

/////////////////////////////
// CREATING POSTS /////////// // note: for private posts, we should also allow the user who is receiving the note
///////////////////////////// // for example with: new Parse.ACL()


var Post = Parse.Object.extend("Posts");

var publicPost = new Post();
var postACL = new Parse.ACL(Parse.User.current());
postACL.setPublicReadAccess(true);
publicPost.setACL(postACL);
publicPost.save();

var privateNote = new Post();
privateNote.set("content", "This note is private!");
privateNote.setACL(new Parse.ACL(Parse.User.current()));
privateNote.setACL(new Parse.ACL("intended recipient"));
privateNote.save();
