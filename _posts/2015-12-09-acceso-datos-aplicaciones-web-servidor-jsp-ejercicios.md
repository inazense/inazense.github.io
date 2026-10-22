---
title: "12 ejercicios de JSP resueltos"
description: "Doce ejercicios de JSP resueltos, desde mostrar datos del servidor o calcular la letra del DNI hasta formularios con base de datos y una agenda completa."
author: Inazio Claver
date: 2015-12-09 12:00:00 +0800
categories: [Web]
tags: [java, jsp, web, mysql, jdbc, ejercicios]
pin: false
math: false
mermaid: false
redirect_from:
  - /2015/12/acceso-datos-aplicaciones-web-servidor.html
---

Doce ejercicios prácticos para aprender JSP y acceso a bases de datos, desde operaciones básicas hasta sistemas de gestión completos.

## Ejercicio 1: Información del servidor

Mostrar el navegador del cliente, la IP del servidor, el nombre del servidor, la información del servidor web y la IP del cliente.

![Salida del ejercicio con el navegador del cliente y los datos del servidor](/img/posts/20151209_1.png)

## Ejercicio 2: Imprimir texto formateado

Recibir un nombre como parámetro e imprimirlo entre comillas precedido de la palabra "Nombre" en negrita.

## Ejercicio 3: Primeros 100 números pares

Imprimir los 100 primeros números pares comenzando por el 2 y a continuación mostrar su suma.

## Ejercicio 4: Número palíndromo

Determinar si un número entero recibido como parámetro es palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).

## Ejercicio 5: Cadena al revés

Recibir una cadena de caracteres y mostrarla invertida.

## Ejercicio 6: Letra del DNI

Calcular la letra correspondiente a un número de DNI mediante la división del número entre 23 y consulta en la tabla de letras.

![Tabla de letras del DNI según el resto de dividir entre 23](/img/posts/20151209_2.png)

## Ejercicio 7: Años completos entre fechas

Calcular el número de años completos transcurridos entre dos fechas proporcionadas.

## Ejercicio 8: Desglose de billetes y monedas

Dado un importe, desglosarlo en billetes de 50€, 20€, 10€, 5€, monedas de 2€, 1€ y céntimos.

## Ejercicio 9: Conversión de divisas

Convertir una cantidad fija de euros (337) a varias divisas utilizando las tasas de cambio almacenadas en un array.

![Conversión de 337 euros a varias divisas en JSP](/img/posts/20151209_3.png)

## Ejercicio 10: Notas de alumnos

Mostrar las notas de los alumnos por asignatura y calcular la media redondeada a partir de datos almacenados en un fichero.

![Boletín de notas por asignatura con la nota media](/img/posts/20151209_4.png)

## Ejercicio 11: Formulario de registro de clientes

Aplicación con formulario de alta de clientes con validación de datos y inserción en base de datos.

![Formulario JSP de alta de clientes](/img/posts/20151209_5.png)

**Campos del formulario:**
- Código de cliente (máx. 10 caracteres)
- Nombre (máx. 50 caracteres)
- Dirección (máx. 30 caracteres)
- Ciudad (máx. 20 caracteres)
- Provincia (máx. 20 caracteres)
- País (máx. 20 caracteres)
- Teléfono (máx. 15 caracteres, solo numérico)
- Email (debe contener `@` y `.`)
- Contraseña (mínimo 6 caracteres, confirmación debe coincidir)

La clase `Acciones.java` gestiona la conexión a la base de datos e inserta el cliente con soporte de transacciones y rollback en caso de error.

El archivo `15a.jsp` presenta el formulario y `15b.jsp` procesa el envío, valida la contraseña, ejecuta la inserción y redirige al formulario al finalizar.

## Ejercicio 12: Sistema de gestión de agenda

Sistema completo de agenda con operaciones CRUD.

**Agenda.java** (clase de datos):

```java
public class Agenda {
    private String apellidos;
    private String nombre;
    private String telefono;
    private String direccion;
    private String ciudad;
    private String provincia;

    public String getApellidos() { return apellidos; }
    public String getNombre() { return nombre; }
    public String getTelefono() { return telefono; }
    public String getDireccion() { return direccion; }
    public String getCiudad() { return ciudad; }
    public String getProvincia() { return provincia; }
    // setters correspondientes...
}
```

**AccionesAgenda.java** gestiona las operaciones de base de datos: conectar/desconectar, insertar nuevos contactos y buscar contactos por múltiples criterios, devolviendo un `ArrayList` de resultados.

Ejemplos de ejecución de la agenda: el menú principal, el alta de un contacto, la búsqueda y el listado completo.

![Menú principal de la agenda con las opciones Nuevo, Buscar y Mostrar todos](/img/posts/20151209_6.png)

![Formulario de alta de un nuevo contacto en la agenda](/img/posts/20151209_7.png)

![Formulario de búsqueda de contactos por cada campo](/img/posts/20151209_8.png)

![Listado de todos los contactos con opciones para editar y borrar](/img/posts/20151209_9.png)
