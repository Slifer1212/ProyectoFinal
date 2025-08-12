import { collection, addDoc, serverTimestamp, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebase';

export const postService = {
  async createPost(postData, user) {
    const userDoc = await getDocs(query(collection(db, 'users')));
    let userData = null;
    
    userDoc.forEach((doc) => {
      if (doc.id === user.uid) {
        userData = doc.data();
      }
    });
    
    const newPost = {
      title: postData.title,
      content: postData.content,
      authorId: user.uid,
      authorEmail: user.email,
      authorName: userData ? `${userData.nombre} ${userData.apellido}` : user.email.split('@')[0],
      timestamp: serverTimestamp()
    };
    
    await addDoc(collection(db, 'posts'), newPost);
  }
};