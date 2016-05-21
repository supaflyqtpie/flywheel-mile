var React = require('react');

var ApplicationContainer = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charSet="utf-8" />
          <link rel="stylesheet" href="/css/font-awesome.min.css" />
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = ApplicationContainer;
