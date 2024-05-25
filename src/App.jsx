import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Admin from "./Admin";

import Home from "./Home";
import Login from "./Login";

import { db } from "./core/service/firebase/firebase";  // importar la base de datos
import { app } from "./core/service/firebase/firebase"; // importar la aplicacion

 import { getAuth, onAuthStateChanged } from "firebase/auth";
 import { getFirestore, doc, getDoc } from "firebase/firestore";

 const auth = getAuth(app );
//const firestore = getFirestore(app);


 function App() {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true); // Añadir estado de carga

   async function getRol(uid) {
     const docuRef = doc(db, `usuarios/${uid}`);
     const docuCifrada = await getDoc(docuRef);
     const infoFinal = docuCifrada.data().rol;
     return infoFinal;
   }

   function setUserWithFirebaseAndRol(usuarioFirebase) {
     getRol(usuarioFirebase.uid).then((rol) => {
       const userData = {
         uid: usuarioFirebase.uid,
         email: usuarioFirebase.email,
         rol: rol,
       };
       setUser(userData);
       setLoading(false); // Terminar la carga
       //console.log("userData final", userData);
     });
   }

   useEffect(() => { // función para evitar un bucle infinito
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        if (!user) {
          setUserWithFirebaseAndRol(usuarioFirebase);
        }
      } else {
        setUser(null);
        setLoading(false); // Terminar la carga incluso si no hay usuario
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga
  }

  //  onAuthStateChanged(auth, (usuarioFirebase) => {
  //    if (usuarioFirebase) {
  //      //funcion final

  //      if (!user) {
  //        setUserWithFirebaseAndRol(usuarioFirebase);
  //      }
  //      setUser(null);
  //    }
  //  });

  //return <Admin />

   return <>{user ? <Home user={user} /> : <Login />} </>; // si se inició sesión con un usuario mostrar home sino login
}

export default App;
