import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { getMovies } from '../../state/action-creators/movie';
import Copyright from '../../components/Footer';
import Button from '@material-ui/core/Button';
import AppDrawer from '../../components/Drawer';
import LinearProgress from '../../components/LinearProgress';
import Alert from '../../components/Aleart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 15,
  },
  fixedHeight: {
    height: 50,
  },
}));

export default function Dashboard() {
    const dispatch = useDispatch();
    const { movies, loading, error } = useTypedSelector((state) => state.movies);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { loggedIn} = useTypedSelector((state) => state.auth);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
   
    React.useEffect(() => {
        dispatch(getMovies())
    }, [])
   
    if (!loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
          <>
          {loading && (<LinearProgress/>)}
          {error && (<Alert  style={{marginTop: '10px'}} severity="error">{error}</Alert>)}
          {!loading && (
            <>
            <Container maxWidth="xl" className={classes.container}>
              <Paper className={fixedHeightPaper}>
                Movies
                {/* <Button size="small" variant="contained" color="primary">
                    Create
                </Button> */}
              </Paper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Table movieList={ movies} />
                </Grid>
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </>)}
          </>
       
    );
}
