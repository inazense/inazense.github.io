---
title: Programación. Introducción a ADA
description: Introducción al lenguaje de programación ADA, sus características, tipos de datos, estructuras de control y vectores.
author: Inazio Claver
date: 2015-02-13 12:00:00 +0800
categories: [Programación]
tags: [programacion, ada]
pin: false
math: false
mermaid: false
---

## Características generales

- Lenguaje de propósito general
- Es profesional (complejo, no pensado para aprendices)
- Incorporación de puntos clave de la teoría de la programación

**Legibilidad.** Evita notación demasiado concisa (es más costoso el mantenimiento que la producción de software. "Un programa se lee más veces de las que se escribe").

**Fuerte y esteticamente tipado.** Gran cantidad para definir datos de tipos diferentes. Cada dato puede usarse sólo en operaciones específicas de su tipo. La utilización inadecuada se detecta en tiempo de compilación.

**Diseño a gran escala.** Programación modular. Mecanismos de encapsulación. Compilación separada.

**Abstracción de datos.** Separación clara entre especificación, representación e implementación.

**Módulos genéricos**

**Programa concurrente.** Descripción de procesos que pueden ejecutarse concurrentemente. Definición de operaciones de sincronización entre esos procesos.

**Manejo de excepciones.** Definición de comportamientos de recuperación ante situaciones de error no previstas.

## Escribir en ADA

- El fichero tendrá extensión `.adb`
- **`;`** para finalizar una orden
- No existen las llaves
- **`--`** es un comentario
- **`with`** sirve para incluir paquetes
- **`procedure [nombre] is`** es el procedimiento principal, que tendrá el mismo nombre que el archivo fuente.
- **`use`** hace referencia a los paquetes
- **`begin`** es el comienzo del programa
- **`put("");`** es para mostrar por pantalla cadenas de texto
- **`get("");`** sirve para capturar caracteres
- **`constant`** es usado para la declaración de constantes
- **`while loop / end loop`** es para condiciones de mientras que…
- **`if then end if`** es usado para condiciones de si…
- **`/=`** distinto de
- **`:=`** Asignación
- **`=`** Comparación

## Compilación en ADA

Para compilar debes instalar el gnat.

Para su instalación, escribe:

- `sudo apt-get update` (para actualizar repositorios)
- `sudo apt-get install gnat-4.6` (versión hasta la fecha – 10/02/2015)

Para compilar, escribe este comando:

- `gnatmake nombreArchivoSinLaExtensión`

## E/S Simple

- `text.io` – Entrada y salida de caracteres
- `integer_text.io` – Entrada y salida de enteros

## Reservas

ADA tiene 69 palabras reservadas.

![Palabras reservadas de ADA](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhY21W84l40Ca4KFWp3TDbLN1Bkt3n1M-QGP20EXOv7UDFbiG0iKjqpoPZa_YhObUYF8JjAwxbybTuVWuzSBa_dIeUgK2SWzWRpjOSJZ2S-v08COMgBDkO5pCVWRpYWVhtNHE_jGlkifIw/s1600/Sin+t%C3%ADtulo.png)

## Tipos escalables

```ada
pi:constant float:=3.1415; -- Inicializo constante pi con valor de 3.1415
final:constant character:='.'; -- Inicializo constante final con valor inicial de '.'
i, j, k: integer; -- i, j y k son enteros
```

ADA es fuertemente tipado. No se puede asignar valor a una variable de un tipo diferente.

## Subtipos

Caracteriza un subconjunto de los valores de un tipo. No constituye un nuevo tipo (la asignación está permitida).

## Tipos definidos por enumeración

Hay dos ya predefinidos. Booleanos y caracteres.

```ada
type dia is (lunes, martes, miercoles, jueves, viernes, sabado, domingo);
subtype laboral is dia range lunes..viernes;
d1:dia;d2:laboral;
```

## Atributos

```ada
dia 'first:=lunes; -- Primero
dia 'last:=sabado; -- Último
dia 'succ(lunes):=martes; -- Sucesor
dia 'pred(martes):=lunes; -- Preedecesor
dia 'pos(lunes):=0; -- Posición
dia 'val(1):=martes; -- Valor
dia 'image(lunes):="LUNES"; -- Convertir a cadena de texto
dia 'value("martes"):=martes; -- Convertir cadena de texto al tipo definido
```

## Tipo booleano

```ada
type boolean is (false,true);
a,b,c,d:boolean;
((not a) and b) or (c xor d);
```

![Tabla de operadores booleanos en ADA](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGAqeL4VkZ9XgBdlZI9rodDbHniWh41EXHAtUuwFNWkJPDBSg6Selozdq55dzMTqI1inrB9elqEgyWxISFf5TvIYJ43X0AerEq0Dvefz6JkWlv0R_GT7z9_L89G4QqGcArGsjMxcD8EIQ/s1600/aa.png)

## Tipos enteros

