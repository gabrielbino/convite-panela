import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import { Guest, Gift } from './types';
import { initialGifts } from './data/giftList.ts';

export default function App() {
  const [confirmedGuests, setConfirmedGuests] = useState<Guest[]>([]);
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);

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
