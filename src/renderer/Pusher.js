
import React from 'react';
import PropTypes from 'prop-types';
import { setPusherApiKey, setPusherCluster, setPusherChannel } from './actions';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
 
});
class Pusher extends React.Component {

 
 
    render() {
      const {classes} = this.props;
      return (
        <div>
          <h1>pusher options:</h1>
          <TextField
            id="apikey"
            label="ApiKey"
            className={classes.textField}
            value={this.props.apikey}
            onChange={(e)=>this.props.onChangeApikey(e.target.value)}
            margin="normal"
          />

          <TextField
            id="cluster"
            label="Cluster"
            className={classes.textField}
            value={this.props.cluster}
            onChange={(e)=>this.props.onChangeCluster(e.target.value)}
            margin="normal"
          />

          <TextField
            id="channel"
            label="Channel"
            className={classes.textField}
            value={this.props.channel}
            onChange={(e)=>this.props.onChangeChannel(e.target.value)}
            margin="normal"
          />

        </div>
      );
    }
  }

  Pusher.propTypes = {
    classes: PropTypes.object.isRequired,
    apikey: PropTypes.string,
    cluster: PropTypes.string,
    channel: PropTypes.string,
    onChangeApikey: PropTypes.func.isRequired,
    onChangeCluster: PropTypes.func.isRequired,
    onChangeChannel: PropTypes.func.isRequired
  };


  function mapStateToProps(state) {
    return { 
        apikey: state.pusher.apikey,
        cluster: state.pusher.cluster,
        channel: state.pusher.channel,
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      onChangeApikey: value => {
        dispatch(setPusherApiKey(value))
      },

      onChangeCluster: value => {
        dispatch(setPusherCluster(value))
      },

      onChangeChannel: value => {
        dispatch(setPusherChannel(value))
      },

    }
  }
  
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Pusher));