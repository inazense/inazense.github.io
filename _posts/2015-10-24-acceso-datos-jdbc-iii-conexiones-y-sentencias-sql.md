---
title: "Acceso a datos. JDBC (III). Conexiones y sentencias SQL"
description: Los tres métodos de conexión JDBC con MySQL y los tres tipos de sentencias SQL en Java (Statement, PreparedStatement y CallableStatement) con ejemplos prácticos.
author: Inazio Claver
date: 2015-10-24 13:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, jdbc, mysql, statement, preparedstatement, callablestatement, sql]
pin: false
math: false
mermaid: false
---

## Formas de crear una conexión

JDBC ofrece tres métodos para establecer una conexión mediante `DriverManager.getConnection()`:

### Método 1: parámetros separados

```java
String url = "jdbc:mysql://localhost:3306/sample";
String user = "root";
String password = "pass";
Connection c = DriverManager.getConnection(url, user, password);
```

### Método 2: credenciales en la URL

```java
String url = "jdbc:mysql://localhost:3306/sample?user=root&password=pass";
Connection c = DriverManager.getConnection(url);
```

### Método 3: objeto Properties

```java
String url = "jdbc:mysql://localhost:3306/sample";
Properties prop = new Properties();
prop.setProperty("user", "root");
prop.setProperty("password", "pass");
Connection c = DriverManager.getConnection(url, prop);
```

## Tipos de sentencias SQL

![Tipos de sentencias en JDBC](/img/posts/20151024_4.png)

| Tipo | Descripción |
|------|-------------|
| `Statement` | SQL estático en tiempo de ejecución, no acepta parámetros |
| `PreparedStatement` | SQL precompilado, optimizado para ejecución repetida con parámetros |
| `CallableStatement` | Permite invocar procedimientos almacenados en la base de datos |

### Statement

```java
Statement stmt = conn.createStatement();
```

### PreparedStatement

```java
PreparedStatement ps = conn.prepareStatement("INSERT INTO Libros VALUES (?, ?, ?)");
```

### CallableStatement

```java
CallableStatement cs = conn.prepareCall("{call getEmpName (?, ?)}");
```

## Métodos de ejecución

Los objetos `Statement` disponen de tres métodos de ejecución:

| Método | Uso | Retorna |
|--------|-----|---------|
| `executeQuery()` | Sentencias `SELECT` | `ResultSet` con los resultados |
| `executeUpdate()` | `INSERT`, `UPDATE`, `DELETE` | `int` con el número de filas afectadas |
| `execute()` | Cualquier sentencia | `boolean` (genérico) |

## Ejemplos avanzados

### PreparedStatement con parámetros

Los parámetros se marcan con `?` en el SQL y se asignan por posición (empezando en 1):

```java
PreparedStatement ps = conn.prepareStatement(
    "INSERT INTO Libros VALUES (?, ?, ?)");
ps.setInt(1, 23);
ps.setString(2, "Bambi");
ps.setInt(3, 45);
ps.executeUpdate();
```

### CallableStatement con parámetros de salida

```java
CallableStatement cstmt = conn.prepareCall("{call getEmpName (?, ?)}");
cstmt.setInt(1, 111111111);
cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
cstmt.execute();
String empName = cstmt.getString(2);
```

El método `registerOutParameter()` indica que el segundo parámetro es de salida y su tipo SQL. Tras `execute()` se recupera el valor con el método `get` correspondiente al tipo.
