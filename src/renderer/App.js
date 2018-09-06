
import React from 'react';
import Button from '@material-ui/core/Button';
import SetupIcon from '@material-ui/icons/Settings';
import PrinterIcon from '@material-ui/icons/Print';
import Printers from './Printers';
import Pusher from './Pusher';
import PusherEvents from './PusherEvents';
import { connect } from 'react-redux'
import promiseIpc from 'electron-promise-ipc';
import PropTypes from 'prop-types';
import DebugObjectView from './DebugObjectView';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StatusCard from './StatusCard';
import { withStyles } from '@material-ui/core/styles';
import ZPLView from './ZPLView';
import ZPLEdit from './ZPLEdit';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
 
  paper: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  },

  graypaper: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    backgroundColor:"gray"
  },
  switch: {
   
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


function nes(s) {
  if (s  && s.length>0) {
    return true;
  }
  return false;
}


const ZPL_TEST_PAGE = "^XA^AD^FDWikipedia^FS^XZ";

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        show_debug:false,
        show_settings:false,
        print_on:false,
        printer_info:null,
        zpl_preview:null,
      }
      this.printLed = React.createRef();
    }
    isCfgOk() {
      const { printer, pusher} = this.props;
      if (nes(printer) && nes(pusher.apikey) && nes(pusher.cluster)  && nes(pusher.channel)) {
        return true;
      }
      return false;
    }
    componentDidMount() {
      if (this.isCfgOk()) {
        promiseIpc.send("checkprinter",{printer:this.props.printer}).then(res=>{
          this.setState({printer_info:res});
        })
      }

    }


    openDevTool() {
      promiseIpc.send('devtool').then(r=>{
        console.log(r);
      });
    }

    doPrint(zpl) {
      this.setState({zpl_preview:zpl});
      if (this.printLed.current) {
        this.printLed.current.blink();
      }
      if (this.state.print_on) {
        promiseIpc.send('printzpl',{zpl:zpl,printer:this.props.printer}).then((data) =>{
          console.log("printzpl res",data)
        }).catch(e => console.error(e));
      }
    }


    printTestPage() {
      this.setState({zpl_preview:ZPL_TEST_PAGE});
      if (this.state.print_on) {
        promiseIpc.send('printzpl',{zpl:ZPL_TEST_PAGE,printer:this.props.printer}).then((data) =>{
          console.log("printzpl res",data)
        }).catch(e => console.error(e));
      }
    }

    render() {
      const {classes,online,pusher_ready} = this.props;
      const cfgOk = this.isCfgOk();
      return (
        <Grid container spacing={24}>

          {this.state.show_debug && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DebugObjectView name="redux_state" object={this.props.redux_state} />
                {this.state.printer_info &&(<DebugObjectView name="current printer info" object={this.state.printer_info}/>)}
              </Paper>
            </Grid>
          )}
   

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <StatusCard label="konfigurace" ok={cfgOk} />
              <StatusCard label="online" ok={online} />
              <StatusCard label="server" ok={pusher_ready} />
              <StatusCard label="tisk" ok={this.state.print_on} ledRef={this.printLed} />
            </Paper>
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary" className={classes.button}
                onClick={()=>{this.setState({show_settings:!this.state.show_settings})}}
              >
                <SetupIcon className={classes.leftIcon} />
                Nastavení
              </Button>
              <Button onClick={()=>{this.printTestPage()}} variant="contained" color="secondary" className={classes.button}>
                <PrinterIcon className={classes.leftIcon} />
                Test tisku
              </Button>
              <Typography variant="title">
                <Switch
                  className={classes.switch}
                  checked={this.state.print_on}
                  onChange={(e,checked)=>this.setState({print_on:checked})}
                  value="checkedB"
                  color="primary"
                />
                Tisk on/off
              </Typography>
              <Typography variant="title">
                <Switch
                  className={classes.switch}
                  checked={this.state.show_debug}
                  onChange={(e,checked)=>{ this.setState({show_debug:checked}); if (checked) {this.openDevTool()}} }
                  value="checkedB"
                  color="primary"
                />
                Debug on/off
              </Typography>
            </Paper>

            <Paper className={classes.paper}>
              <ZPLEdit onSubmit = {(zpl)=>this.doPrint(zpl)} />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            {this.state.show_settings && (
              <React.Fragment>
                <Printers />
                <Pusher />
              </React.Fragment>
            )}

            <Paper className={classes.graypaper}>
              <ZPLView data={this.state.zpl_preview} />
            </Paper>
          </Grid>
  

          


 
        </Grid>
      );
    }
  }

  App.propTypes = {
    classes: PropTypes.object.isRequired,
    redux_state: PropTypes.object,
    online: PropTypes.bool,
    pusher_ready: PropTypes.bool,
    printer: PropTypes.string,
    pusher: PropTypes.shape({apikey:PropTypes.string,cluster:PropTypes.string,channel:PropTypes.string}).isRequired,
  };

  function mapStateToProps(state) {
    return { 
        printer: state.printer.printer,
        pusher: state.pusher,
        online: state.status.online,
        pusher_ready: state.status.pusher_ready,
        redux_state: state
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps, {})(App));