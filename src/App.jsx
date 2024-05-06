import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import { savePersonName, deletePerson, updatePerson, getPersons } from "./users";
import { savePersonName, deletePerson, updatePerson, getPersons } from "./db/users";
import { db } from "./core/service/firebase/firebase";


function App() {

  const [personId, setPersonId] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personLast, setPersonLast] = useState(null);
  const [personBorn, setPersonBorn] = useState(null);
  const [persons, setPersons] = useState(null);

  //  useEffect(() => {
  //    getUsersCallBack();
  //  }, []);

  //  let getUsersCallBack = async () => {
  //    let response = await readUsers(db);
  //    console.log("response ", response);
  //    setUsers(response); // Almacenar los usuarios en el estado
  //  };

  const savePerson = async () => {
    await savePersonName(personName, personLast, personBorn);
    getPersonsData();
  }

  useEffect(() => {
    getPersonsData();
  }, []);

  const getPersonsData = async () => {
    const p = await getPersons();
    console.log(p.docs[0].data());
    setPersons(p.docs);
  }

  const removePerson = async () => {
    await deletePerson(personId);
    getPersonsData();

  }
  const updatePersonData = async () => {
    await updatePerson(personId, personName, personLast, personBorn); // Esperar a que se haga el update porque es asincrona
    getPersonsData(); // Se hace de nuevo la consulta para mostrar los datos nuevos
  }
  return (   
     <>
    <div>
      <input type="text" onChange={e => setPersonId(e.target.value)} placeholder="Identificación" />
      <input type="text" onChange={e => setPersonName(e.target.value)} placeholder="Nombre" />
      <input type="text" onChange={e => setPersonLast(e.target.value)} placeholder="Apellido" />
      <input type="text" onChange={e => setPersonBorn(e.target.value)} placeholder="Nacimiento" />
      <div>
        <button onClick={savePerson}> Guardar</button>
        <button onClick={removePerson}> Eliminar</button>
        <button onClick={updatePersonData}> Actualizar</button>
      </div>
      {
        persons && persons.map(p => <p>{p.id} - {p.data().name} - {p.data().last} - {p.data().born}</p>)
      }
    </div>   

     </>
  );
}

export default App;
