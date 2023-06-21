import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
