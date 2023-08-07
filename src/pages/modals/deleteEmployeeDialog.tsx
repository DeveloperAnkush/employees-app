import * as React from 'react';
//Material UI Components Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//Types or Dispatch Slices Import
import { useDispatch } from 'react-redux';
import { deleteEmployeeData } from '../../redux/slices/employee.slice';
import { Employees } from '../../utils/types';
import { addDeletedEmployee, addAllDeleteEmployeeData } from '../../redux/slices/deletedEmployee.slice';

const Transition = React.forwardRef<unknown, TransitionProps & SlideProps>((props, ref) => {
    const { children, ...rest } = props;
    return <Slide direction="left" ref={ref} {...rest}>{children}</Slide>;
});

type Props = {
    open: boolean;
    handleClose: () => void
    selectedData: string[];
    clickedData: string | null;
    allEmployees: Employees[]
}

export default function DeleteEmployeeDialog(props: Props) {
    const dispatch = useDispatch();
    const { open, handleClose, selectedData, clickedData, allEmployees } = props;

    const handleDelete = () => {
        let formData: string | string[];
        if (clickedData) {
            formData = clickedData;
            let filterData: Employees | undefined = allEmployees?.find((cv: Employees) => cv.id === clickedData);
            if (filterData) {
                dispatch(addDeletedEmployee(filterData));
            }
            dispatch(deleteEmployeeData(formData));
        } else if (selectedData.length > 0) {
            formData = selectedData;
            let allFilterDeletedEmp: Employees[] = selectedData
                .map((cv: string) => allEmployees?.find((cvs) => cv === cvs.id))
                .filter((item): item is Employees => !!item);
            dispatch(addAllDeleteEmployeeData(allFilterDeletedEmp));
            dispatch(deleteEmployeeData(formData));
        }
        handleClose();
    };


    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant='h5'>Delete Employee</Typography>
                    <CloseIcon onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}