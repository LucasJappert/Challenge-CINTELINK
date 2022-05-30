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
8. ✅ Usar el sistema y motor de base de datos que prefiera, y explicar por qué tomó su decisión:
--> Se optó por SQL Server ya que en toda mi experiencia siempre me gustó trabajar con herramientas de Microsoft. Además de eso, me parece que tiene una alta escabilidad, perfecta respuesta ante una gran cantidad de peticiones y, habiendo creado una estructura sólida (índices, PKs, FKs, etc), permite manipular datos de forma segura y rápida.
9. ✅ Lenguaje a discreción, preferentemente Node Js o PHP:
--> Se optó por Node JS ya que es, junto a .NET, el entorno que suelo usar cotidianamente. De manera profesional (en el trabajo actual) se trabaja todo con .NET, pero particularmente prefiero Node JS.
- EXTRAS:
1. ✅ Implementación de un sistema de audit logging: Se usó un logging propio acompañado con Bunyan para persistir algunos logs en archivos físicos.
2. ✅ Generar un método de deploy de la aplicación: ver en el readme del proyecto [api](https://github.com/LucasJappert/Challenge-CINTELINK/tree/master/api). Se podría haber configurado un yml para que deploye automáticamente a Azure (que es donde mayor experiencia tengo), pero allí  el servicio de base de datos no es gratuito.
3. ☐ Testing: Quedaría para otra etapa por falta de tiempo, pero se podrían haber implementado tests tanto unitarios como de integración con Jest. También lo ideal hubiera sido trabajar bajo la metodología TDD.
4. ☐ DevOps: También hubiera sido ideal trabajar con alguna plataforma que ofrezca servicios de devops, como Azure, planificando todas las etapas del proyecto, proyectando esfuerzos y completando el circuito de US. Como así también, trabajar con todo lo que engloba la integración contínua, creación de Pull Requests, tests automáticos, etc.

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
