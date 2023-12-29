import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FightersPage } from './pages/FightersPage'
import { FighterFormPage } from './pages/FighterFormPage'
import { BattlePage } from './pages/BattlePage'
import { Navigate } from 'react-router-dom'
import { Navigation } from './components/Navigation'



function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/fighters" />} />
        <Route path="/fighters" element={<FightersPage />} />
        <Route path="/fighters-create" element={<FighterFormPage />} />
        <Route path="/fighters/:id" element={<FighterFormPage />} />
        <Route path="/battle" element={<Navigate to="/battle/0/0" />} />
        <Route path="/battle/:id1/:id2" element={<BattlePage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
