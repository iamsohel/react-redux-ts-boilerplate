import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {  FormControl, Input, InputLabel,  InputAdornment}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getMovies } from '../../state/action-creators/movie';
import { useDispatch } from 'react-redux';
import LinearProgress from '../../components/LinearProgress';
import Alert from '../../components/Aleart';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useActions } from '../../hooks/useActions';
import SearchIcon from '@material-ui/icons/Search';



const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
    title2: {
      flex: '1 1 60%',
      marginRight: '30px'
    },
  }),
);
const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();
  let numSelected = 0;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Movie  
        </Typography>
        <FormControl className={classes.title2}>
        <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
        <Input
          id="standard-adornment-password"
          type='text'
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon style={{cursor: 'pointer'}}/>
            </InputAdornment>
          }
        />
      </FormControl>
      </>
        <Link to={`/movie/create`} >
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddCircleIcon />}
        >
          Create
        </Button>
        </Link>
 
    
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    // paper: {
    //   width: '100%',
    //   marginBottom: theme.spacing(2),
    // },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
      height: 50,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10,
      marginBottom: 15,
      width: '100%'
    },
  }),
);

export default function EnhancedTable() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { movies, loading, error } = useTypedSelector((state) => state.movies);
  const { loggedIn} = useTypedSelector((state) => state.auth);
  const { deleteMovie } = useActions();

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("page change1")
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("page change", event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    console.log("id", id)
    deleteMovie(id)
  }


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, movies.length - page * rowsPerPage);
  React.useEffect(() => {
    dispatch(getMovies())
}, [])

  return (
    <>
    {loading && (<LinearProgress/>)}
    {error && (<Alert  style={{marginTop: '10px'}} severity="error">{error}</Alert>)}
    {!loading && (
    <Container maxWidth="xl" className={classes.container}>
    {/* <Paper className={fixedHeightPaper}>
      Movies
    </Paper> */}
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar  />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
          <TableHead>
            <TableRow>
              <TableCell align="left">Titles</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">dailyRentalRate</TableCell>
              <TableCell align="right">numberInStock</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={row.title}
                    >
                      <TableCell align="left" >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.genre.name}</TableCell>
                      <TableCell align="right">{row.dailyRentalRate}</TableCell>
                      <TableCell align="right">{row.numberInStock}</TableCell>
                      <TableCell align="center">
                      <Link to={`/movie/update/${row._id}`} >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CreateIcon />}
                      >
                        Update
                      </Button> </Link> {'  '} 
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </Container>
    )}
    </>
  );
}
