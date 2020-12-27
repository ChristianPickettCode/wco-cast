import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Stream from './components/Stream';

function App() {
  return (
    <div className="App">
      <Router>
        <Stream />
      </Router>
    </div>
  );
}

export default App;
