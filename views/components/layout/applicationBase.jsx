const React = require('react');
const NavigationBar = require('./navigationBar');

const ApplicationBase = function applicationBase(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charSet="utf-8" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/css/application.css" />
      </head>
      <body>
        {/* provider*/}
        <NavigationBar />
        {props.children}
      </body>
    </html>
  );
};

ApplicationBase.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};

module.exports = ApplicationBase;
