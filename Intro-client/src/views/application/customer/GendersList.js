import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { concat, ApolloLink, useMutation, HttpLink, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import GenderEdit from './GenderEditModal';
import { USERS, GENDERS_LIST } from 'gqloperations/queries';
import { REMOVE_USER, DELETE_GENDER } from 'gqloperations/mutations';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    {
        id: 'genderName',
        numeric: false,
        label: 'Gender Name',
        align: 'left'
    },
    {
        id: 'slugName',
        numeric: false,
        label: 'Slug Name',
        align: 'center'
    },
    {
        id: 'isDeleted',
        numeric: false,
        // boolean: true,
        label: 'Deleted',
        align: 'center'
    },
    {
        id: 'order',
        numeric: true,
        label: 'Order',
        align: 'center'
    }
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    // console.log('type', typeof selected[0]);
    // const selectedId = selected[0];
    const [removeData] = useMutation(DELETE_GENDER, {
        context: { headers: { authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } },

        variables: {
            _id: selected.toString()
        }
    });

    const handleRemove = async () => {
        await removeData()
            .then(
                (data) => {
                    // if (data.removeGender.isDeleted) {
                    //     throw new Error('Already deleted');
                    // }
                    // window.location.href = '/genders/genders-list';
                },
                (err) => {
                    console.log('error', err);
                    return err.message;
                }
            )
            .catch((err) => {
                console.log({ err });
                return err.message;
            });
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={6}>
                        <EnhancedTableToolbar numSelected={selected.length} handleRemove={handleRemove} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        Action
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected, handleRemove }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Gender
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large" onClick={handleRemove}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleRemove: PropTypes.func
};

const GendersList = () => {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const { data, loading, error } = useQuery(GENDERS_LIST, {
        context: { headers: { authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }
    });
    const [rows, setRows] = useState();
    const [selectedId, setSelectedId] = useState('');
    // open modal to edit review
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleCloseModal = () => {
        setEdit(false);
        setOpen(false);
    };

    // const handleEditState =()=>{
    //     setEdit(true);
    //     setOpen(true);
    // }

    console.log('datas=>', data);
    useEffect(() => {
        console.log('datas=>', data);
        const genderList = data?.findGenders.map((items) => items);
        console.log('gender list=>', genderList);
        setRows(genderList);
    }, [data]);

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                // const properties = ['name', 'email', 'location', 'orders'];
                const properties = ['genderName', 'slugName', 'isDeleted', 'order'];

                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            // setRows(userList);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n._id);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard content={false}>
            {rows && (
                <>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                theme={theme}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                selected={selected}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        /** Make sure no display bugs if row isn't an OrderData object */
                                        console.log('deleted', row.isDeleted);
                                        if (typeof row === 'number') return null;
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <>
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell
                                                        padding="checkbox"
                                                        sx={{ pl: 3 }}
                                                        onClick={(event) => handleClick(event, row._id)}
                                                    >
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        onClick={(event) => handleClick(event, row.genderName)}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {'     '}
                                                            {row.genderName}{' '}
                                                        </Typography>
                                                    </TableCell>
                                                    {/* <TableCell>{row.genderName} </TableCell> */}
                                                    <TableCell align="center">{row.slugName}</TableCell>
                                                    <TableCell align="center">{row.isDeleted.toString()}</TableCell>
                                                    <TableCell align="center">{row.order}</TableCell>
                                                    {/* <TableCell align="center">{row.phone}</TableCell> */}
                                                    <TableCell align="center" sx={{ pr: 3 }}>
                                                        <IconButton
                                                            color="secondary"
                                                            size="large"
                                                            onClick={(e) => {
                                                                setSelectedId(row._id);
                                                                setOpen(true);
                                                                setEdit(true);
                                                                // console.log('event edt button=>', e);
                                                                console.log('selectedID', selectedId);
                                                                console.log('id', row._id);
                                                            }}
                                                        >
                                                            <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {edit && open && (
                            <GenderEdit
                                open={open}
                                handleCloseModal={handleCloseModal}
                                selectedId={selectedId}
                                edit={edit}
                                setEdit={setEdit}
                            />
                        )}
                    </TableContainer>

                    {/* table pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </MainCard>
    );
};

export default GendersList;
