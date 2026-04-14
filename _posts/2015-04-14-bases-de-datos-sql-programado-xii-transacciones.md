---
title: Bases de datos. SQL programado (XII). Transacciones
description: Introducción a las transacciones en MySQL con el principio ACID, niveles de aislamiento, COMMIT y ROLLBACK con ejemplos prácticos por línea de comandos.
author: Inazio Claver
date: 2015-04-14 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, transacciones, acid, commit, rollback]
pin: false
math: false
mermaid: false
---

La idea de transacción es un conjunto de operaciones SQL que, o se realizan todas, o no se realiza ninguna.

Un ejemplo de transacción sería una transferencia bancaria. Descuentas de una cuenta e incrementas el dinero en otra. Se han de realizar ambas; si el sistema se cuelga no puede hacerse ninguna de ellas.

Todas las transacciones deben cumplir el principio **ACID** (Atomic Consistent Isolated Durable). Es decir:

- **Atómica (Atomic).** Se han de aplicar todas las operaciones de la transacción, o no se ejecuta ninguna.
- **Consistente (Consistent).** Después de la transacción la base de datos debe quedar en un estado consistente, es decir, con los datos correctamente almacenados.
- **Aislada (Isolated).** Una transacción no debe interferir con otras transacciones que se estén llevando a cabo de forma simultánea.
- **Permanente (Durable).** Se deben mantener los datos para que perduren en el tiempo, aun cuando la base de datos o el equipo fallen.

## Niveles de aislamiento

Determinan la manera en la que las transacciones de una sesión pueden afectar a los datos recuperados o accedidos por otra sesión.

- **Lectura no confirmada.** El nivel más bajo. Permite que una transacción pueda leer filas que todavía no han sido confirmadas (COMMIT). Aumenta el rendimiento pero no justifica que se pueda permitir a un usuario leer datos modificados por otro usuario cuando aún pueden deshacer dichas modificaciones.
- **Lectura confirmada.** Sólo se permite lectura de datos que han sido confirmados con COMMIT. Con este trabaja ORACLE.
- **Lectura repetible.** Nivel por defecto. Hasta que un usuario no haga un fin de transacción, no podrá ver los cambios realizados por otros usuarios.
- **Secuenciable.** Mayor nivel de aislamiento. No sólo bloquea las operaciones DML, sino hasta los propios SELECT. Es decir, no sólo bloquea las filas que estás modificando, sino también las que estás consultando.

## Ejemplo práctico

Vamos a trabajar por línea de comandos. Abrimos dos consolas de cliente por línea de comandos, y hacemos en ambas los siguientes pasos.

Lo primero es realizar un `select connection_id()` para que nos devuelva el identificador de usuario. Lo hacemos en ambas consolas.

```sql
select connection_id();
```

![Identificadores de conexión en dos consolas](/img/posts/20150414_1.png)

A continuación deshabilitamos en ambas sesiones el autocommit para controlar nosotros mismos las transacciones (es decir, para deshabilitar las lecturas no confirmadas). Lo hacemos en ambas consolas también.

```sql
set @@autocommit = 0;
-- Deshabilito el autocommit

show variables like 'autocommit'; -- veo si se han realizado los cambios
```

![Deshabilitando el autocommit en ambas sesiones](/img/posts/20150414_2.png)

Trabajemos ahora con el nivel por defecto de MySQL.

Ahora, realizo un update normal:

```sql
update alumnos set alumno = 'dos'
```

Y para confirmar los datos realizamos un:

```sql
commit;
```

Ahora, en la segunda consola, escribimos un `commit` y podremos ya ver los cambios modificados por otro usuario, y los nuestros también, por supuesto.

Ahora bien, si el primer usuario no quiere guardar los cambios realizados, usaremos el comando:

```sql
rollback;
```

Este comando deshace todas las modificaciones realizadas por la transacción.

Por supuesto, si el usuario dos intenta modificar una fila empleada por el usuario uno, la instrucción ejecutada por el usuario dos quedará en espera durante el tiempo especificado en el motor de la base de datos, confiando en que usuario uno termina su actualización antes de llegar al máximo permitido.

Para configurar el tiempo de espera, lanzamos un:

```sql
select variables;
```

![Configuración del tiempo de espera de bloqueo](/img/posts/20150414_3.png)
