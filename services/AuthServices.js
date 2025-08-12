import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const authService = {
  async register(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      usuario: email.split("@")[0],
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: email,
      createdAt: serverTimestamp(),
    });

    return userCredential.user;
  },

  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
  },
};
