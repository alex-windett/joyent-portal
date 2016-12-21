const constantCase = require('constant-case');
const ReduxActions = require('redux-actions');

const {
  createAction
} = ReduxActions;

const APP = constantCase(process.env['APP_NAME']);

module.exports = {
  ...require('@state/thunks'),
  updateRouter: createAction(`${APP}/APP/UPDATE_ROUTER`),
  handleToggleAction: createAction(`${APP}/APP/HANDLE_TOGGLE`, bool => bool)
};
