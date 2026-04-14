---
title: Programación. ADA. Tipos abstractos de datos
description: Concepto de abstracción, encapsulación, diseño modular y tipos abstractos de datos (TAD) en ADA, con ejemplos de ordenación genérica, pilas y colas.
author: Inazio Claver
date: 2015-02-22 12:00:00 +0800
categories: [Programación]
tags: [programacion, ada]
pin: false
math: false
mermaid: false
---

## Concepto de abstracción

La abstracción en resolución de problemas consiste en destacar los detalles importantes e ignorar los irrelevantes. La abstracción siempre lleva asociada la ocultación de información.

Funciones y procedimientos ejemplifican esto separando el "qué" del "cómo", es decir, la especificación de la implementación.

## Abstracción de acciones

Los procedimientos y funciones abstraen los detalles de ejecución, permitiendo acciones virtuales parametrizadas mientras ocultan datos locales y secuencias de instrucciones.

## Tipo abstracto de datos (TAD)

Un tipo abstracto de datos es "una colección de valores y de operaciones definidos mediante una especificación independiente de cualquier representación".

La programación con TAD requiere dos pasos:

1. **Definición del tipo** (parte sintáctica y semántica)
2. **Implementación del tipo** (elección de representación e implementación de operaciones)

## Encapsulación

La encapsulación implica privacidad de la representación y protección del tipo. El usuario no conoce los detalles del tipo y sólo puede utilizar las operaciones previstas.

## Diseño modular

La programación a gran escala requiere partir el código en módulos con conexión mínima entre ellos y tamaños manejables.

## Ejemplo: módulo genérico de ordenación

### Declaración (`ordenacion_g.ads`)

```ada
generic
    type ind is (<>); -- cualquier tipo discreto
    type elem is private; -- cualquier tipo
    type vector is array (ind range <>) of elem;
    with function ">"(a,b:elem) return boolean;

package ordenacion_g is
    procedure ordena (v:in out vector);
end; -- del módulo de declaración
```

### Implementación (`ordenacion_g.adb`)

```ada
package body ordenacion_g is
    procedure ordena (v: in out vector) is
        i,j:ind; m,t:elem; n:integer;
    begin
        -- iniciailización
        i:=v'first;
        j:=v'last;
        n:=ind'pos(i);
        n:=n+ind'pos(j);
        n:=n/2;
        m:=v(ind'val(n));
        -- partición del vector en dos
        while i<=j loop
            while m>v(i) loop
                i:=ind'succ(i);
            end loop;
            while v(j)>m loop
                j:=ind'pred(j);
            end loop;
        …
    end ordena;
end ordenacion_g;
```

### Uso del módulo (`mi_programa`)

```ada
with ordenacion_g;
procedure mi_programa is
    type color is (rojo, azul, gris);
    type dia is (lu,ma,mi,ju,vi,sa,do);
    type vect is array (dia range <>) of color;
    x:vect(ma..vi):=(gris,azul,rojo,gris);
    package o is new ordenacion_g(dia,color,vect,">");
begin
    …
    o.ordena(x);
    …
end mi_programa;
```

## Pilas y colas

Las implementaciones concretas de pilas (pilas) y colas muestran cómo mantener interfaces permite cambiar la implementación sin afectar a los usuarios.

**Pila estática:** Vector con contador para el elemento en la cima.

**Pila dinámica:** Nodos enlazados con acceso basado en punteros.

De manera similar para las colas, con vectores circulares o implementaciones con listas doblemente enlazadas según las necesidades.
