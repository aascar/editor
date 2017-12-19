/**
 * Created by jyothi on 19/12/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import brace from 'brace';
import AceEditor from 'react-ace';

export class Sidebar extends React.Component {

    render() {
        const { classes, theme, anchor, open, handleDrawerClose, handleChangeAnchor } = this.props;

        return (
            <Drawer
                type="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}
                open={open}
            >
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.drawerControls}>

                    </div>
                    <Divider />
                    <div className={classes.drawerBottomControls}>
                        <TextField
                            id="persistent-anchor"
                            select
                            label="Sidebar Position"
                            value={anchor}
                            onChange={handleChangeAnchor}
                            margin="normal"
                            fullWidth
                        >
                            <MenuItem value="left">left</MenuItem>
                            <MenuItem value="right">right</MenuItem>
                        </TextField>
                    </div>
                </div>
            </Drawer>
        );
    }
}

const CONTENT_KEY = "content";

export class Editor extends React.Component {

    state = {
        content: "Happy writing...!"
    };

    componentWillMount(){
        const content = JSON.parse(window.localStorage.getItem(CONTENT_KEY)) || this.state.content;
        this.setState({content});
    }

    componentWillUnmount(){
        window.localStorage.setItem(CONTENT_KEY, JSON.stringify(this.state.content));
    }

    handleChange = (content) => {
        this.setState({content});
    };

    render() {
        const { classes, theme="github", mode="java" } = this.props;
        const { content } = this.state;

        return (
            <AceEditor
                mode={mode}
                theme={theme}
                onChange={this.handleChange}
                name="aascar-editor"
                editorProps={{$blockScrolling: true}}
                value={content}
                className={classes.editor}
            />
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    mode: PropTypes.string
};