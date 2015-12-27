Parse.initialize("smv6lK9yWTaYyLWoONESdxxHU1hGTOGGc09TB9TG", "NIYUafzMVQYSSuyiFwRTxtdWQ3mQb4c8X59CNpf7");

const app = React.createClass({
  getInitialState: function() {
    return {
      currentUser: Parse.User.current()
    };
  },
  render: function() {
    if (this.state.currentUser) {
      return <div><Posts userId="11"/></div>;
    }
    else {
    return <div><h1>Welcome to PostBox!</h1> {this.props.children}</div>;
    }
  }
});

const Welcome = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      confPw: ''
    };
  },

  handleEmailChange: function(e) {
    this.setState({
      email: e.target.value
    });
  },
  handlePasswordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },

  /*LOGIN FUNCTION*/

  logIn: function() {
    console.log('calling logIn');
    Parse.User.logIn(this.state.email, this.state.password, {
      success: function(user) {
        // Do stuff after successful login. Redirect to Home page...
        alert('welcome back!');
        window.location = "?#account";
      },
      error: function(user, error) {
        alert('bad login, check your inputs');
      }
    });
  },
  renderRegister: function() {
    window.location = "?#signup";
  },

  /*RENDERING THE PAGE*/

  render: function() {
    return (
      <div className="well clearfix">

      <h2>Your slice of the net to</h2>
      <ul>
      <li><h3>Write and share notes + images</h3></li>
      <li><h3>Keep in touch with your friends</h3></li>
      <li><h3>View and share your daily planner</h3></li>
      </ul>
        
            {/* This is the login area! */}
        
         <form className="form-horizontal" onSubmit={this.logIn}>
         
        {/*EMAIL AND PASSWORD FIELDS*/}
        
    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-at"></i></span>
      <input type="text" className="form-control" placeholder=" Email" id="formEmail" onChange={this.handleEmailChange}></input>
    </div>

    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Password" id="formPw" onChange={this.handlePasswordChange}></input>
    </div>
    
        <br/> {/*BUTTONS TO LOGIN OR GO TO REGISTRATION*/}
      
        <button className="btn btn-success btn-md btn-block" id="signIn-btn" type="submit">Sign In
          <span className="fa fa-sign-in"></span>
        </button>
        
        <button className="btn btn-info btn-md btn-block" id="register-btn" onClick={this.renderRegister}>Create
          <span className="fa fa-user-plus"></span>
        </button>

      </form>
      
      </div>)
  }
});

const Register = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      email: '',
      password: '',
      confPw: ''
    };
  },
  handleEmailChange: function(e) {
    this.setState({
      email: e.target.value,
      username: e.target.value
    });
  },
  handlePasswordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },
  handleConfPasswordChange: function(e) {
    this.setState({
      confPw: e.target.value
    });
  },
  
  signUp: function(e) {
    e.preventDefault();
    console.log('called signUp function');
    var user = new Parse.User();
    user.set("username", this.state.email);
    user.set("password", this.state.password);
    user.set("email", this.state.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert('you have signed up succesfully');
        window.location = "?#account";
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
  },
  /*RENDERING THE REGISTER PAGE*/

  render: function() {
    return (
      <div className="well clearfix">

      <h2>So glad you're joining us!</h2>
      <ul>
      <li><h3>Write and share notes + images</h3></li>
      <li><h3>Keep in touch with your friends</h3></li>
      <li><h3>View and share your daily planner</h3></li>
      </ul>
        
            {/* This is the login area! */}
        
      <form onSubmit={this.signUp} className="form-horizontal">
         
        {/*EMAIL AND PASSWORD FIELDS*/}
    
    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-at"></i></span>
      <input type="text" className="form-control" placeholder=" Email" id="formEmail" onChange={this.handleEmailChange}></input>
    </div>

    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Password" id="formPw" onChange={this.handlePasswordChange}></input>
    </div>
    
    <div className="input-group" id="pwConfirm">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Confirm Password" onChange={this.handleConfPasswordChange}></input>
    </div>
    
        <br/> {/*BUTTONS TO REGISTER*/}
        
        <button className="btn btn-info btn-md btn-block" id="register-btn" type="submit">Sign Up
          <span className="fa fa-user-plus"></span>
        </button>

      </form>
      
      </div>);
  }
});

