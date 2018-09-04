import React from 'react';
import { render } from 'react-dom';
import promiseIpc from 'electron-promise-ipc';
import App from './App';

import Pusher from 'pusher-js';


var pusher = new Pusher("579feb079d3f094d5ad1",{
  cluster: 'eu',
  forceTLS: true
});


var channel = pusher.subscribe("my-channel");

channel.bind("my-event",function(data){
  console.log("pusher data",data);
})


console.log("renderer.js","start");

promiseIpc.send('printers', '{ "name": "Jeff" }')
  .then((data) =>{
    console.log("renderer.js","printers");
    render( <App printers={data.printers}/>, document.getElementById('app') );
  }).catch(e => console.error(e));


