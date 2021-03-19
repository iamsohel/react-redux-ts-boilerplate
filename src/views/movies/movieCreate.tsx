import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, TextField, Divider, MenuItem, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '../../components/LinearProgress';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Alert from '../../components/Aleart';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
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


interface Props {
  match: {
      params: {
          id:  any
      },
      url: string,
      path: string,
      isExact: boolean,

  },
  history: any,
}

const CreateMovie = ({match, history }: Props) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState<string>('');
  const [numberInStock, setNumberInStock] = React.useState<number>(0);
  const [dailyRentalRate, setDailyRentalRate] = React.useState<number>(0);
  const [genreId, setGenreId] = React.useState<string>('');
  const { addMovie } = useActions();
  const {loading, error } = useTypedSelector((state) => state.movies);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data ={
            title: title,
            genreId:"604f32c72f70f9318447622c",
            numberInStock: numberInStock,
            dailyRentalRate: dailyRentalRate
        }
        addMovie(data, history);
    }

  return (
    <React.Fragment>
          <Container maxWidth="xl">
         {loading && <LinearProgress/>}
         {error && (<Alert  style={{marginTop: '10px'}} severity="error">{error}</Alert>)}
         
        <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Typography  variant="h5" >
            Create Movie
          </Typography>
          <React.Fragment>
          <Divider style={{marginTop:"10px"}}/>
         
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="title"
                name="title"
                value={title}
                onChange= { e => setTitle(e.target.value)}
                label="Title"
                fullWidth
                autoComplete="given-name"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                type="number"
                id="numberInStock"
                name="numberInStock"
                value={numberInStock}
                onChange= { e => setNumberInStock(parseInt(e.target.value))}
                label="Number In Stock"
                fullWidth
                autoComplete="family-name"
            />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <TextField
                required
                type="number"
                id="dailyRentalRate"
                name="dailyRentalRate"
                value={dailyRentalRate}
                onChange= { e => setDailyRentalRate(parseInt(e.target.value))}
                label="Daily Rental Rate"
                fullWidth
                autoComplete="shipping address-level2"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                id="genreId"
                select
                label="Select Genre"
                value={genreId}
                onChange= { e => setGenreId(e.target.value)}
                helperText="Please select genre"
              >
                  <MenuItem key="1" value="6047570627e97130a02abc2e">
                    Action
                  </MenuItem>
                  <MenuItem key="2" value="6047570627e97130a02abc2e">
                    Horror
                  </MenuItem>
              </TextField>
            </Grid>
        </Grid>
        </React.Fragment>
        <div className={classes.buttons}>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
            >
                          Cancel
            </Button>
            <Button
            type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
            >
                    Submit
            </Button>
        </div>
        </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default CreateMovie;