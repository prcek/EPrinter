
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class App extends React.Component {
    render() {
      console.log("App props",this.props)
      return (
        <div>
          <h1>Printers</h1>
          <ul>
            {this.props.printers.map((p,idx)=>{
              return (<li key={idx}>{p.name}</li>)
            })}
          </ul>
          <Button variant="raised"> HELLO !</Button>
        </div>
      );
    }
  }

  App.propTypes = {
    printers: PropTypes.array.isRequired
  };

  
  export default App;