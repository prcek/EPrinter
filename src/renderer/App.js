
import React from 'react';
import Button from '@material-ui/core/Button';
import Printers from './Printers';
import Pusher from './Pusher';
class App extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <Printers />
          <Pusher />
          <Button variant="raised"> HELLO !</Button>
        </div>
      );
    }
  }

  
  export default App;