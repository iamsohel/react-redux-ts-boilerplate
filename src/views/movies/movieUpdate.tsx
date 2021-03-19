import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, TextField, Divider, MenuItem, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '../../components/LinearProgress';
import { useActions } from '../../hooks/useActions';
import { useDispatch } from 'react-redux';
import { getAMovie,  } from '../../state/action-creators/movie';
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

const UpdateMovie = ({match, history }: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState<string>('');
  const [numberInStock, setNumberInStock] = React.useState<number>(0);
  const [dailyRentalRate, setDailyRentalRate] = React.useState<number>(0);
  const [genreId, setGenreId] = React.useState<string>('');
  const { editMovie } = useActions();
  const { selectedMovie, loading, error } = useTypedSelector((state) => state.movies);

  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const data ={
          title: title,
          genreId: "604f32c72f70f9318447622c",
          numberInStock: numberInStock,
          dailyRentalRate: dailyRentalRate,
          _id: match.params.id
      }
      editMovie(data, history);
  }

    const handleCancel = () => {
      history.push("/movies");
    }

    React.useEffect(() => {
      dispatch(getAMovie(match.params.id))
      console.log("m, l: ",selectedMovie, loading)
      if(selectedMovie){
        setTitle(selectedMovie.title);
        setNumberInStock(selectedMovie.numberInStock);
        setDailyRentalRate(selectedMovie.dailyRentalRate);
        setGenreId(selectedMovie.genre._id);
      }
    }, [])
    
    console.log("m2, l2: ",selectedMovie, loading)
  return (
    <React.Fragment>
          
        
          <Container maxWidth="xl">
            {loading && (<LinearProgress/>)}
            {error && (<Alert  style={{marginTop: '10px'}} severity="error">{error}</Alert>)} 
            {selectedMovie && (
           <Paper className={classes.paper}>
           <form onSubmit={handleSubmit}>
             <Typography  variant="h5" >
               Update Movie
             </Typography>
             <React.Fragment>
             <Divider style={{marginTop:"10px"}}/>
            
           <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
               <TextField
                   required
                   id="title"
                   name="title"
                   value={title? title: selectedMovie.title}
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
                   value={numberInStock ? numberInStock : selectedMovie.numberInStock}
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
                   value={dailyRentalRate ? dailyRentalRate : selectedMovie.dailyRentalRate}
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
                   value={genreId ? genreId : selectedMovie.genre._id}
                   onChange= { e => setGenreId(e.target.value)}
                   helperText="Please select genre"
                 >
                     <MenuItem key="1" value="604f32c72f70f9318447622c">
                       Action
                     </MenuItem>
                     <MenuItem key="2" value="604f32c72f70f9318447622c">
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
                   onClick={handleCancel}
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
        )}
      </Container> 
    </React.Fragment>
  );
}

export default UpdateMovie;