---
title: Bases de datos. Consultas SQL (IV)
description: Ejercicios de manipulación de datos en SQL con sentencias INSERT, UPDATE y DELETE sobre las tablas de compradores, artículos, facturas y líneas de factura.
author: Inazio Claver
date: 2015-01-19 12:00:00 +0800
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

Hemos realizado la hoja de ejercicios de la unidad 3, con sentencias de manipulación de datos (DML) sobre las tablas de la tienda.

## Ejercicios. Inserción, actualización y borrado (I)

**1.** Insertar los siguientes compradores y artículos.

![Tablas con los datos insertados](/img/posts/20150119_1.png)

```sql
insert into compradores (cif_comprador, nombre_social, domicilio_social, localidad, codigo_postal, telefono)
values ('111111-L','TELARES ASUNCION', 'C. LA RUA 5', 'ALBACETE', '02002', '97223141'),
       ('22222-J', 'TEXTIL LAGO', 'PLAZA MAYOR 2', 'ALMERIA', '04131', '95434567');

insert into articulos (referencia_articulo, descripcion_articulo, precio_unidad, iva, existencias_actuales)
values ('01-LANA', 'LANA 100% NATURAL', 31.09, 10, 100),
       ('02-ALGODON', 'ALGODON DE 2 CABOS', 18.00, 10, 155),
       ('03-SED', 'SEDA CHINA', 55.50, 15, 190),
       ('04-LINO', 'LINO EUROPEO', 44.00, 12, 250);

insert into facturas (factura_no, fecha_factura, cif_cliente, cod_oficina)
values (1, '2004-05-12', '111111-L', 1212),
       (2, '2004-07-18', '111111-L', 1231),
       (3, '2004-07-31', '222222-J', 1406),
       (4, '2004-08-10', '222222-J', 1212);

insert into lineas_facturas
values (1, '01-LANA', 120),
       (1, '04-LINO', 75),
       (2, '01-LANA', 20),
       (2, '02-ALGODON', 50);
```


**2.** Insertar un nuevo artículo solo con referencia, precio e IVA.

```sql
insert into articulos (referencia_articulo, precio_unidad, iva)
values ('06-CUERO', 10.99, 10);
```

**3.** Insertar un artículo con todos los campos.

```sql
insert into articulos
values ('01-YUTE', 'YUTE FINO', 25.99, 12, 15);
```

**4.** Insertar una factura con la fecha actual y sus líneas.

```sql
insert into facturas (factura_no, fecha_factura, cif_cliente, cod_oficina)
values (5,curdate(), '111111-L', 1231);

insert into lineas_facturas
values (5,'01-LANA',60),
       (5,'04-LINO',25);
```

![Resultado de la inserción de la factura 5](/img/posts/20150119_2.png)

**5.** Reducir el IVA de todos los artículos en 1 punto.

```sql
update articulos set iva=iva-1;
```

![Artículos tras reducir el IVA](/img/posts/20150119_3.png)

**6.** Actualizar la descripción del artículo `01-LANA`.

```sql
update articulos set descripcion_articulo='LANA 90%NATURAL/10%ACRILICO' where descripcion_articulo like '01-LANA';
```

**7.** Cambiar la referencia del artículo `01-LANA` (afecta a tablas relacionadas).

```sql
update articulos set referencia_articulo='01-LANA90/10' where referencia_articulo like '01-LANA';
```

![Mensaje de error por clave foránea](/img/posts/20150119_5.png)

**8.** Eliminar la factura nº 2 (el borrado en cascada elimina sus líneas automáticamente).

```sql
delete from facturas where factura_no=2;
```

## Ejercicios. Inserción, actualización y borrado (II)

**1.** Insertar compradores y artículos adicionales, y verificar el contenido.

```sql
select * from articulos;

select * from facturas;
```

![Estado actual de las tablas](/img/posts/20150119_7.png)

**2.** Eliminar los artículos cuya referencia contenga el carácter `5`.

```sql
delete from articulos where referencia_articulo like '%5%';
```

![Artículos tras el borrado](/img/posts/20150119_8.png)

**3.** Cambiar el IVA de los artículos con IVA=10 a IVA=8.

```sql
update articulos set iva=8 where iva=10;
```

**4.** Incrementar el precio de todos los artículos un 5%, redondeando a 2 decimales.

```sql
update articulos set precio_unidad=round((precio_unidad*1.05),2)
```

![Artículos con el nuevo precio](/img/posts/20150119_9.png)

**5.** Cambiar el número de una factura (requiere desactivar las comprobaciones de clave foránea).

```sql
update facturas set factura_no=2 where factura_no=5;

update lineas_facturas set factura_no=2 where factura_no=5;
```

**¡Salud y coding!**
