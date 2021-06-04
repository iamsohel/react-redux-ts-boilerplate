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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton, TextField, FormControl, Input, InputLabel,  InputAdornment}  from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
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
interface Data {
  genre: string;
  title: string;
  dailyRentalRate: number;
  numberInStock: number;
}



type Order = 'asc' | 'desc';



interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'genre', numeric: true, disablePadding: false, label: 'Genre' },
  { id: 'dailyRentalRate', numeric: true, disablePadding: false, label: 'Daily Rental Rate' },
  { id: 'numberInStock', numeric: true, disablePadding: false, label: 'NumberInStock' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
            </TableCell>
          ))}
        
           <TableCell
            key="action"
            align='center'
            padding='none'
          >
           Action
         </TableCell>
      </TableRow>
    </TableHead>
  );
}

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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
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
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        {/* <FormControl >
          <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
          <Input
            id="standard-adornment-password"
            type='text'
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon/>
              </InputAdornment>
            }
          />
        </FormControl> */}
        {/* <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip> */}
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
        </>
      )}
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
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { movies, loading, error } = useTypedSelector((state) => state.movies);
  const { loggedIn} = useTypedSelector((state) => state.auth);
  const { deleteMovie } = useActions();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = movies.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, movies.length - page * rowsPerPage);
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
    <Container maxWidth="xl" className={classes.container}>
    {/* <Paper className={fixedHeightPaper}>
      Movies
    </Paper> */}
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={movies.length}
            />
            <TableBody>
              {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
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
