import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employee.slice";
import deletedEmployeesReducer from "./slices/deletedEmployee.slice";

const rootReducer = combineReducers({
    employee: employeeReducer,
    deletedEmployees: deletedEmployeesReducer
});

const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : {};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState, // Set the initial state from localStorage
})

store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
