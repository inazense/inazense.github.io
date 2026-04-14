---
title: Aprendiendo Python (VI). Orientado a objetos (II). Inicialización
description: Aprende a usar el método __init__ en Python para inicializar objetos. Tutorial completo sobre constructores, parámetros por defecto, valores None y manejo de errores en programación orientada a objetos.
author: Inazio Claver
date: 2016-12-10 12:10:00 +0800
categories: [Python]
tags: [python, poo, __init__, constructores, inicializacion, none]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Python, a diferencia de la mayoría de lenguajes orientados a objetos, no tiene un constructor que cree e inicialice los objetos, sino que los tiene separados, por una parte el constructor que no suele usarse salvo en casos puntuales, y por otra el inicializador.
En este último es en el que vamos a centrarnos en esta entrada.

```python
__init__
```

Con dos guiones bajos delante y detrás del nombre, este es el método que inicializa los valores de nuestro objeto.
Los dos guiones bajos lo usamos para indicarle a **Python** que es un método especial y que el intérprete **Python** deberá tratarlo de un modo diferente.

**Nota**: Los métodos que creemos propios no debemos crearlos usando esta nomenclatura. Si no hay algún método que empiece por doble guión bajo y acaben de la misma forma podría funcionar igual, pero en el momento que los desarrolladores de **Python** creasen uno con el mismo nombre comenzaría a darnos problemas.

¿Recordáis la clase NombreDeLaClase del ejemplo anterior? Pues así quedaría si le agregamos un inicializador.

```python
class NombreDeLaClase:
    def __init__(self, dia, mes):
        self.nueva_fecha(dia, mes)
    def nueva_fecha(self, dia, mes):
        self.dia = dia
        self.mes = mes
    def reiniciar(self):
        self.nueva_fecha(1, 1)
    def diferencia_mes(self, otra_fecha):
        if (self.mes > otra_fecha.mes):
            return self.mes - otra_fecha.mes
        else:
            return otra_fecha.mes - self.mes
```

¿Qué sucede si creamos un objeto de esta clase pero no le pasamos los dos parámetros de nuestro inicializador?

```bash
Traceback (most recent call last):
  File "E:\EclipseWorkspace\OrientadoAObjetos\Punto.py", line 20, in <module>
    punto = NombreDeLaClase(1)
TypeError: __init__() missing 1 required positional argument: 'mes'
```

Nos encontramos con este error, porque ambos parámetros son requeridos. Como podemos arreglarlo entonces? Fácil. **Python** nos permite asignar un valor a los parámetros de las funciones para tratarlos en caso de que no queramos pasarlos completamente.
Por ejemplo, podemos decirle un entero de nuestra elección, que sea nulo, etc.
¡Ah! Eso no lo llegué a comentar. Un valor **nulo**, o **null**, en **Python**, se declara con **None**.

```python
def __init__(self, x=None, y=None)
```

Y sí, podemos darle el valor que queramos. A mi ahora me interesa darle un valor por defecto de 0

```python
def __init__(self, x=0, y=0)
```

Así ahora mismo podemos instanciar objetos de nuestra clase sin tener que indicarle valores a día y mes. Y si ahora imprimimos por pantalla esos valores, veremos que valen exactamente 0. ¿No es genial?

**- Pues no, vaya mierdote de entrada te está quedando...**

**- ¿Quieres algo más?**

**- ¡Sí!**

**- ¡Pues para la siguiente entrada!**

<hr>

**¡Salud y coding!**