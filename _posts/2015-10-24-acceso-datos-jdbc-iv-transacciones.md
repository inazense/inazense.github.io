---
title: "Acceso a datos. JDBC (IV). Transacciones"
description: Introducción a las transacciones en JDBC, su importancia para garantizar la integridad de los datos y los métodos setAutoCommit, commit, rollback y Savepoint.
author: Inazio Claver
date: 2015-10-24 14:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, jdbc, mysql, transacciones, sql]
pin: false
math: false
mermaid: false
---

![Transacciones JDBC Java](/img/posts/20151024_5.png)

Las transacciones tratan un conjunto de sentencias como una única sentencia, de forma que si una falla, todo lo anterior se deshace.

## Control de transacciones

Por defecto, JDBC ejecuta cada sentencia SQL de forma independiente (`autoCommit = true`). Para agrupar varias sentencias en una transacción hay que desactivar este modo:

```java
conn.setAutoCommit(false);
```

Una vez ejecutadas las sentencias, se confirman con `commit()` o se deshacen con `rollback()`:

```java
try {
    conn.setAutoCommit(false);

    Statement stmt = conn.createStatement();
    stmt.executeUpdate("UPDATE Cuentas SET saldo = saldo - 100 WHERE id = 1");
    stmt.executeUpdate("UPDATE Cuentas SET saldo = saldo + 100 WHERE id = 2");

    conn.commit();
} catch (SQLException e) {
    conn.rollback();
    e.printStackTrace();
} finally {
    conn.setAutoCommit(true);
}
```

## Savepoints

Los `Savepoint` permiten deshacer parcialmente una transacción hasta un punto intermedio:

```java
conn.setAutoCommit(false);
Savepoint sp = conn.setSavepoint("puntoIntermedio");

try {
    stmt.executeUpdate("INSERT INTO Libros VALUES (1, 'Titulo', 10.0)");
    conn.commit();
} catch (SQLException e) {
    conn.rollback(sp);
}
```

El método `rollback(Savepoint)` deshace solo las operaciones realizadas después del savepoint, manteniendo las anteriores.
