var React = require('react');
var bootstrap = require('react-bootstrap');

var navBar = React.createClass({
  render: function() {
    // return <div>Hello {this.props.name}</div>;
    return  <div>
              <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charset="utf-8"></link>
              <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                      <img src="/resources/cybs_logo.png" alt="Dispute Bills" height="30" width="200"/>
                    </a>
                  </div>
                  <div id="navbar3" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li className="active"><a href="#">Home</a></li>
                      <li><a href="#">About</a></li>
                      <li><a href="#">Contact</a></li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                          <li><a href="#">Action</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something else here</a></li>
                          <li className="divider"></li>
                          <li className="dropdown-header">Nav header</li>
                          <li><a href="#">Separated link</a></li>
                          <li><a href="#">One more separated link</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>;
  }
});

module.exports = Index;
