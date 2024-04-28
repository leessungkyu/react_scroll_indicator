import logo from './logo.svg';
import './App.css';
import ScrollIndicator from './components/scroll_indicator/scroll_indicator';

function App() {
  return (
    <div className="App">
      {/* https://dummyjson.com/products?limit=100 */}
      <ScrollIndicator url='https://dummyjson.com/products?limit=100' /> 
    </div>
  );
}

export default App;
