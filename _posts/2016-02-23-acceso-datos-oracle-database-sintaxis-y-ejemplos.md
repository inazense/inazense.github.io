---
title: "Objetos en Oracle: tipos, métodos, varrays y herencia"
description: "Programación orientada a objetos en Oracle Database: tipos de objeto, métodos, tablas de objetos, VARRAY y herencia de tipos, con ejemplos prácticos."
author: Inazio Claver
date: 2016-02-23 12:00:00 +0800
categories: [Bases de datos]
tags: [oracle, sql, plsql, bases-de-datos, objetos, herencia]
redirect_from:
  - /2016/02/acceso-datos-oracle-database-sintaxis-y.html
---

La sintaxis de Oracle está basada en lenguaje SQL, con la puntualización de que permite declarar objetos y almacenarlos como tal, arrays de objetos, etc.

A continuación veremos unos cuantos ejemplos de la sintaxis que emplearemos en esta tecnología:

## Tipos de objetos

```sql
-- Creación de un tipo (un objeto)
CREATE OR REPLACE TYPE DIRECCION AS OBJECT
(
CALLE VARCHAR2(25), -- Tipo texto
CIUDAD VARCHAR2(20),
CODIGO_POST NUMBER(5) -- Tipo numérico
);
```

```sql
-- Creación de un tipo que incluya otro en su interior
CREATE OR REPLACE TYPE PERSONA AS OBJECT
(
CODIGO NUMBER,
NOMBRE VARCHAR2(35),
DIREC DIRECCION, -- Hacemos referencia al tipo de objeto creado anteriormente
FECHA_NAC DATE -- Tipo fecha
);
```

```sql
-- Se pueden realizar declaraciones que no se guarden
-- en la base de datos para probar los tipos creados
DECLARE
  -- Declaramos propiedades debajo del DECLARE.
  -- Inicializamos dos objetos Direccion y Persona todo a nulo
  DIR DIRECCION:= DIRECCION(NULL,NULL,NULL);
  P PERSONA:= PERSONA(NULL, NULL, NULL,NULL);
  BEGIN -- Comenzamos con el "programa"
  -- Damos valores a las propiedades de Direccion
  DIR.CALLE:='La Mina, 3';
  DIR.CIUDAD:= 'Guadalajara';
  DIR.CODIGO_POST:=19001;
  -- Y lo mismo con Persona
  P.CODIGO:=1;
  P.NOMBRE:= 'JUAN';
  P.DIREC:=DIR; -- Indicamos que la propiedades direc sea el objeto direccion
  P.FECHA_NAC:='10/11/1988'; -- Las fechas no son necesarias en formato inglés
  END; -- Finalizamos el Declare
```

```sql
-- Cuando creamos un tipo podemos asignarle como campo un método (operación)
CREATE OR REPLACE TYPE DIRECCION AS OBJECT
(
CALLE VARCHAR2(25),
CIUDAD VARCHAR2(20),
CODIGO_POST NUMBER(5),
/* Un procedimiento realizará una operación sin retornar un resultado
   En este caso llamando a set_calle el campo calle será igual al parámetro C */
MEMBER PROCEDURE SET_CALLE(C VARCHAR2),
/* Una función realizará una operación y devolverá un resultado.
   En este caso, retornará el valor del campo calle */
MEMBER FUNCTION GET_CALLE RETURN VARCHAR2 -- Indicamos el tipo de objeto a devolver
);
```

```sql
-- Un ejemplo que devolverá el área de un rectángulo
CREATE OR REPLACE TYPE RECTANGULO AS OBJECT
(
BASE NUMBER,
ALTURA NUMBER,
AREA NUMBER,
-- Creamos un constructor que calcule el área.
-- Return SELF AS RESULT hace referencia a que el cálculo se retornará en los propios campos
CONSTRUCTOR FUNCTION RECTANGULO(BASE NUMBER, ALTURA NUMBER) RETURN SELF AS RESULT
);
```

## Métodos

¿Qué sucede? Que hasta ahora, solo hemos estado especificando el esqueleto de estos métodos. Para programar el código que hará las operaciones deberemos agregar un cuerpo al método, con la sentencia CREATE OR REPLACE TYPE BODY.

En el siguiente ejemplo veremos como hacer el cuerpo de una función que actúe como constructor, en el tipo Rectangulo.

```sql
-- Por ejemplo, vamos a crear el cuerpo del tipo DIRECCION
CREATE OR REPLACE TYPE BODY DIRECCION AS
-- Procedimiento que da valor a la calle
MEMBER PROCEDURE SET_CALLE(C VARCHAR2) IS
BEGIN
  CALLE:=C; -- Simplemente igualamos el campo al parámetro
END;
-- Función que devuelve el nombre de la calle
MEMBER FUNCTION GET_CALLE RETURN VARCHAR2 IS
BEGIN
  RETURN CALLE; -- Devuelvo el campo seleccionado
END;
END;
```

