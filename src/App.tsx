import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import { Guest, Gift } from './types';

export default function App() {
  const [confirmedGuests, setConfirmedGuests] = useState<Guest[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: 'Liquidificador Arno Power Max', taken: false },
    { id: 2, name: 'Jogo de Panelas Tramontina', taken: false },
    { id: 3, name: 'Vale Spa para casal', taken: false },
  ]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              guests={confirmedGuests}
              setGuests={setConfirmedGuests}
              gifts={gifts}
              setGifts={setGifts}
            />
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
