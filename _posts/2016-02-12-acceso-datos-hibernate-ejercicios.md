---
title: Acceso a datos. Hibernate. Ejercicios
description: Dos ejercicios prácticos de Hibernate con Java y MySQL trabajando con las tablas EMPLEADOS y DEPARTAMENTOS.
author: Inazio Claver
date: 2016-02-12 12:00:00 +0800
categories: [Acceso a datos, Java]
tags: [java, hibernate, mysql, swing, crud, hql]
pin: false
math: false
mermaid: false
---

En esta entrada vamos a trabajar con dos ejercicios de Hibernate sobre una base de datos MySQL con las tablas `DEPARTAMENTOS` y `EMPLEADOS`.

## Script MySQL inicial

Para crear la base de datos de ejemplo ejecutamos el siguiente script:

```sql
CREATE DATABASE EJEMPLO;
USE EJEMPLO;

CREATE TABLE DEPARTAMENTOS (
  dept_no   INT          NOT NULL,
  dnombre   VARCHAR(14),
  loc       VARCHAR(13),
  PRIMARY KEY (dept_no)
);

CREATE TABLE EMPLEADOS (
  emp_no    INT          NOT NULL,
  apellido  VARCHAR(10),
  oficio    VARCHAR(9),
  dir       INT,
  fecha_alt DATE,
  salario   FLOAT(7,2),
  comision  FLOAT(7,2),
  dept_no   INT          NOT NULL,
  PRIMARY KEY (emp_no),
  FOREIGN KEY (dept_no) REFERENCES DEPARTAMENTOS (dept_no)
);

INSERT INTO DEPARTAMENTOS VALUES (10, 'CONTABILIDAD', 'SEVILLA');
INSERT INTO DEPARTAMENTOS VALUES (20, 'INVESTIGACION', 'MADRID');
INSERT INTO DEPARTAMENTOS VALUES (30, 'VENTAS', 'BARCELONA');
INSERT INTO DEPARTAMENTOS VALUES (40, 'PRODUCCION', 'BILBAO');

INSERT INTO EMPLEADOS VALUES (7369, 'SANCHEZ',  'EMPLEADO',  7902, '1990-12-17',  1040, NULL, 20);
INSERT INTO EMPLEADOS VALUES (7499, 'ARROYO',   'VENDEDOR',  7698, '1990-02-20',  1500, 390,  30);
INSERT INTO EMPLEADOS VALUES (7521, 'SALA',     'VENDEDOR',  7698, '1991-02-22',  1625, 650,  30);
INSERT INTO EMPLEADOS VALUES (7566, 'JIMENEZ',  'DIRECTOR',  7839, '1991-04-02',  2900, NULL, 20);
INSERT INTO EMPLEADOS VALUES (7654, 'MARTIN',   'VENDEDOR',  7698, '1991-09-28',  1625, 1400, 30);
INSERT INTO EMPLEADOS VALUES (7698, 'NEGRO',    'DIRECTOR',  7839, '1991-05-01',  3005, NULL, 30);
INSERT INTO EMPLEADOS VALUES (7782, 'CEREZO',   'DIRECTOR',  7839, '1991-06-09',  2885, NULL, 10);
INSERT INTO EMPLEADOS VALUES (7788, 'GIL',      'ANALISTA',  7566, '1991-11-09',  3000, NULL, 20);
INSERT INTO EMPLEADOS VALUES (7839, 'REY',      'PRESIDENTE',NULL, '1991-11-17',  5000, NULL, 10);
INSERT INTO EMPLEADOS VALUES (7844, 'TOVAR',    'VENDEDOR',  7698, '1991-09-08',  1350, 0,    30);
INSERT INTO EMPLEADOS VALUES (7876, 'ALONSO',   'EMPLEADO',  7788, '1991-09-23',  1430, NULL, 20);
INSERT INTO EMPLEADOS VALUES (7900, 'JIMENO',   'EMPLEADO',  7698, '1991-12-03',  1335, NULL, 30);
INSERT INTO EMPLEADOS VALUES (7902, 'FORD',     'ANALISTA',  7566, '1991-12-03',  3000, NULL, 20);
INSERT INTO EMPLEADOS VALUES (7934, 'MILLER',   'EMPLEADO',  7782, '1992-01-23',  1300, NULL, 10);
```

## Clase compartida: SessionFactoryUtil

Ambos ejercicios utilizan una clase utilitaria que gestiona la creación y acceso a la `SessionFactory` de Hibernate mediante inicialización estática:

```java
public class SessionFactoryUtil {

    private static final SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
```

## Ejercicio 1: Consulta de departamento

Aplicación con interfaz gráfica que permite consultar un departamento por número. Tras pulsar el botón "Consultar" se visualiza el nombre del departamento y a continuación los datos de los empleados que pertenecen a él (total de empleados, apellido y oficio de cada uno).

![Interfaz del ejercicio 1 - consulta por departamento](/img/posts/20160212_1.png)

La consulta de empleados por departamento se realiza mediante una query HQL:

```java
Session session = SessionFactoryUtil.getSessionFactory().openSession();

// Obtener departamento
Departamento dept = (Departamento) session.get(Departamento.class, numDept);

// Consultar empleados del departamento
Query query = session.createQuery(
    "FROM Empleado e WHERE e.departamento.deptNo = :num"
);
query.setParameter("num", numDept);
List<Empleado> empleados = query.list();
```

## Ejercicio 2: Gestión CRUD de departamentos

Interfaz de gestión que permite realizar altas, bajas y modificaciones sobre la tabla `DEPARTAMENTOS`, con validación de datos y confirmación de operaciones mediante cuadros de diálogo.

![Interfaz del ejercicio 2 - gestión CRUD de departamentos](/img/posts/20160212_2.png)

Las operaciones se realizan dentro de transacciones Hibernate:

```java
Session session = SessionFactoryUtil.getSessionFactory().openSession();
Transaction tx = session.beginTransaction();
try {
    // Alta
    session.save(nuevoDepartamento);
    // Baja
    session.delete(departamento);
    // Modificación
    session.update(departamento);
    tx.commit();
} catch (Exception e) {
    tx.rollback();
}
session.close();
```
