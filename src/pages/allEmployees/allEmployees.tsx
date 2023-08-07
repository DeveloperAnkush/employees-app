import { useSelector } from 'react-redux';
import CommonTable from '../../components/table/table';
import { RootState } from '../../redux/store';
import { Employees } from '../../utils/types';
import { Box } from '@mui/material';

const AllEmployees = () => {
    const employee_list: Employees[] = useSelector((state: RootState) => state.employee.employeeData);
    return (
        <Box sx={{ marginTop: "80px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px" }}>
            <CommonTable employeeData={employee_list} />
        </Box>
    );
};

export default AllEmployees;