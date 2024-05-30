import React, { useState } from "react";
import { db } from "./core/service/firebase/firebase";
import { app } from "./core/service/firebase/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const auth = getAuth(app);

function Login() {
  //   const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [usuario, setUsuario] = useState(null);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(db, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
    setUsuario(email);

  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("submit", email, password, rol);

    if (isRegistrando) {
      // registrar
      registrarUsuario(email, password, rol);
      alert("usuario registrado");
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password);


    }
  }

  return (<div>
    <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>
    <Box sx={{ mb: 4 }} />

    <MDBCard style={{ width: '300px', height: '320px' }}>
      <form onSubmit={submitHandler}>
        <label>
          Correo electrónico:
            <MDBInput input type="email" id="email" />
        </label>
        <Box sx={{ mb: 2 }} />

        <label>
          Contraseña:
            <MDBInput input type="password" id="password" />
        </label>
        <Box sx={{ mb: 2 }} />

        <label>
          Rol:
          {/* form-select es parte de Bootstrap, que mdb-react-ui-kit extiende y estiliza */}
          <select id="rol" className="form-select">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>
        <Box sx={{ mb: 2 }} />

        <MDBInput input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesión"}
          style={{
            backgroundColor: '#1976d2', // Color de fondo azul
            color: 'white',             // Color del texto
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}

        />
      </form>
      <Box sx={{ mb: 5 }} />

      <Button onClick={() => setIsRegistrando(!isRegistrando)} variant="contained" style={{ width: '235px' }}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}

      </Button>
    </MDBCard>

  </div>
  );

}

export default Login;