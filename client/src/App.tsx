import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/page-components/LandingPage/LandingPage';
import Home from './components/page-components/Home/Home';
import Description from './components/page-components/Description/Description';
import Form from './components/page-components/Form/Form';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={LandingPage} />
          <Route path='/videogames' element={Home} />
          <Route path='/videogames/:id' element={Description} />
          <Route path='/form' element={Form} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
