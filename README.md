# Meeting-o-Matic

## Aclaración por Promoción

Este documento fue hecho para el trabajo de la cursada. Las funcionalidades agregadas para el TP de Promoción están aclaradas debidamente.

## ¿Cómo lo levanto?

El sistema está dividido en dos repos: uno para el backend y otro para el frontend.

* En ambos correr `npm install` para instalar las dependencias.
* En el **backend**, correr `npm start` para levantar la API en *localhost:3000*.
* En el **frontend**, correr `ng serve -o` para levantar el sistema en *localhost:4200*.

Aclaración: para la comunicación del front con el back, se utilizó **openapi-generator-cli**, una CLI que analiza la especificación Open API que genera el backend y desarrolla en typescript todos los controllers para iteractuar con los endpoints. Debido a algunar fallas que tiene el SDK, el código generado (que se encuentra en el directorio *destino*) fue modificado con respecto al original. Así que si uno corre el comando `npm run open-api`, puede que algunas funcionalidades no anden como deberían. Por lo tanto, se sugiere no correr el comando y dejar el directorio *destino* como está.

## Funcionalidades

### Públicas
Estas funcionalidades pueden ser realizadas por un usuario "guest", es decir, no es necesario estar ni logueado ni registrado.

* Crear un evento y agregar invitados
* Definir la configuración del evento: única opción, invitados dinámicos y resultados públicos/privados.
* Obtener (por única vez) el link para el evento y, opcionalmente, el link para los resultados. Aclaración: si en el momento de la confirmación del evento, el usuario que lo creó no guardó el link del mismo, no podrá volver a ver el evento.
* Ingresar, a través de un link, a un evento específico. Deberá ingresar la contraseña para ver los detalles y poder guardar sus elecciones.
* **[Promoción]** Iniciar sesión con su cuenta de Google

### Privadas
Estas funcionalidades las puede realizar un usuario logueado.

* Crear un evento y agregar invitados
* Definir la configuración del evento: única opción, invitados dinámicos y resultados públicos/privados.
* Obtener, las veces que haga falta, el link del mismo para enviárselo a los invitados
* Ver los eventos creados y sus resultados.
* Modificar el evento.
* Agregar nuevos invitados una vez que ya fue creado el evento.
* Desactivar un evento. Esto hace que los invitados no puedan guardar sus elecciones.
* Clonar eventos. Replica un evento particular con su configuración, invitados, opciones, nombre y descripción en un solo click.
* **[Promoción]** Convertirse en usuario Premium haciendo un pago por MercadoPago. Ser usuario premium sale $150 y permite crear una cantidad ilimitada de eventos por ese mes. Más información acerca de la integración con MercadoPago más abajo.

### Administración

* Ver todos los usuarios
* Ver todos los eventos creados.
* Eliminar usuarios y eventos.

## Base de Datos e información

El backend está configurado para usar un cluster en mongocloud. En él se encuentran las colecciones ya armadas y con datos de ejemplo. Existe el usuario 'admin@admin.com' con contraseña 'admin', el único que puede ver los listados totales de eventos y usuarios.

Además, como ejemplo se puede loguear con 'fer@gmail.com' con contraseña '123123'.

**[Promoción]** El usuario anterior ya es PREMIUM. Para ver un usuario que no sea premium, loguearse con prueba2@gmail.com con contraseña '123123'.

## Integración con MercadoPago

**[Promoción]**

Para poder hacer la prueba de convertirse en premium, se debe loguear con un usuario de prueba en [el sitio de MercadoPago](https://www.mercadopago.com.ar/). Este usuario de prueba vendedor se comunicará con el usuario de prueba comprador que está asociado al sitio. Las credenciales son las siguientes:

```
Email: test_user_31984560@testuser.com
Password: qatest7652
```

Independientemente del usuario que esté logueado en Meeting-o-Matic, al hacer click en el botón PREMIUM en el inicio se efectuará el pago ficticio de la suscripción mensual.

El pago lo debe realizar con los datos de la siguiente tarjeta de crédito ficticia:

```
Número: 5031 7557 3453 0604
Código de seguridad: 123
Fecha de vencimiento: 11/25
Nombre del titular: APRO
DNI: 12312312
```

En caso de probar esta funcionalidad localmente, se debe poner en true el flag por código en el archivo del backend `mercadopago.controller.ts` en la línea 21.

## Ambiente de producción

**[Promoción]**

La URL del sitio en producción es https://main.dxsifmsfqs4t0.amplifyapp.com/

Se usa la misma Base de Datos en mongocloud para producción y desarrollo, así que los usuarios, eventos y demás entidades que se hagan local estarán en producción y viceversa.

El frontend del sitio está alojado en [AWS Amplify](https://aws.amazon.com/es/amplify/) utilizando una CI/CD automática por commits. La elección de la misma fue por ya conocimiento de la herramienta y fácil uso para hacer deploys de estáticos.

El backend del sitio está alojado en [Heroku](https://heroku.com). No tiene una CI/CD armada, por lo que los deploys se hacen manualmente desde el dashboard de la aplicación REST.

### Esquema 

![](src/assets/images/esquema.jpg)
