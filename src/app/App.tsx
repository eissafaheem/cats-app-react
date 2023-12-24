import store from '../redux/store';
import './App.css';
import AppRouting from './App.routing';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>

      <div className="App">
        <AppRouting />
      </div>
    </Provider>
  );
}

export default App;
