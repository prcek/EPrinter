
import React from 'react';
import PropTypes from 'prop-types';

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
      fetch('http://api.labelary.com/v1/printers/8dpmm/labels/2x3/0/',options).then((response) => {
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
      this.fetchImg(this.props.data);
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
          {imgdata && (
            <img  src={imgdata} style={{border:"1px solid blue",width:"100%"}} />
          )}
          {error && (<p> zpl view error </p>)}
        </div>
      );
    }
}

ZPLView.propTypes = {
  data: PropTypes.string
};

export default (ZPLView);