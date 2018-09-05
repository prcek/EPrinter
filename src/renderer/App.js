
import React from 'react';
import Button from '@material-ui/core/Button';
import Printers from './Printers';
import Pusher from './Pusher';
import PusherEvents from './PusherEvents';
import { connect } from 'react-redux'
import promiseIpc from 'electron-promise-ipc';
import PropTypes from 'prop-types';
import DebugObjectView from './DebugObjectView';
function nes(s) {
  if (s  && s.length>0) {
    return true;
  }
  return false;
}


class App extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        show_printers:false,
        show_pusher:false,
        grab_events:false,
        print_on:false,
        printer_info:null,
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
      if (this.state.print_on) {
        promiseIpc.send('printzpl',{zpl:zpl,printer:this.props.printer}).then((data) =>{
          console.log("printzpl res",data)
        }).catch(e => console.error(e));
      }
    }

    render() {
      const cfgOk = this.isCfgOk();
      return (
        <div>
          {cfgOk && (<div> cfg ok </div>)}
          <DebugObjectView name="redux.pusher" object={this.props.pusher} />
          {this.state.printer_info &&(<DebugObjectView name="printer info" object={this.state.printer_info}/>)}
          <Button onClick={()=>{this.setState({show_printers:!this.state.show_printers})}}> printers </Button>
          <Button onClick={()=>{this.setState({show_pusher:!this.state.show_pusher})}}> pusher </Button>
          <Button onClick={()=>{this.setState({grab_events:!this.state.grab_events})}}> events </Button>
          <Button onClick={()=>{this.setState({print_on:!this.state.print_on})}}> print on/off </Button>
          {this.state.print_on && (<h1>print is ON</h1>)}
          {this.state.show_printers && (<Printers />)}
          {this.state.show_pusher && (<Pusher />)}
          {this.state.grab_events && (<PusherEvents onPrint={(zpl)=>this.doPrint(zpl)}/>)}
          
        </div>
      );
    }
  }

  App.propTypes = {
    printer: PropTypes.string,
    pusher: PropTypes.shape({apikey:PropTypes.string,cluster:PropTypes.string,channel:PropTypes.string}).isRequired,
  };

  function mapStateToProps(state) {
    return { 
        printer: state.printer.printer,
        pusher: state.pusher
    }
  }
  
  export default connect(mapStateToProps, {})(App);