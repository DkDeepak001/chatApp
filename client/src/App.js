import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './components/login/SignUp';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/sign" element={<SignUp />}></Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
