import React from "react";

import Admin from "./Admin";
import Usuario from "./Usuario";
import "./Home.css";


import { app } from "./core/service/firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  MDBBtn,
} from "mdb-react-ui-kit";

const auth = getAuth(app);

function Home({ user }) {
  return (
    <div>

      <div className="home">
        <div className="homeTitulo">Home</div>

        <MDBBtn onClick={() => signOut(auth)} className="boton-button"> Cerrar sesión</MDBBtn>

      </div>
      
      {user.rol === "admin" ? <Admin /> : <Usuario currentUser={user} />}


    </div>

  );
}

export default Home;