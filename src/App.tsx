import './App.css';
import ToggleButton from './components/ToggleButton';

function App() {
  return (
    <div className="App">
      <ToggleButton
        style={{
          backgroundColor: '#000',
          borderRadius: 4,
          color: '#e6e6e6',
          fontSize: '1.5rem',
          padding: '0.5rem 1rem'
        }}
      />
    </div>
  );
}

export default App;
