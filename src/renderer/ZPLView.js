
import React from 'react';
import PropTypes from 'prop-types';

const TICKET_WIDTH=1.15; 
const TICKET_HEIGHT=1.75;
const TICKET_DPMM=8; 



function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};

class ZPLView extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
        imgdata:null,
        error:false,
      }
    }

    fetchImg(data) {
      console.log("ZPLView fetch data",data)
      if (data==null  || data.length==0) {
        return;
      }
      let formData = new FormData();
      formData.append('file',data);
      var options = {
        method: 'POST',
        mode: 'cors',
        body: formData
      };
      fetch('http://api.labelary.com/v1/printers/'+TICKET_DPMM+'dpmm/labels/'+TICKET_WIDTH+'x'+TICKET_HEIGHT+'/0/',options).then((response) => {
        if (response.status == 200) {
          response.arrayBuffer().then((buffer)=>{
            var imageStr = arrayBufferToBase64(buffer);
            var base64Flag = 'data:image/png;base64,';
            this.setState({imgdata:base64Flag + imageStr,error:false})
          });
        } else {
            this.setState({error:true})
        }
      });
    }

    componentDidMount() {
      if (this.props.data) {
        this.fetchImg(this.props.data);
      } else {
        this.fetchImg(ZPLView.defaultProps.data);
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data != this.props.data) {
        this.fetchImg(this.props.data);
      }
    }
    
    render() {
      
      const {imgdata,error} = this.state;
      return (
        <div style={{width:"100%"}}>
          {error && (<p> zpl view error </p>)}
          {imgdata && !error && (
            <img  src={imgdata} style={{width:"100%"}} />
          )}
        </div>
      );
    }
}

ZPLView.propTypes = {
  data: PropTypes.string
};


ZPLView.defaultProps = {
  data: "^XA^FD.^FS^XZ"
};

export default (ZPLView);