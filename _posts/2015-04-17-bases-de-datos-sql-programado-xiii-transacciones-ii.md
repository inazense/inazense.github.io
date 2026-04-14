---
title: Bases de datos. SQL programado (XIII). Transacciones (II)
description: Instrucciones de manejo de transacciones en MySQL&#58; START TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT y LOCK TABLES, con ejemplos prácticos.
author: Inazio Claver
date: 2015-04-17 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, transacciones, commit, rollback, savepoint]
pin: false
math: false
mermaid: false
---

## Instrucciones de manejo de transacciones

- **START TRANSACTION** — Empieza una nueva transacción, deja el commit a 0. Si hubiese habido algo de código previo a la transacción, éste se valida y comienza una nueva. Esto permite que se muestren los datos ya validados en el momento de realizar la transacción.

- **COMMIT** — Lo usaremos para grabar las operaciones y finalizar las transacciones.

![COMMIT](/img/posts/20150417_1.png)

- **ROLLBACK** — Deshace las operaciones de la transacción y la finaliza. Ojo, sólo afecta a las instrucciones DML. Cosas como borrar una tabla no se puede deshacer con rollback (se hace un `drop table` y solucionado).

![ROLLBACK](/img/posts/20150417_2.png)

- **SAVEPOINT *nombreSavePoint*** — Crea un punto de guardado dentro de la transacción para tener una referencia en caso de querer deshacer cambios pero no todos.

- **ROLLBACK TO *nombreSavePoint*** — Deshace los cambios hasta el punto de guardado indicado. Al igual que `rollback`, solo afecta a las instrucciones DML.

![ROLLBACK TO SAVEPOINT](/img/posts/20150417_3.png)

- **SET TRANSACTION** — Permite cambiar el nivel de aislamiento de la transacción.

- **LOCK TABLES** — Permite bloquear explícitamente una o varias tablas. A la vez cierra todas las transacciones abiertas.

## Ejemplos

Un ejemplo sencillo:

![Ejemplo sencillo de transacción](/img/posts/20150417_4.png)

Y como debería ser bien hecho, con comprobantes de errores y volcando código y texto de error en variables out:

![Ejemplo completo con gestión de errores](/img/posts/20150417_5.png)
