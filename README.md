# 📲 SISTEMA DE NOTIFICACIONES REAL-TIME 📲

Consiste en un sistema de notificaciones instantáneas para usuarios de una plataforma, en la cual usuarios podrán subscribirse a diferentes secciones.
Por otra parte, un usuario ADMIN será el encargado de coordinar la carga y envío de notificaciones, enlazadas a una sección, las cuales serán enviadas a todos los usuarios subscriptos a esa sección.

### FUNCIONALIDADES/REQUISITOS PROPUESTOS
1. ✅ Las notificaciones deben incluir mínimamente un timestamp y un mensaje.
2. ✅ Las notificaciones deben ser persistentes en el tiempo.
3. ✅ Cada usuario debe poder marcar a cada notificación como “leída”, y también
eliminarlas.
4. ✅ Cada usuario debe poder acceder a su historial de notificaciones.
5. ✅ Las notificaciones “leídas” deben seguir apareciendo en el historial de un usuario.
6. ✅ Las notificaciones tienen un tag, y los usuarios deciden mediante estos suscribirse a los canales indicados en el tag, para enterarse cuando suceda un evento relacionado a ese tag.
7. ✅ Las notificaciones deben poder ser para un usuario específico, y no deben ser accesibles por otros.
8. ✅ Usar el sistema y motor de base de datos que prefiera, y explicar por qué tomó su decisión.
9. ✅ Lenguaje a discreción, preferentemente Node Js o PHP.
- EXTRAS:
1. ✅ Implementación de un sistema de audit logging: Se usó un logging propio acompañado con Bunyan para persistir algunos logs en archivos físicos.

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
