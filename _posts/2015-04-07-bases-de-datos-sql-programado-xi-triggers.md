---
title: Bases de datos. SQL programado (XI). Triggers
description: Introducción a los triggers en MySQL con ejemplos de INSERT, DELETE y UPDATE sobre tablas sincronizadas y de auditoría.
author: Inazio Claver
date: 2015-04-07 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, triggers]
pin: false
math: false
mermaid: false
---

Los Triggers son programas que se ejecutan automáticamente en respuesta a algún suceso ocurrido en la base de datos. En MySQL se corresponden con instrucciones DML (INSERT, UPDATE, DELETE).

Suponen un mecanismo para asegurar la integridad de los datos, o como método para auditar bases de datos. No hay que abusar de su utilización pues ello puede traer consigo una sobrecarga del sistema.

La sintaxis de los Trigger es:

![Sintaxis de un trigger en MySQL](/img/posts/20150407_1.png)

Veamos unos ejemplos para entenderlo.

![Ejemplo de trigger de inserción](/img/posts/20150407_2.png)

En este caso, el trigger uno nos indicará que para cada fila, antes de realizar una inserción en la tabla `alumnos`, realizará la sentencia que pone en la línea 7, es decir, insertarlo también en la tabla `alumnos_replica`.

Es decir, en el supuesto de que un usuario ejecute la siguiente sentencia:

```sql
insert into alumnos values(6, 'alumno6');
```

Se habrán ejecutado las siguientes dos sentencias:

```sql
insert into alumnos_replica values(6, 'alumno6');
insert into alumnos values(6, 'alumno6');
```

Habiéndose ejecutado la primera instrucción automáticamente.

Ciertamente, lo correcto hubiera sido realizarlo con un `after`, es decir, insertar la fila en la tabla `alumnos` y DESPUÉS crear la entrada en `alumnos_replica`, aunque el orden, dentro de lo que cabe, no importa mucho, ya que o se ejecutan las dos sentencias o no se ejecutará ninguna.

Para realizar ese cambio, no se puede hacer como tal; habrá que borrar el trigger con:

```sql
drop trigger nombreDeTrigger;
```

Y deberemos volver a crearlo y compilarlo.

El siguiente ejemplo es de un borrado:

![Ejemplo de trigger de borrado](/img/posts/20150407_3.png)

Aquí, cada vez que estemos borrando una fila en la tabla `alumnos`, haremos lo mismo en la tabla `alumnos_replica`.

Para ello, llamaremos a los valores viejos de los campos determinados con `old.campo`.

Así mismo, al hacer un `INSERT` tiene sentido preguntar por los nuevos datos introducidos con `new.campo`, pero en un `UPDATE` sí tiene sentido preguntar tanto por los campos viejos como por los nuevos.

Es decir, algo tal que así:

![Ejemplo de trigger de actualización con old y new](/img/posts/20150407_4.png)
