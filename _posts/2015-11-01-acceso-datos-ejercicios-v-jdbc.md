---
title: "Acceso a datos. Ejercicios (V). JDBC"
description: Ejercicios prácticos de JDBC sobre la base de datos demodb, incluyendo consultas, sentencias preparadas, transacciones, procedimientos almacenados y metadatos con DatabaseMetaData.
date: 2015-11-01 21:00:00 +0800
categories: [Java]
tags: [java, jdbc, mysql, acceso-a-datos, preparedstatement, transacciones, databasemetadata]
pin: false
math: false
mermaid: false
---

Serie de ejercicios prácticos de JDBC sobre la base de datos **demodb**.

## Ejercicio 1: Visualizar departamentos

Consulta simple que recupera el número y el nombre de todos los departamentos:

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt;
        ResultSet rs;
        String url = "jdbc:mysql://localhost:3306/demodb";
        String user = "root";
        String password = "";

        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT deptno, dname FROM dept");
            while (rs.next()) {
                int numDept = rs.getInt("deptno");
                String nombre = rs.getString("dname");
                System.out.println("Departamento: " + numDept + ". Nombre: " + nombre);
            }
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

## Ejercicio 2: Modificar departamento sin sentencias preparadas

Actualiza un registro usando `executeUpdate()` directamente sobre un `Statement`:

```java
try {
    conn = DriverManager.getConnection(url, user, password);
    stmt = conn.createStatement();
    int filas = stmt.executeUpdate(
        "UPDATE dept SET dname='VENTAS' WHERE deptno=10"
    );
    System.out.println("Filas afectadas: " + filas);
    stmt.close();
} catch (SQLException e) {
    e.printStackTrace();
} finally { /* cerrar conn */ }
```

## Ejercicio 3: Modificar con sentencias preparadas

Usa `PreparedStatement` para mayor seguridad y eficiencia:

```java
try {
    conn = DriverManager.getConnection(url, user, password);
    PreparedStatement ps = conn.prepareStatement(
        "UPDATE dept SET dname=? WHERE deptno=?"
    );
    ps.setString(1, "VENTAS");
    ps.setInt(2, 10);
    int filas = ps.executeUpdate();
    System.out.println("Filas afectadas: " + filas);
    ps.close();
} catch (SQLException e) {
    e.printStackTrace();
} finally { /* cerrar conn */ }
```

## Ejercicio 4: Transacciones

Añade control transaccional con `setAutoCommit(false)`, `commit()` y `rollback()`:

```java
try {
    conn = DriverManager.getConnection(url, user, password);
    conn.setAutoCommit(false);
    PreparedStatement ps = conn.prepareStatement(
        "UPDATE dept SET dname=? WHERE deptno=?"
    );
    ps.setString(1, "MARKETING");
    ps.setInt(2, 20);
    ps.executeUpdate();
    conn.commit();
    System.out.println("Transacción completada correctamente");
    ps.close();
} catch (SQLException e) {
    try {
        conn.rollback();
        System.out.println("Transacción revertida");
    } catch (SQLException ex) {
        ex.printStackTrace();
    }
    e.printStackTrace();
} finally { /* cerrar conn */ }
```

## Ejercicio 5: Clase BaseDatos con 19 métodos

Clase integral de acceso a datos con métodos para todas las operaciones CRUD, procedimientos almacenados e introspección:

### Clase Departamento

```java
public class Departamento {
    private int numDep;
    private String nombreDep;
    private String localidad;

    public Departamento() {}

    public Departamento(int numDep, String nombreDep, String localidad) {
        this.numDep = numDep;
        this.nombreDep = nombreDep;
        this.localidad = localidad;
    }

    public int getNumDep() { return numDep; }
    public void setNumDep(int numDep) { this.numDep = numDep; }

    public String getNombreDep() { return nombreDep; }
    public void setNombreDep(String nombreDep) { this.nombreDep = nombreDep; }

    public String getLocalidad() { return localidad; }
    public void setLocalidad(String localidad) { this.localidad = localidad; }
}
```

### Clase BaseDatos (estructura)

La clase `BaseDatos` agrupa los siguientes grupos de métodos:

**Manipulación de datos:**
- Insertar departamento con parámetros individuales
- Insertar departamento pasando un objeto `Departamento`
- Listar todos los departamentos en un `ArrayList<Departamento>`
- Recuperar un departamento por número
- Actualizar departamento
- Eliminar departamento

**Procedimientos almacenados:**
- `actualizaDept()` — cambia la localidad de un departamento
- `consultaDepar()` — consulta con parámetros de salida (`OUT`)
- Actualización de salarios de un departamento

**Introspección con `DatabaseMetaData`:**
- Información del gestor de BD, driver y usuario conectado
- Listado de tablas y vistas
- Información de procedimientos y funciones almacenadas
- Esquema de columnas, claves primarias y foráneas
- Análisis de columnas del `ResultSet` con `ResultSetMetaData`

Todos los métodos implementan bloques `try-catch-finally` para controlar errores y garantizar el cierre de recursos.
