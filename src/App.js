import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {AppbarMenu, Editor, Sidebar} from "./components";
import {ANCHOR_ENUM, LANGUAGES, THEMES} from "./constants";
import { blue } from 'material-ui/colors';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import SaveIcon from 'material-ui-icons/Save';

const drawerWidth = 240;

const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
            boxSizing: 'border-box',
            '@media print': {
                background: theme.palette.common.white,
            },
            width: '100%',
            height: '100%'
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit',
        },
        body: {
            margin: 0,
            width: '100%',
            height: '100%'
        },
    },
    root: {
        width: '100%',
        height: '100%',
        //marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    flex: {
        flex: 1,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        minHeight: '100vh',
        width: drawerWidth,
    },
    drawerInner: {
        padding: 0,
    },
    drawerControls: {
        padding: '0 8px',
        minHeight: 'calc(100vh - 150px)'
    },
    drawerBottomControls: {
        padding: '0 8px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        //padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        }
    },
    appBarMenu: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    editor: {
        width: '100% !important',
        height: '100% !important',
        minHeight: 'calc(100vh - 66px)',
        marginTop: 10,
        [theme.breakpoints.up('sm')]: {
            editor: {
                minHeight: 'calc(100vh - 64px)'
            },
        }
    },
    selectMenu: {
        color: 'white'
    },
    input: {
        color: 'white'
    },
    underline: {
        '&:before': {
            backgroundColor: 'rgba(255, 255, 255, 0.72) !important'
        }
    },
    formControl: {
        color: 'white'
    },
    icon: {
        fill: 'white !important'
    },
    textField: {
        margin: '0 5px',
        width: 150
    },
    fabIcon: {
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 30
    }
});

const STATE_KEY = "_last_stored_state";

const theme = createMuiTheme({
    typography: {
        //htmlFontSize: 10,
    },
    palette: {
        //type: 'dark',
        background: {
            default: "#F2F2F4"
        },
        primary: {
            light: blue[500],
            main: blue[700],
            dark: blue[900],
        },
        secondary: {
            light: "#F1F1F1",
            main: "#FEFEFE",
            dark: "#FFFFFF",
        }
    }
});

const DEFAULT_GIST_NAME = "New Private Gist";

const _DEFAULT_STATE = {
    name: DEFAULT_GIST_NAME,
    open: false,
    anchor: 'left',
    mode: LANGUAGES[0],
    theme: THEMES[0],
    fontSize: 14,
    showLineNumbers: true,
    showGutters: true,
    tabSize: 4,
    content: "Happy writing..!",
    storageLimitExceeded: false,
    inSavingMode: false,
    contendChanged: false,
};

class App extends React.Component {

    state = _DEFAULT_STATE;

    componentWillMount(){
        this.setState(this.retrieveState(STATE_KEY));
    }

    retrieveState = (key) => {
        if(window.localStorage.hasOwnProperty(key)) {
            return JSON.parse(window.localStorage.getItem(key));
        }else{
            return _DEFAULT_STATE;
        }
    };

    commitState = (key, state) => {
        const { storageLimitExceeded, inSavingMode, contendChanged, ...actualState } = state;
        const serializedState = JSON.stringify(actualState);
        try {
            if(state.name !== DEFAULT_GIST_NAME){ //storing the saved one separately
                window.localStorage.setItem(DEFAULT_GIST_NAME, serializedState);
            }
            window.localStorage.setItem(key, serializedState);
        }catch (e){
            this.setState({storageLimitExceeded: true});
        }
    };

    componentWillUpdate(nextProps, nextState) {
        if(!nextState.storageLimitExceeded){
            this.commitState(STATE_KEY, nextState);
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    handleChange = property => event => {
        const { value } = event.target;
        this.setState({
            [property]: isNaN(value) ? value : Number(value),
        });
    };

    handleContentChange = (content) => {
        this.setState({content});
    };

    handleSave = () => {
        this.setState({inSavingMode: true});
    };

    render() {
        const { classes } = this.props;
        const { anchor, open, storageLimitExceeded, inSavingMode, showNotes } = this.state;

        const drawer = () => <Sidebar
            {...this.props}
            {...this.state}
            handleDrawerClose={this.handleDrawerClose}
            handleChangeAnchor={this.handleChangeAnchor}
            handleChange={this.handleChange}
        />;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={storageLimitExceeded}
                        autoHideDuration={6000}
                        onClose={() => this.setState({storageLimitExceeded: false})}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Storage Limit Exceeded..!</span>}
                        action={[
                            <Button key="undo" color="secondary" size="small" onClick={() => this.setState({showNotes: true})}>
                                DELETE EXISTING NOTES
                            </Button>,
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => this.setState({storageLimitExceeded: false})}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <div className={classes.appFrame}>
                        <AppBar
                            className={classNames(classes.appBar, {
                                [classes.appBarShift]: open,
                                [classes[`appBarShift-${anchor}`]]: open,
                            })}
                            position="static"
                        >
                            <Toolbar disableGutters={!open}>
                                <IconButton
                                    color="secondary"
                                    aria-label="open menu"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="secondary" noWrap className={classes.flex}>
                                    Aascar Editor
                                </Typography>
                                <div className={classes.appBarMenu}>
                                    <AppbarMenu
                                        {...this.props}
                                        {...this.state}
                                        handleChange={this.handleChange}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                        {
                            ANCHOR_ENUM.LEFT === anchor && drawer()
                        }
                        <main
                            className={classNames(classes.content, classes[`content-${anchor}`], {
                                [classes.contentShift]: open,
                                [classes[`contentShift-${anchor}`]]: open,
                            })}
                        >
                            <Editor {...this.props} {...this.state} handleChange={this.handleContentChange}/>
                            <div className={classes.fabIcon}>
                                <Button variant="fab" color="primary" aria-label="save" onClick={this.handleSave}>
                                    <SaveIcon />
                                </Button>
                            </div>
                        </main>
                        {
                            ANCHOR_ENUM.RIGHT === anchor && drawer()
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);