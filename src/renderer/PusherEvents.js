
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Pusher from 'pusher-js';
import Button from '@material-ui/core/Button';
import ZPLView from './ZPLView';
const styles = theme => ({
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
 
});

const EVENT_NAME = "my-event";

class PusherEvents extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        last_event:null,
        last_event_date:null,
      }
    }

    unsubscribe(channel) {
      if (this.pusher && this.channel) {
        this.channel.unbind(EVENT_NAME);
        this.pusher.unsubscribe(channel);
        this.channel = null;
      }
    }
    onPusher(data) {
      this.setState({last_event:data,last_event_date:new Date()})
    }
  
    subscribe(channel) {
      if (this.pusher) {
        this.channel = this.pusher.subscribe(channel);
        this.channel.bind(EVENT_NAME,(data)=>this.onPusher(data));
      } 
    }

    componentDidMount() {
      //subscribe channel
      const {apikey,cluster,channel} = this.props;
      console.log("PusherEvents.componentDidMount");
      if (apikey && cluster && channel) {
        this.pusher = new Pusher(apikey,{
          cluster: cluster,
          forceTLS: true
        });
        this.subscribe(channel);
      } else {
        this.pusher = null;
        this.channel = null;
      }
     
    }

    componentDidUpdate(prevProps) {
      //check channel/apikey/cluster change
      console.log("PusherEvents.componentDidUpdate");
      const {apikey,cluster,channel} = this.props; 
      if (prevProps.apikey == apikey && prevProps.cluster == cluster) {
        if (prevProps.channel != channel) {
          console.log("channel update")
          this.unsubscribe(prevProps.channel);
          this.subscribe(channel);
        }
      } else {
        console.log("pusher update")
        this.unsubscribe(prevProps.channel);
        this.pusher = null;
        if (apikey && cluster && channel) {
          this.pusher = new Pusher(apikey,{
            cluster: cluster,
            forceTLS: true
          });
          this.subscribe(channel);
        }
      }
      
    }

    componentWillUnmount() {
      //unsubscribe channel
      const {channel} = this.props;
      console.log("PusherEvents.componentWillUnmount");
      this.unsubscribe(channel);
      this.pusher = null;
    }

 
    render() {
      const {channel} = this.props;
      return (
        <div>
          <h1>pusher events for channel: {channel}</h1>
          <div>
            {this.state.last_event && (
              <React.Fragment>
              <p> {JSON.stringify(this.state.last_event)}</p>
              <p> {JSON.stringify(this.state.last_event_date)}</p>
              {this.state.last_event.zpl && (
                <ZPLView data={this.state.last_event.zpl} />
              )}
              <Button onClick={()=>this.setState({last_event:null})}> clear </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      );
    }
  }

  PusherEvents.propTypes = {
    classes: PropTypes.object.isRequired,
    apikey: PropTypes.string,
    cluster: PropTypes.string,
    channel: PropTypes.string,
  };


  function mapStateToProps(state) {
    return { 
        apikey: state.pusher.apikey,
        cluster: state.pusher.cluster,
        channel: state.pusher.channel,
    }
  }
  
  
  
  
  export default withStyles(styles)(connect(mapStateToProps, {})(PusherEvents));