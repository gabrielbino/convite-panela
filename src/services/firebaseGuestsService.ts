import { db } from './firebaseService.ts';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { normalizeName } from '../utils/utils.ts';

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

    // Se a pessoa está escolhendo presente
    if (giftId !== undefined && !allowMultiple) {
      // Verificar se já existe alguém com esse giftId
      const q = query(guestsRef, where('giftId', '==', giftId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        throw new Error('Este presente já foi escolhido por outro convidado.');
      }
    }

    const existingSnapshot = await getDocs(query(guestsRef, where('normalizedName', '==', normalizedId)));

    if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];
      await updateDoc(doc(db, 'guests', existingDoc.id), {
        confirmed: true,
        gift: giftName ?? existingDoc.data().gift ?? null,
        giftId: giftId ?? existingDoc.data().giftId ?? null,
        timestamp: new Date(),
      });
    } else {
      await addDoc(guestsRef, {
        name,
        normalizedName: normalizedId,
        confirmed,
        gift: giftName || null,
        giftId: giftId || null,
        timestamp: new Date(),
      });
    }

    console.log('Convidado salvo com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar convidado:', error);
    throw error; // Importante lançar o erro para o componente capturar
  }
}
