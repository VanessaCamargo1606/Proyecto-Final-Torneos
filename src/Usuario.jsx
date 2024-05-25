import React from "react";
import { useEffect, useState } from "react";
import { getTorneo } from "./db/users";

import "./Admin.css";

import { db } from "./core/service/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

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
} from "mdb-react-ui-kit";

function Usuario({ currentUser }) {

  const [torneos, setTorneos] = useState(null);
  

  useEffect(() => {
    getTorneoData();
  }, []);

  const getTorneoData = async () => {
    const p = await getTorneo();
    console.log(p.docs[0].data());
    setTorneos(p.docs);
    
  }

  const registrarEnTorneo = async (torneoId) => {   

    const registroRef = collection(db, `Torneos/${torneoId}/Participantes`);
    await addDoc(registroRef, { userId: currentUser.uid, email: currentUser.email });
    alert("Te has registrado en el torneo");
  };


  return (   
    <>
    <div className="fondo">  

      <div className="torneos">
        <h1 className="titulo">Torneos Actuales</h1>
      </div>

      <div className="m-2">
          <MDBContainer >
            <MDBRow className="row-cols-1 row-cols-md-4 g-4">
              {
                torneos && torneos.map(p =>
                  <MDBCard key={p.id}>
                    <MDBCol size="md" className="mx-5">
                      <MDBCardImage src={p.data().url} position="top" alt="..." style={{ width: '200px', height: 'auto', marginLeft: '-16px' }} />
                      <MDBCardBody>
                        <MDBCardTitle>{p.data().name}</MDBCardTitle>
                        <MDBCardText>{p.data().fecha}</MDBCardText>
                        <MDBCardText>{p.data().cantidad}</MDBCardText>
                        {/* <MDBCardText>{p.id}</MDBCardText> */}
                        <MDBBtn onClick={() => registrarEnTorneo(p.id)}>Registrar</MDBBtn>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBCard>
                )}
            </MDBRow>
          </MDBContainer>          
        </div>

    </div>  

     </>
  );


}

export default Usuario;