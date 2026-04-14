---
title: Aprendiendo Python (V). Orientado a objetos
description: Aprende programación orientada a objetos en Python desde cero. Tutorial completo sobre clases, objetos, métodos, atributos y self con ejemplos prácticos paso a paso para principiantes.
author: Inazio Claver
date: 2016-11-01 12:10:00 +0800
categories: [Python]
tags: [python, poo, clases, objetos, metodos, self, orientado-objetos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Una vez vista la sintaxis (de forma muy básica) de **Python** y haber realizado los primeros ejercicios, vamos a introducirnos en la forma de programar de **Python orientado a objetos**.
Por si os interesa el tema y no queréis esperar, estoy siguiendo [este fantástico tutorial de Jesus Conde](https://www.youtube.com/playlist?list=PLEtcGQaT56cj70Vl_C1qfUinyMELunL-N).

Conceptualmente no se diferencia apenas de otros lenguajes:

- Crearemos clases
- Instanciaremos objetos
- Les añadiremos atributos y comportamientos
- Clases organizadas en paquetes y módulos

Como ya vimos, la sintaxis de **Python** es… ahorrativa. No busca complicarnos con configuraciones innecesarias.
De modo que si queremos escribir una clase basta con hacer esto:

```python
class NombreDeLaClase:
    pass
```

Es decir, la forma de crearla es, primero, usando la palabra reservada class, seguida del nombre de nuestra clase y dos puntos. El nombre de la clase deberá:

- Empezar con una letra o un guión bajo
- Sólo podrá incluir letras, guiones bajos o números.

Además, si quieres conocer mejor las guías de estilos para **Python**, puedes buscar la referencia PEP-0008 en su página web.

En la segunda línea será donde empezará el contenido de nuestras clases, como con las funciones, bucles, etc. Ya sabemos que **Python** funciona por identación, no con llaves ni corchetes. Como nuestra clase no hace absolutamente nada usaremos la palabra clave pass, que indica que no se llevará a cabo ninguna acción.

¿Eso quiere decir que no podemos hacer nada con esta clase? Bueno, no es del todo cierto. Podemos crear nuestra clase e instanciarle objetos.

Si vamos al intérprete **Python** podremos ver este ejemplo mucho más claro.

```python
class NombreDeLaClase:
    pass

a = NombreDeLaClase()
b = NombreDeLaClase()
```

Crear instancias es, como vemos, muy similar a llamar a una función, pero realmente estamos ya creando un objeto. Tal y como me dijo el profesor la primera vez que vimos **POO**, “Todo es un objeto”. Luego lo remato con un “incluso las mujeres, aunque no quieran serlo”, pero eso es otra historia.

Tambien vamos a poder imprimir los objetos recién creados también.

```python
print(a)
```

Lo que veremos por pantalla será algo similar a lo siguiente:

```bash
__console__.NombreDeLaClase object at 0x026CAB70
```

Lo que nos dirá de qué clase de objetos se trata y el espacio de memoria donde están alojados.

**- Puedo instanciar e imprimir objetos, vale. Pero… vaya mierda de clase has creado, ¿no?**

**- Hombre, pues un poco de razón sí que tienes, sí. Vamos a meterle algo de chicha en ese caso…**

Vamos a empezar con los atributos de las **clases**. Para asignar atributos en **Python** no es necesario declararlos en la definición de la clase, sino que podemos asignarlos directamente en las instancias, a través de la notación de punto. Es decir ```objeto.atributo = valor```.

Un ejemplo sería añadir dos atributos que nos indiquen el día y mes a cada una de las dos instancias creadas previamente.

```python
a = NombreDeLaClase()
b = NombreDeLaClase()

a.dia = 31
a.mes = 10
b.dia = 1
b.mes = 11
```

Podemos imprimir las propiedades de la instancia a con

```python
print(a.dia, a.mes)
```

Y el resultado sería 31 10.

Bueno, ahora vamos a añadir los métodos, que serán los comportamientos que tendrán los atributos de nuestras clases. Los métodos SÍ que se deben definir en la declaración de la clase.

```python
class NombreDeLaClase:
    def reiniciar(self):
```

La forma de crear un método es empezar con la palabra reservada ```def```, seguido del nombre de nuestro método y entre paréntesis los parámetros que pudiese tener, finalizando la línea con los dos puntos.

Dentro del método agregamos las acciones a realizar, en este caso que los atributos día y mes se establezcan en valor 1.

```python
class NombreDeLaClase:
    def reiniciar(self):
        self.x = 1
        self.y = 1
```

Cuando usamos la palabra ```self``` estamos haciendo referencia al propio objeto. Sería el equivalente al ```this``` de **Java** y **C#**, para entendernos. La única diferencia entre métodos y funciones es que los métodos de las clases deben tener, al menos, un argumento obligatorio, este ```self``` del que estamos hablando, aunque es algo más convencional que requerido, pero a la hora de llamar al método desde la instancia NO es necesario referenciarlo como parámetro.

Ahora, si creamos una instancia de nuestra clase podremos aplicar el método que acabamos de crear.

```python
c = NombreDeLaClase()
c.reiniciar()
```

Y si ahora imprimimos dichos valores veremos que ha otorgado ya el valor de 1 a cada propiedad, aunque previamente la hubiésemos inicializado a otro valor. Lo sobrescribe.

Otra forma de llamar a ese método desde el objeto como si fuese una función. En ese caso deberemos pasar como parámetro el objeto al que queremos aplicarlo.

```python
NombreDeLaClase().reiniciar(c)
```

Obteniendo el mismo resultado que anteriormente.

¿Qué ocurre si no incluyésemos el parámetro ```self``` a la hora de crear nuestro método? Pues que al ejecutarlo desde la instancia nos aparecería un mensaje de error.

Básicamente nos indica que cuando llamamos al método no estamos pasando ningún argumento

**- ¡Ajá! Sigue siendo cutrecillo, pero ya va mejorando la cosa.**

**- Te lo dije, solo debías esperar**

**- Y… ¿si quiero pasarle más de un parámetro como lo haría?**

**- Fácil, ahora lo vemos**

Simplemente lo que hacemos es separar los parámetros por comas, manteniendo siempre el parámetro ```self```. Agregamos un nuevo método que establezcla el día y mes que se pase en dos nuevos parámetros. Y ya que estamos modificamos nuestro método reiniciar para que llame al método nuevaFecha con los valores a establecer.

Por último vamos a insertar un tercer método que nos permite calcular la diferencia entre dos meses. Así vemos que se pueden pasar objetos complejos (instancias de clases) como parámetros.

```python
class NombreDeLaClase:
    def nueva_fecha(self, dia, mes):
        self.dia = dia
        self.mes = mes
    def reiniciar(self):
        self.nuevaFecha(1, 1)
    def diferencia_mes(self, otra_fecha):
        if (self.mes > otra_fecha.mes):
            return self.mes – otra_fecha.mes
        else:
            return otra_fecha.mes – self.mes
```

Para usar la clase vamos a instanciar dos objetos nuevos.

```python
a1 = NombreDeLaClase()
a2 = NombreDeLaClase()

a1.reiniciar()
a2.nuevaFecha(5, 11)
```

Ahora calcularemos la diferencia entre los meses de a1 y a2 desde el objeto a1.

```python
print(a1.diferencia_mes(a2))
```

Y el resultado sería 10

<hr>

Acabamos de ver como iniciarnos en la **programación orientada a objetos en Python**. En la siguiente entrega veremos como trabajar inicializando objetos y unas cuantas cosas más.

**¡Salud y coding!**