const Posts = React.createClass({

  getInitialState: function() {
    return {
      text: "",
      fileAdded: false,
      isPrivate: false,
      content: '',
      userPosts: '',
      body: ''
    };
  },
  
  handleChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },
  toggleFile: function(event) {
    this.setState({
      fileAdded: !this.state.fileAdded
    }); // POSTS SECTION
  },
  togglePrivate: function(event) {
    this.setState({
      isPrivate: !this.state.isPrivate
    });
  },
  logout: function() {
    Parse.User.logOut();
  },
  createPost: function() {
    var allPosts
    var user = Parse.User.current();
    var Post = Parse.Object.extend("Post");
    var post = new Post();
    post.set("content", this.state.text);
    post.set("user", user);
    post.save(null, {
  success: function(post) {
    // Find all posts by the current user
    var query = new Parse.Query(Post);
    query.equalTo("user", user);
    query.find({
      success: function(usersPosts) {
        // userPosts contains all of the posts by the current user.
        console.log(usersPosts);
        allPosts = usersPosts
      }
    });
  }
});
this.setState({userPosts:allPosts});
  },
  
  render: function() {
    return (
      <div className="well clearfix">
      <h1>Your Posts</h1>
      
        <form onSubmit={this.createPost}>
            <textarea className="form-control"
                      onChange={this.handleChange}></textarea>
            <br/>
            
            <button id="pub" className="btn fa fa-users" disabled={!this.state.isPrivate} onClick={this.togglePrivate}></button>
            <button id="priv" className="btn fa fa-user-secret" disabled={this.state.isPrivate} onClick={this.togglePrivate}></button>
            
            <button className="btn btn-primary pull-right" type="input"
              disabled={this.state.text.length === 0 && !this.state.fileAdded}><span className="fa fa-comments-o"></span>
            </button>
            
            <button className="btn btn-default pull-right"
              onClick={this.toggleFile}>
              {this.state.fileAdded ? <span className="fa fa-plus-circle"></span> : <span className="fa fa-paperclip"></span> }
            </button>
       </form>
       <div><Content/></div>
      </div>
    );
  }
});

const Content = React.createClass({
  getInitialState: function() {
    return {
      usersPosts: ''
    };
  },
  retrievePosts: function() {
    console.log('calling getPosts');
    var Post = Parse.Object.extend("Post");
var query = new Parse.Query(Post);
var postObject = []
query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " Posts.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      postObject.push(results[i]);
      var object = results[i];
      console.log(object.id + ' - ' + object.get('content'));
    }
    
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
  this.setState({usersPosts: postObject});
  return this.usersPosts;
  },
  render: function() {
    console.log(this.props.usersPosts);
    return(
    // <button className="btn btn-priamry" onClick={this.retrievePosts}>getPostsyo</button>
    <div>{this.props.usersPosts}</div>
    
    );
  }
});

function checkLoggedIn(nextState, replaceState) {
  var user = Parse.User.Current();
  console.log(Parse.User.Current);
  if (user) {
    replaceState(null, '/account');
  }

}

/*var Login = React.createClass({
  render : function() {
    return (
    <div className="well clearfix">
    
    <form className="form-horizontal">
    
    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-at"></i></span>
      <input type="text" className="form-control" placeholder=" Email"></input>
    </div>

    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Password"></input>
    </div>
    
        <br/>
      
        <button className="btn btn-success btn-md btn-block" id="signIn-btn">Sign In
          <span className="fa fa-sign-in"></span>
        </button>
        
        <button className="btn btn-info btn-md btn-block" id="register-btn">Register
          <span className="fa fa-user-plus"></span>
        </button>
      </form>
      </div>
      );
  }
});*/

let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;
let Link = ReactRouter.Link;
let browserHistroy = ReactRouter.History;


ReactDOM.render((
  <Router>
    <Route path="/" component={app}>
      <IndexRoute component={Welcome} onEnter={checkLoggedIn}/>
      
      <Route path="signup" component={Register}/>
      <Route path="account" component={app}/>
      
      <Route path="*" component={app}/>
    </Route>
  </Router>
), document.getElementById("content"));
