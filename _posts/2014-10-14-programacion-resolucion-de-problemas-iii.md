---
title: Programación. Resolución de problemas (III)
description:
date: 2014-10-14 20:25:00 +0800
categories: [programacion]
tags: [programacion, c, tipos-datos, reales, pseudocodigo, algoritmos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Tipo real

Ejemplos de código

Lee del teclado el radio de una circunferencia y escribe por pantalla su longitud

```
Algoritmo longitudCircunferencia
constantes
    pi=3.1416;
variables
    radio:real
principio
    escribirCadena(pantalla,'Escribe radio de circunferencia');
    leerReal(teclado,radio);
    escribirCadena(pantalla,'La longitud de circunferencia es:');
    escribirReal(pantalla,2*pi*radio);
fin
```

Resuelve ecuación de segundo ax²+bx+c=0 y escribe resultado por pantalla

```
Algoritmo ecuacionSegundoGrado
variables
    a,b,c:real;
    discriminante:real;
    termino1,termino2:real;
principio
    escribirCadena('Vamos a resolver ecuación de segundo grado');
    escribirCadena('Introduce a:');
    leerReal(teclado,a);
    escribirCadena('Introduce b);
    leerReal(teclado,b);
    escribirCadena('Introduce c);
    leerReal(teclado,c);
    discriminante:=b*b-4.0*a*c;
    termino1:=-b/(2.0*a);
    termino2:=sqrt(abs(discriminante))/(2.0*a);
    si discriminante>=0
    entonces
        escribirCadena(pantalla,'Primera raíz');
        escribirReal(pantalla,termino1+termino2);
        acabarLinea(pantalla);
        escribirCadena(pantalla,'Segunda raíz');
        escribirReal(pantalla,termino1-termino2);
        acabarLinea(pantalla);
    si no
        escribirCadena(pantalla,'Primera raíz, parte real');
        escribirReal(pantalla,termino1);
        escribirCadena(pantalla,'Parte imaginaria');
        escribirReal(pantalla,termino2);
        acabarLinea(pantalla);
        escribirCadena(pantalla,'Segunda raíz, parte real');
        escribirReal(pantalla,termino1);
        escribirCadena(pantalla,'Parte imaginaria');
        escribirReal(pantalla,-termino2);
        acabarLinea(pantalla);
    fsi
fin
```

Imprimir por pantalla el valor de xⁿ

```
Algoritmo elevar
variables
    resultado,x:real;
    indice,n:entero;
principio
    escribirCadena(pantalla,'Introduce el valor de x');
    leerReal(teclado,x);
    escribirCadena(pantalla,'Introduce el valor de n');
    leerEntero(teclado,n);
    resultado:=1.0
    indice:=1;
    mientras que indice<=abs(n) hacer
        resultado:=resultado*x;
        indice:=indice+1;
    fmq
    si n<0 entonces
        resultado:=1.0/resultado
    fsi
    escribirCadena(pantalla,'El resultado es:');
    escribirReal(pantalla,resultado);
fin
```

```
Algoritmo calcularValorE
constante
    cotaError:=1.0E-5;
variables
    valorDeE:real;
    termino:real;
    indice:entero;
principio
    termino:=1.0
    valorDeE:=termino;
    indice:=0;
    mientras que termino>cotaError hacer
        indice:=indice+1;
        termino:=termino/indice;
        valorDeE:=valorDeE+termino;
    fmq
    escribirReal(pantalla,valorDeE);
fin
```

**¡Salud y coding!**
