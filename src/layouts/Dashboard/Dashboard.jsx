import React, { Suspense, lazy} from 'react'
import { Router, Switch, Route, Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppDrawer from '../../components/Drawer';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Login =  lazy(() => import('../../views/auth/Login'));
const Register =  lazy(() => import('../../views/auth/register'));
const Dashboard =  lazy(() => import('../../views/dashboard/dashboard'));
const MovieUpdate = lazy(() => import('../../views/movies/movieUpdate'))
const MovieCreate = lazy(() => import('../../views/movies/movieCreate'))
const Movies =  lazy(() => import('../../views/movies/movieList'));



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
function DashboardLayout() {
  const classes = useStyles();
  const { loggedIn,
    currentUser,
    loading } = useTypedSelector(
    (state) => state.auth
  );
//   if(!loggedIn){
//       return <Redirect to="/login" />
//    } 

  if(loggedIn) {
    return (
        <div className={classes.root}>
        <AppDrawer/>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
                <Route path="/movie/update/:id" component={MovieUpdate} />
                <Route path="/movie/create" component={MovieCreate} />
                <Route path="/movies" component={Movies} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </main>
        </div>
    )
  } else {
    return (
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>
    );
  }
  
}

export default DashboardLayout;
