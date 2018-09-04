
import React from 'react';
import PropTypes from 'prop-types';
import promiseIpc from 'electron-promise-ipc';
import { setPrinter } from './actions';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

//'printer-state-reasons': 'offline-report'
//'printer-state-reasons': 'none'
//'printer-make-and-model': 'Zebra ZPL Label Printer'

class Printers extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        printers:[]
      }
    }

    componentDidMount() {
      promiseIpc.send('printers','').then((data) =>{
        this.setState({printers:data.printers});
      }).catch(e => console.error(e));
    }

    componentWillUnmount() {

    }

    render() {
      return (
        <div>
          <h1>available printers:</h1>
          <ul>
            {this.state.printers.map((p,idx)=>{
              return (
                <li key={idx}>
                    {p.name}
                    <Button variant="raised" size="small" onClick={()=>this.props.onChangePrinter(p.name)}> set </Button>
                </li>
                )
            })}
          </ul>
          <h1> current printer:</h1>
          <p> {this.props.printer?this.props.printer:"none"} </p>
        </div>
      );
    }
  }

  Printers.propTypes = {
    printer: PropTypes.string,
    onChangePrinter: PropTypes.func.isRequired
  };


  function mapStateToProps(state) {
    return { 
        printer: state.printer.printer
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      onChangePrinter: value => {
        dispatch(setPrinter(value))
      },
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Printers);