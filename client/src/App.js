import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersistentDrawerLeft from './components/index';
import Upload from './pages/Upload';
import Relatorio from './pages/Relatorio';
import Politica from './pages/Politica';



function App () {
  
    return (
      <Router>
        <Routes>
          <Route path="/"  element={<PersistentDrawerLeft />}/>
          <Route path="/Upload"  element={<Upload />}/>
          <Route path="/Relatorio"  element={<Relatorio />}/>
          <Route path="/Politica"  element={<Politica />}/>
        </Routes>
      </Router>
    );
}

export default App;
