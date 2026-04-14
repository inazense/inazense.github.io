---
title: "Acceso a datos. JDBC (I). Introducción"
description: Introducción a JDBC, la API de Java para acceder a bases de datos SQL, incluyendo arquitectura, configuración del driver MySQL, y ejemplo completo de conexión y consulta.
author: Inazio Claver
date: 2015-10-24 12:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, jdbc, mysql, sql, base-de-datos, connection, resultset]
pin: false
math: false
mermaid: false
---

**JDBC** (_Java DataBase Connectivity_) es la interfaz orientada a objetos de Java para SQL. Permite a las aplicaciones enviar sentencias SQL a sistemas gestores de bases de datos (SGBD). La API no mejora ni limita las capacidades de SQL: el desarrollador sigue escribiendo las consultas SQL directamente.

## Arquitectura JDBC

JDBC emplea un **Driver Manager** que actúa de intermediario entre la aplicación y los drivers específicos de cada base de datos, proporcionando transparencia al desarrollador respecto al sistema de base de datos subyacente.

![Arquitectura JDBC con Driver Manager](/img/posts/20151024_1.png)

## Configuración con MySQL

Para usar JDBC con MySQL hay que añadir el conector al proyecto:

- **Fichero:** `mysql-connector-java-x.x.x-bin.jar`
- **Eclipse:** añadir a Build Path del proyecto
- **CLASSPATH:** o añadir a la variable de entorno del sistema

Datos de configuración:
- **Driver class:** `com.mysql.jdbc.Driver`
- **URL de conexión:** `jdbc:mysql://localhost:3306/nombre_base_datos`

## Clases principales

| Clase/Interfaz | Descripción |
|----------------|-------------|
| `Connection` | Representa el enlace físico entre cliente y servidor |
| `Statement` | Ejecuta sentencias SQL |
| `ResultSet` | Contiene los resultados de una consulta; gestiona un cursor sobre las filas |

### El cursor de ResultSet

![Cursor del ResultSet](/img/posts/20151024_2.png)

El cursor se posiciona antes de la primera fila. El método `next()` avanza una posición y devuelve `false` cuando no hay más filas.

## Proceso de conexión (5 pasos)

1. Cargar el driver JDBC con `Class.forName()`
2. Establecer la conexión con `DriverManager.getConnection()`
3. Ejecutar consultas SQL y procesar resultados
4. Liberar recursos llamando a `close()`
5. Manejar excepciones: `ClassNotFoundException` y `SQLException`

## Ejemplo completo

```java
import java.sql.*;

public class HolaMundoBaseDatos {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        }
        catch(ClassNotFoundException e) {
            System.err.println("El driver no se encuentra");
            System.exit(-1);
        }

        Connection conn = null;
        try {
            conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/sample",
                "root",
                "password");

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(
                "SELECT titulo, precio FROM Libros WHERE precio > 2");

            while(rs.next()) {
                String name = rs.getString("titulo");
                float price = rs.getFloat("precio");
                System.out.println(name + "\t" + price);
            }

            rs.close();
            stmt.close();
        }
        catch(SQLException e) {
            System.err.println("Error en la base de datos: " + e.getMessage());
            e.printStackTrace();
        }
        finally {
            if (conn != null) {
                try {
                    conn.close();
                }
                catch(SQLException e) {
                    System.err.println("Error al cerrar la conexión: " + e.getMessage());
                }
            }
        }
    }
}
```

El bloque `finally` garantiza que la conexión se cierra siempre, independientemente de si hubo excepción o no.
