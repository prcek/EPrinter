
import React from 'react';
import Button from '@material-ui/core/Button';
import Printers from './Printers';
import Pusher from './Pusher';
import PusherEvents from './PusherEvents';

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        show_printers:false,
        show_pusher:false
      }
    }

    render() {
      return (
        <div>
          <Button onClick={()=>{this.setState({show_printers:!this.state.show_printers})}}> printers </Button>
          <Button onClick={()=>{this.setState({show_pusher:!this.state.show_pusher})}}> pusher </Button>
          {this.state.show_printers && (<Printers />)}
          {this.state.show_pusher && (<Pusher />)}
          <PusherEvents />
        </div>
      );
    }
  }

  
  export default App;