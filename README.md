# UserFlow

Esta es una aplicación web que utiliza varias bibliotecas y herramientas poderosas para manejar diferentes aspectos del desarrollo. El proyecto usa **Firebase** como base de datos, **ShadCN** como biblioteca de componentes, **Formik** y **Yup** para el manejo y validación de formularios, **Zustand** para la gestión del estado global, y **Axios** y **React Query** para interactuar con la API de Firebase.

## Tecnologías utilizadas

### Firebase

- **Firebase** se usa como la base de datos backend para almacenar y gestionar los datos de los usuarios. Se utilizan Firebase Authentication y Firestore para la autenticación y el almacenamiento de datos.

### ShadCN

- **ShadCN** se usa como una biblioteca de componentes UI para construir componentes personalizados y responsivos de manera eficiente.

### Formik & Yup

- **Formik** se usa para manejar el estado y la presentación de formularios.
- **Yup** se usa junto con Formik para la validación de formularios, asegurando que los datos de entrada sean válidos antes de enviarlos.

### Zustand

- **Zustand** se utiliza para la gestión del estado global, proporcionando una forma sencilla de almacenar y gestionar el estado de la aplicación sin la complejidad de otras bibliotecas de gestión de estado.

### Axios & React Query

- **Axios** se usa para realizar solicitudes HTTP a la API de Firebase para leer y escribir datos.
- **React Query** se usa para la obtención de datos, almacenamiento en caché y sincronización con Firebase, proporcionando hooks para una gestión eficiente de los datos.

## Funcionalidades

- **Operaciones CRUD de usuarios**: Crear, leer, actualizar y eliminar usuarios directamente desde la base de datos de Firebase.
- **Validación de formularios**: Los formularios se validan utilizando Yup con Formik, asegurando que los datos de entrada sean correctos antes de enviarlos.
- **Gestión del estado global**: Zustand se usa para gestionar el estado global, facilitando el intercambio de estado entre componentes.
- **Obtención eficiente de datos**: Axios y React Query proporcionan una forma eficiente de interactuar con Firebase, asegurando que la aplicación se mantenga receptiva y los datos estén siempre actualizados.

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura Firebase:

   - Configurar el .env.local

3. Ejecuta el servidor de desarrollo:

   ```bash
   npm start
   ```
