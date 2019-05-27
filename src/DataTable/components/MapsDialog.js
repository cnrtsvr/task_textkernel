import React from 'react';
import GoogleMap from './GoogleMap';
import { Dialog, DialogTitle, DialogContent, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/es/styles/withStyles";
import * as PropTypes from 'prop-types'; // * as because of default export being undefined.

let styles = theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
});

class MapsDialogComponent extends React.Component {

    render() {
        const { open, location, onClose, classes } = this.props;

        return (
            <Dialog open={open ? open : false} fullWidth maxWidth='lg'>
                <DialogTitle id="maps-dialog-title" className={classes.root}>Location of the job
                    {onClose ? (
                        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}</DialogTitle>
                <DialogContent>
                    <GoogleMap location={location}
                               googleMapURL={`https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&v=3.exp&libraries=geometry,drawing,places`}
                               loadingElement={<div style={{ height: `100%` }} />}
                               containerElement={<div style={{ width: '100%', maxWidth: `1280px`, height: `500px` }} />}
                               mapElement={<div style={{ height: `100%` }} />}/>
                </DialogContent>
            </Dialog>
        );
    }
}

MapsDialogComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object
};

const MapsDialog = withStyles(styles)(MapsDialogComponent);

export default MapsDialog;