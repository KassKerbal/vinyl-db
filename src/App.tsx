import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingScreen from './screens/landingscreen/LandingScreen';
import VinylList from './screens/vinylList/VinylList';
import NotFound from './components/NotFound/NotFound';
import VinylDetail from './components/vinylDetail/VinylDetail';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingScreen />} />
        <Route path='/list' element={<VinylList />} />
        <Route path='/list/:id' element={<VinylDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;