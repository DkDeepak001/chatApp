import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";import SignUp from './components/login/SignUp';

function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route exact path="/sign" element={<SignUp />}></Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
