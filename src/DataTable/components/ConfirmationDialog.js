import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    IconButton,
    Button
} from '@material-ui/core';
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
    button: {
        margin: theme.spacing.unit,
    }
});

class ConfirmationDialogComponent extends React.Component {

    render() {
        const {open, onClose, onApprove, classes} = this.props;

        return (
            <Dialog open={open ? open : false} className={classes.root} fullWidth maxWidth='sm'>
                <DialogTitle>
                    Confirm
                    {onClose ? (
                        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onApprove} className={classes.button}>
                        Yes
                    </Button>
                    <Button variant="contained" onClick={onClose} className={classes.button}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialogComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onApprove: PropTypes.func.isRequired,
    classes: PropTypes.object
};

const ConfirmationDialog = withStyles(styles)(ConfirmationDialogComponent);

export default ConfirmationDialog;