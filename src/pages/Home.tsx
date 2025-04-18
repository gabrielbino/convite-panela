import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import PresenceForm from '../components/PresenceForm.tsx';
import GiftList from '../components/GiftList.tsx';
import PixSection from '../components/PixSection.tsx';
import { Guest, Gift } from '../types';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseService.ts';

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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'guests'), (snapshot) => {
      const updatedTaken = snapshot.docs
        .map(doc => doc.data())
        .map(data => data.gift)
        .filter(gift => typeof gift === 'string');
  
      const updated = gifts.map(gift => ({
        ...gift,
        taken: updatedTaken.includes(gift.name),
        chosenBy: updatedTaken.includes(gift.name) ? gift.chosenBy : undefined,
      }));
  
      setGifts(updated);
    });
  
    return () => unsubscribe();
  }, [gifts, setGifts]);

  const handleAdminAccess = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate('/admin');
    } else {
      alert('Senha incorreta');
    }
  };
  
  return (
    <div>
      <Header
        bride="Kristielly"
        groom="Daniel"
        date="2025-06-07"
        location="Chácara Timoneiro, Serra"
        onAdminClick={handleAdminAccess}
        isPasswordVisible={isPasswordVisible}
        password={password}
        setPassword={setPassword}
      />

      <PixSection pixKey="27992342095" />

      <div className="max-w-2xl mx-auto p-4">
        <GiftList
          guest={guest}
          gifts={gifts}
          setGifts={setGifts}
          isAdmin={false}
        />

        <PresenceForm onSubmit={(name) => {
          const newGuest = { name };
          setGuests([...guests, newGuest]);
          setGuest(newGuest);
        }} />
      </div>
    </div>
  );
}
