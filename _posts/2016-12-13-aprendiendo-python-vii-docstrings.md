---
title: Aprendiendo Python (VII). Docstrings
description: Aprende a crear documentación automática en Python usando docstrings. Tutorial completo sobre cómo documentar clases, funciones y métodos con ejemplos prácticos y generación de API documentation.
author: Inazio Claver
date: 2016-12-13 12:10:00 +0800
categories: [Python]
tags: [python, docstrings, documentacion, api, poo, help]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

**Python** es un lenguaje que se considera autodocumentado por su sencillez a la hora de ser leído. Ahora bien, cuando trabajamos en un proyecto que va creciendo en dificultad, los comentarios son dios y nosotros sus fieles y acérrimos seguidores. Nunca se pasa tan mal como cuando heredas un proyecto sin una línea de comentarios, ni un punto y coma de documentación.

Lo ideal es crear una **API**, que describa que es, que hace, cada objeto. ¿Qué sucede? Que a la larga es difícil de mantener, da pereza, etc.
Y ahí es cuando **Python** entra con su maravilloso **docstrings**.

Esta documentación tiene una serie de reglas, a saber:

Esta documentación tiene una serie de reglas, a saber:
- Cualquier clase, función o método puede tener un string Python estándar que tiene que localizarse en la primera línea después de la definición (la línea que termina con dos puntos).
- Ésta línea deberá estar identada al mismo nivel que el código que contenga la clase, función o método.
- Debe explicar los parámetros que no queden muy claros
- En caso de que se retorne algún valor también deberá indicarse
- Es decir, que nuestra clase que llevamos trabajando en las anteriores entradas quedaría tal que así:

Es decir, que nuestra clase que llevamos trabajando en las anteriores entradas quedaría tal que así:

```python
class NombreDeLaClase:
    '''
    Establece una fecha basada en el día y el mes
    '''
    
    def __init__(self, dia, mes):
        '''
        Inicializa la nueva fecha
        Params:
            - dia. Entero indicando el día de la fecha
            - mes. Entero indicando el mes de la fecha
        '''
        self.nueva_fecha(dia, mes)
        
    def nueva_fecha(self, dia, mes):
        '''
        Establece una nueva fecha
        Params:
            - dia. Entero indicando el día de la fecha
            - mes. Entero indicando el mes de la fecha
        '''
        self.dia = dia
        self.mes = mes
        
    def reiniciar(self):
        '''
        Reinicia la fecha a un valor por defecto
        Params:
            - 1. Entero. Día
            - 1. Entero. Mes
        '''
        self.nueva_fecha(1, 1)
        
    def diferencia_mes(self, otra_fecha):
        '''
        Devuelve la diferencia de meses entre dos fechas
        Params:
            - self. Nuestro objeto
            - otra_fecha. Objeto NombreDeLaClase inicializado
        Returns:
            - Entero indicando la diferencia de meses
        '''
        if (self.mes > otra_fecha.mes):
            return self.mes - otra_fecha.mes
        else:
            return otra_fecha.mes - self.mes
```

Ahora guardaremos el archivo con un nombre de nuestra elección. En mi caso, ejemploDocstrings.py.
Nos vamos a la consola de comandos y lanzamos nuestro programa en modo interacción con el siguiente comando

```bash
python -i ejemploDocstrings.py
```

Nos aparecerá un prompt esperando nuestros comandos, cosas que indica que nuestra clase ya se ha cargado y, si queremos ver el docstring en formato API que nos genera Python, escribiremos

```bash
help(NombreDeLaClase)
```

y veremos como automaticamente nos aparece un documento con los comentarios que hemos creado

![docstring en python 3](/img/posts/20161213_1.png)

Al poder crearse tan sencillamente, incluso podemos crearnos un script que con cada actualización nos genere la documentación de nuestro proyecto, para tenerlo constantemente actualizado.

Pronto regresare con una nueva entrada

**¡Salud y coding!**