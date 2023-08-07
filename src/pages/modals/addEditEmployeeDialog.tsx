import * as React from 'react';
import { v4 as uuidv4 } from "uuid";
//Material UI Components Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Grid, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//React-hook-form and Validation Schema Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditEmployeeSchema } from '../../utils/validation';
//Types and Dispatch Slices Import
import { Employees } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeData, updateEmployeeData } from '../../redux/slices/employee.slice';
import { RootState } from '../../redux/store';

const Transition = React.forwardRef<unknown, TransitionProps & SlideProps>((props, ref) => {
    const { children, ...rest } = props;
    return <Slide direction="up" ref={ref} {...rest}>{children}</Slide>;
});

type PropTypes = {
    open: boolean;
    handleClose: () => void
    id: string | null;
}

export default function AddEditEmployeeDialog(props: PropTypes) {
    let dispatch = useDispatch()
    const { open, handleClose, id } = props;
    const scroll = "paper";

    const employee_list: Employees[] = useSelector((state: RootState) => state.employee.employeeData);
    let filterResult = employee_list?.find((cv: Employees) => cv.id === id)

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<Employees>({
        resolver: yupResolver(addEditEmployeeSchema),
        mode: "all",
        reValidateMode: "onChange",
    })

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const onSubmit = (data: Employees) => {
        if (!id) {
            // Generate anID for a new record
            const newId = uuidv4();
            const slicedId = newId.split("-")[0];
            data.id = slicedId;

            // Dispatch the add action for new record
            dispatch(setEmployeeData(data));
        } else {
            // If editing an existing employee, dispatch the update action
            dispatch(updateEmployeeData(data));
        }
        handleClose()
    }

    React.useEffect(() => {
        if (id) {
            reset(filterResult)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant='h5'>{id ? "Edit" : "Add"} Employee</Typography>
                    <CloseIcon onClick={handleClose} />
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} mb={2}>
                                    <Controller
                                        name="employeeName"
                                        control={control}
                                        render={({ field }) => (

                                            <TextField
                                                id="outlined-controlled"
                                                label="Name"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                }}
                                                error={Boolean(errors.employeeName)}
                                                helperText={
                                                    errors?.employeeName ? errors.employeeName?.message : null
                                                }
                                            />

                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} mb={2}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (

                                            <TextField
                                                id="outlined-controlled"
                                                label="Email"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                }}
                                                error={Boolean(errors.email)}
                                                helperText={
                                                    errors?.email ? errors.email?.message : null
                                                }
                                            />

                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} mb={2}>
                                    <Controller
                                        name="age"
                                        control={control}
                                        render={({ field }) => (

                                            <TextField
                                                id="outlined-controlled"
                                                label="Age"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                }}
                                                error={Boolean(errors.age)}
                                                helperText={
                                                    errors?.age ? errors.age?.message : null
                                                }
                                            />

                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} mb={2}>
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                id="outlined-controlled"
                                                label="City"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                }}
                                                error={Boolean(errors.city)}
                                                helperText={
                                                    errors?.city ? errors.city?.message : null
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant='outlined' onClick={() => handleSubmit(onSubmit)()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}