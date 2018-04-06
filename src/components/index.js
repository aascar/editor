/**
 * Created by jyothi on 19/12/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import * as ace from 'brace';
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import AceEditor from 'react-ace';
import { LANGUAGES, THEMES } from "../constants";
import Github from "../Github";
import Select from "./Select";

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
            handleChange, showLineNumbers, showGutters,
            tabSize
        } = this.props;

        return (
            <Drawer
                variant="persistent"
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
                        <TextField
                            id="tab-size"
                            label="Tab Size"
                            value={tabSize}
                            onChange={handleChange("tabSize")}
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showLineNumbers}
                                    onChange={(e) => handleChange('showLineNumbers')({target: {value: e.target.checked}})}
                                    color="primary"
                                />
                            }
                            label="Show Line Numbers"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showGutters}
                                    onChange={(e) => handleChange('showGutters')({target: {value: e.target.checked}})}
                                    color="primary"
                                />
                            }
                            label="Show Gutters"
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
            handleChange, notes, handleNoteChange, currentNote
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
                    className={classes.textField}
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
                    className={classes.textField}
                />
                <IconButton
                    component="a"
                    title="GitHub"
                    color="secondary"
                    href="https://github.com/aascar/editor"
                >
                    <Github />
                </IconButton>
            </div>
        );
    }
}

const CONTENT_KEY = "_content";

export class Editor extends React.Component {

    render() {
        const { handleChange, content, classes, theme = "github", mode = "java", fontSize = 12, showLineNumbers, showGutters, tabSize = 4 } = this.props;
        return (
            <AceEditor
                mode={mode}
                theme={theme}
                onChange={handleChange}
                name="aascar-editor"
                editorProps={{$blockScrolling: true}}
                value={content}
                className={classes.editor}
                fontSize={fontSize}
                setOptions={{
                    showLineNumbers: showLineNumbers
                }}
                showGutter={showGutters}
                tabSize={tabSize}
            />
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired
};