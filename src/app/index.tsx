import RouterGate from '../router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <RouterGate />
        </Provider>
    );
};

export default App;