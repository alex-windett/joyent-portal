const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  updateRouter
} = actions;

module.exports = handleActions({
  [updateRouter.toString()]: (state, action) => {
    return {
      ...state,
      router: action.payload
    };
  }
}, {});
