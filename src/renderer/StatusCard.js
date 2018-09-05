import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
 
  paper: {
    padding: theme.spacing.unit,
  },
 
  red: {
    backgroundColor:"red"
  },
  green: {
    backgroundColor:"green"
  },
  label: {
      width:100,
  }
});



class StatusCard extends React.Component {
    render() {
        const {classes,label,ok,renderCommand} = this.props;

        const className = classNames([
            { [classes.red]: !ok },
            { [classes.green]: ok},
            classes.label
          ]);


        return (
            <Grid container>
                <Grid item className={className}>
                    {label}
                </Grid>
                <Grid item>
                    {renderCommand?renderCommand():null}
                </Grid>
            </Grid>
        )
    }
};




StatusCard.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    ok: PropTypes.bool.isRequired,
    renderCommand: PropTypes.func
};


export default withStyles(styles)(StatusCard);