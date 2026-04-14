---
title: Bases de datos. Consultas SQL (III)
description: Ejercicios de creación y modificación de tablas en SQL con restricciones, claves primarias, foráneas y restricciones CHECK.
author: Inazio Claver
date: 2015-01-13 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Hemos realizado la hoja de ejercicios de la unidad 3, en la que creamos y modificamos tablas en MySQL con distintos tipos de restricciones.

## Ejercicios. Creación de tablas con restricciones

Las tablas COMPRADORES, ARTICULOS, FACTURAS y LINEAS_FACTURAS están relacionadas entre sí.

**1.** Crear la tabla `COMPRADORES` con clave primaria y restricción UNIQUE.

```sql
create table compradores (
     CIF_comprador varchar(11),
     Nombre_Social varchar(30),
     Domicilio_Social varchar(30),
     Localidad varchar(30),
     C_Postal varchar(5),
     Telefono varchar(9) NOT NULL,
     CONSTRAINT PK_COMPRADORES_CIF PRIMARY KEY (CIF_comprador),
     CONSTRAINT UQ_COMPRADORES_NOMBRE_SOCIAL UNIQUE (Nombre_Social)
);
```

**2.** Crear la tabla `ARTICULOS` con clave primaria, restricción CHECK y valor por defecto.

```sql
create table articulos (
     Referencia_Articulo varchar(12),
     Descripcion_articulo varchar(30),
     Precio_Unidad numeric (6,2),
     IVA numeric (2) check (IVA BETWEEN 5 AND 25),
     Existencias_Actuales numeric(5) default 0,
     CONSTRAINT PK_ARTICULOS PRIMARY KEY (Referencia_Articulo)
);
```

**3.** Crear la tabla `FACTURAS` con clave primaria y valor por defecto en la fecha.

```sql
create table facturas (
     Factura_no numeric(6),
     Fecha_factura date default '2005-01-01',
     CIF_Cliente varchar(11),
     CONSTRAINT PK_FACTURAS PRIMARY KEY (Factura_no)
);
```

**4.** Crear la tabla `LINEAS_FACTURAS` con clave primaria compuesta y claves foráneas (con borrado en cascada).

```sql
create table lineas_facturas (
     factura_no numeric(6),
     Referencia_articulo varchar(12),
     Unidades numeric(3),
     CONSTRAINT PK_LINEAS_FACTURA primary key (Referencia_articulo,factura_no),
     CONSTRAINT FK_LINEAS_FACTURAS foreign key (factura_no) REFERENCES facturas(factura_no)
     ON DELETE CASCADE,
     CONSTRAINT FK_LINEAS_ARTICULOS foreign key (Referencia_articulo) REFERENCES articulos(referencia_articulo)
);
```

![Diagrama de las tablas creadas](/img/posts/20150113_1.png)

## Ejercicios. Modificación de tablas con ALTER TABLE

**5.** Añadir la columna `cod_oficina` a la tabla `FACTURAS`.

```sql
alter table facturas add (cod_oficina numeric(4));
```

**6.** Añadir una clave foránea de `FACTURAS` hacia `CLIENTES`.

```sql
alter table facturas add CONSTRAINT FK_FACTURA_COMPRADORES FOREIGN KEY (CIF_Cliente) REFERENCES clientes(CIF_Cliente);
```

**7.** Renombrar la columna `c_postal` en `COMPRADORES`.

```sql
ALTER TABLE compradores change c_postal texto_codigo_postal varchar(5);
```

**8.** Añadir una restricción CHECK sobre `cod_oficina`.

```sql
alter table facturas add constraint cod_oficina check (cod_oficina between 1 and 1000);
```

**9.** Añadir clave primaria a `FACTURAS_1`.

```sql
alter table facturas_1 add constraint pk_factura_no_1 primary key (factura_no);
```

**10.** Añadir clave foránea a `LINEAS_FACTURA_1`.

```sql
alter table lineas_factura_1 add constraint fk_lineas_facturas_1 foreign key(factura_no) references facturas1(factura_no);
```

**11.** Añadir restricción UNIQUE a `ARTICULOS_1`.

```sql
alter table articulos_1 add constraint uq_articulos_descripcion_1 unique (descripcion_articulo);
```

**12.** Modificar el tipo de dato de `Teléfono` en `COMPRADORES_1`.

```sql
alter table compradores_1 modify Teléfono int;
```

![Resultado de los ejercicios en phpMyAdmin](/img/posts/20150113_2.png)

**¡Salud y coding!**
