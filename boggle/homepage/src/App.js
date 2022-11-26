import React from "react"
import './App.css';
import Homepage from './Homepage.js';
import {BrowserRouter, Routes, Route} from "react-router-dom"

/** Renders a single Homepage component
 *
 *  Props:
 *  -none
 *
 *  Stateless
 *
 *  App -> Homepage
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Homepage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
