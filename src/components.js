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
import * as ace from 'brace';
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import AceEditor from 'react-ace';
import { LANGUAGES, THEMES } from "./constants";

LANGUAGES.forEach(mode => {
    require(`brace/mode/${mode}`);
});
THEMES.forEach(theme => {
    require(`brace/theme/${theme}`);
});

export class Sidebar extends React.Component {

    render() {
        const {
            classes, theme, anchor, open, mode, fontSize,
            handleDrawerClose, handleChangeAnchor,
            handleChange
        } = this.props;

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
                        <TextField
                            select
                            label="Editor Theme"
                            value={theme}
                            onChange={handleChange("theme")}
                            margin="normal"
                            fullWidth
                        >
                            { THEMES.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>) }
                        </TextField>
                        <TextField
                            select
                            label="Language"
                            value={mode}
                            onChange={handleChange("mode")}
                            margin="normal"
                            fullWidth
                        >
                            { LANGUAGES.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>) }
                        </TextField>
                        <TextField
                            id="font-size"
                            label="Font Size"
                            value={fontSize}
                            onChange={handleChange("fontSize")}
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>
                    <Divider />
                    <div className={classes.drawerBottomControls}>
                        <TextField
                            id="persistent-anchor"
                            select
                            label="Sidebar Position"
                            value={anchor}
                            onChange={handleChange("anchor")}
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

export class AppbarMenu extends React.Component {

    render() {
        const {
            classes, theme, anchor, open, mode, fontSize,
            handleDrawerClose, handleChangeAnchor,
            handleChange
        } = this.props;

        return (
            <div>
                <TextField
                    select
                    label="Language"
                    value={mode}
                    onChange={handleChange("mode")}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.formControl
                    }}
                    SelectProps={{
                        className: classNames(classes.icon, classes.selectMenu, classes.underline)
                    }}
                    InputProps={{
                        className: classes.input
                    }}
                >
                    { LANGUAGES.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>) }
                </TextField>
                <TextField
                    id="font-size"
                    label="Font Size"
                    value={fontSize}
                    onChange={handleChange("fontSize")}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                        className: classes.formControl
                    }}
                    InputProps={{
                        className: classNames(classes.input, classes.underline)
                    }}
                />
            </div>
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
        const { classes, theme = "github", mode = "java", fontSize = 12 } = this.props;
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
                fontSize={fontSize}
            />
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired
};