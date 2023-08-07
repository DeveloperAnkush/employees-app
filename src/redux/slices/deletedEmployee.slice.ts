import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employees } from "../../utils/types";

interface DeletedEmployeeState {
  deletedEmployeeData: Employees[];
}

const initialDeletedState: DeletedEmployeeState = {
  deletedEmployeeData: [],
};

export const deletedEmployeesSlice = createSlice({
  name: "deletedEmployees",
  initialState: initialDeletedState,
  reducers: {
    addDeletedEmployee: (state, action: PayloadAction<Employees>) => {
      state.deletedEmployeeData = [
        ...state.deletedEmployeeData,
        action.payload,
      ];
    },
    addAllDeleteEmployeeData: (state, action: PayloadAction<Employees[]>) => {
      let deletedData = [...state.deletedEmployeeData, ...action.payload];
      state.deletedEmployeeData = deletedData;
    },
  },
});

export const { addDeletedEmployee, addAllDeleteEmployeeData } =
  deletedEmployeesSlice.actions;
export default deletedEmployeesSlice.reducer;
