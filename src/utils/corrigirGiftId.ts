import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseService.ts';
import { initialGifts } from '../data/giftList.ts';

export async function corrigirGiftId(): Promise<string> {
  const guestsRef = collection(db, 'guests');
  const snapshot = await getDocs(guestsRef);

  let totalCorrigido = 0;

  for (const guestDoc of snapshot.docs) {
    const data = guestDoc.data();
    if (!data.giftId && data.gift) {
      const matchedGift = initialGifts.find(g => g.name === data.gift);
      if (matchedGift) {
        await updateDoc(doc(db, 'guests', guestDoc.id), {
          giftId: matchedGift.id,
        });
        totalCorrigido++;
      }
    }
  }

  return `${totalCorrigido} registros corrigidos com giftId.`;
}
