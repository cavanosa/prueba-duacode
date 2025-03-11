# Prueba Duacode

## 1. Instrucciones para la Instalación

### Tecnologías empleadas para el Frontend:
- **Node**: v22.14.0
- **Angular CLI**: 19.2.0
- **Package Manager**: npm 10.9.2
- **Bootstrap**: v5.3.3
- **CSS**
- **Visual Studio Code**

### Pasos para comprobar las versiones:
- Para comprobar la versión de **Node**, tecleamos:

  ```bash
  node -v
- Para comprobar la versión de **Angular**, tecleamos:

  ```bash
  ng version
- Clonamos el repositorio y lo abrimos con el editor. Con la consola de comandos situados en el mismo directorio, tecleamos:

  ```bash
  npm install
- Una vez instalados los `node_modules`, ya podemos abrir el proyecto en el navegador. Tecleamos:

  ```bash
  ng serve
- Vamos al navegador y se verá en **http://localhost:4200**.

- Si tecleamos:

  ```bash
  ng serve -o
  
## AVISO IMPORTANTE:

Para conectar el frontend con el backend hay que realizar los siguientes cambios:

- En `/src/app/services/chat.service.ts`:

- Donde pone:

  ```ts
  private chatUrl = 'backend/chat';
  

- Lo sustituimos por:

  ```ts
  private chatUrl = 'NUESTRA URL DEL BACKEND DEL CHAT';

- En `/src/app/services/user.service.ts`:

- Donde pone:

  ```ts
  private usersUrl = 'backend/users';
  

- Lo sustituimos por:

  ```ts
  private usersUrl  = 'NUESTRA URL DEL BACKEND DE USERS';


## 2. Descripción del Proyecto

Este proyecto implementa un CRUD básico así como un CHATBOT que también permite realizar las operaciones CRUD.  
Aparte del frontend, implementé y desplegué en la nube un pequeño backend con una base de datos que permite obtener los resultados ordenados y paginados. El chatbot lo implementé con la API de OpenAI y langchain4j. En la base de datos se guardaron los registros proporcionados como ejemplo en las instrucciones de la prueba, en la URL [https://reqres.in](https://reqres.in).

### Tecnologías empleadas en el backend:
- **Java**: v23
- **Apache Maven**: v3.9.9
- **Springboot**
- **JPA**
- **H2 Database**
- **OpenAI**
- **langchain4j**
- **IntelliJ IDEA Community Edition**

### Descripción de las vistas del frontend y sus funcionalidades:

#### - Vista de Lista:
Se ven los usuarios. Al cargar esta vista, aparecen dos. Si le damos al botón **'ver más'**, se despliega la lista y muestra cuatro, dado que la base de datos sólo contiene 12 usuarios.

Arriba de todo aparece el menú de navegación que muestra tres elementos: **Lista**, **Nuevo Usuario** y **Chatear**.

Justo debajo de este menú, a la izquierda, hay dos botones que permiten alternar entre la vista de lista y la vista de tarjetas.

Más abajo hay un formulario horizontal que nos permite elegir, por medio de botones, el orden de la lista (por **nombre**, **apellido** o **email**) así como cambiar el orden alfabético (ascendente o descendente) por medio de dos **radio buttons**.

A continuación, se muestra la lista de usuarios, bien en una tabla con un usuario por fila o en las tarjetas de cada usuario según se haya seleccionado en el menú. En cada registro aparece:
- El **avatar**,
- El **email**,
- El **nombre** y los **apellidos** del usuario,
- Un **botón** para ir a la vista **'detalle'**, donde se muestran los datos completos.

Tanto en la tabla como en las tarjetas aparecerán dos o cuatro usuarios, dependiendo de si se ha pulsado o no el botón **'ver más'**.

En la parte inferior, hay un menú de paginación con los botones:
- **Ir al inicio** (primera página),
- **Ir al final** (última página),
- **Avanzar una página**,
- **Retroceder una página**.

También aparecen los números de cada página, que nos permiten ir a una en concreto.

#### - Vista Detalle:
Arriba de todo aparece el menú de navegación que muestra cuatro elementos: **Lista**, el **nombre del usuario** que estamos viendo, **Nuevo Usuario** y **Chatear**.

Los datos del usuario se ven de arriba a abajo:
1. **Foto del avatar**,
2. **Nombre**,
3. **Frase** (o lema favorito),
4. **Correo**,
5. **Nombre completo** con el apellido,
6. **URL personal**.

En la parte inferior de la tarjeta aparece un grupo de dos botones:
- **Editar**, que nos conduce a la vista de edición,
- **Eliminar** al usuario.

Si pulsamos **Eliminar**, aparecerá un cuadro de diálogo para confirmar si de verdad deseamos eliminarlo. Si le damos a **Cancelar**, no hará nada y permanecerá en la vista de detalle; en caso de eliminarlo, mostrará un aviso de que el usuario ha sido eliminado con éxito y nos redirigirá a la lista de usuarios.

#### - Vista Nuevo Usuario:
Arriba de todo aparece el menú de navegación que muestra tres elementos: **Lista**, **Nuevo Usuario** y **Chatear**.

En esta vista aparece un formulario con seis campos correspondientes a:
1. **Email**,
2. **Nombre**,
3. **Apellido**,
4. **Avatar** (una URL),
5. **URL personal**,
6. **Frase**.

En la parte inferior aparecen los botones **Enviar** y **Reset**. El botón **Enviar** permanecerá inactivo mientras queden campos vacíos.

Se realizan varias comprobaciones:
- Que el **email** sea una dirección válida de correo. En caso contrario, aparece un aviso en rojo en la parte inferior del campo.
- Si la dirección de correo se corresponde con la de otro usuario, el backend enviará un error diciendo que ese correo ya existe y se mostrará un aviso en rojo en la parte superior de la vista.
- Si el **nombre** o el **apellido** son espacios en blanco, también se mostrará un mensaje de error en la parte inferior de los campos correspondientes.
- La **URL del avatar** corresponde a una API fake de avatares, así que debe empezar por `https://i.pravatar.cc/` y al final deberá llevar un número entre 1 y 1000. De no ser así, se mostrará el error. (Las imágenes de esta API cambian de forma aleatoria en la vista).
- La **URL personal** debe ser una URL válida. En caso contrario, se muestra el error correspondiente. Por defecto, este input viene con una URL escrita, ya que, al ser una aplicación de prueba, puede resultar engorroso completar este campo.
- La **frase personal** tampoco puede quedar en blanco, este campo viene completado también por defecto.

