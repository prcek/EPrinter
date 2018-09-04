
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

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
      console.log("PusherEvents.componentDidMount");
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