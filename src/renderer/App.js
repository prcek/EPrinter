
import React from 'react';
import Button from '@material-ui/core/Button';
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

const styles = theme => ({
 
  paper: {
    padding: theme.spacing.unit,
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
        show_printers:false,
        show_pusher:false,
        grab_events:false,
        print_on:false,
        printer_info:null,
        zpl_preview:null,
      }
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

    doPrint(zpl) {
      this.setState({zpl_preview:zpl});
      if (this.state.print_on) {
        promiseIpc.send('printzpl',{zpl:zpl,printer:this.props.printer}).then((data) =>{
          console.log("printzpl res",data)
        }).catch(e => console.error(e));
      }
    }


    printTestPage() {
      this.setState({zpl_preview:ZPL_TEST_PAGE});
      promiseIpc.send('printzpl',{zpl:ZPL_TEST_PAGE,printer:this.props.printer}).then((data) =>{
        console.log("printzpl res",data)
      }).catch(e => console.error(e));
    }

    render() {
      const {classes} = this.props;
      const cfgOk = this.isCfgOk();
      return (
        <Grid container spacing={24}>

 
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <StatusCard label="tiskarna" ok={cfgOk} />
              <StatusCard label="server" ok={cfgOk} />
              <StatusCard label="konfigurace" ok={cfgOk} />
              <StatusCard label="tisk" ok={this.state.print_on} />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <ZPLView data={this.state.zpl_preview} />
            </Paper>
          </Grid>
  

           <Grid item xs={4}>
            <Button onClick={()=>{this.setState({show_printers:!this.state.show_printers})}}> printers </Button>
            <Button onClick={()=>{this.setState({show_pusher:!this.state.show_pusher})}}> pusher </Button>
            <Button onClick={()=>{this.setState({grab_events:!this.state.grab_events})}}> events </Button>
            <Button onClick={()=>{this.setState({print_on:!this.state.print_on})}}> print on/off </Button>
            <Button onClick={()=>{this.setState({show_debug:!this.state.show_debug})}}> debug on/off </Button>
            <Button onClick={()=>{this.printTestPage()}}> print test page </Button>
          </Grid>

          <Grid item xs={12}>
          {this.state.show_printers && (<Printers />)}
          {this.state.show_pusher && (<Pusher />)}
          {this.state.grab_events && (<PusherEvents onPrint={(zpl)=>this.doPrint(zpl)}/>)}
          </Grid>

 
          {this.state.show_debug && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DebugObjectView name="cfg" object={{pusher:this.props.pusher,printer:this.props.printer}} />
                {this.state.printer_info &&(<DebugObjectView name="current printer info" object={this.state.printer_info}/>)}
              </Paper>
            </Grid>
          )}
        </Grid>
      );
    }
  }

  App.propTypes = {
    classes: PropTypes.object.isRequired,
    printer: PropTypes.string,
    pusher: PropTypes.shape({apikey:PropTypes.string,cluster:PropTypes.string,channel:PropTypes.string}).isRequired,
  };

  function mapStateToProps(state) {
    return { 
        printer: state.printer.printer,
        pusher: state.pusher
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps, {})(App));