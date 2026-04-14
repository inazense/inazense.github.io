---
title: "Programación multimedia. Estilos"
description: Cómo crear y aplicar estilos personalizados en Android Studio editando styles.xml, incluyendo herencia de estilos para reutilizar propiedades visuales.
author: Inazio Claver
date: 2015-10-18 23:30:00 +0800
categories: [Android]
tags: [android, android-studio, estilos, styles, herencia, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Los estilos en Android permiten definir un conjunto de propiedades visuales (color, tamaño, padding...) y aplicarlas a múltiples elementos de la interfaz de forma consistente, de manera análoga a las hojas de estilo CSS en web.

## El fichero styles.xml

Los estilos se definen en el fichero `styles.xml`, ubicado en `app → src → main → res → values`.

![Localización de styles.xml en el proyecto](/img/posts/20151018_50.png)

![Contenido inicial de styles.xml](/img/posts/20151018_51.png)

## Crear un estilo personalizado

La sintaxis básica de un estilo es:

```xml
<style name="nombre del estilo">
    <item name="nombre de la propiedad">Valor</item>
</style>
```

Por ejemplo, un estilo que cambia el color del texto a verde:

```xml
<style name="MiEstilo">
    <item name="android:textColor">#00FF00</item>
</style>
```

![Definición de MiEstilo en styles.xml](/img/posts/20151018_52.png)

## Aplicar un estilo a un elemento

Para aplicar un estilo a un elemento del layout, se selecciona el elemento (por ejemplo, un `EditText`) y se asigna el nombre del estilo en la propiedad `style`.

![Seleccionar elemento en el editor](/img/posts/20151018_53.png)

![Asignar el estilo desde el panel de propiedades](/img/posts/20151018_54.png)

![Resultado con el estilo aplicado](/img/posts/20151018_55.png)

## Herencia de estilos

Es posible crear estilos hijo que hereden de otros usando la nomenclatura `EstiloPadre.EstiloHijo`. El estilo hijo hereda todas las propiedades del padre y puede añadir o sobreescribir las que necesite.

```xml
<style name="MiEstilo">
    <item name="android:textColor">#00FF00</item>
</style>

<style name="MiEstilo.ParaBoton">
    <item name="android:padding">20dp</item>
    <item name="android:textSize">18sp</item>
</style>
```

En este ejemplo, `MiEstilo.ParaBoton` hereda el color de texto verde de `MiEstilo` y añade padding y tamaño de texto propios.

![Estilo con herencia en styles.xml](/img/posts/20151018_56.png)

![Aplicar estilo heredado a un botón](/img/posts/20151018_57.png)

Es posible generar múltiples niveles de herencia, lo que permite organizar los estilos de forma jerárquica y mantener la consistencia visual de la aplicación.

![Resultado final con estilos aplicados](/img/posts/20151018_58.png)
