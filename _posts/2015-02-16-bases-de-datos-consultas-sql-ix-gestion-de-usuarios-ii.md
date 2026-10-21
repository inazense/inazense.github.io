---
title: "Permisos por columna, contraseñas y REVOKE en MySQL"
description: "Más gestión de usuarios en MySQL: permisos a nivel de columna, creación de usuarios, cambio de contraseñas y revocación de privilegios con ejemplos."
author: Inazio Claver
date: 2015-02-16 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
redirect_from:
  - /2015/02/bases-de-datos-consultas-sql-ix-gestion.html
---

*Parte de la serie «Consultas SQL» (IX).*

Continuamos con la gestión de usuarios en SQL.

Permisos a nivel de columna, asignando `select` y `update` solo sobre la columna `nombre`:

```sql
grant select (nombre),
update (nombre),
insert
on practica3.clientes
to PEPE;
```

Permisos totales sobre una tabla:

```sql
grant all
on bad.clientes
to PEPE;
```

Creación de usuario con permisos y contraseña mediante `identified by`:

```sql
grant update, insert, select
on db52.clientes
to visitante@localhost
identified by 'visitante';
```

Cambio de contraseña de un usuario mediante la tabla `mysql.user`:

```sql
update mysql.user
set Password = password('pepito')
where user = 'visitante'
and host = 'localhost';
```

Asignación de permisos a múltiples usuarios en diferentes hosts:

```sql
grant update, insert, select
on db52.departamentos
to visitante@localhost,
yo@localhost identified by 'yoMismo',
tu@equipo.remoto.com identified by 'tuMismo';
```

Permisos a nivel de columna con acceso desde dominio con comodín:

```sql
grant update (apellido, oficio), insert, select
on db52.empleados 
to visitante@'%.empresa.com' identified by 'pepito',
visitante@'%' identified by 'pepito',
visitante2@'localhost' identified by 'pepe2';
```

Permisos con `WITH GRANT OPTION` para que el usuario pueda delegar sus permisos:

```sql
grant update, insert, select, create
on db52
to visitante@localhost
with grant option;
```

Privilegios administrativos con límites de conexiones y consultas:

```sql
grant all
on *.*
to operador@localhost identified by 'OP'
with MAX_CONNECTIONS_PER_HOUR 3
MAX_QUERIES_PER_HOUR 300
MAX_UPDATES_PER_HOUR 30;
```

Revocación de permisos específicos:

```sql
revoke insert, update
on db52.clientes
from visitante@localhost;
```

Revocación de todos los permisos:

```sql
revoke all
on db52
from visitante@localhost;
```
