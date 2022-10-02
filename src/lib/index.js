import {
  getAuth,
  // onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  getFirestore,
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
} from './firebase.js';

import { app } from './configuration.js';

const db = getFirestore(app);

const provider = new GoogleAuthProvider(app);

// function userStateChanged() {
//     const auth = getAuth(app);
//     onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// }

export function registerWithEmailAndPassword(name, email, password) {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, {
      displayName: name,
    }));
}

export function loginWithEmailAndPassword(email, password) {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
  const auth = getAuth(app);
  return signInWithPopup(auth, provider);
}

export function resetPassword(email) {
  const auth = getAuth(app);
  return sendPasswordResetEmail(auth, email);
}

export const createPost = async (textPost) => {
  const auth = getAuth(app);
  try {
    const docRef = await addDoc(collection(db, 'post'), {
      author: auth.currentUser.uid,
      data: Date.now(),
      // tag: category,
      text: textPost,
      like: [],
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export const postById = async (idPost) => {
  const docRef = doc(db, 'post', idPost);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const like = async (idPost, idUser) => {
  const likePost = await postById(idPost);
  const likes = likePost.like;
  const userLiked = likes.indexOf(idUser);

  if (userLiked !== -1) {
    likes.splice(userLiked, 1);
  } else {
    likes.push(idUser);
  }

  await updateDoc(doc(db, 'post', idPost), {
    like: likes,
  });
};