```sql
-- Cuerpo del tipo RECTANGULO
CREATE OR REPLACE TYPE BODY RECTANGULO AS
-- Creo el constructor
  CONSTRUCTOR FUNCTION RECTANGULO (BASE NUMBER, ALTURA NUMBER) RETURN SELF AS RESULT
  AS
  BEGIN
    SELF.BASE:=BASE; -- Campo BASE igual al parámetro BASE
    SELF.ALTURA:=ALTURA; -- Campo ALTURA igual al parámetro ALTURA
    SELF.AREA:=BASE*ALTURA; -- Campo AREA igual a la multiplicación de los dos anteriores
    RETURN; -- Retorno todo el constructor
  END; -- Fin de Constructor
END; -- Fin de Body
```

```sql
-- También podremos mostrar los resultados de los métodos por pantalla
SET SERVEROUTPUT ON; -- Permite texto por pantalla en consola de Oracle
DECLARE -- Declaro tres rectangulos para calcular sus áreas
  R1 RECTANGULO; -- No hace falta lanzar el constructor aún
  R2 RECTANGULO;
  R3 RECTANGULO:=RECTANGULO(NULL,NULL,NULL); -- Pero si se hace no pasa nada
BEGIN
  -- Una forma de crear objetos es usando NEW y los parámetros del constructor
  R1:= NEW RECTANGULO(10,20,200);
  DBMS_OUTPUT.PUT_LINE('AREA R1: ' || R1.AREA); -- Salida por pantalla del resultado
  R2:= NEW RECTANGULO(10,20); -- Segundo rectangulo
  DBMS_OUTPUT.PUT_LINE('AREA R2: ' || R2.AREA); -- Resultado del segundo rectangulo
  -- Establezco valor a las propiedades del tercer rectangulo
  R3.BASE:=5;
  R3.ALTURA:=15;
  R3.AREA:=R3.BASE*R3.ALTURA; -- Y creo el cálculo a mano
  DBMS_OUTPUT.PUT_LINE('AREA R3: ' || R3.AREA); -- Imprimo el resultado por pantalla
  END; -- Fin de la declaración
```

```sql
-- Creo una tabla basada en el objeto PERSONA
CREATE TABLE ALUMNOS OF PERSONA (
CODIGO PRIMARY KEY -- Establezco la clave primaria
);
```

## Tablas de objetos

Para almacenar los datos y que permanezcan guardados hay que crear tablas, los tipos de objetos no sirven para ello. Lo que sí podremos hacer es tablas que estén basadas en objetos creados previamente.

Pero, ¿Cómo realizo una inserción si dentro del objeto PERSONA tengo un objeto DIRECCION? Como si fuese un constructor como los vistos anteriormente, y haciendo referencia al TIPO de campo que vamos a insertar, y no al nombre del campo como se halla llamado en el objeto que lo almacene. Es decir, insertaremos DIRECCION(…) y no DIREC(…).

Por lo demás, es un INSERT INTO como todos en SQL.

Ahora bien, para hacer referencia a los campos de la dirección de una persona, en acciones como consultar, eliminar o actualizar datos por ejemplo, la cosa se mantiene como si hiciésemos llamadas a las propiedades y métodos públicos de una clase en Java, para que se entienda el símil. Vamos a ver varios ejemplos

```sql
INSERT INTO ALUMNOS VALUES (1, 'Juan Pérez', DIRECCION('C/ Los manantiales 5', 'GUADALAJARA', 19005), '18/12/1991');
INSERT INTO ALUMNOS (CODIGO, NOMBRE, DIREC, FECHA_NAC) VALUES (2, 'Julia Breña', DIRECCION('c/ Los espartales 25', 'GUADALAJARA', 19004), '18/12/1987');
```

```sql
-- SELECT a todos los campos con una condicion de ciudad de Guadalajara
SELECT * FROM ALUMNOS A WHERE A.DIREC.CIUDAD='GUADALAJARA';
-- SELECT a campos en concreto de PERSONA
SELECT CODIGO, A.DIREC FROM ALUMNOS A;
-- SELECT a métodos definidos en objeto DIRECCION
SELECT NOMBRE, A.DIREC.GET_CALLE() FROM ALUMNOS A;
```

```sql
SET SERVEROUTPUT ON; -- Habilito la escritura en pantalla
DECLARE
  CURSOR C1 IS SELECT * FROM ALUMNOS; -- Declaro cursos de Alumnos
BEGIN
  FOR I IN C1 LOOP -- Recorro tod el cursor
    DBMS_OUTPUT.PUT_LINE(I.NOMBRE || ' - Calle: ' || I.DIREC.CALLE); -- Imprimo la información
  END LOOP; -- Cierro el cursor
END;
```

