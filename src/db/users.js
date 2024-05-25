import { addDoc, doc, collection, getDocs, deleteDoc, updateDoc, query, getDoc } from "firebase/firestore";
import { db } from "../core/service/firebase/firebase";


//  async function readUsers(db) {
//    const querySnapshot = await getDocs(collection(db, "users"));
//    let data = querySnapshot.docs;
//    let response = querySnapshot.docs.map((doc) => doc.data());
//    return response;
//  }

// async function addUser(db) {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Alan",
//       middle: "Mathison",
//       last: "Turing",
//       born: 1912,
//     });

//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

const saveTorneo = (name, fecha, cantidad, url) => {
  addDoc(collection(db, "Torneos"), { name, fecha, cantidad, url });
}

const getTorneo = async ()  => {
 const result = await getDocs(query(collection(db, "Torneos")));
 return result;
}

const deleteTorneo = async (id) => { // El id del que voy a borrar
  await deleteDoc(doc(db, "Torneos", id));
}

const updateTorneo = async (id, name, fecha, cantidad,url) => { // El id que quiero actualizar y su nuevo nombre
  await updateDoc(doc(db, "Torneos", id), { name, fecha, cantidad, url })
}


export { getTorneo, saveTorneo, deleteTorneo, updateTorneo };
