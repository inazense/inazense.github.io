---
title: Programación. ADA. Tipos abstractos de datos (II)
description: Implementación estática y dinámica de árboles binarios, n-arios y de búsqueda, y representación de grafos.
author: Inazio Claver
date: 2015-03-14 17:56:00 +0800
categories: [Programación]
tags: [programacion, ada, arboles, grafos, estructuras-de-datos]
pin: false
math: false
mermaid: false
---

## Árbol binario

**Implementación estática:** Se usa un vector cuyos componentes tienen cuatro campos: información, índice del hijo izquierdo, índice del hijo derecho e indicador de ocupación.

**Implementación dinámica:** Cada nodo contiene la información y dos punteros, uno al hijo izquierdo y otro al hijo derecho.

## Árbol n-ario

Para árboles donde cada nodo puede tener más de dos hijos:

**Implementación estática:** Se usa un vector de 0 a máx-1 donde la raíz se almacena en la posición 0. Si un nodo es el k-ésimo hijo de un padre en la posición `i`, se almacena en la posición `n × i + k`. El número de componentes necesarios para una altura `h` es:

```
(n^(h+1) - 1) / (n - 1)
```

**Implementación dinámica:** Se usa la representación primogénito-siguiente-hermano, con dos punteros por nodo: uno al primer hijo (primogénito) y otro al siguiente hermano.

## Árboles de búsqueda

Tipos clasificados:

- **Árboles binarios de búsqueda**
- **Árboles AVL**
- **Árboles m-arios:** Los nodos almacenan m-1 elementos ordenados.
- **Árboles B:** Árbol m-ario donde la raíz tiene al menos 2 hijos, los nodos internos tienen al menos m/2 hijos, y todas las hojas están en el mismo nivel.
- **Árbol 2-3:** Árbol B de orden 3, con 2 o 3 hijos por nodo.
- **Árbol B*:** Variante del árbol B con mayor factor de ocupación mínimo.
- **Árbol B+:** Las hojas están enlazadas entre sí; la información solo reside en las hojas.

## Grafos

Un grafo es un par G = (V, A) donde V es el conjunto de vértices y A el conjunto de aristas. Pueden ser dirigidos o no dirigidos, y las aristas pueden tener pesos (grafos etiquetados).

**Conceptos clave:**

- **Camino:** Secuencia de vértices conectados entre sí.
- **Ciclo:** Camino que empieza y termina en el mismo vértice.
- **Árbol libre:** Grafo no dirigido, conexo y acíclico.
- **Spanning tree (árbol de expansión):** Árbol libre que es subgrafo del grafo original e incluye todos sus vértices.

**Implementaciones:**

- **Matriz de adyacencia:** Matriz n×n booleana (o numérica para grafos con pesos) donde cada celda indica si existe arista entre dos vértices.
- **Lista de adyacencia:** Lista de listas donde cada vértice tiene asociada la lista de vértices adyacentes.
