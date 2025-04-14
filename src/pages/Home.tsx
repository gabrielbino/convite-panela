import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import PresenceForm from '../components/PresenceForm.tsx';
import GiftList from '../components/GiftList.tsx';
import PixSection from '../components/PixSection.tsx';
import { Guest, Gift } from '../types';

interface HomeProps {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
}

export default function Home({ guests, setGuests, gifts, setGifts }: HomeProps) {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminAccess = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate('/admin');
    } else {
      alert('Senha incorreta');
    }
  };

  return (
    <div>
      <div className="flex justify-end p-4">
        {!isPasswordVisible ? (
          <button
            className="text-sm text-blue-600 underline"
            onClick={() => setIsPasswordVisible(true)}
          >
            Entrar como admin
          </button>
        ) : (
          <div className="flex gap-2 items-center">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-1 rounded text-sm"
            />
            <button
              onClick={handleAdminAccess}
              className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
            >
              Entrar
            </button>
          </div>
        )}
      </div>

      <Header
        bride="Kristielly"
        groom="Daniel"
        date="2025-06-07"
        location="Chácara Timoneiro, Serra"
      />
      
      <PixSection pixKey="27992342095" />

      <div className="max-w-2xl mx-auto p-4">
        <GiftList
          guest={guest}
          gifts={gifts}
          setGifts={setGifts}
          isAdmin={false}
        />
        
        <PresenceForm onSubmit={(name, email) => {
          const newGuest = { name, email };
          setGuests([...guests, newGuest]);
          setGuest(newGuest);
          }} 
        />
      </div>
    </div>
  );
}
