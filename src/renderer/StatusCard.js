import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Led from './Led';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
 
  paper: {
    padding: theme.spacing.unit,
  },
 
  label: {
      width:120,
  }
});



class StatusCard extends React.Component {
    render() {
        const {classes,label,ok} = this.props;

        let color = 'gray';
        if (ok == true) {
            color = "green";
        } else if (ok == false) {
            color = "red";
        }


        return (
            <Grid container>
                <Grid item>
                    <Led innerRef={this.props.ledRef} color={color} />
                </Grid>
                <Grid item className={classes.label}>
                    <Typography variant="title">{label}</Typography>
                </Grid>
            </Grid>
        )
    }
};




StatusCard.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    ok: PropTypes.bool,
    ledRef: PropTypes.any
};


export default withStyles(styles)(StatusCard);