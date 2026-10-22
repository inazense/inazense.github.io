---
title: "ResultSet en JDBC: navegar, actualizar e insertar filas"
description: "Uso avanzado de ResultSet en JDBC: tipos de desplazamiento y concurrencia, mover el cursor y actualizar, insertar o borrar filas desde Java."
author: Inazio Claver
date: 2015-10-24 14:30:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, jdbc, mysql, resultset, sql]
redirect_from:
  - /2015/10/acceso-datos-jdbc-v-uso-del-resultset.html
---

*Parte de la serie «JDBC» (V).*

El objeto `ResultSet` representa los resultados de una consulta y no carga toda la información en memoria a la vez. Permite además actualizar, eliminar e insertar filas.

![Cursor del ResultSet](/img/posts/20151024_6.png)

## Configuración del ResultSet

Al crear un `Statement`, `PreparedStatement` o `CallableStatement` se pueden configurar los aspectos del `ResultSet`:

```java
createStatement(int resultSetType, int resultSetConcurrency);
prepareStatement(String SQL, int resultSetType, int resultSetConcurrency);
prepareCall(String sql, int resultSetType, int resultSetConcurrency);
```

### Tipos de desplazamiento (`resultSetType`)

| Constante | Descripción |
|-----------|-------------|
| `ResultSet.TYPE_FORWARD_ONLY` | Solo permite avanzar (valor por defecto) |
| `ResultSet.TYPE_SCROLL_INSENSITIVE` | Cualquier dirección, no refleja cambios en la BD |
| `ResultSet.TYPE_SCROLL_SENSITIVE` | Cualquier dirección, refleja cambios en la BD |

### Tipos de concurrencia (`resultSetConcurrency`)

| Constante | Descripción |
|-----------|-------------|
| `ResultSet.CONCUR_READ_ONLY` | Solo lectura (valor por defecto) |
| `ResultSet.CONCUR_UPDATABLE` | Permite modificar los datos |

## Navegación del cursor

El cursor tiene dos posiciones especiales:
- **BFR** (Before First Row): posición inicial, antes de la primera fila
- **ALR** (After Last Row): después de la última fila

```java
while (rs.next()) {
     String name = rs.getString("titulo");
     float price = rs.getFloat("precio");
     System.out.println(name + "\t" + price);
}
```

### Métodos de posicionamiento

| Método | Descripción |
|--------|-------------|
| `next()` | Avanza a la siguiente fila |
| `previous()` | Retrocede a la fila anterior |
| `beforeFirst()` | Se sitúa antes de la primera fila |
| `afterLast()` | Se sitúa después de la última fila |
| `first()` | Se sitúa en la primera fila |
| `last()` | Se sitúa en la última fila |
| `absolute(n)` | Se sitúa en la fila n |
| `relative(n)` | Avanza o retrocede n filas |

## Actualización de datos

```java
rs.updateString("campo", "valor");
rs.updateInt(1, 3);
rs.updateRow();
```

## Inserción de filas

```java
rs.moveToInsertRow();
rs.updateString(1, "AINSWORTH");
rs.updateInt(2, 35);
rs.updateBoolean(3, true);
rs.insertRow();
rs.moveToCurrentRow();
```
