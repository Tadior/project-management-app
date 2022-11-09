import Example from './components/Example/Example';
import '../src/mainStyles/main.scss';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
const store = setupStore();
function App() {
  return (
    <div className="App">
      {
        <Provider store={store}>
          <Example />
        </Provider>
      }
    </div>
  );
}

export default App;
