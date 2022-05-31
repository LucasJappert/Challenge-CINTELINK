# 📡 Proyecto API 📡
El server (api) se desarrolló utilizando node js + express, como herramientas principales.
Las demás dependencias, como mssql, bunyan, etc, pueden revisarse en las dependencias del package.

⚡El server cuenta con un manejo de caché interna (services/cacheManager), la cual es utilizada para, principalmente, reducir el uso del motor sql.
Por otra parte, brinda mayor respuesta ante peticiones GETs ya que no tiene que buscar datos en la DB.
De esta manera se logra una respuesta en tiempos óptimos, incluso ante un gran tráfico de peticiones.

## Setup del proyecto
Asegurarse de estar en el path "./api". Es decir, en la terminal, estando en el root del proyecto general, ejecutar el comando "cd api". Luego de esto ya podemos ejecutar los siguientes:
```
- npm install --> Instala las dependencias que necesitará el proyecto.
- npm run dev ⚠ --> Corre el servidor en dev en el puerto 2000 (configurado en el archivo .env).
- npm run build  --> Compila y minifica, llevando todo a la carpeta dist.
- npm run start ⚠ --> Corre el comando build y además ejecuta el server.js creado en la carpeta dist.
```

## ⚠ Configs ⚠
1. Antes de correr los comandos remarcados arriba, necesitamos crear la base de datos corriendo las querys del script que se encuentra en la carpeta "db/scripts/initial-idempotent-scripts.sql". Lo que harán esas querys es crear la base de datos, crear un usuario de login, crear tablas y algunos datos de prueba.
<img alt="Lucas Jappert's LinkedIN" width="400px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img5.PNG" />

2. Luego de haber creado la base de datos, configurar el archivo "db/development.js" para que el server apunte a la base local. Debería quedar similar a esto:
<img alt="Lucas Jappert's LinkedIN" width="400px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img6.PNG" />


### Observaciones
- Una vez instaladas las dependencias y habiendo levantado el server (con npm run dev o start), deberíamos poder comprobar cómo el server está corriendo en un determinado puerto y apuntando a una determinada base de datos:
<img alt="Lucas Jappert's LinkedIN" width="600px" src="https://github.com/LucasJappert/lucasjappert/blob/main/images/img4.PNG" />
