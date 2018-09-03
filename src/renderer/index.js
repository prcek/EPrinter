import React from 'react';
import { render } from 'react-dom';
import promiseIpc from 'electron-promise-ipc';
import App from './App';


console.log("renderer.js","start");

promiseIpc.send('printers', '{ "name": "Jeff" }')
  .then((data) =>{
    console.log("renderer.js","printers");
    render( <App printers={data.printers}/>, document.getElementById('app') );
  }).catch(e => console.error(e));


