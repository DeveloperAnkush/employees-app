import { useSelector } from "react-redux";
import { Employees } from "../../utils/types";
import { RootState } from "../../redux/store";
import DeletedEmployeeTable from "../../components/table/deletedEmployeeTable";
import { Box } from "@mui/material";

const DeletedEmployees = () => {
    const deleted_employees_list: Employees[] = useSelector((state: RootState) => state.deletedEmployees.deletedEmployeeData);
    return (
        <Box sx={{ marginTop: "80px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px" }}>
            <DeletedEmployeeTable deletedEmployeeData={deleted_employees_list} />
        </Box>
    );
};

export default DeletedEmployees;