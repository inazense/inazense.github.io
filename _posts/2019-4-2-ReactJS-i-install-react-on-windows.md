---
layout: post
title: ReactJS I. Instalar React en Windows
categories: React
---

**ReactJS** (o **React** a secas) es una **librería Javascript** de **código abierto** creada por **Facebook** para diseñar interfaces de usuario en aplicaciones de una sola página. No os voy a aburrir con más teoría porque eso es muy fácil de encontrar, así que os enlazo directamente con pensada el artículo de Wikipedia y si os apetece podéis leerlo tranquilamente.
<br><br>

Aquí nos vamos a centrar en la parte más práctica y, aprovechando que estoy en pleno aprendizaje de esta tecnología, iré escribiendo en una nueva sección de **tutoriales** lo que vaya consiguiendo aprender.
<br><br>

Esta entrada será muy cortita, así que vamos al grano.

## ¿Cómo instalar ReactJS en Windows?

Para instalar **React** en **Windows 10** usaremos el gestor de paquetes **npm**, que se incluye en la instalación de **NodeJS** (si bien no estamos supeditados a crear el **backend** de nuestra app con **NodeJS**, podemos usar el que más rabia nos de).
<br><br>

Nos vamos a la web de **Node** (https://nodejs.org/es/download/){:target="_blank"} y descargamos la versión que nos apetezca. En mi caso la de 64 bits.<br>
Una vez descargado simplemente lo instalamos (siguiente - siguiente - siguiente) y al finalizar solo nos quedará comprobar si la instalación se ha llevado a cabo correctamente.
<br><br>

Abrimos la consola de comandos y escribimos este comando para que nos devuelva la versión actual de **Node**
<br><br>

{% highlight json %}
node --version
{% endhighlight %}

Y lo mismo para comprobar si está instalado npm

{% highlight json %}
npm --version
{% endhighlight %}

Si ha ido todo bien, veremos algo como lo siguiente

{% highlight json %}
node --version
v10.15.3

npm --version
6.4.1
{% endhighlight %}

¿Tenemos todo ok? Perfecto. ¿No tenemos algo similar a la imagen? Eso se ha producido debido a que no se han agregado esos **comandos** a las variables de entorno. Podemos solucionarlo siguiendo los pasos que especifican en ésta pregunta de Stackoverflow.

<br><br>
Una vez que esa parte nos funciona, lo siguiente será hacer la instalación de todos los paquetes necesarios para **ReactJS**.

<br><br>
Escribiremos el siguiente comando

![create react app]({{ site.baseurl }}/images/posts/create-react-app.png)

¡Conseguido! Estamos listos para el último paso, crear un nuevo proyecto de ReactJS

## ¿Cómo crear un proyecto ReactJS en Windows?

Es harto sencillo y lo vamos a hacer desde la misma **consola de comandos**. Nos iremos al directorio donde queremos que se almacene el nuevo proyecto y escribimos el siguiente comando

{% highlight json %}
create-react-app my-app
{% endhighlight %}

Este comando generará todo lo necesario para poder empezar a usar la nueva aplicación de **ReactJS**.
Veremos lo siguiente por consola

![create-react-app my-app]({{ site.baseurl }}/images/posts/create-react-app my-app.png)

Al final de la imagen podemos ver que nos dan las instrucciones necesarias para arrancar nuestra aplicación de **ReactJS**, así comprobamos que todo está funcionando como debiera.<br>
Ejecutamos los siguientes **comandos**

{% highlight json %}
cd my-app
npm start
{% endhighlight %}

Y en nuestro navegador por defecto se abrirá la siguiente web

![reactjs localhost deploy]({{ site.baseurl }}/images/posts/reactjs-localhost.png)

Eso sería todo de momento, en futuras entregar iremos ampliando con más cositas.
<br><br>

**¡Salud y coding!**