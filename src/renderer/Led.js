import React, { Fragment } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { easeInOut,linear } from '@popmotion/easing';





const Box = posed.div({
    idle_gray: {
      scale:1,
      backgroundColor: 'rgb(100,100,100)',
    },

    idle_green: {
        scale:1,
        backgroundColor: 'rgb(0,200,0)',
      },
  
    idle_red: {
        scale:1,
        backgroundColor: 'rgb(200,0,0)',
    },
  
    blink: {
        scale:1,
        backgroundColor: 'rgb(000,000,200)',
        transition: {
            scale: {  
                type: 'tween',
                from: 0.9,
                to: 1.1,
                duration:300,
                ease: linear,
                yoyo: Infinity
            },
            
            backgroundColor: {  
                type: 'tween',
                to: 'rgb(0,0,200)',
                from:'rgb(150,150,255)',
                duration: 300,
                yoyo: Infinity,
                ease: linear
            } 
      },
    },
  });


const styles = theme => ({
    box: {
        position:'relative',
        //bottom:-6,
        marginLeft:5,
        marginRight:5,
        height:20,
        width:20,
        borderRadius: "50%",
      },
    span: {
        //width:30,
        //height:30,
        display:'inline-block'
    },
});



class Led extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            hovering:false,
        }
        this.timer=null;
    }
    render() {
        const {classes,color} = this.props;
        
        return (
            <span className={classes.span}>
            <Box initialPose={"idle_"+color} pose={this.state.hovering ? "blink" : "idle_"+color} className={classes.box}
             />
             </span>
        )
    }
    blink() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({hovering:true});
        this.timer = setTimeout(()=>{
                this.setState({hovering:false})
                this.timer = null;
            },2000);
    }
}

Led.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(['gray','red','green'])
};
Led.defaultProps = {
    color: "gray"
};


export default withStyles(styles)(Led);
