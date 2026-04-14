---
title: Acceso a datos. Oracle Database. Ejercicios
description: 21 ejercicios prácticos sobre Oracle Database con tipos de objetos, herencia, referencias REF y colecciones VARRAY.
author: Inazio Claver
date: 2016-02-25 12:00:00 +0800
categories: [Acceso a datos, Bases de datos]
tags: [oracle, sql, plsql, bases-de-datos, objetos, herencia, varray, ref]
pin: false
math: false
mermaid: false
---

A continuación se presentan 21 ejercicios progresivos sobre Oracle Database que cubren tipos de objetos, herencia de tipos, referencias entre objetos y colecciones VARRAY.

## Ejercicio 1: Definición de tipos base

Creamos los tipos básicos `T_DIRECCION`, `T_TELEFONO` y `T_PROFESOR`:

```sql
create or replace type T_DIRECCION as object(
  calle varchar2(15),
  numero varchar2(20),
  ciudad varchar2(10),
  codigo_postal varchar2(5)
);

create or replace type T_TELEFONO as varray(5) of varchar2(9);

create or replace type T_PROFESOR as object(
  nombre varchar2(20),
  direccion T_DIRECCION,
  salario number,
  telefono T_TELEFONO
) not final;
```

![Definición de tipos base T_DIRECCION, T_TELEFONO y T_PROFESOR](/img/posts/20160225_1.png)

## Ejercicio 2: Herencia y creación de tablas

Creamos los subtipos `T_CONTRATADO` y `T_TITULAR` y sus tablas correspondientes:

```sql
create or replace type T_CONTRATADO under T_PROFESOR();
create or replace type T_TITULAR under T_PROFESOR();

create table PROFESOR of T_PROFESOR(
  primary key(nombre)
);

create table PROFESOR_CONTRATADO of T_CONTRATADO(
  primary key(nombre),
  check(salario <= 166386)
);

create table PROFESOR_TITULAR of T_TITULAR(
  primary key(nombre),
  check(salario > 166386),
  check(direccion is not null)
);
```

![Creación de subtipos y tablas](/img/posts/20160225_2.png)

## Ejercicio 3: Inserción de datos

Insertamos datos en las tablas de profesores:

```sql
insert into PROFESOR_TITULAR values('Jose Mª', T_DIRECCION('Alcalá', '3', 'Madrid', '28020'), 200000, T_TELEFONO('6647401', '4556478', '606754321', null, '914445556'));

insert into PROFESOR_TITULAR values('Jorge', T_DIRECCION('Butarque', '15', 'Leganés', '28911'), 250000, T_TELEFONO('6647401', '4557486', null, '964321236', null));

insert into PROFESOR_TITULAR values('Belen', T_DIRECCION(null, null, null, null), 200000, T_TELEFONO('6647402', null, '606896310',null, null));

insert into PROFESOR_TITULAR values('Esperanza', T_DIRECCION('Serrano', '56', 'Madrid', '28010'), 250000, T_TELEFONO('6647403', '4557486', '606312890', '987348675', null));

insert into PROFESOR_TITULAR(nombre, direccion, salario) values('Paloma', T_DIRECCION('Tulipan', '10', 'Mostoles', '28933'), 300000);

insert into PROFESOR_CONTRATADO values('Pepe', T_DIRECCION('Gran via', '8', 'Madrid', '28009'), 150000, T_TELEFONO('6647405', '4676478', '606757651', '964398736', '914481096'));

insert into PROFESOR_CONTRATADO values('Susana', T_DIRECCION(null, null, 'Leganes', null), 150000, T_TELEFONO('6647405', '4554586', null, '934876823', null));

insert into PROFESOR_CONTRATADO values('Ana', T_DIRECCION(null, null, 'Getafe', null), 100000, T_TELEFONO('6647405', '4490634', '606856670', null, null));

insert into PROFESOR_CONTRATADO values('Juan', T_DIRECCION('Velazquez', '88', 'Madrid', '28010'), 110000, T_TELEFONO('6647406', null, null, '987348675', null));

insert into PROFESOR_CONTRATADO(nombre, salario, telefono) values('Maria', 145000, T_TELEFONO(null, null, null, null, null));
```

