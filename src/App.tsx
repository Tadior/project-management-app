import '../src/mainStyles/main.scss';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes/AppRoute';

export const store = setupStore();

function App() {
  return (
    <div className="App">
      {
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      }
    </div>
  );
}

export default App;
