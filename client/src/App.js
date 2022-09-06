import React, { Fragment } from "react";
import { init } from "./store";
import { Provider } from "react-redux";
import Task from "./Component/Task";
const App = () => {
  const store = init();
  return (
    <Fragment>
      <Provider store={store}>
        <Task/>
      </Provider>
    </Fragment>
  );
};

export default App;