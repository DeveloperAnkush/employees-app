import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/header';
import AllEmployees from '../pages/allEmployees/allEmployees';
import DeletedEmployees from '../pages/deletedEmployees/deletedEmployees';

const RouterGate = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/employees-app' element={<AllEmployees />} />
                <Route path='/deleted-employees' element={<DeletedEmployees />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterGate;