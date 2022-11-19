import '../src/mainStyles/main.scss';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes/AppRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainers } from './components/Toast/ToastContainers';

export const store = setupStore();
function App() {
  return (
    <div className="App">
      {
        <Provider store={store}>
          <AppRoutes />
          <ToastContainers />
        </Provider>
      }
    </div>
  );
}

export default App;
