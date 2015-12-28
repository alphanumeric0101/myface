Parse.initialize("smv6lK9yWTaYyLWoONESdxxHU1hGTOGGc09TB9TG", "NIYUafzMVQYSSuyiFwRTxtdWQ3mQb4c8X59CNpf7");
var History = ReactRouter.History;

const app = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function() {
    return {
      error: null,
      signup: false
    };
  },
  observe: function() {
    return {
      user: ParseReact.currentUser
      //posts: ParseReact.currentUser.posts
    };
  },
  // getUserContent: function(user) {
  //   // get all the user data we need and save it as a prop we can pass on to Posts
  //   return "content";
  // },

  render: function() {
    if (this.data.user) {
      return <div><Posts userData={'somedata'} user={this.data.user}/></div>;
    }
    else {
      return <div><h1>Welcome to PostBox!</h1><Login/></div>;
    }
  }
});

const Login = React.createClass({
  mixins: [History],
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
    Parse.User.logIn(this.state.email, this.state.password).then(function(user) {
      alert('welcome back!');
    }, function(user, error) {
        alert('bad login, check your inputs');
      });
  },
  /*RENDERING THE LOGIN PAGE*/

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
  mixins: [History],
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
    console.log('called signUp function' + this.refs);
    var user = new Parse.User();
    user.set("username", this.state.email);
    user.set("password", this.state.password);
    user.set("email", this.state.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert('you have signed up succesfully');
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });

    //this.history.pushState(null, '/account');
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
    });
  },
  togglePrivate: function(event) {
    console.log(this.props);
    this.setState({
      isPrivate: !this.state.isPrivate
    });
  },
  logout: function() {
    Parse.User.logOut();
  },                        // POSTS SECTION ///////////////////
  createPost: function(e) {
    e.preventDefault();
    var allPosts
    var user = Parse.User.current();
    var Post = Parse.Object.extend("Post");
    var post = new Post();
    post.set("body", this.state.text);
    post.set("user", user);
    post.set("private", this.state.isPrivate);
    post.save(null, {
      success: function(post) {
        alert(post + "was saved");
      }
    });
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
       <div><Content userId={this.props.userId} data={this.props.userData}/></div>
      </div>
    );
  }
});

const Content = React.createClass({
  getInitialState: function() {
    return {
      usersPosts: {},
    };
  },
  render: function() {
    return (
      <div>
      <p>These are your posts...</p>
      <p>{this.props.userData}</p>
      </div>
    );
  }
});

function checkLoggedIn(nextState, replaceState) {
  var user = Parse.User.current();
  console.log(user);
  if (!user) {
    replaceState(null, '/signup');
  }
}

let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;
let Link = ReactRouter.Link;

ReactDOM.render((
  <Router>
    <Route path="/" component={app}/>
      <Route path="account" component={Posts}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Register}/>
      <Route path="*" component={app}/>
  </Router>
), document.getElementById("content"));
