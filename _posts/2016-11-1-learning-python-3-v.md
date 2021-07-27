---
layout: post
title: Aprendiendo Python 3 (V). Orientado a objetos
categories: Python
---

Una vez vista la **sintaxis** (de forma muy básica) de **Python** y haber realizado los primeros ejercicios, vamos a introducirnos en la forma de programar de **Python orientado a objetos**.<br>
Por si os interesa el tema y no queréis esperar, estoy siguiendo [este fantástico tutorial de Jesus Conde.](https://www.youtube.com/playlist?list=PLEtcGQaT56cj70Vl_C1qfUinyMELunL-N)<br><br>

Conceptualmente no se diferencia apenas de otros lenguajes:
- Crearemos **clases**
- Instanciaremos objetos
- Les añadiremos atributos y comportamientos
- **Clases** organizadas en **paquetes** y **módulos**
- Como ya vimos, la sintaxis de **Python** es… ahorrativa. No busca complicarnos con configuraciones innecesarias.

De modo que si queremos escribir una **clase** basta con hacer esto:

{% highlight python %}
class NombreDeLaClase:
	pass
{% endhighlight %}

Es decir, la forma de crearla es, primero, usando la palabra reservada class, seguida del nombre de nuestra **clase** y dos puntos. El nombre de la clase deberá:
- Empezar con una letra o un guión bajo
- Solo podrá incluir letras, guiones bajos o números.

Además, si quieres conocer mejor las **guías de estilos** para **Python**, puedes buscar la referencia **PEP-0008** en su página web.<br><br>

En la segunda línea será donde empezará el contenido de nuestras clases, como con las funciones, bucles, etc. Ya sabemos que **Python** funciona por **identación**, no con llaves ni corchetes. Como nuestra **clase** no hace absolutamente nada usaremos la palabra clave pass, que indica que no se llevará a cabo ninguna acción.<br><br>

¿Eso quiere decir que no podemos hacer nada con esta clase? Bueno, no es del todo cierto. Podemos crear nuestra clase e instanciarle objetos.<br><br>

Si vamos al **intérprete Python** podremos ver este ejemplo mucho más claro.<br><br>

{% highlight python %}
class NombreDeLaClase:
	pass

a = NombreDeLaClase()
b = NombreDeLaClase()
{% endhighlight %}

Crear **instancias** es, como vemos, muy similar a **llamar a una función**, pero realmente estamos ya creando un **objeto**. Tal y como me dijo el profesor la primera vez que vimos POO, “__Todo es un objeto__”. Luego lo remato con un “__incluso las mujeres, aunque no quieran serlo__”, pero eso es otra historia.<br><br>

Tambien vamos a poder imprimir los objetos recién creados también.

{% highlight python %}
print(a)
{% endhighlight %}

Lo que veremos por pantalla será algo similar a lo siguiente:

{% highlight bash %}
__console__.NombreDeLaClase object at 0x026CAB70
{% endhighlight %}

Lo que nos dirá de qué clase de objetos se trata y el espacio de memoria donde están alojados.<br><br>

**- Puedo instanciar e imprimir objetos, vale. Pero… vaya mierda de clase has creado, ¿no?**
**- Hombre, pues un poco de razón sí que tienes, sí. Vamos a meterle algo de chicha en ese caso…**

Vamos a empezar con los **atributos de las clases**. Para asignar **atributos en Python** no es necesario declararlos en la definición de la **clase**, sino que podemos asignarlos directamente en las **instancias**, a través de la **notación de punto**. Es decir objeto.atributo = valor.<br><br>

Un ejemplo sería añadir dos atributos que nos indiquen el día y mes a cada una de las dos instancias creadas previamente.

{% highlight python %}
a = NombreDeLaClase()
b = NombreDeLaClase()

a.dia = 31
a.mes = 10
b.dia = 1
b.mes = 11
{% endhighlight %}

Podemos imprimir las propiedades de la instancia a con

{% highlight python %}
print(a.dia, a.mes)
{% endhighlight %}

Y el resultado sería 31 10.<br><br>

Bueno, ahora vamos a añadir los **métodos**, que serán los comportamientos que tendrán los **atributos** de nuestras **clases**. Los métodos SÍ que se deben definir en la **declaración de la clase**.

{% highlight python %}
class NombreDeLaClase:
	def reiniciar(self):
{% endhighlight %}

La forma de crear un **método** es empezar con la palabra reservada **def**, seguido del nombre de nuestro **método** y entre paréntesis los parámetros que pudiese tener, finalizando la línea con los dos puntos.<br><br>

Dentro del **método** agregamos las acciones a realizar, en este caso que los **atributos** día y mes se establezcan en valor 1.

{% highlight python %}
class NombreDeLaClase:
	def reiniciar(self):
		self.x = 1
		self.y = 1
{% endhighlight %}

Cuando usamos la palabra **self** estamos haciendo **referencia al propio objeto**. Sería el equivalente al **this** de **Java** o **C#** para entendernos. La única **diferencia entre métodos y funciones** es que los métodos de las clases deben tener, al menos, un argumento obligatorio, este **self** del que estamos hablando, aunque es algo más convencional que requerido, pero a la hora de llamar al método desde la instancia NO es necesario **referenciarlo como parámetro**.<br><br>

Ahora, si creamos una instancia de nuestra clase podremos aplicar el método que acabamos de crear.

{% highlight python %}
c = NombreDeLaClase()
c.reiniciar()
{% endhighlight %}

Y si ahora imprimimos dichos valores veremos que ha otorgado ya el valor de 1 a cada propiedad, aunque previamente la hubiésemos inicializado a otro valor. Lo sobrescribe.<br><br>

Otra forma de llamar a ese **método** desde el objeto como si fuese una función. En ese caso deberemos pasar como **parámetro** el objeto al que queremos aplicarlo.

{% highlight python %}
NombreDeLaClase().reiniciar(c)
{% endhighlight %}

Obteniendo el mismo resultado que anteriormente.<br><br>

¿Qué ocurre si no incluyésemos el parámetro self a la hora de crear nuestro **método**? Pues que al ejecutarlo desde la instancia nos aparecería un mensaje de error.<br><br>

Básicamente nos indica que cuando llamamos al **método** no estamos pasando ningún argumento<br><br>

**- ¡Ajá! Sigue siendo cutrecillo, pero ya va mejorando la cosa.**
**- Te lo dije, solo debías esperar**
**- Y… ¿si quiero pasarle más de un parámetro como lo haría?**
**- Fácil, ahora lo vemos**

<br><br>

Simplemente lo que hacemos es separar los **parámetros** por comas, manteniendo siempre el **parámetro self**. Agregamos un nuevo método que establezcla el día y mes que se pase en dos nuevos parámetros. Y ya que estamos modificamos nuestro **método** reiniciar para que llame al método nuevaFecha con los valores a establecer.<br><br>

Por último vamos a insertar un tercer **método** que nos permite calcular la diferencia entre dos meses. Así vemos que se pueden pasar objetos complejos (**instancias de clases**) como **parámetros**.

{% highlight python %}
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
{% endhighlight %}

Para usar la **clase** vamos a **instanciar dos objetos** nuevos.

{% highlight python %}
a1 = NombreDeLaClase()
a2 = NombreDeLaClase()

a1.reiniciar()
a2.nuevaFecha(5, 11)
{% endhighlight %}

Ahora calcularemos la diferencia entre los meses de a1 y a2 desde el objeto a1.

{% highlight python %}
print(a1.diferencia_mes(a2))
{% endhighlight %}

Y el resultado sería 10<br><br>

Acabamos de ver como iniciarnos en la **programación orientada a objetos en Python**. En la siguiente entrega veremos como trabajar inicializando objetos y unas cuantas cosas más.<br><br>

**¡Salud y coding!**