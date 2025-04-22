import { normalizeName } from '../utils/utils.ts';
import { db } from './firebaseService.ts';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';

export async function checkDuplicateGuestByName(name: string): Promise<boolean> {
  const snapshot = await getDocs(collection(db, 'guests'));
  return snapshot.docs.some(doc =>
    normalizeName(doc.data().name) === normalizeName(name)
  );
}

export async function saveGuest(
  name: string,
  confirmed: boolean,
  giftName?: string,
  giftId?: number,
  allowMultiple?: boolean
): Promise<void> {
  try {
    const normalizedId = normalizeName(name);
    const guestsRef = collection(db, 'guests');

    // Se o presente permite múltiplos, sempre adiciona novo documento
    if (allowMultiple) {
      await addDoc(guestsRef, {
        name,
        normalizedName: `${normalizedId}-${Date.now()}`, // evita duplicação
        confirmed,
        gift: giftName || null,
        giftId: giftId || null,
        timestamp: new Date()
      });
      console.log("Convidado salvo com presente múltiplo.");
      return;
    }

    // Presente único — checa se já existe
    const q = query(guestsRef, where('normalizedName', '==', normalizedId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existingDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'guests', existingDoc.id), {
        confirmed: true,
        gift: giftName ?? existingDoc.data().gift ?? null,
        giftId: giftId || null,
        timestamp: new Date()
      });
    } else {
      await addDoc(guestsRef, {
        name,
        normalizedName: normalizedId,
        confirmed,
        gift: giftName || null,
        giftId: giftId || null,
        timestamp: new Date()
      });
    }

    console.log("Convidado salvo com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar convidado:", error);
  }
}