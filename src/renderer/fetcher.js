
import Pusher from 'pusher-js';

import { setPusherReady } from './actions';


const EVENT_NAME = "my-event";

function nes(s) {
    if (s  && s.length>0) {
      return true;
    }
    return false;
  }

  
class Fetcher {
    constructor(store){
        this.store = store;
        this.cb = null;
        const state = store.getState();
        this.apikey = null;
        this.cluster = null;
        this.channel = null;

        this.setNewCfg(state.pusher.apikey,state.pusher.cluster,state.pusher.channel)

        store.subscribe(()=>this.onStoreChange())
    } 
   
    setNewCfg(apikey,cluster,channel_name) {
        console.log("Pusher cfg:",apikey,cluster,channel_name);

        if (nes(apikey) && nes(cluster) && nes(channel_name)) {
            if (this.pusher == null)  {
                console.log("creating new Pusher")
                this.apikey = apikey;
                this.cluster = cluster;
                this.channel_name = channel_name;
                this.pusher = new Pusher(apikey,{
                    cluster: this.cluster,
                    forceTLS: true
                  });
                console.log("new Pusher created")  
                const me = this;
                this.pusher.connection.bind('state_change', function(states) { 
                    console.log("Channels current state is " ,states);
                    if (states.current == "connected") {
                        me.dispatchPusherState(true);
                    } else {
                        me.dispatchPusherState(false);
                    }
                }); 
                this.subscribe(this.channel_name); 
            } else {
                if ((this.apikey == apikey) && (this.cluster == cluster))  {
                    console.log("Fetcher, switching from channel",this.channel_name, "to",channel_name);
                    this.unsubscribe(this.channel_name);
                    this.channel_name = channel_name;
                    this.subscribe(channel_name);
                } else {
                    console.log("Recreate Pusher")
                    this.unsubscribe(this.channel_name); 
                    if (this.pusher) {
                        this.pusher.disconnect();
                        this.pusher = null
                    }
                    this.apikey = apikey;
                    this.cluster = cluster;
                    this.channel_name = channel_name;
                    this.pusher = new Pusher(apikey,{
                        cluster: this.cluster,
                        forceTLS: true
                      });
                    console.log("new Pusher created")  
                    const me = this;
                    this.pusher.connection.bind('state_change', function(states) { 
                        console.log("Channels current state is " ,states);
                        if (states.current == "connected") {
                            me.dispatchPusherState(true);
                        } else {
                            me.dispatchPusherState(false);
                        }
                    }); 


                    this.subscribe(this.channel_name); 
    

                }
            }


        } else {
            console.log("Delete old Pusher")
            this.unsubscribe(this.channel_name); 
            if (this.pusher) {
                this.pusher.disconnect();
                this.pusher = null
            }
            this.channel_name = channel_name;
            this.apikey = apikey;
            this.cluster = cluster;
        }
        

    }

    subscribe(channel) {
        if (this.pusher) {
            this.channel = this.pusher.subscribe(channel);
            this.channel.bind(EVENT_NAME,(data)=>this.onPusher(data));
        } 
    }
    
    unsubscribe(channel) {
        if (this.pusher && this.channel) {
          this.channel.unbind(EVENT_NAME);
          this.pusher.unsubscribe(channel);
          this.channel = null;
        }
    }
  
    dispatchPusherState(ready) {
        console.log("dispatchPusherState",ready)
        this.store.dispatch(setPusherReady(ready));
    }


    setCB(cb) {
        this.cb=cb;
    }
    clearCB() {
        this.cb = null;
    }

    onPusher(data) {
        console.log("PUSHER ON DATA",data)
        if (this.cb) {
            this.cb(data.zpl);
        }
    }

    onStoreChange() {
        const state = this.store.getState();
        if ((this.apikey!=state.pusher.apikey) || (this.cluster != state.pusher.cluster ) || (this.channel_name!=state.pusher.channel)) {
            console.log("Fetcher.onStoreUpdate");
            this.setNewCfg(state.pusher.apikey,state.pusher.cluster,state.pusher.channel);
        }
      
    }
};


export default Fetcher;