var React = require('react');
var bootstrap = require('react-bootstrap');
var ApplicationContainer = require('./layout/application_container');

var LandingPage = React.createClass({
  render: function() {
    return  <ApplicationContainer title="Flywheel-Mile">
              <div>Hello World</div>
            </ApplicationContainer>
    // return  <div>
    //           <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charSet="utf-8"></link>
    //           <div className="container">
    //             <div className="row">
    //               <div className="Absolute-Center is-Responsive vertical-center">
    //                 <div className="col-sm-12 col-md-10 col-md-offset-1">
    //                   <form action="" id="loginForm">
    //                     <div className="form-group input-group">
    //                       <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    //                       <input className="form-control" type="text" name='username' placeholder="username"/>
    //                     </div>
    //                     <div className="form-group input-group">
    //                       <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
    //                       <input className="form-control" type="password" name='password' placeholder="password"/>
    //                     </div>
    //                     <div className="form-group">
    //                       <button type="button" className="btn btn-def btn-block">Login</button>
    //                     </div>
    //                     <div className="form-group text-center">
    //                       <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
    //                     </div>
    //                   </form>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>;
  }
});

module.exports = LandingPage;