## Ejercicio 4: Consulta de todas las tablas

```sql
select * from PROFESOR_CONTRATADO;
select * from PROFESOR_TITULAR;
```

## Ejercicio 5: Consultas específicas

```sql
select pc.nombre, pc.direccion.ciudad from PROFESOR_CONTRATADO pc where salario > 100000;

select pc.nombre, pc.telefono from PROFESOR_TITULAR pc;

select pc.nombre, pc.direccion from PROFESOR_TITULAR pc where salario > 200000;

select pc.nombre, pc.salario from PROFESOR_TITULAR pc where pc.direccion.ciudad = 'Madrid'
union
select pc.nombre, pc.salario from PROFESOR_CONTRATADO pc where pc.direccion.ciudad = 'Madrid';
```

![Resultados de consultas sobre atributos de objetos](/img/posts/20160225_3.png)

## Ejercicio 6: Borrar objetos

```sql
drop table PROFESOR_TITULAR;
drop table PROFESOR_CONTRATADO;
drop table PROFESOR;

drop type T_TITULAR;
drop type T_CONTRATADO;
drop type T_PROFESOR;
drop type T_TELEFONO;
drop type T_DIRECCION;
```

## Ejercicio 7: Añadir fecha de nacimiento y método edad()

Redefinimos `T_PROFESOR` añadiendo el atributo `fecha_nacimiento` y el método `edad()`:

```sql
create or replace type T_DIRECCION as object(
  calle varchar2(15),
  numero varchar2(20),
  ciudad varchar2(10),
  codigo_postal varchar2(5)
);

create or replace type T_TELEFONO as varray(5) of varchar2(9);

create or replace type T_PROFESOR as object(
  nombre varchar2(20),
  fecha_nacimiento date,
  direccion T_DIRECCION,
  salario number,
  telefono T_TELEFONO,
  member function edad return number
) not final;

create or replace type body T_PROFESOR as
member function edad return number is
ed number;
begin
  ed:= to_char(SYSDATE, 'YYYY') - to_char(fecha_nacimiento, 'YYYY');
  return ed;
end;
end;
```

## Ejercicio 8: Recrear tablas con fecha de nacimiento

```sql
create or replace type T_CONTRATADO under T_PROFESOR();
create or replace type T_TITULAR under T_PROFESOR();

create table PROFESOR of T_PROFESOR(
  primary key(nombre)
);

create table PROFESOR_CONTRATADO of T_CONTRATADO(
  primary key(nombre),
  check(salario <= 166386)
);

create table PROFESOR_TITULAR of T_TITULAR(
  primary key(nombre),
  check(salario > 166386),
  check(direccion is not null)
);

insert into PROFESOR_TITULAR (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('José Mª', '03/11/1966', T_DIRECCION('Alcalá', '3', 'Madrid', '28020'), 200000, T_TELEFONO('6647401', '4556478','606754321', NULL, '914445556'));

insert into PROFESOR_TITULAR (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Jorge', '12/03/1962', T_DIRECCION('Butarque', '15', 'Leganés', '28911'), 250000, T_TELEFONO('6647401', '4557486',NULL,'964321236', NULL));

insert into PROFESOR_TITULAR (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Belén','07/10/1964', T_DIRECCION(NULL, NULL, NULL, NULL), 200000, T_TELEFONO('6647402', NULL,'606896310',NULL, NULL));

insert into PROFESOR_TITULAR (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Esperanza','24/01/1972', T_DIRECCION('Serrano', '56', 'Madrid', '28010'), 250000, T_TELEFONO('6647403', '4457834','606312890','987348675', NULL));

insert into PROFESOR_TITULAR (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO)
values('Paloma', '02/07/1970', T_DIRECCION('Tulipán', '10', 'Móstoles', '28933'), 300000);

insert into PROFESOR_CONTRATADO (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Pepe', '03/12/1960', T_DIRECCION('Gran Vía', '8', 'Madrid', '28009'), 150000, T_TELEFONO('6647405', '4676478','606757651', '964398736', '914481096'));

insert into PROFESOR_CONTRATADO (NOMBRE,  FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Susana', '12/11/1964', T_DIRECCION(Null, Null, 'Leganés', Null), 150000, T_TELEFONO('6647405', '4554586',Null, '934876823', Null));

insert into PROFESOR_CONTRATADO (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Ana', '04/02/1955', T_DIRECCION(Null, Null, 'Getafe', Null), 100000, T_TELEFONO('6647405', '4490634', '606856670', Null, '914445576'));

insert into PROFESOR_CONTRATADO (NOMBRE, FECHA_NACIMIENTO, DIRECCION, SALARIO, TELEFONO)
values('Juan', '24/10/1963', T_DIRECCION('Velázquez', '88', 'Madrid', '28010'), 110000, T_TELEFONO('6647406', Null, Null, '987348675', Null));

insert into PROFESOR_CONTRATADO (NOMBRE, FECHA_NACIMIENTO, SALARIO, TELEFONO)
values('María', '30/06/1965', 145000, T_TELEFONO(Null, Null, Null, Null, Null));
```

