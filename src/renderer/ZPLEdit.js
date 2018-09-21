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
/*

^XA
^A@N,25,25,E:TT0003M_.FNT
^CI28
^FO10,50
^FDZvlášť zákeřný učeň s ďolíčky běží podél zóny úlů. ^FS
^XZ


^FO30,210
^BQN,2,4
^FDC1DS-GRQM-S7R9^FS
^FO30,310
^FDC1DS-GRQM-S7R9^FS
^FO150,310
^FD1203kc^FS

^XA
^JMA
^FO0,0
^FDX^FS
^FO0,345
^FDX^FS

^FO225,0
^FDX^FS
^FO225,345
^FDX^FS

*/


class ZPLEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zpl:"^XA\n^FO0,0\n^FDX^FS\n^FO0,345\n^FDX^FS\n^FO225,0\n^FDX^FS\n^FO225,345\n^FDX^FS\n^XZ"
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