---
layout: post
title: Sincronizar carpetas externas en OneDrive
---

Esta será una entrada cortita pero creo que bastante útil.<br>
Es posible que, al igual que yo, uséis **OneDrive** para **sincronizar** vuestros documentos en la nube pero os moleste considerablemente no poder sincronizar varias **carpetas** en concreto que tengáis en vuestro ordenador.
<br><br>

Es decir, mi carpeta de **OneDrive** está localizada en C:\Users\Usuario\OneDrive pero tengo otra carpeta en C:\OtraCarpeta que me gustaría que se **sincronizase** también para poder **acceder a los datos desde otros lugares**, tener **backup**... Razones varias.

<br><br>
Pues bien... 

## ¿Cómo lo hacemos?

Usaremos **enlaces simbólicos** que no es más que un "**acceso directo**" a una carpeta (o archivo) que se encuentra en otro directorio. Como iba diciendo crearemos un **enlace simbólico** ejecutando el **símbolo de sistema** (ojo!, que no **Powershell**) como **administrador** y escribiendo el siguiente comando

{% highlight cmd %}
mklink /D "rutaOneDrive\nuevaCarpeta" "rutaCarpetaASincronizar"
{% endhighlight %}

Después de eso si nos vamos a nuestra carpeta de **OneDrive** veremos que se creó un acceso directo a la carpeta anterior y que la sincronización comenzará a funcionar.
<br><br>

**¡Salud y coding!**