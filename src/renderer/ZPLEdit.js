import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textArea: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});



class ZPLEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zpl:"^XA\n^A@N200,200\n^FDAhoj^FS\n^XZ"
        }
    }
    render() {
        const {classes,onSubmit} = this.props;

       


        return (
            <div>
                <TextField
                    id="zpledit"
                    label="ZPL"
                    className={classes.textArea}
                    value={this.state.zpl}
                    onChange={(e)=>this.setState({zpl:e.target.value})}
                    margin="normal"
                    multiline
                    rows={10}
                />      
                <Button onClick={()=>{onSubmit(this.state.zpl)}}> Vytisknout </Button>
            
            </div>
        )
    }
};




ZPLEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};


export default withStyles(styles)(ZPLEdit);