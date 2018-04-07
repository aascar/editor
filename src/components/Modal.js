import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        maxHeight: 360,
        /*width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,*/
    },
    dialog: {

    },
});

class ResponsiveDialog extends React.Component {

    render() {
        const { classes, fullScreen, open, handleClose, title, children, actions } = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.dialog}
            >
                { title && <DialogTitle id="responsive-dialog-title">{title}</DialogTitle> }
                <DialogContent className={classes.root}>
                    { children }
                </DialogContent>
                {
                    actions && <DialogActions>
                        {actions}
                    </DialogActions>
                }
            </Dialog>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ResponsiveDialog));