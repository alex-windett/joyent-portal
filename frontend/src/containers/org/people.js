const React = require('react');
// const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');

// const {
//   FormattedMessage
// } = ReactIntl;

const {
  connect
} = ReactRedux;

// const {
//   Link,
//   Match,
//   Miss,
//   Redirect
// } = ReactRouter;

const People = () => {
  return <p>people</p>;
};

People.propTypes = {};

const mapStateToProps = (state) => ({});

module.exports = connect(mapStateToProps)(People);
