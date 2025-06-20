# Proyecto Final Torneos (React + Firebase)

Este proyecto es una plataforma web desarrollada con React y Firebase que permite gestionar torneos deportivos. Incluye autenticación de usuarios, panel de administración, CRUD de torneos y almacenamiento de imágenes en la nube.

## Características principales

- Registro e inicio de sesión de usuarios con Firebase Auth  
- Panel de administrador para crear, editar y eliminar torneos  
- Panel de usuario para visualizar torneos disponibles  
- Subida y visualización de imágenes con Firebase Storage  
- Persistencia de datos con Firebase Firestore  
- Interfaz moderna con MDB React UI Kit y Bootstrap  

---

## Instalación y configuración

### 1. Clona este repositorio

```bash
git clone https://github.com/VanessaCamargo1606/Proyecto-Final-Torneos.git
cd Proyecto-Final-Torneos
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura Firebase

Este proyecto ya incluye un archivo `firebase.js` funcional. Sin embargo, si deseas usar tu propia cuenta de Firebase, sigue estos pasos:

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
- Activa los siguientes servicios:
  - Authentication (modo correo y contraseña)
  - Cloud Firestore (modo de prueba al inicio)
  - Firebase Storage
- Reemplaza las credenciales en `firebase.js` con las de tu proyecto  
  **Si dejas las credenciales actuales, no podrás acceder a la base de datos ni al almacenamiento, ya que el acceso está restringido por reglas de seguridad.**

---

### 4. Inicia la aplicación

```bash
npm start
```