```sql
-- Consulta de actualización
UPDATE ALUMNOS A
  SET A.DIREC.CIUDAD=LOWER(A.DIREC.CIUDAD)
  WHERE A.DIREC.CIUDAD='GUADALAJARA';
```

```sql
-- Consulta de borrado
DELETE ALUMNOS A WHERE A.DIREC.CIUDAD='guadalajara';
```

## Varrays

Los varrays son arrays del objeto que nosotros le indicamos y de un tamaño definido previamente.

La pega de los varrays es que no se puede modificar su información en solitario. Es decir, que si actualizo el segundo campo de un array de tres posiciones, deberé volver a guardar también las posiciones 0 y 2 (la segunda posición sería la 1).

```sql
-- Creo un array de tres posiciones de cadenas de texto con máx. nueve caracteres
CREATE TYPE TELEFONO AS VARRAY(3) OF VARCHAR2(9);
```

```sql
-- Hago un nuevo tipo incluyendo el varray anterior
CREATE TABLE AGENDA
(
NOMBRE VARCHAR2(15),
TELEF TELEFONO
);
```

```sql
-- Para realizar inserciones llamaremos al constructor del varray.
-- Hay que tener en cuenta que no hace falta pasarle tres teléfonos, pero
-- si queremos añadir un segundo telefono más tarde, deberemos volver a escribir todos
-- los anteriores
INSERT INTO AGENDA VALUES ('MANUEL', TELEFONO('656008876','927986655','639883300'));
INSERT INTO AGENDA (NOMBRE, TELEF) VALUES ('MARTA', TELEFONO('649500800'));
```

```sql
-- Las consultas funcionan como si llamasemos a propiedades de tipos
SELECT A.TELEF FROM AGENDA A;
SELECT A. NOMBRE, A.TELEF FROM AGENDA A;
```

```sql
-- Este es el problema de los varrays antes mencionado
-- Para actualizar un varray, hay que volver a escribir todos los campos que lo componen
UPDATE AGENDA SET TELEF = TELEFONO('649500800', '659222222')
WHERE NOMBRE='MARTA';
```

## Herencia de tipos

La herencia de tipos funciona como la herencia de programación de objetos. Podemos crear un objeto base, por ejemplo ANIMALES, con la característica de VIVIR, y de él que desciendan los tipos VERTEBRADOS e INVERTEBRADOS, que además de sus propiedades llevarán incorporada la de VIVIR del tipo que han heredado. Y a su vez estos pueden ser campos que hereden otros subcampos. MAMIFEROS heredará de VERTEBRADOS, por ejemplo, y al final de varias herencias, podríamos tener el tipo PERRO, un tipo final que no podrá otorgar una herencia a ningún tipo más.

Es un ejemplo, pero sirve para hacernos una breve idea.

La forma de implementar la herencia en Oracle es tal que así:

Lo primero es definir el tipo que servirá para la herencia. Persona en mi caso.

```sql
-- Vamos a crear un cursos para sacar la tabla por pantalla
SET SERVEROUTPUT ON -- Activo la salida de texto
DECLARE
  CURSOR C1 IS SELECT * FROM AGENDA; -- Creo el cursor para la agenda
  CAD VARCHAR2(50); -- Y una cadena que concatene el texto
BEGIN
  FOR I IN C1 LOOP -- Inicio recorrido del cursor
    DBMS_OUTPUT.PUT_LINE(I.NOMBRE || ', Número de Teléfonos: ' || I.TELEF.COUNT); -- Escribo la cabecera
    CAD:='*'; -- Y un separador
    FOR J IN 1..I.TELEF.COUNT LOOP -- Bucle que recorra los telefonos que estén escritos
      CAD:= CAD || I.TELEF(J) || '*'; -- Y los concatene
    END LOOP; -- Fin de bucle
    DBMS_OUTPUT.PUT_LINE(CAD); -- Imprimo la cadena
  END LOOP; -- Fin del cursor
END; -- Fin programa
```

Y a continuación el tipo que va a heredar. Alumno

```sql
-- Procedimiento para hacer inserción pasando los campos de nombre y varray de telfs.
CREATE OR REPLACE PROCEDURE INSERTAR_AGENDA(N VARCHAR2, T TELEFONO) AS
BEGIN
  INSERT INTO AGENDA VALUES(N,T); -- Inserción normal llamando a los tipos
END;
```

```sql
-- Y la inserción metiendola también dentro de un cuerpo
BEGIN
  INSERTAR_AGENDA('LUIS', TELEFONO('949009977'));
  INSERTAR_AGENDA('MIGUEL', TELEFONO('949004020', '678905400'));
  COMMIT;
END;
```

