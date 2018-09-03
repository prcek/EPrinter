
import React, { Component } from 'react';

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

  
  export default App;