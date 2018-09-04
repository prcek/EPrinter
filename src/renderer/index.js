import React from 'react';
import { render } from 'react-dom';
//import promiseIpc from 'electron-promise-ipc';
import App from './App';


import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'

import createElectronStorage from "redux-persist-electron-storage";
const persistConfig = {
  key: 'root',
  storage: createElectronStorage()
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let persistor = persistStore(store)



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
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
document.getElementById('app') );