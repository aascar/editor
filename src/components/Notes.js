import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader
} from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';

export default class Notes extends React.Component {
    render(){
        const {
            notes = [], handleDelete, handleNoteChange,
            handleClose
        } = this.props;
        return(
            <List
                dense
                component="nav"
                subheader={<ListSubheader component="div">Saved Gists</ListSubheader>}
            >
                {
                    notes.map(item => {
                        return (
                            <ListItem key={item.key} button onClick={() => {
                                handleNoteChange(item.key);
                                handleClose();
                            }}>
                                <ListItemText
                                    primary={item.label}
                                    secondary={item.content.substring(0, 80)}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={() => {
                                        handleDelete(item.key);
                                        //window.localStorage.removeItem(item.key);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                }
            </List>
        )
    }
}