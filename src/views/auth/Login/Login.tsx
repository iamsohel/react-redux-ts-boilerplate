import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { authActionCreators } from '../../../state/action-creators';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        V Lab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


export default function Login(props:any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string>('');
  

  const { loggedIn,
    currentUser,
    loading } = useTypedSelector(
    (state) => state.auth
  ); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data ={
        email, password
    }
    try {
      dispatch(authActionCreators.loginUser(data));
    } catch(ex) {
      console.log("error", error)
    }
  }

  if (loggedIn) {
    return <Redirect to="/movies" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
           Vlab
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                id="email1"
                name="email"
                label="Email"
                value={email}
                fullWidth
                onChange={e => setEmail(e.target.value)}
                autoComplete="anyrandomstring"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="password"
                id="password1"
                name="password"
                value={password}
                label="Password"
                fullWidth
                onChange={e => setPassword(e.target.value)}
                autoComplete="anyrandomstring"
              />
            </Grid>
            
            <Grid item xs={12}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
            </Grid>
            <Grid item>
              <Link  variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
          </Grid>
         </Grid>
         </form>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}