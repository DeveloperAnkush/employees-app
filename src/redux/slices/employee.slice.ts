import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employees } from "../../utils/types";

interface EmployeeState {
  employeeData: Employees[];
}

const initialState: EmployeeState = {
  employeeData: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeData: (state, action: PayloadAction<Employees>) => {
      state.employeeData = [...state.employeeData, action.payload];
    },
    updateEmployeeData: (state, action: PayloadAction<Employees>) => {
      const updatedEmployee = action.payload;
      const index = state.employeeData.findIndex(
        (employee) => employee.id === updatedEmployee.id
      );

      if (index !== -1) {
        state.employeeData[index] = updatedEmployee;
      }
    },
    deleteEmployeeData: (state, action: PayloadAction<string | string[]>) => {
      const payload = action.payload;
      if (typeof payload === "string") {
        state.employeeData = state.employeeData.filter(
          (employee) => employee.id !== payload
        );
      } else if (Array.isArray(payload)) {
        state.employeeData = state.employeeData.filter(
          (employee) => !payload.includes(employee.id!)
        );
      }
    },
  },
});

export const { setEmployeeData, updateEmployeeData, deleteEmployeeData } =
  employeeSlice.actions;
export default employeeSlice.reducer;
