import Login from './components/Login.jsx';
import './App.css';
import SignUp from './components/SignUp.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navbar/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
