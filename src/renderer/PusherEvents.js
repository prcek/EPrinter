
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Pusher from 'pusher-js';

const styles = theme => ({
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
 
});
class PusherEvents extends React.Component {

    constructor(props) {
      super(props);
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
        this.channel = this.pusher.subscribe(channel);
        this.channel.bind("my-event",function(data){
          console.log("pusher data",data);
        });
        
      } else {
        this.pusher = null;
        this.channel = null;
      }
     
    }

    componentDidUpdate() {
      //check channel/apikey/cluster change
      console.log("PusherEvents.componentDidUpdate");
    }

    componentWillUnmount() {
      //unsubscribe channel
      console.log("PusherEvents.componentWillUnmount");
    }

 
    render() {
      const {channel} = this.props;
      return (
        <div>
          <h1>pusher events for channel: {channel}</h1>
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