Hay algunos predefinidos:

- `type integer is …;` -- enteros
- `type short-integer is …;` -- enteros cortos
- `type long –integer is …;` -- enteros largos
- `subtype natural is integer range 0..integer 'last;` -- De 0 en adelante
- `subtype positives is integer range 1..integer 'last;` -- De 1 en adelante

## Orden de las propiedades

1. and, or, xor
2. not
3. =, /=, <, <=, >, >=, in, not in
4. +, – (binarios)
5. …

## Tipos reales

```ada
type misReales is digits 7;
n:integer;x:float;

-- No se admite aritmetica mixta

n+x -- incorrecto

-- Forma correcta (una de las dos)

float(n)+x
n+integer(x)
```

La conversión de real a entero aplica un redondeo.

## Estructuras de control

### If

```ada
if
     then …
end if;

if
     then …
     else …
end if;

if
     then …
     elsif
                 then …
     else …
end if;
```

### Case

```ada
case … is …
     when … =>…  -- Una opción
     when … | … | … => … -- Varias opciones
     when … .. … => … -- Con rango
     when … => NULL; -- Nulo
     when others => … -- Default
end case;
```

## Estructuras iterativas

### While

```ada
while … loop
     …
end loop;
```

### For

```ada
for d in dia loop
     …
end loop;

for d in reverse lunes..viernes loop
     …
end loop;

loop
     …
end loop;

loop
     …;
     exit;
     …;
end loop;

loop
     …
     exit when…;
     …
end loop;
```

## Estructuración de control. Subalgoritmos

**Procedimientos y funciones**

Paso de parámetros:

```ada
in (entrada), out(salida), in out (entrada/salida)
```

En ADA, por defecto, todas son de entrada.

```ada
procedure toto (x:T1;y:in out T2) is
     …
end toto;

toto(e,z); -- Llamada normal
toto(y=>z;x=>e) -- Llamada nombrada
```

**Funciones**

```ada
function factorial(n:natural)
     return natural is
begin
     if n in 0..1
          then return 1;
     else
          return n*factorial(n-1);
     end if;
end factorial;
```

Existe sobrecarga, puedo llamar a 7 funciones de la misma manera (suma de coches, de motos…), que el compilador distinguirá las funciones por el contexto de los operandos (enteros, reales, vectores).

Es decir, el significado es distinguido por el contexto.

Las funciones y procedimientos deben estar en funciones y procedimientos. Hay jerarquía, y el orden importa.

## Vectores

**Definiciones restringidas**

```ada
type t1 is array (1..10) of boolean; -- Vector de 10 posiciones de booleanos

type t2 is array (dia) of t1; -- t2 es vector de posiciones de lunes a sábado que contienen valores contenidos en t1

type t3 is array (lunes..jueves, -10..14) of t1; -- Matriz

x:t1, y:t2, z:t3;

y(i+j);
y(martes);
y(martes)(i+j);
z(martes,i+j);
x(5..8);
y(martes..viernes);
```

**Definiciones no restringidas**

```ada
type matriz is array (positive range <>, positive range <>) of real; -- range <> es de cualquier rango

function "+"(a,b:matriz)
          return matriz is
begin .. end "+";
```

**Atributos relacionados con los índices**

```ada
function "+"(a,b:matriz)
          return matriz is
   suma:matriz(a'range(1),a'range(2));

begin
          for i in a'range(1) loop
                     for j in a'range(2) loop
                                suma(i,j):=a(i,j)+b(i,j);
                     end loop;
          end loop;
          return suma;
end "+";
```

**Constantes de tipos vectoriales**

```ada
m1:=((1..3=>1.0);(1=>2.0;2=>3.0;3=>4.0));
m2:=mat23'(1=>(1=>1.0;others=>0.0);2=>(2:=1.0,others=>0.0));
```

`others` exige límites conocidos.

## Tipo no restringido predefinido: strings

```ada
type string is array(positive range <>) of character;
x0:string(1..8);
subtype s1 is string(2..8);
subtype linea is string(1..80);

x1:s1;
l:linea;

l(3..10):=x0;
l(2..4):=x0(2..6);
l(1..8):=x0(1..4)&"A"&x1(2..4);
```

Las constantes tipo cadena entre comillas dobles.

`x0` es una cadena de caracteres de longitud exactamente 8.

Cadenas → Tamaño exacto. De ocho caracteres exactamente, por ejemplo.

Cadena bounded → No tan estrictas. Hasta 8 caracteres.

## Punteros

```ada
type celda;
type enlace is access celda;
type celda is
     record
          valor:integer;
          siguiente:enlace;
     end record;
e:enlace;

e:=new celda;
e.valor:=13;
```

**Liberación de memoria de datos inaccesibles**

```ada
with unchecked_deallocation;
procedure disponer is new
     unchecked_deallocation(celda,enlace);

e:enlace;
…
disponer(e);
```
