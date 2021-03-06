import './App.css';
import Header from './components/NavBar/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import Landing from './Pages/Landing';
import "react-slideshow-image/dist/styles.css";


function App() {
  return (
    <div className="App">
      <Router>

      <Header />
      <Landing />

      </Router>

    </div>
  );
}

export default App;
