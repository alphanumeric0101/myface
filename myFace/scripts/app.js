Parse.initialize("smv6lK9yWTaYyLWoONESdxxHU1hGTOGGc09TB9TG", "NIYUafzMVQYSSuyiFwRTxtdWQ3mQb4c8X59CNpf7");


const app = React.createClass({
  getInitialState: function() {
    return {
      currentUser: Parse.User.current()
    };
  },
  render: function() {

    return <div><h1>Welcome to PostBox!</h1> {this.props.children}</div>;
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
    Parse.User.logIn(this.state.email, this.state.password, {
      success: function(user) {
        // Do stuff after successful login. Redirect to Home page...
        console.log('you logged in from within');
        alert('good stuff!');
      },
      error: function(user, error) {
        alert('bad login, check your inputs');
      }
    });
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
      
        <a className="btn btn-success btn-md btn-block" id="signIn-btn" href="#account" type="submit">Sign In
          <span className="fa fa-sign-in"></span>
        </a>
        
        <a className="btn btn-info btn-md btn-block" id="register-btn" href="#signup">Create
          <span className="fa fa-user-plus"></span>
        </a>

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
  handleUserNameChange: function(e) {
    this.setState({
      username: e.target.value
    });
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
  handleConfPasswordChange: function(e) {
    this.setState({
      confPw: e.target.value
    });
  },
  signUp: function(e) {
    e.preventDefault();
    console.log('called signUp function');
    var user = new Parse.User();
    user.set("username", this.state.username);
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
      <span className="input-group-addon"><i className="fa fa-user"></i></span>
      <input type="text" className="form-control" placeholder=" User Name" id="formUserName" onChange={this.handleUserNameChange}></input>
    </div>    
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
        
        <a className="btn btn-info btn-md btn-block" id="register-btn" href="#account" type="submit" disabled={!(this.state.password === this.state.confPw && this.state.password.length > 6)}>Sign Up
          <span className="fa fa-user-plus"></span>
        </a>

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
      content: ''
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
    var Post = Parse.Object.extend("Post");
    var post = new Post();
    post.save({
      content: this.state.text
    }, {
      isPrivate: this.state.isPrivate
    }, {
      withFile: this.state.fileAdded
    });
  },
  render: function() {
    return (
      <div className="well clearfix">
      <aside>
      <a className="btn-danger" href="#login" onClick={this.logout}>Log Out</a>
      </aside>
      
        <div id="userPosts">
        
        </div>
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
      </div>
    );
  }
});

function checkLoggedin(nextState, replaceState) {
  if (Parse.User.current() === false) {
    replaceState(null, '/login');
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

ReactDOM.render((
  <Router>
    <Route path="/" component={app} >
      <IndexRoute component={Welcome} />
      
      <Route path="login" component={Welcome}/>
      
      <Route path="signup" component={Register} />
     
      <Route onEnter={checkLoggedin}>
        <Route path="account" component={Posts}/>
      </Route>
      
      <Route path="*" component={Welcome}/>
    </Route>
  </Router>
), document.getElementById("content"));
