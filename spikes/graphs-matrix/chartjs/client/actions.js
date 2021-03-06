const take = require('lodash.take');

const actions =  {
  'UPDATE_STATS': (state, action) => {
    const data = (state[action.subscription] || {
      cpu: [],
      mem: [],
      disk: []
    });

    const newData = ['cpu', 'mem', 'disk'].reduce((sum, key) => {
      const item = {
        ...action.payload.stats[key],
        when: action.payload.when
      };

      const prepended = [item].concat(data[key]);

      return {
        ...sum,
        [key]: take(prepended, state.windowSize)
      };
    }, {});

    return {
      ...state,
      [action.subscription]: newData
    };
  }
};

module.exports = (state, action) => {
  return !actions[action.type] ? state : actions[action.type](state, action);
};

module.exports.subscribe = (id) => (dispatch, getState) => {
  const {
    ws
  } = getState();

  const p = new Promise((resolve, reject) => {
    ws.subscribe(`/stats/${id}`, (update, flag) => {
      dispatch({
        type: 'UPDATE_STATS',
        payload: update,
        subscription: id
      });
    }, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  return dispatch({
    type: 'SUBSCRIBE',
    payload: p
  });
};

module.exports.unsubscribe = (id) => (dispatch, getState) => {
  const {
    ws
  } = getState();

  const p = new Promise((resolve, reject) => {
    ws.unsubscribe(`/stats/${id}`, null, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  return dispatch({
    type: 'UNSUBSCRIBE',
    payload: p
  });
};