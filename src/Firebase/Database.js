import { db } from "./Firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  deleteDoc,
  query,
  collectionGroup,
} from "firebase/firestore";

const user = localStorage.getItem("user_uid");
export async function addWatchedFirebase(anime, rating) {
  try {
    const docRef = await doc(db, `users/${user}/watched/${anime}`);
    setDoc(
      docRef,
      {
        rating: rating,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addWatchingFirebase(anime) {
  try {
    const docRef = await doc(db, `users/${user}`);
    setDoc(
      docRef,
      {
        watching: arrayUnion(anime),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addNotInterestedFirebase(anime) {
  try {
    const docRef = await doc(db, `users/${user}`);
    setDoc(
      docRef,
      {
        not_interested: arrayUnion(anime),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteWatchedFirebase(anime) {
  try {
    const docRef = await deleteDoc(doc(db, "users", user, "watched", anime));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteWatchingFirebase(anime) {
  try {
    const docRef = await doc(db, `users/${user}`);
    setDoc(
      docRef,
      {
        watching: arrayRemove(anime),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteNotInterestedFirebase(anime) {
  try {
    const docRef = await doc(db, `users/${user}`);
    setDoc(
      docRef,
      {
        not_interested: arrayRemove(anime),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserAnimeDataFirebase() {
  try {
    const watchedData = [
      { watched: [] },
      { watching: [] },
      { not_interested: [] },
    ];
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    const readData = await getDocs(collection(db, `users/${user}/watched`));

    if (docSnap.exists()) {
      readData.forEach((item) =>
        watchedData[0].watched.push([item.id, item.data()])
      );
      watchedData[1]["watching"] = docSnap.data().watching;
      watchedData[2]["not_interested"] = docSnap.data().not_interested;
    } else {
      console.log("No such user!");
    }
    return watchedData;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
