---
title: "Programación multimedia. Recursos alternativos. Internacionalización"
description: Cómo gestionar la internacionalización en Android creando ficheros strings.xml alternativos por idioma y región, y vincularlos a los elementos de la interfaz.
author: Inazio Claver
date: 2015-10-18 23:16:00 +0800
categories: [Android]
tags: [android, android-studio, internacionalizacion, i18n, strings, recursos, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Android utiliza sufijos de directorio para gestionar recursos alternativos según la orientación del dispositivo, el idioma, la región, la densidad de píxeles y otros parámetros. En esta entrada vemos cómo aplicarlo a la internacionalización de cadenas de texto.

## Estructura de directorios

Para internacionalizar una aplicación se crean varios ficheros `strings.xml` en carpetas con el sufijo del idioma:

| Carpeta | Idioma |
|---------|--------|
| `res/values/strings.xml` | Español (predeterminado) |
| `res/values-en/strings.xml` | Inglés |
| `res/values-fr/strings.xml` | Francés |

También es posible especificar regiones concretas dentro de un idioma:

| Carpeta | Idioma y región |
|---------|-----------------|
| `res/values-en-rUS/strings.xml` | Inglés (EE.UU.) |
| `res/values-en-rUK/strings.xml` | Inglés (Reino Unido) |

## Paso 1: Crear las carpetas de idioma

Dentro de `res/`, se crean las carpetas `values-en` y `values-fr` con su correspondiente `strings.xml`.

![Estructura de carpetas de recursos por idioma](/img/posts/20151018_42.png)

![Carpeta values con strings.xml en español](/img/posts/20151018_43.png)

## Paso 2: Definir las cadenas traducidas

En cada fichero `strings.xml` se definen las etiquetas con el atributo `name`, que es el identificador que se usará en el código. El valor de cada etiqueta varía según el idioma del fichero.

**res/values/strings.xml (español):**

```xml
<resources>
    <string name="app_name">MiApp</string>
    <string name="saludo">Hola</string>
    <string name="despedida">Adiós</string>
</resources>
```

**res/values-en/strings.xml (inglés):**

```xml
<resources>
    <string name="app_name">MiApp</string>
    <string name="saludo">Hello</string>
    <string name="despedida">Goodbye</string>
</resources>
```

**res/values-fr/strings.xml (francés):**

```xml
<resources>
    <string name="app_name">MiApp</string>
    <string name="saludo">Bonjour</string>
    <string name="despedida">Au revoir</string>
</resources>
```

![Edición del strings.xml en inglés](/img/posts/20151018_44.png)

![Edición del strings.xml en francés](/img/posts/20151018_45.png)

## Paso 3: Vincular las cadenas a los elementos UI

Al seleccionar un elemento en el editor de layouts y editar su propiedad `text`, se puede referenciar una cadena del fichero `strings.xml` usando la sintaxis `@string/nombre_etiqueta`.

![Asignar referencia a string desde el panel de propiedades](/img/posts/20151018_46.png)

![Selección de la cadena traducida](/img/posts/20151018_47.png)

## Paso 4: Probar la internacionalización

En el editor de layouts, el desplegable de idioma permite seleccionar el idioma de la previsualización para comprobar cómo quedan los textos en cada idioma sin necesidad de ejecutar la aplicación.

![Previsualización en español](/img/posts/20151018_48.png)

![Previsualización en inglés](/img/posts/20151018_49.png)

Android selecciona automáticamente el fichero `strings.xml` adecuado según el idioma configurado en el dispositivo del usuario.
