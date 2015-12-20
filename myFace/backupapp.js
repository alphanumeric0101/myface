// import React from 'react';
// import { render } from 'react-dom';
// import { Router, Route, Link } from 'react-router';

var Posts = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      fileAdded: false,
      isPrivate: false
    };
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  toggleFile: function(event) {
    this.setState({ fileAdded: !this.state.fileAdded });
  },
  togglePrivate: function(event){
    this.setState({ isPrivate: !this.state.isPrivate});
  },
  render: function() {
    return (
      <div className="well clearfix">
        
        <textarea className="form-control"
                  onChange={this.handleChange}></textarea>
        <br/>
        
        <button id="pub" className="btn fa fa-users" disabled={!this.state.isPriv} onClick={this.togglePrivate}></button>
        <button id="priv" className="btn fa fa-user-secret" disabled={this.state.isPriv} onClick={this.togglePrivate}></button>
        
        <button className="btn btn-primary pull-right"
          disabled={this.state.text.length === 0 && !this.state.fileAdded}><span className="fa fa-comments-o"></span>
        </button>
        
        <button className="btn btn-default pull-right"
          onClick={this.toggleFile}>
          {this.state.fileAdded ? <span className="fa fa-plus-circle"></span> : <span className="fa fa-paperclip"></span> }
        </button>
      
      </div>
    );
  }
});

ReactDOM.render(
  <Posts />,
  document.getElementById("posts")
);