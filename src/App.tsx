import '../src/mainStyles/main.scss';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes/AppRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainers } from './components/Toast/ToastContainers';
import { toast } from 'react-toastify';

export const store = setupStore();
toast('fdfdfdfdf', {
  containerId: 'error',
});
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
