import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteEmployeeDialog from '../../pages/modals/deleteEmployeeDialog';
import AddEditEmployeeDialog from '../../pages/modals/addEditEmployeeDialog';
import { Data, Employees, EnhancedTableProps, EnhancedTableToolbarProps, HeadCell, Order } from '../../utils/types';
import { getComparator, stableSort } from '../../utils/commonUtils';

const createData = (
    actions: JSX.Element[],
    id: string,
    employeeName: string,
    email: string,
    age: number,
    city: string,
): Data => {
    return {
        actions,
        id,
        employeeName,
        email,
        age,
        city,
    };
}

const headCells: readonly HeadCell[] = [
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
    {
        id: 'employeeName',
        numeric: false,
        disablePadding: true,
        label: 'Employee Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'age',
        numeric: false,
        disablePadding: false,
        label: 'Age',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: false,
        label: 'City',
    }
];

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
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
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, handleDeleteDialog, handleAdd } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Employees
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete Employees">
                    <IconButton onClick={handleDeleteDialog}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add Employee">
                    <Button variant='outlined' endIcon={<AddIcon />} onClick={handleAdd}>Add</Button>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function CommonTable(props: { employeeData: Employees[] }) {
    const { employeeData } = props;

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('age');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [clicked, setClicked] = React.useState<string | null>(null);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isDialog, setIsDialog] = useState({
        isAddEditDialogOpen: false,
        isDeleteDialogOpen: false,
    });

    const rows = employeeData?.map((item) => {
        return createData([<EditIcon onClick={() => handleEdit(item.id!)} />, <DeleteIcon onClick={() => handleDeleteIcon(item.id!)} />], item.id!, item.employeeName, item.email, item.age, item.city)
    })

    const openModal = (open: boolean, key: string) => {
        setIsDialog((prevState) => ({ ...prevState, [key]: open }));
    };

    const handleAdd = () => {
        openModal(true, "isAddEditDialogOpen");
    };

    const handleEdit = (selectedItem: string) => {
        openModal(true, "isAddEditDialogOpen")
        setSelectedId(selectedItem)
    }

    const handleDeleteIcon = (clickedItem: string) => {
        openModal(true, "isDeleteDialogOpen");
        setClicked(clickedItem);
    }

    const handleDeleteDialog = () => {
        openModal(true, "isDeleteDialogOpen");
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator<Data>(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );


    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={4} sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} handleDeleteDialog={handleDeleteDialog} handleAdd={handleAdd} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                onClick={(event) => handleClick(event, row.id)}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.actions}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.employeeName}
                                        </TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.age}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {isDialog.isAddEditDialogOpen && (
                <AddEditEmployeeDialog
                    open={isDialog.isAddEditDialogOpen}
                    id={selectedId}
                    handleClose={() => {
                        openModal(false, "isAddEditDialogOpen")
                        setSelectedId(null);
                    }}
                />
            )}
            {isDialog.isDeleteDialogOpen && (
                <DeleteEmployeeDialog
                    open={isDialog.isDeleteDialogOpen}
                    handleClose={() => {
                        openModal(false, "isDeleteDialogOpen");
                        setClicked(null);
                        setSelected([]);
                    }}
                    clickedData={clicked}
                    selectedData={selected}
                    allEmployees={employeeData}
                />)
            }
        </Box>
    );
}