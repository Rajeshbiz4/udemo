import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'
import rootReducer from './common/container/reducers'
import rootEpic from './common/container/epics'
import './App.css';
import Summary from './Dashboard'

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

class App extends Component {
  render() {
    return (
      <Provider store={store} >
      <div className="App">
        <header className="App-header">
        </header>
        <Summary />
      </div>
      </Provider>
    );
  }
}

export default App;
