---
title: Programación. Ficheros
description: Teoría sobre ficheros secuenciales y ficheros de texto en programación. Operadores elementales, comunicación con el sistema de ficheros y algoritmos de ejemplo en pseudocódigo.
author: Inazio Claver
date: 2014-11-29 22:31:00 +0800
categories: [Programación]
tags: [programacion, c, ficheros]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Uso de ficheros

Los ficheros surgen de la necesidad de almacenar información una vez que termina el programa y poder usarla en ejecuciones futuras de ese mismo programa o de otros.

Es el único mecanismo que tenemos para guardar información cuando nos quedamos sin suministro eléctrico y poder recuperarla después.

El acceder a la información de los ficheros supone acceder a dispositivos que al lado de la memoria de un ordenador resultan excesivamente lentos, ya que supone el desplazamiento mecánico de cabezas lectoras y eso supone un retraso importante en el acceso a la información.

## Tipos básicos de ficheros

### Ficheros secuenciales

Almacenan una secuencia de datos de cualquier tipo (pero todos del mismo tipo). Por ejemplo, puedo tener un fichero que almacena una secuencia de enteros, de reales, de vectores de lo que sea, de registros de cualquier tipo, etc.

No los podemos editar con un editor de textos (o bueno, podemos pero no vamos a entender nada).

Para crearlos, acceder a la información, o modificarlos lo habitual es hacerlo por programa.

### Ficheros de texto

Almacenan únicamente caracteres codificados en ASCII.

Por consiguiente, para acceder a la información o modificarlos, podría hacer uso indistintamente de un programa o un editor de textos (aunque desde el editor tendré problemas con los caracteres no representables).

Si nos damos cuenta, tanto el uno como el otro son exactamente lo mismo (muchos bytes uno detrás de otro). Por lo tanto, lo único que varía entre un fichero secuencial binario y uno de texto, es su contenido lógico. Un fichero sea del tipo que sea podemos luego interpretarlo como queramos. Es decir, ¿puedo coger un fichero secuencial que contiene datos del tipo que sea y abrirlo como si fuera un fichero de texto, y viceversa?

Bueno, con ciertas matizaciones, por ejemplo, que el número de bytes que contiene sea múltiplo del tipo de fichero secuencial, si es de texto y resulta incomprensible.

## Ficheros secuenciales

Cuando me refiero a un fichero, la palabra secuencial tiene que ver con el tipo de acceso a la información de que dispongo, en este caso, un acceso secuencial.

Un fichero secuencial de datos de tipo "tpDato" es una estructura de datos cuyo dominio de valores son las secuencias finitas de datos del tipo "tpDato", con un conjunto restringido de operadores, que fundamentalmente permiten sólo el acceso secuencial a sus componentes.

Lo que significa y supone el acceso secuencial es que, en un momento dado, sólo puede accederse de forma inmediata a uno de los componentes del fichero, y para acceder a un elemento es preciso haber accedido antes a todos los elementos anteriores.

Es decir, con un vector por ejemplo, yo puedo acceder directamente a la componente 1000 del vector si es justo el dato que necesito.

Con un fichero secuencial, si yo quiero el dato 1000 tengo que acceder primero a los 999 anteriores. Por tanto los accesos son mucho más lentos, debido a dos razones diferentes:

- El dispositivo de almacenamiento es más lento (los discos duros son más lentos que las memorias).
- El acceso en el caso del fichero es secuencial, mientras que en memoria el acceso es directo.

Es útil para guardar y recuperar información, pero bastante inútil para buscar de manera eficiente información en él.

## Operadores elementales sobre ficheros secuenciales. Escritura

- **`iniciarEscritura(f)`**: Procedimiento para la creación del fichero como una secuencia vacía.
- **`escribir(f, expresión)`**: Procedimiento para la adición (escritura) de un dato al fichero f.

## Operadores elementales sobre ficheros secuenciales. Lectura

- **`iniciarLectura(f)`**: Proceso para iniciar el proceso de inspección.
- **`siguienteDato(f)`**: Función para consultar el siguiente dato a acceder (sin avanzar a él). Muchos lenguajes no lo tienen disponible.
- **`avanzar(f)`**: Procedimiento para avanzar al siguiente dato almacenado en el fichero f. Se usa junto con `siguienteDato(f)` y tampoco está definido en muchos lenguajes.
- **`leer(f, variable)`**: Procedimiento para la lectura del siguiente dato almacenado en el fichero f. Lo lee, lo guarda en la variable y avanza (`siguienteDato` + `avanzar`, todo en uno).
- **`finFichero(f)`**: Función para consultar si se ha accedido al final del fichero f. Valdrá VERDAD cuándo se haya leído el último dato de f.

## Operadores: Comunicación de un algoritmo con el sistema de ficheros del S.O.

- **`asociar(f, nombre)`**: Establece la conexión lógica entre un fichero interno (variable _f_ en este caso, que es la que utilizaremos en nuestro algoritmo) y el correspondiente fichero externo (el fichero que tenga el nombre indicado, que es lo que quedará en el sistema de ficheros cuándo nuestro programa termine). La sintaxis de este nombre se ajustará a las reglas definidas por el S.O.

