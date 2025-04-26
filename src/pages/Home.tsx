import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import PresenceForm from '../components/PresenceForm.tsx';
import GiftList from '../components/GiftList.tsx';
import PixSection from '../components/PixSection.tsx';
import { Guest, Gift } from '../types';
import { collection, getDocs } from 'firebase/firestore';
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
    const fetchGifts = async () => {
      const snapshot = await getDocs(collection(db, 'guests'));
  
      const updatedTaken = snapshot.docs
        .map(doc => doc.data())
        .filter(data => data.giftId !== undefined && data.giftId !== null) // Agora usamos o giftId!
        .map(data => data.giftId);
  
      const updated = gifts.map(gift => ({
        ...gift,
        taken: updatedTaken.includes(gift.id),
        chosenBy: updatedTaken.includes(gift.id)
          ? snapshot.docs.find(doc => doc.data().giftId === gift.id)?.data().name
          : undefined,
      }));
  
      setGifts(updated);
    };
  
    fetchGifts();
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
        groom="Daniel"
        bride="Kristielly"
        date="2025-05-24"
        location="Rua Presidente Tancredo Almeida Neves, 1 - Vista da Penha, Vila Velha"
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
