# Client
El cliente se desarrolló con vue 2 y cuenta con una pantalla de inicio (login), y 2 secciones más según el rol del usuario logueado.

## Setup del proyecto
```
- npm install --> Instala las dependencias que necesitará el proyecto.
- npm run dev --> Corre el servidor en dev.
- npm run build  --> Compila y minifica, llevando todo a la carpeta dist.
- npm run lint --> Comprueba y arregla archivos.
```

### Observaciones
1. Pantalla de inicio:
<img alt="Lucas Jappert's LinkedIN" width="300px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img1.PNG" />

2. Por defecto, el backend crea un usuario con rol "admin". El username es "ADMIN" y accediendo con este, se tendrá acceso a la manipulación de notificaciones, es decir, se podrán crear o eliminar notificaciones.
<img alt="Lucas Jappert's LinkedIN" width="800px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img2.PNG" />

3. Los demás usuarios se irán creando desde el login ingresando solamente el username. Todos estos serán usuarios de rol "user". Estos accederán a una sección donde podrán ver los canales a los cuales podrán subscribirse/desubscribirse, ver su historial de notificaciones y también contarán con una funcionalidad de notificaciones instantáneas.
<img alt="Lucas Jappert's LinkedIN" width="800px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img3.PNG" />  