![Inserción de datos con fecha de nacimiento](/img/posts/20160225_4.png)

## Ejercicio 9: Nombre y edad de los profesores de Madrid

```sql
select pt.nombre, pt.edad()
from PROFESOR_TITULAR pt
where pt.direccion.ciudad = 'Madrid'
union
select pc.nombre, pc.edad()
from PROFESOR_CONTRATADO pc
where pc.direccion.ciudad = 'Madrid';
```

## Ejercicio 10: Borrar todos los objetos

```sql
drop table PROFESOR_TITULAR;
drop table PROFESOR_CONTRATADO;
drop table PROFESOR;

drop type T_TITULAR;
drop type T_CONTRATADO;
drop type T_PROFESOR;
drop type T_TELEFONO;
drop type T_DIRECCION;
```

## Ejercicio 11: Definir tipo T_PROFESOR con tabla

```sql
create or replace type T_DIRECCION as object(
  calle varchar2(15),
  numero varchar2(20),
  ciudad varchar2(10),
  codigo_postal varchar2(5)
);

create or replace type T_TELEFONO as varray(5) of VARCHAR2(9);

create or replace type T_PROFESOR as object(
  nombre varchar2(20),
  direccion T_DIRECCION,
  salario number,
  telefono T_TELEFONO
) not final;

create table PROFESOR of T_PROFESOR(
  primary key (nombre)
);
```

## Ejercicio 12: Crear T_TITULAR y su tabla

```sql
create or replace type T_TITULAR under T_PROFESOR();

create table PROFESOR_TITULAR of T_TITULAR(
  primary key (nombre),
  check (salario > 166386),
  check (direccion is not null)
);
```

## Ejercicio 13: Definir T_ASIGNATURA con referencia REF

```sql
create or replace type T_ASIGNATURA as object(
  nombre varchar2(20),
  curso varchar2(1),
  titulacion varchar2(16),
  num_creditos number,
  prof ref T_PROFESOR
);

create table ASIGNATURA of T_ASIGNATURA;
```

![Definición de T_ASIGNATURA con REF a T_PROFESOR](/img/posts/20160225_5.png)

## Ejercicio 14: Insertar profesores y asignaturas

```sql
insert into PROFESOR_TITULAR values('Jose Mª', T_DIRECCION('Alcalá', '3', 'Madrid', '28020'), 200000, T_TELEFONO('6647401', '4556478', '6067', null, '914445556'));

insert into PROFESOR_TITULAR values('Jorge', T_DIRECCION('Butarque', '3', 'Leganés', '28911'), 250000, T_TELEFONO('6647401', '4557486', null, '964321236', null));

insert into PROFESOR_TITULAR values('Belén', T_DIRECCION(null, null, null, null), 200000, T_TELEFONO('6647402', '4457834', '6063', '987348675', null));

insert into PROFESOR_TITULAR values('Esperanza', T_DIRECCION('Serrano', '56', 'Madrid', '28010'), 250000, T_TELEFONO('6647403', '4457834', '6063', '987348675', null));

insert into PROFESOR_TITULAR(nombre, direccion, salario) values('Paloma', T_DIRECCION('Tulipán', '10', 'Móstoles', '28933'), 300000);

insert into ASIGNATURA values('Diseño de BD', '3', 'I.T.Informática', 9, (select ref(p) from PROFESOR_TITULAR p where p.nombre = 'Esperanza'));

insert into ASIGNATURA values('Bases de datos', '1', 'I.Informática', 6, (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Esperanza'));

insert into ASIGNATURA values('Aplicaciones de BD', '2', 'I.Informática', 6, (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Jose Mª'));

insert into ASIGNATURA values('BD Avanzadas', '3', 'I.T.Informática', 6, (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Belén'));

insert into ASIGNATURA values('Arquitectura Softw', '2', 'I.Informática', 6, (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Jorge'));
```