```sql
-- Se define el tipo persona
CREATE OR REPLACE TYPE TIPO_PERSONA AS OBJECT(
DNI VARCHAR2(10),
NOMBRE VARCHAR2(25),
FEC_NAC DATE,
MEMBER FUNCTION EDAD RETURN NUMBER,
FINAL MEMBER FUNCTION GET_DNI RETURN VARCHAR2,
MEMBER FUNCTION GET_NOMBRE RETURN VARCHAR2,
MEMBER PROCEDURE VER_DATOS
) NOT FINAL

-- Cuerpo del tipo persona
CREATE OR REPLACE TYPE BODY TIPO_PERSONA AS
-- Función que calcula la edad
MEMBER FUNCTION EDAD RETURN NUMBER IS
  ED NUMBER;
  BEGIN
    ED:=TO_CHAR(SYSDATE,'YYYY') - TO_CHAR(FEC_NAC, 'YYYY');
    RETURN ED;
  END;
-- Devuelve el DNI
FINAL MEMBER FUNCTION GET_DNI RETURN VARCHAR2 IS
  BEGIN
    RETURN DNI;
  END;
-- Devuelve el nombre
MEMBER FUNCTION GET_NOMBRE RETURN VARCHAR2 IS
  BEGIN
    RETURN NOMBRE;
  END;
-- Imprime los datos de esa persona
MEMBER PROCEDURE VER_DATOS IS
BEGIN
  DBMS_OUTPUT.PUT_LINE(DNI || '*' || NOMBRE || '*' || EDAD());
END;
END; -- Fin Cuerpo
```

```sql
-- Se define el tipo alumno
-- Under tipo a heredar es la forma de indicar de que tipo
-- se recibirá la herencia
CREATE OR REPLACE TYPE TIPO_ALUMNO UNDER TIPO_PERSONA(
CURSO VARCHAR2(10),
NOTA_FINAL NUMBER,
MEMBER FUNCTION NOTA RETURN NUMBER,
-- Sobrescribimo el procedimiento VER_DATOS
-- del tipo persona. En tipo alumno cambiará
OVERRIDING MEMBER PROCEDURE VER_DATOS
);

-- Cuerpo del tipo alumno
CREATE OR REPLACE TYPE BODY TIPO_ALUMNO AS
  -- Devuelve la nota final
  MEMBER FUNCTION NOTA RETURN NUMBER IS
  BEGIN
    RETURN NOTA_FINAL;
  END;
  -- Nueva versión de ver datos
  OVERRIDING MEMBER PROCEDURE VER_DATOS IS
  BEGIN
    DBMS_OUTPUT.PUT_LINE(CURSO || '*' || NOTA_FINAL);
  END;
END;
```

Podemos hacer algunas declaraciones que sirvan para testear si la herencia se está recibiendo correctamente.

```sql
SET SERVEROUTPUT ON; -- Activo salida por pantalla
DECLARE
  A1 TIPO_ALUMNO:=TIPO_ALUMNO(NULL,NULL,NULL,NULL,NULL);
  A2 TIPO_ALUMNO:=TIPO_ALUMNO('871234533A', 'PEDRO','12/12/1996', 'SEGUNDO', 7);
  NOM A1.NOMBRE%TYPE;
  DNI A1.DNI%TYPE;
  NOTAF A1.NOTA_FINAL%TYPE;
BEGIN
  A1.NOTA_FINAL:=8;
  A1.CURSO:='PRIMERO';
  A1.NOMBRE:='JUAN';
  A1.FEC_NAC:='20/10/1997';
  A1.VER_DATOS;
  NOM :=A2.GET_NOMBRE();
  DNI:=A2.GET_DNI();
  NOTAF:=A2.NOTA();
  A2.VER_DATOS();
  DBMS_OUTPUT.PUT_LINE(A1.EDAD());
  DBMS_OUTPUT.PUT_LINE(A2.EDAD());
END;
```

```sql
-- La creación de tabla e inserción de elementos no difiere de lo que ya sabiamos
CREATE TABLE TALUMNOS OF TIPO_ALUMNO (DNI PRIMARY KEY);
INSERT INTO TALUMNOS VALUES ('871234533A', 'PEDRO','12/12/1996', 'SEGUNDO', 7);
INSERT INTO TALUMNOS VALUES ('809004534B', 'MANUEL','12/12/1997', 'TERCERO', 8);
```

```sql
-- Y las consultas de campos tampoco
SELECT * FROM TALUMNOS;
SELECT DNI, NOMBRE, CURSO, NOTA_FINAL FROM TALUMNOS;
SELECT P.GET_DNI(), P.GET_NOMBRE(), P.EDAD(), P.NOTA() FROM TALUMNOS P;
```
