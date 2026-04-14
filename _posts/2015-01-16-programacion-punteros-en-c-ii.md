---
title: Programación. Punteros en C (II)
description: Estructuras de datos dinámicas en C. Implementación de listas enlazadas con operaciones de inserción, borrado, búsqueda y cálculo de tamaño.
author: Inazio Claver
date: 2015-01-16 16:00:00 +0800
categories: [Programación]
tags: [programacion, c]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Estructuras de datos (ED)

Las **estructuras de datos** son colecciones de datos organizados de determinada manera. Se clasifican en:

- **Estáticas**: tamaño fijo determinado en tiempo de compilación (p. ej., arrays).
- **Dinámicas**: tamaño variable en tiempo de ejecución.

Las EDD (Estructuras de Datos Dinámicas) no están directamente soportadas por el lenguaje. Tenemos que programarlas nosotros.

Las EDD lineales son: listas, pilas y colas.
Las EDD no lineales son: árboles y grafos.

## Listas enlazadas

Una **lista** es una secuencia de cero o más elementos de un tipo determinado. A diferencia de los vectores estáticos, las listas pueden crecer o reducirse durante la ejecución del programa.

### Definición de estructuras

```c
struct info {
    /* Rellenar con toda la información que contenga un elemento de la lista */
}

struct nodo {
    struct info elemento;
    struct nodo *siguiente;
}

struct nodo *lista;
```

### Inicializar la lista

```c
lista=NULL;
```

### Insertar al principio

```c
void insertarPrincipio (struct nodo **L, struct info *X) {
    struct nodo *tmp;
    tmp=(struct nodo *) malloc (sizeof(struct nodo));
    tmp->elemento=*X;
    tmp->siguiente=*L;
}
```

### Insertar al final

```c
void insertarFin (struct nodo **L, struct info *x){
    struct nodo *tmp;
    struct nodo *aux;
    tmp=(struct nodo *)malloc(sizeof(struct nodo));
    tmp->siguiente=NULL;
    if(*L==NULL) /* Lista vacía */
        *L=tmp;
    else { /* Lista con información */
        aux=*L;
        while (aux->siguiente !=NULL)
            aux=aux->siguiente;
        aux->siguiente=tmp;
    }
}
```

### Insertar en una posición concreta

```c
void insertarPos (struct nodo **L, struct nodo *p, struct info *x) {
    struct nodo *tmp;
    tmp=(struct nodo *)malloc (sizeof(struct nodo));
    tmp->elemento=*x;
    if (L==NULL){ /* Lista vacía */
        tmp->siguiente=NULL;
        *L=tmp;
    }
    else {
        tmp->siguiente=p->siguiente;
        p->siguiente=tmp;
    }
}
```

### Eliminar un elemento

```c
void eliminar (struct nodo **L, struct nodo *p) {
    struct nodo *tmp;
    if (*L==p) /* Eliminar el primer elemento */
        *L=p->siguiente;
    else {
        tmp=*L;
        while (tmp->siguiente!=p)
            tmp=tmp->siguiente;
        /* tmp apunta al anterior */
        tmp->siguiente=p->siguiente;
    }
    free(p);
}
```

### Calcular el tamaño de la lista

Mi solución:

```c
int tamagno (struct nodo **L) {
    struct nodo *tmp;
    int contador=1;
    tmp=*L;
    if (*tmp==NULL)
        return 0;
    else {
        while (tmp->siguiente!=NULL) {
            contador++
        }
    }
    return contador;
}
```

Solución del profesor (más limpia):

```c
int tamagno (struct nodo **L) {
    int n;
    struct nodo *tmp;
    tmp=*L;
    n=0;
    while (tmp!=NULL) {
        n++;
        tmp=tmp->siguiente;
    }
    return (n);
}
```

### Localizar un elemento

```c
struct nodo *localizar(struct nodo**L, int x) {
    struct nodo *tmp;
    tmp=*L;
    while ((tmp!=NULL) && ((tmp->elemento).campo_x!=x))
        tmp=tmp->siguiente;
    return tmp;
}
```

## Ejemplo de uso

```c
main() {
    struct info c;
    struct nodo *Lista;
    struct nodo *p;

    Lista=NULL;

    c.campo_x=5;
    insertarPrincipio(&Lista, &c);

    c.campo_x=12;
    insertarFin(&Lista, &c);

    /* Ver contenido */
    p=Lista;
    while (p!=NULL){
        printf("%d",(p->elemento).campo_x);
        p=p->siguiente;
    }
    p=Lista; /* Apunta a "5" */
    p=p->siguiente; /* Apunta a "12" */
    c.campo_x=56;
    /* Voy a insertar tras "12" */
    insertarPos(&Lista, p, &c);

    p=Lista; /* Apunta a 5 */
    p=p->siguiente; /* Apunta a 12 */;
    /* Voy a eliminar "12" */
    eliminar(&Lista, p);
}
```

## Aplicación práctica: almacenamiento de polinomios

Para almacenar un polinomio en una lista, cada nodo contendría la siguiente información:

```c
struct info {
    int exponente;
    float coeficiente;
}
```

**¡Salud y coding!**