## Ejercicio 15: Consultar el contenido de las tablas

```sql
select * from PROFESOR_TITULAR;
select * from ASIGNATURA;
```

![Contenido de PROFESOR_TITULAR y ASIGNATURA](/img/posts/20160225_6.png)

## Ejercicio 16: Insertar asignatura duplicada

```sql
insert into ASIGNATURA values('Diseño de BD', '3', 'I.T.Informática', 9, (select ref(p) from PROFESOR_TITULAR p where p.nombre = 'Esperanza'));
```

## Ejercicio 17: Borrar profesores de Leganés

```sql
delete PROFESOR_TITULAR p where p.direccion.ciudad = 'Leganés';
```

## Ejercicio 18: Verificar tablas tras el borrado

Al borrar un profesor que es referenciado por una asignatura, la referencia queda como **dangling reference** (referencia colgante).

```sql
select * from PROFESOR_TITULAR;
select * from ASIGNATURA;
```

![Resultado con dangling references tras el borrado](/img/posts/20160225_7.png)

## Ejercicio 19: Consultas a través de referencias

```sql
select asig.prof.nombre, asig.prof.telefono
from asignatura asig
where asig.nombre = 'Bases de datos';

select distinct asig.prof.nombre
from asignatura asig
where asig.titulacion = 'I.T.Informática';
```

## Ejercicio 20: Múltiples profesores por asignatura con VARRAY

Modificamos el esquema para que una asignatura pueda impartirla hasta 3 profesores:

```sql
drop table ASIGNATURA;
drop type T_ASIGNATURA;

create or replace type T_CONJUNTO_PROFESORES as varray(3) of ref T_TITULAR;

create or replace type T_ASIGNATURA as object(
  nombre varchar2(20),
  curso varchar2(1),
  titulacion varchar2(16),
  num_creditos number,
  prof T_CONJUNTO_PROFESORES
);

create table ASIGNATURA of T_ASIGNATURA;
```

## Ejercicio 21: Insertar asignaturas con varios profesores

```sql
insert into ASIGNATURA values('Diseño de BD', '3', 'I.T.Informática', 9, T_CONJUNTO_PROFESORES(
    (select ref(p) from PROFESOR_TITULAR p where p.nombre = 'Esperanza'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre = 'Jose Mª'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre = 'Belén')
));

insert into ASIGNATURA values('Bases de datos', '1', 'I.Informática', 6, T_CONJUNTO_PROFESORES(
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Esperanza'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Belén'),
    null
));

insert into ASIGNATURA values('Aplicaciones de BD', '2', 'I.Informática', 6, T_CONJUNTO_PROFESORES(
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Jose Mª'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Esperanza'),
    null
));

insert into ASIGNATURA values('BD Avanzadas', '3', 'I.T.Informática', 6, T_CONJUNTO_PROFESORES(
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Belén'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Jose Mª'),
    null
));

insert into ASIGNATURA values('Arquitectura Softw', '2', 'I.Informática', 6, T_CONJUNTO_PROFESORES(
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Jorge'),
    (select ref(p) from PROFESOR_TITULAR p where p.nombre like 'Paloma'),
    null
));
```

![Asignaturas con múltiples profesores mediante T_CONJUNTO_PROFESORES](/img/posts/20160225_8.png)
