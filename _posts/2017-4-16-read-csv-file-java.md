---
layout: post
title: Cómo leer ficheros CSV en Java
categories: Java
---

Un **CSV** es un fichero de texto plano que consta de varios valores separados por comas (o punto y coma, según el caso), de modo que para procesar este tipo de **ficheros** en **Java** en principio debería bastar con leer el archivo línea a línea y partir las **cadenas de texto** por el separador correspondiente.
<br><br>

Por ejemplo, si tenemos la siguiente línea, sería bastante sencillo de procesarlo:

{% highlight text %}
Programando, a, pasitos
{% endhighlight %}

Pero sin embargo, si nos encontramos alguna de las siguientes entradas:

{% highlight text %}
"Programando a pasitos", "Claver, Inazio", "CSV, Java"
{% endhighlight %}

ya es más complicado, al formar las comas parte de la cadena de texto que queremos extraer. Y si además tenemos en cuenta que las comillas también pueden ser parte de ese valor, se complicaría, teniendo que poner dobles comillas para indicar que es parte del valor de una cadena.

{% highlight text %}
"Programando a pasitos", "Claver, Inazio", """Leyendo CSV"" en Java"
{% endhighlight %}

Vamos a ver como procesar los dos tipos de CSV anteriores, el sencillo y el complejo.

## Lectura de CSV sencillo

El primer ejemplo va a ser la lectura de un .csv sencillo, en la que no tenemos que eliminar comillas y que el caracter del separador sólo se usa para delimitar los campos del .csv. Por ejemplo, este:

{% highlight text %}
Inazio, Programando a pasitos, Tutorial
Lectura, CSV, Java
{% endhighlight %}

echaremos mano de la librería OpenCSV. Nos descargamos el jar desde aquí, y escribiremos el siguiente código:

{% highlight java %}
public static final char SEPARADOR = ';';
public static final char COMILLAS = '"';

public static void main(String[] args) {
	CSVReader lector = null;
	try {
		// Abrir el .csv
		lector = new CSVReader(new FileReader("archivo.csv"), SEPARADOR, COMILLAS);
		
		// Definir el string de la línea leída
		String linea = null;
		
		while ((linea = lector.readNext()) != null) {
			System.out.println(Arrays.toString(linea));
		}
	} 
	catch (IOException e) {
		e.printStackTrace();
	}
	finally {
		// Cierro el buffer de lectura
		if (lector != null) {
			try {
				lector.close();
			} 
			catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
{% endhighlight %}

El proceso es muy similar al anterior, salvo que en vez de un **BufferedReader** creamos un **objeto** de **CSVReader**.
<br><br>

Puedes descargarte una clase con los ejemplos completos en mi [perfil de Github](https://github.com/inazense/scripts/blob/master/scripts/java/LectorCSV.java){:target="blank"}.


**¡Salud y coding!**