import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingScreen from '../screens/landingscreen/LandingScreen';
import VinylList from '../screens/vinylList/VinylList';
import NotFound from '../components/NotFound/NotFound';
import VinylDetail from '../components/vinylDetail/VinylDetail';

function AppRoutes() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingScreen/>} />
                <Route path='/list' element={<VinylList />} />
                <Route path='/list/:id' element={<VinylDetail />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes
