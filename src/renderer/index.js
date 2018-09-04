import React from 'react';
import { render } from 'react-dom';
//import promiseIpc from 'electron-promise-ipc';
import App from './App';



import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducers'

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

import Pusher from 'pusher-js';


var pusher = new Pusher("579feb079d3f094d5ad1",{
  cluster: 'eu',
  forceTLS: true
});


var channel = pusher.subscribe("my-channel-B");

channel.bind("my-event",function(data){
  console.log("pusher data",data);
})


console.log("renderer.js","start");



render( 
    <Provider store={store}>
      <App printers={[]} />
    </Provider>,
document.getElementById('app') );