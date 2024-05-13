import { useEffect, useState } from "react";

import "./Admin.css";
//import { savePersonName, deletePerson, updatePerson, getPersons } from "./users";
import { saveTorneo, getTorneo, deleteTorneo, updateTorneo } from "./db/users";
import { db } from "./core/service/firebase/firebase";

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

import { storage } from "./core/service/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { v4 } from "uuid";


import { getImageUrlByName } from "./core/service/firebase/storage";
//import { url } from "node:inspector";


function Admin() {

  const [torneoId, setTorneoId] = useState(null);
  const [torneoName, setTorneoName] = useState(null);
  const [torneoFecha, setTorneoFecha] = useState(null);
  const [torneoCantidad, setTorneoCantidad] = useState(null);
  const [torneos, setTorneos] = useState(null);

  const [torneoImagen, setTorneoImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState('');

  const saveTorneoData = async () => {
    const url = await uploadImage();
    await saveTorneo(torneoName, torneoFecha, torneoCantidad, url);
    getTorneoData();
  }

  useEffect(() => {
    getTorneoData();
  }, []);

  const getTorneoData = async () => {
    const p = await getTorneo();
    console.log(p.docs[0].data());
    setTorneos(p.docs);
  }

  const removeTorneo = async () => {
    await deleteTorneo(torneoId);
    getTorneoData();

  }
  const updateTorneoData = async () => {
    await updateTorneo(torneoId, torneoName, torneoFecha, torneoCantidad); // Esperar a que se haga el update porque es asincrona
    getTorneoData(); // Se hace de nuevo la consulta para mostrar los datos nuevos
  }

  // const uploadImage = async () => {
  //   if (torneoImagen == null) return;
  //   const imageRef = ref(storage, `images/${torneoImagen.name}`);
  //   const snapshot = await uploadBytes(imageRef, torneoImagen);
  //   const url = await getDownloadURL(snapshot.ref);
  //   setImagenURL(url);
  //   console.log(url);
  //   console.log(imagenURL);
  //   alert("imagen subida");
  // };

  const uploadImage = async () => {
    if (torneoImagen == null) return null;
    const imageRef = ref(storage, `images/${torneoImagen.name}`);
    const snapshot = await uploadBytes(imageRef, torneoImagen);
    const url = await getDownloadURL(snapshot.ref);
    alert("imagen subida");
    return url;
  };

  return (   
     <>
    <div className="fondo">

      <div className="torneos">
        <h1 className="titulo">Torneos Admin</h1>
      </div>

      <div>
        <input className="input" type="text" onChange={e => setTorneoId(e.target.value)} placeholder="Id" />
        <input className="input" type="text" onChange={e => setTorneoName(e.target.value)} placeholder="Nombre Torneo" />
        <input className="input" type="text" onChange={e => setTorneoFecha(e.target.value)} placeholder="Fecha Limite" />
        <input className="input" type="text" onChange={e => setTorneoCantidad(e.target.value)} placeholder="Cantidad Max" />


        <div className="botones">
          <button onClick={saveTorneoData}> Guardar</button>
          <button onClick={removeTorneo}> Eliminar</button>
          <button onClick={updateTorneoData}> Actualizar</button>

          {/* 
          <button onClick={uploadImage}>Subir Imagen</button> */}
          {/* <input className="inputImagen" type="file"/> */}

          <div class="inputImagenContainer">
            <label class="inputImagenBoton">
              <i class="fa-solid fa-magnifying-glass"></i>

              <input class="inputImagen" type="file"
                onChange={(event) => {
                  setTorneoImagen(event.target.files[0]);
                }} />

            </label>
          </div>

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
                        <MDBCardText>{p.id}</MDBCardText>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBCard>
                )}
            </MDBRow>
          </MDBContainer>
        </div>

        {/* <table className="table table-hover table-dark">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {torneos && torneos.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.data().name}</td>
            <td>{p.data().fecha}</td>
            <td>{p.data().cantidad}</td>
          </tr>
        ))}
      </tbody>
    </table> */}

        {/* 
      {
        torneos && torneos.map(p =>
           <p>{p.id} - {p.data().name} - {p.data().fecha} - {p.data().cantidad}</p>)
      } */}


      </div>
    </div>  

     </>
  );
}

export default Admin;