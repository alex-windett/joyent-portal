const Redux = require('redux');
const ReduxForm = require('redux-form');

const {
  combineReducers
} = Redux;

const {
  reducer: formReducer
} = ReduxForm;

module.exports = () => {
  return combineReducers({
    account: require('@state/reducers/account'),
    app: require('@state/reducers/app'),
    intl: require('@state/reducers/intl'),
    orgs: require('@state/reducers/orgs'),
    projects: require('@state/reducers/projects'),
    services: require('@state/reducers/services'),
    reduxForm: formReducer
  });
};
