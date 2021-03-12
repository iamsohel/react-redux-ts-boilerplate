import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { getMovies } from '../../state/action-creators/movie';
import Copyright from '../../components/Footer';
import AppNavBar from '../../components/AppBar';
import AppDrawer from '../../components/Drawer';

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
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
    const dispatch = useDispatch();
    const { movies, loading } = useTypedSelector((state) => state.movies);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { loggedIn} = useTypedSelector((state) => state.auth);
    const handleDelete = async (id: string) => {
        // await deletePost(id);
        // const posts = post.filter(p => p.id !== id);
        // setPost(posts)
    }

    React.useEffect(() => {
        dispatch(getMovies())
    }, [])
   
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  if (!loggedIn) {
    return <Redirect to="/login" />;
 }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppDrawer/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                          <Paper className={classes.paper}>
                              {!loading && (<Table movieList={ movies} />)}
                
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

// import React, {useEffect} from 'react';
// import { Table, Card, Button } from 'react-bootstrap';



// const Dashboard: React.FC = () => {
    

//     return(
//         <>
//             {movies.length > 0 && (
//                 <>
//                     <Card className="text-center" style={{marginTop: '50px'}}>
//                         <Card.Header>Demo App</Card.Header>
//                     </Card>
//                     <Table striped bordered hover variant="dark">
//                         <thead>
//                             <tr>
//                             <th>Movie Title</th>
//                             <th>Genre</th>
//                             <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {movies.length > 0 && movies.map(p => (
//                                 <tr key={p._id}>
//                                     <td>{p.title}</td>
//                                     <td>{p.genre.name}</td>
//                                     <td>
//                                       <Link to={`/form/new`} ><Button variant="primary">ADD</Button></Link>{' '}
//                                         <Link to={`/form/${p._id}`} ><Button variant="success">Update</Button></Link>{' '}
//                                         <Button variant="danger" onClick={() => handleDelete(p._id)}>Delete</Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                  </>
//             )}
//             {movies.length === 0 && (
//                 <p>Loading...</p>
//             )}
            
//         </>
//     )
// }

// export default Dashboard;