- **`disociar(f)`**: Deshace la conexión lógica entre la variable del algoritmo y el fichero del nombre que se indicó, de tal manera que la variable quede libre para poder ser utilizado sobre ese u otros ficheros, y se garantiza que se han realizado todas las operaciones realmente sobre el fichero (a veces, cuando escribimos sobre el fichero, no se fuerza su escritura sobre el fichero real. Si no disociamos un fichero antes de terminar el programa, podríamos no haber escrito realmente datos que hemos dado las instrucciones para que se escriban).

## Algoritmo crearFicherosEnteros

```
{Almacenar en un fichero "números.dat" los N números naturales. N es obtenido de forma interactiva}

Tipos
     tpFichero:=fichero de entero;

variables
     f:tpFichero;
     N:entero {Máximo número a almacenar};
     contador:entero;

principio
     escribirCadena(pantalla,"¿Números a almacenar en el fichero?");
     leerEntero(teclado,N);
     asociar(f,"numeros.dat");
     iniciarEscritura(f);
     contador:=1;
     mientras que contador<=N hacer
          escribir(f,contador);
          contador:=contador+1;
     fmq;
     disociar(f);
fin;
```

## Algoritmo mostrarFicherosEnteros

```
{Visualizar los datos en un fichero "numeros.dat" de datos enteros}

Tipos
     tpFichero:=fichero de entero;

variables
     f:tpFichero;
     num:entero;

principio
     asociar(f,"numeros.dat");
     iniciarLectura(f);
     mientras que NOT finFichero(f) hacer
          leer(f,num);
          escribirEntero(pantalla,num);
     fmq;
     disociar(f);
fin
```

## Algoritmo separarImpares

```
{Separa los números pares e impares del fichero "datos.dat" guardándolos respectivamente en los ficheros "pares.dat" e "impares.dat"}

Tipos
     tpFichero:=fichero de entero

variables
     f, i, p:tpFichero;
     dato:entero;

principio
     asociar(f,"datos.dat");
     asociar(i,"impares.dat");
     asociar(p,"pares.dat");
     iniciarLectura(f);
     iniciarEscritura(i);
     iniciarEscritura(p);

     mientras que NOT finFichero(f) hacer
          leer(f,dato);
          si dato MOD 2=0
                    entonces
                               escribir(p,dato);
                    si no
                               escribir(i,dato);
          fsi
     fmq
     disociar(f);
     disociar(i);
     disociar(p);
fin
```

## Ficheros de texto

Los ficheros de texto son simples ficheros secuenciales de caracteres. No obstante, dada la importancia de su uso, los vemos en mayor profundidad de forma específica.

Funcionan a todos los efectos como cualquier fichero secuencial de cualquier tipo de dato, aunque hay algunas operaciones especiales pensadas específicamente para ellos.

Los lenguajes de programación suelen tratarlos de un modo especial, incluso algunos traen predefinidos un tipo fichero de texto.

### Algoritmo contarVocales

```
{Cuenta el número de vocales que tiene un fichero de texto "a.txt"}

Variables
     f:texto;
     c:caracter;
     contador:entero;

principio
     asociar(f,"a.txt");
     iniciarLectura(f);
     contador:=0;
     mientras que NOT finFichero hacer
          leer(f,c);
          si (c='A' or c='E' or c='I' or c='O' or c='U' or c='a' or c='e' or c='i' or c='o' or c='u')
                    entonces
                               contador:=contador+1;
          fsi
     fmq
     escribirCadena(pantalla,"Número de vocales");
     escribirEntero(pantalla,contador);
     disociar(f);
fin
```

## Operadores para trabajar con líneas

- **`acabarLinea(f)`**: Procedimiento que da por concluida la línea en curso en el fichero f cuándo estoy escribiendo en él.
- **`avanzarLinea(f)`**: Procedimiento que salta los caracteres que pueden estar pendientes de ser leídos en la línea en curso del fichero f y dispone al ordenador para leer el primer carácter de la siguiente línea (cuando estoy leyendo del fichero).
- **`finLinea(f)`**: Función que devuelve VERDAD si ha terminado con todos los caracteres de la línea en curso y FALSO en caso contrario. Cuando acaba la línea pasará a la siguiente haciendo uso del procedimiento `avanzarLinea`.

### Creación de un fichero de texto

```
...
asociar(f,"fichero.txt");
iniciarEscritura(f);
mientras que "haya líneas que añadir" hacer
     mientras que "haya caracteres que añadir en la línea actual" hacer
          "obtener el caracter C";
          escribir(f,c);
     fmq
     acabarLinea(f);
fmq
disociar(f);
…
```

### Lectura de un fichero de texto

```
…
asociar(f,"fichero.txt");
iniciarLectura(f);
mientras que NOT finFichero(f) hacer
     mientras que NOT finLinea(f) hacer
          leer(f,c);
          "tratar el caracter c";
     fmq
     avanzarLinea(f);
fmq
disociar(f);
…
```

**¡Salud y coding!**
