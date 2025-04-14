import { db } from './firebaseService.ts';
import { collection, addDoc } from 'firebase/firestore';

export async function saveGuest(
  name: string,
  email: string,
  confirmed: boolean,
  gift?: string
): Promise<void> {
  try {
    await addDoc(collection(db, 'guests'), {
      name,
      email,
      confirmed,
      gift: gift || null,
      timestamp: new Date()
    });
    console.log("Convidado salvo com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar convidado:", error);
  }
}
