import Header from './Header';
import Home from './Home';
import { DataProvider } from './DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Home />
      </DataProvider>
    </div>
  );
}

export default App;
