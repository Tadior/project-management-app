import '../src/mainStyles/main.scss';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { AppRoutes } from './routes/AppRoute';

const store = setupStore();
function App() {
  return (
    <div className="App">
      {
        <Provider store={store}>
          <WelcomePage />
          <AppRoutes />
        </Provider>
      }
    </div>
  );
}

export default App;
