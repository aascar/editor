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

class ResponsiveDialog extends React.Component {

    render() {
        const { fullScreen, open, handleClose, title, text } = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                { title && <DialogTitle id="responsive-dialog-title">{title}</DialogTitle> }
                <DialogContent>
                    <DialogContentText>
                        { text }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);