El botón **Enviar** crea el nuevo usuario que se guardará en el backend y, una vez hecho, se mostrará un mensaje en la parte superior de la vista en donde se nos informa de que el usuario ha sido creado con éxito.

El botón de **Reset** deja todos los campos vacíos excepto los de avatar, URL y texto.

#### - Vista Editar Usuario:
Arriba de todo aparece el menú de navegación que muestra cuatro elementos: **Lista**, **Editar**, **Nuevo Usuario** y **Chatear**.

La vista es exactamente igual a la de **Crear un Usuario**, excepto que los campos aparecen completados con los atributos del usuario y no hay botón de **Reset**.

El botón de **Editar** estará inhabilitado si hay campos vacíos.

La **URL del avatar** ya no está restringida a `https://i.pravatar.cc/`, aunque sí debe ser una URL válida.

Se muestran los mismos mensajes de error que en la vista de **Nuevo Usuario**.

Una vez actualizado el usuario, muestra el mensaje de que ha sido **actualizado** con éxito.

#### - Vista Chat:
Arriba de todo aparece el menú de navegación que muestra tres elementos: **Lista**, **Nuevo Usuario** y **Chatear**.

Esta vista consta de un formulario con tres **inputs** y un **botón**:
1. El primer elemento, un **text input**, corresponde al **nombre** que utiliza OpenAI para memorizar la conversación (quién eres).
2. El segundo elemento, un **textarea**, sería para formular la **consulta**.
3. El tercer elemento, otro **textarea**, muestra la **respuesta del chatbot**.

Se le puede pedir:
- Una **lista** con el número de elementos que deseemos y ordenada a partir de los campos **nombre**, **apellido** o **email**. Si le pedimos solo la lista, antes de enviarla nos preguntará cuántos elementos deseamos y si deberían ir en algún orden. Si le decimos que no, enviará la lista completa.
- Información de un **usuario**. Nos pedirá el **ID** del usuario y nos devolverá sus datos.
- Crear un **usuario nuevo**. Habrá que facilitarle todos los campos. Si el **email** ya existe o hay algún campo no válido (URLs, email), nos dirá que no se ha podido crear el usuario.
- Actualizar un **usuario**. Será necesario al menos pasarle un parámetro (nombre, apellido, etc). Si el **email** ya existe o hay algún campo no válido (URLs, email), nos dirá que no se ha podido actualizar el usuario.
- También permite **eliminar usuarios**. Pedirá el **ID** y nos pedirá que confirmemos si realmente deseamos eliminar al usuario.












