
import React from 'react';
import PropTypes from 'prop-types';
import promiseIpc from 'electron-promise-ipc';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { setPrinter, setPusherApiKey, setPusherCluster, setPusherChannel } from './actions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const styles = theme => ({
 
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

});


class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      printers:[]
    }
  }

  componentDidMount() {
    promiseIpc.send('printers','').then((data) =>{
      this.setState({printers:data.printers});
    }).catch(e => console.error(e));
  }

  componentWillUnmount() {

  }
  handleChangePrinter(event) {
    this.props.onChangePrinter(event.target.value);
    //this.setState({ value: event.target.value });
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Tiskárna</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.props.printer}
            onChange={(e)=>this.handleChangePrinter(e)}
          >
          {this.state.printers.map((p,idx)=>{
            return (
                <FormControlLabel key={idx} value={p.name} control={<Radio />} label={p.name} />
              )
          })}
          </RadioGroup>
        </FormControl>
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

          <Button variant="raised" onClick={()=>this.props.onClose()}>zavřít</Button>

      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  printer: PropTypes.string,
  onChangePrinter: PropTypes.func.isRequired,
  apikey: PropTypes.string,
  cluster: PropTypes.string,
  channel: PropTypes.string,
  onChangeApikey: PropTypes.func.isRequired,
  onChangeCluster: PropTypes.func.isRequired,
  onChangeChannel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return { 
      printer: state.printer.printer,
      apikey: state.pusher.apikey,
      cluster: state.pusher.cluster,
      channel: state.pusher.channel,
  }
}

  
const mapDispatchToProps = dispatch => {
  return {
    onChangePrinter: value => {
      dispatch(setPrinter(value))
    },
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
  
  
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Settings));