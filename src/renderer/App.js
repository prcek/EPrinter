
import React from 'react';
import PropTypes from 'prop-types';

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
        </div>
      );
    }
  }

  App.propTypes = {
    printers: PropTypes.array.isRequired
  };

  
  export default App;