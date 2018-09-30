const { createStore } = require("redux");
const reducer = require("./reducer");

const store = createStore(reducer);

store.subscribe(() => {
  console.log(JSON.stringify(store.getState()), 'state');
});

module.exports = store;
