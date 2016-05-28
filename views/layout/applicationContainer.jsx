const React = require('react');

const ApplicationContainer = function applicationContainer(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charSet="utf-8" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/css/application.css" />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
};

ApplicationContainer.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.element,
};

module.exports = ApplicationContainer;
