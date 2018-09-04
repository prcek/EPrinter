
import React from 'react';
import Button from '@material-ui/core/Button';
import Printers from './Printers';
import Pusher from './Pusher';
import PusherEvents from './PusherEvents';
import ZPLView from './ZPLView';
class App extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        show_printers:false,
        show_pusher:false,
        grab_events:false,
      }
    }

    render() {
      return (
        <div>
          <Button onClick={()=>{this.setState({show_printers:!this.state.show_printers})}}> printers </Button>
          <Button onClick={()=>{this.setState({show_pusher:!this.state.show_pusher})}}> pusher </Button>
          <Button onClick={()=>{this.setState({grab_events:!this.state.grab_events})}}> events </Button>
          {this.state.show_printers && (<Printers />)}
          {this.state.show_pusher && (<Pusher />)}
          {this.state.grab_events && (<PusherEvents/>)}
          <ZPLView data="^XA^A@N50,50^FDxxxx^FS^XZ"/>
        </div>
      );
    }
  }

  
  export default App;