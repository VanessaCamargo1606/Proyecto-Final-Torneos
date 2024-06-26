import { useEffect, useState } from "react";

import "./Admin.css";
import { saveTorneo, getTorneo, deleteTorneo, updateTorneo } from "./db/users";
import { db } from "./core/service/firebase/firebase";
import { addDoc, doc, collection, getDocs, deleteDoc, updateDoc, query, getDoc } from "firebase/firestore";

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

import Button from "@mui/material/Button";

import { storage } from "./core/service/firebase/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getImageUrlByName } from "./core/service/firebase/storage";



function Admin() {

  const [torneoId, setTorneoId] = useState(null);
  const [torneoName, setTorneoName] = useState(null);
  const [torneoFecha, setTorneoFecha] = useState(null);
  const [torneoCantidad, setTorneoCantidad] = useState(null);
  const [torneos, setTorneos] = useState(null);

  const [torneoImagen, setTorneoImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState('');
  //const [imagen, setImagen] = useState('');

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

  /***ACTUALIZAR IMAGEN****/

  const updateTorneoData = async (torneoId) => {
    await updateById(torneoId, torneoName, torneoFecha, torneoCantidad, torneoImagen); // Esperar a que se haga el update porque es asincrona
    getTorneoData(); // Se hace de nuevo la consulta para mostrar los datos nuevos
  }

  const updateById = async (id, nombre, date, cant, newImageFile) => {
    try {
      // Obtener la URL de la imagen existente desde Firestore
      const docRef = doc(db, "Torneos", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      // Eliminar la imagen antigua
      const oldImageUrl = data.url;
      const oldFileName = getFileNameFromUrl(oldImageUrl);
      const oldImageRef = ref(storage, `images/${oldFileName}`);
      await deleteObject(oldImageRef);

      // Subir la nueva imagen al almacenamiento
      const newFileName = newImageFile.name;
      const newImageRef = ref(storage, `images/${newFileName}`);
      await uploadBytes(newImageRef, newImageFile);

      // Obtener la URL de descarga de la nueva imagen
      const newImageUrl = await getDownloadURL(newImageRef);


      // Actualizar la URL de la imagen en Firestore
      await updateDoc(docRef, { name: nombre, fecha: date, cantidad: cant, url: newImageUrl });

      // Obtener los datos actualizados de la imagen
      //getImagenData();
      alert("Datos actualizados");

      console.log(`Imagen con ID ${id} actualizada en el almacenamiento y Firestore`);
    } catch (error) {
      console.error("Error actualizando la imagen:", error);
    }
  };


  // Método para eliminar la imagen del almacenamiento de Firebase
  const removeTorneoData = async (id) => {

    const url = await getImageUrlById(id);
    console.log(url);
    const fileName = getFileNameFromUrl(url);
    console.log(fileName);
    const imageRef = ref(storage, `images/${fileName}`);
    await deleteObject(imageRef);


    // Obtener referencia a la subcolección 'participantes'
    const participantesRef = collection(db, "Torneos", id, "Participantes");
    const q = query(participantesRef);
    const querySnapshot = await getDocs(q);

    // Eliminar todos los documentos en la subcolección 'participantes'
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Eliminar los documentos de Torneos
    await deleteDoc(doc(db, "Torneos", id));
    console.log(`Imagen con ID ${id} eliminada del almacenamiento y Firestore`);
  };

  const removeTorneo = async (torneoId) => {
    await removeTorneoData(torneoId);
    getTorneoData();
  }

  const uploadImage = async () => {
    if (torneoImagen == null) return null;
    const imageRef = ref(storage, `images/${torneoImagen.name}`);
    const snapshot = await uploadBytes(imageRef, torneoImagen);
    const url = await getDownloadURL(snapshot.ref);
    alert("imagen subida");
    return url;
  };

  // Método para obtener la URL de la imagen de Firestore por ID
  const getImageUrlById = async (id) => {
    const docRef = doc(db, "Torneos", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data().url;
  };

  // Método para obtener el nombre de la imagen desde la url
  const getFileNameFromUrl = (url) => {
    console.log("URL recibida para extraer nombre de archivo:", url); // Verificar la URL recibida
    const decodedUrl = decodeURIComponent(url);
    console.log("URL decodificada:", decodedUrl); // Verificar la URL decodificada
    const parts = decodedUrl.split('/');
    const fileName = parts[parts.length - 1].split('?')[0];
    console.log("Nombre del archivo extraído:", fileName); // Verificar el nombre del archivo extraído
    return fileName;
  };

  return (   
     <>
    <div className="fondo">

      <div className="torneos">
        <h1 className="titulo">Torneos Admin</h1>
      </div>

      <div>

        <input className="input" type="text" onChange={e => setTorneoName(e.target.value)} placeholder="Nombre Torneo" />
        <input className="input" type="text" onChange={e => setTorneoFecha(e.target.value)} placeholder="Fecha Limite" />
        <input className="input" type="text" onChange={e => setTorneoCantidad(e.target.value)} placeholder="Cantidad Max" />


        <div className="botones">
          <button onClick={saveTorneoData}> Guardar</button>



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
                        {/* <MDBCardText>{p.id}</MDBCardText> */}
                        <div style={{ display: 'flex', gap: '10px', width: '300px', height: '40px', marginLeft: '-50px' }}>
                          <MDBBtn onClick={() => updateTorneoData(p.id)} >Actualizar</MDBBtn>
                          <MDBBtn onClick={() => removeTorneo(p.id)} > Eliminar</MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBCard>
                )}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>  

     </>
  );
}

export default Admin;