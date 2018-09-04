
import React from 'react';
import Button from '@material-ui/core/Button';
import Printers from './Printers';
class App extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <Printers />
          <Button variant="raised"> HELLO !</Button>
        </div>
      );
    }
  }

  
  export default App;