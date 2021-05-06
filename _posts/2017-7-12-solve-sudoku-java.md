---
layout: post
title: Resolver sudokus en Java
---

El otro día estaba haciendo el **sudoku** del periódico y me plantee la siguiente duda. ¿Cómo sería un **programa que te resolviese el sudoku** automáticamente?<br><br>

Para el que no lo sepa, un **sudoku** es un pasatiempo japonés consistente en rellenar un tablero de 9x9, que a su vez está divido en secciones de 3x3, con números del 1 al nueve de tal manera que ninguno de ellos puede estar repetido en ninguna fila, columna o secciones.<br>
Como curiosidad, sabed que el problema de un **sudoku** sólo se considera bien planteado si su solución es única, consiguiéndose esto sólo si, como mínimo, hay ya preestablecidas 17 cifras dentro del tablero (Wikipedia insified).<br><br>

Dicho esto, vayamos a la resolución del problema.<br>
La idea que se me ocurrió, y que luego he ido leyendo que es la más sencilla de implementar, es la del **algoritmo de marcha atrás**.<br><br>

Es decir, leeremos el tablero y, dejando siempre fijas las posiciones que ya están preestablecidas, iremos casilla por casilla aumentando su valor en uno. Si el valor de esa casilla cumple con las reglas del **sudoku** (ya sabéis, no repetirse ni en su fila, columna ni sección) la dejamos tal cual y saltamos a la siguiente.
Si no se cumple, incrementará el valor de dicha casilla hasta que esa condición se cumpla o hasta sobrepasar el valor de 9.<br>
En ese caso de sobrepasar dicho valor, lo que haremos será retroceder a la anterior casilla modificable e incrementar su valor en 1, repitiendo el proceso anterior.<br><br>

De este modo, solucionaríamos un **sudoku** cuando todas las casillas estén completamente validadas, y sería irresoluble si la primera casilla editable supera el valor de 9.<br><br>

Es decir, que el método empleado lo podemos considerar como un ataque de fuerza bruta. Costoso en tiempos computacionales, pero era la solución más sencilla de implementar que se me ocurrió. Probablemente haya muchas mejores formas de hacerlo, podéis decirme las vuestras en los comentarios.<br><br>

## ¡A programar!

Sabiendo esto, vamos a pasar al código. Lo primero que debéis saber es que aquí sólo voy a mostrar la lógica de la resolución. Puedes acceder al código completo en mi repositorio de Github. Incluye la interfaz gráfica entre otras mejoras que me encuentro desarrollando actualmente.

### Participantes

El primer paso será definir los participantes que necesitaremos para solucionar el **sudoku**, que serán un tablero, las casillas que lo compongan y las secciones en las que lo dividiremos.<br><br>

Así pues, vamos a ir de menos a más.<br>
Lo primero será definir las secciones, en una enumeración.

**Enum Sector**

{% highlight java %}
package participantes;

/**
 * Enum con los posibles sectores del sudoku.
 * Un sector es la caja de 3x3 en la que se divide el tablero de 9x9 
 * @author Inazio
 *
 */
public enum Sector
{
	PRIMERO, SEGUNDO, TERCERO,
	CUARTO, QUINTO, SEXTO,
	SEPTIMO, OCTAVO, NOVENO
}
{% endhighlight %}

Como podemos ver, es una enumeración sencilla en la que nos limitamos a nombrar los nueve sectores de nuestro tablero.
<br><br>

**Casilla**

{% highlight java %}
package participantes;

/**
 * Clase que contiene toda la información relevante de una casilla de Sudoku 9x9
 * @author Inazio
 *
 */
public class Casilla {

	/// PROPIEDADES
	private int valor;
	private int posX;
	private int posY;
	private Sector sector;
	private boolean editable;
	
	/// CONSTRUCTORES
	/**
	 * Inicializa una casilla vacía
	 */
	public Casilla() {}
	
	/**
	 * 
	 * @param valor
	 * @param posX
	 * @param posY
	 * @param sector
	 * @param editable
	 */
	public Casilla(int valor, int posX, int posY, Sector sector, boolean editable) {
		
		this.valor 		= valor;
		this.posX 		= posX;
		this.posY 		= posY;
		this.sector 	= sector;
		this.editable 	= editable;
	}
	
	/// METODOS
	
	/**
	 * Establece el sector dependiendo de la posición X e Y de la casilla
	 */
	public void establecerSectorSegunPosicion() {
		switch(posX) {
		
		case 0:
		case 1:
		case 2:
			switch(posY) {
			case 0:
			case 1:
			case 2:
				this.setSector(Sector.PRIMERO);
				break;
			case 3:
			case 4:
			case 5:
				this.setSector(Sector.SEGUNDO);
				break;
			case 6:
			case 7: 
			case 8:
				this.setSector(Sector.TERCERO);
				break;
			default:
				break;
			}
			break;
		case 3:
		case 4:
		case 5:
			switch(posY) {
			case 0:
			case 1:
			case 2:
				this.setSector(Sector.CUARTO);
				break;
			case 3:
			case 4:
			case 5:
				this.setSector(Sector.QUINTO);
				break;
			case 6:
			case 7: 
			case 8:
				this.setSector(Sector.SEXTO);
				break;
			default:
				break;
			}
			break;
		case 6:
		case 7:
		case 8:
			switch(posY) {
			case 0:
			case 1:
			case 2:
				this.setSector(Sector.SEPTIMO);
				break;
			case 3:
			case 4:
			case 5:
				this.setSector(Sector.OCTAVO);
				break;
			case 6:
			case 7: 
			case 8:
				this.setSector(Sector.NOVENO);
				break;
			default:
				break;
			}
			break;
		}
	}

	/**
	 * Devuelve el valor de la casilla
	 * @return Entero entre 0 y 9
	 */
	public int getValor() {
		return valor;
	}

	/**
	 * Establece el valor de la casilla
	 * @param valor Entero entre 0 y 9
	 */
	public void setValor(int valor) {
		this.valor = valor;
	}

	/**
	 * Devuelve la posición horizontal
	 * @return Entero entre 0 y 8
	 */
	public int getPosX() {
		return posX;
	}

	/**
	 * Establece la posición horizontal
	 * @param posX Entero entre 0 y 8
	 */
	public void setPosX(int posX) {
		this.posX = posX;
	}

	/**
	 * Devuelve la posición vertical
	 * @return Entero entre 0 y 8
	 */
	public int getPosY() {
		return posY;
	}

	/**
	 * Establece la posición vertical
	 * @param posY Entero entre 0 y 8
	 */
	public void setPosY(int posY) {
		this.posY = posY;
	}

	/**
	 * Devuelve el sector de la casilla
	 * @return Sector preestablecido en Enum Sector
	 */
	public Sector getSector() {
		return sector;
	}

	/**
	 * Establece el sector de la casilla
	 * @param sector Propiedad del enum Sector
	 */
	public void setSector(Sector sector) {
		this.sector = sector;
	}

	/**
	 * Devuelve si la casilla tiene un valor fijo o no
	 * @return True -> Valor fijo. False -> Valor modificable
	 */
	public boolean isEditable() {
		return editable;
	}

	/**
	 * Establece la opción de editar la casilla
	 * @param editable True -> editable. False -> no editable
	 */
	public void setEditable(boolean editable) {
		this.editable = editable;
	}
}
{% endhighlight %}

En esta clase establecemos las propiedades de cada una de nuestras casillas.<br>
Su posición horizontal y vertical, su valor, el sector al que pertenece y si es o no editable.<br>
En los métodos creamos los getters y setters y un método más, el de establecerSectorSegunPosicion() que usaremos para indicar a que sector pertenece nuestra casilla.
<br><br>

**Tablero**
<br><br>

Esta clase vamos a comentarla un poco más, aunque también es muy sencillita.

{% highlight java %}
public class Tablero {
	
	/// PROPIEDADES 
	private Casilla[][] casillas;
	
	/// CONSTRUCTOR
	
	/**
	* Genera un tablero de sudoku básico de 9x9
	*/
	public Tablero() {
		this.casillas = new Casilla[9][9];
	}
	
	/// METODOS
	/**
	* Devuelve las casillas del tablero
	* @return
	*/
	public Casilla[][] getCasillas() {
		return this.casillas;
	}
}
{% endhighlight %}

Lo primero, vemos que la definición de las propiedades y del constructor no tiene mucha miga. Simplemente establecemos una matriz de casillas y en su constructor la inicializamos. Además generamos un getter para nuestras casillas.
<br><br>

Hecho esto, vamos a ver los diferentes métodos que podemos emplear:

{% highlight java %}
/**
* Inicializa el tablero estableciendo por defecto los valores:
* Valor  = 0
* PosX  = i
* PosY  = j
* Editable = true
* Sector  = Según posición
 */
public void inicializarTablero() {
	for (int i = 0; i < this.casillas.length; i++) {
		for (int j = 0; j < this.casillas[i].length; j++) {
			Casilla casilla = new Casilla();
			casilla.setValor(0);
			casilla.setPosX(i);
			casilla.setPosY(j);
			casilla.setEditable(true);
			casilla.establecerSectorSegunPosicion();
			
			this.casillas[i][j] = casilla;
		}
	}
}
{% endhighlight %}

Este método es el encargado de inicializar una por una nuestras casillas. Recorremos la matriz y establecemos su posición, calculamos su sector, le indicamos que es editable y establecemos un valor por defecto de 0.

{% highlight java %}
/**
* Establece una nueva casilla en la posición que tenga configurada la misma
* @param casilla
*/
public void editarCasilla(Casilla casilla) {
	this.casillas[casilla.getPosX()][casilla.getPosY()] = casilla;
}
{% endhighlight %}

Aquí le indicamos que copie la casilla pasada  por parámetro a la casilla que está en el tablero con su misma posición, horizontal y vertical.

{% highlight java %}
/**
* Reestablece el valor de la casilla según su posición
* @param x Posición horizontal
* @param y Posición vertical
*/
public void reestablecerCasillaPorPosicion(int x, int y) {
	this.casillas[x][y].setValor(0);
}
{% endhighlight %}

En este método reseteamos el valor de una casilla pasando por parámetro su posición dentro de la matriz.

{% highlight java %}
/**
* Inserta los valores de la matriz en la misma casilla respecto a su posición
* Ha tenido que inicializarse la matriz de casillas previamente
* @param matriz Matriz de enteros entre 0 y 9
*/
public void insertarValores(int[][] matriz) {
	for (int i = 0; i < matriz.length; i++) {
		for (int j = 0; j < matriz[i].length; j++) {
			if (matriz[i][j] != 0) {
				this.casillas[i][j].setEditable(false);
			}
			this.casillas[i][j].setValor(matriz[i][j]);
		}
	}
}
{% endhighlight %}

Y por último, con este método rellenamos nuestra matriz de casillas usando la matriz de enteros pasada por parámetro. Copiamos los valores en las mismas posiciones. También indicamos que si ese valor es 0, la casilla siga como editable y si no, que pase a ser no editable.<br>
Éste método ha de usarse SIEMPRE una vez que ha inicializado todas las casillas<br><br>

**Solucionador**
<br><br>

Esta clase la vamos a tratar igual que Tablero, yendo paso a paso por sus métodos. Es una clase exclusivamente dedicada a operar para resolver el sudoku y no tiene ninguna propiedad suya ni ningún constructor personalizado, así que la definimos simplemente así:

{% highlight java %}
package utiles;

import java.util.ArrayList;

import participantes.Casilla;
import participantes.Tablero;

public class Solucionador {

}
{% endhighlight %}

Hecho esto, vamos a ver los métodos uno por uno.

{% highlight java %}
/**
* Devuelve un array con todas las casillas en las que la propiedad editable es verdadera
* @param casillas Matriz de casillas
* @return Array con las casillas editables
*/
private ArrayList extraerCasillasEditables(Casilla[][] casillas) {
	ArrayList editables = new ArrayList();
	
	for (int i = 0; i < casillas.length; i++ ) {
		for (int j = 0; j < casillas[i].length; j++) {
			if (casillas[i][j].isEditable()) {
				editables.add(casillas[i][j]);
			}
		}
	}
	
	return editables;
}
{% endhighlight %}

Éste método es utilizado para permitirnos saber que casillas hemos de recorrer incrementando su valor, es decir, que casillas son editables por nuestro programa. Así podremos avanzar / retroceder entre ellas sin tenernos que preocupar de controlar los dos niveles de una matriz.

{% highlight java %}
/**
* Extrae las casillas que contengan la misma fila, columna o sector que la casilla actual
* @param tablero Tablero de 9x9
* @param actual Casilla actual
* @return ArrayList que contiene tres arrayList de casillas. Fila, columna y sector
*/
private ArrayList> extraerCasillasComparables(Tablero tablero, Casilla actual) {
	
	ArrayList fila  = new ArrayList();
	ArrayList columna  = new ArrayList();
	ArrayList sector  = new ArrayList();
	
	for (int i = 0; i < tablero.getCasillas().length; i++) {
		for (int j = 0; j < tablero.getCasillas()[i].length; j++) {
			if (tablero.getCasillas()[i][j].getPosX() == actual.getPosX()) {
				fila.add(tablero.getCasillas()[i][j]);
			}
			
			if (tablero.getCasillas()[i][j].getPosY() == actual.getPosY()) {
				columna.add(tablero.getCasillas()[i][j]);
			}
			
			if (tablero.getCasillas()[i][j].getSector() == actual.getSector()) {
				sector.add(tablero.getCasillas()[i][j]);
			}
		}
	}
	
	ArrayList> resultado = new ArrayList>();
	resultado.add(fila);
	resultado.add(columna);
	resultado.add(sector);
	
	return resultado;
}
{% endhighlight %}

Aquí lo que hacemos es extraer todas las casillas que coincidan con la fila, columna o sector de la casilla que pasamos como parámetro y que esté dentro del tablero (valga la redundancia, ¿verdad?) para usarla como comparativas y validar si es correcto.

{% highlight java %}
/**
* Valida la fila, columna y sector. Si no se repite ningun numero (sin contar el 0)
* es una lista válida
* @param listas ArrayList de arraylist de casillas
* @return True si validacion correcta. False en caso contrario
*/
private boolean validacionFCS(ArrayList> listas) {
	
	for (ArrayList lista : listas) {
		ArrayList valores = null;
		valores = new ArrayList();
		
		for (Casilla casilla : lista) {
			if (casilla.getValor() != 0) {
				if (valores.contains(casilla.getValor())) {
					return false;
				}
				else {
					valores.add(casilla.getValor());
				}
			}
		}
	}
	
	return true;
}
{% endhighlight %}

Habiendo extraido los valores de fila, columan y sector con el método anterior, pasaremos esos arraylist (uno a uno) a este método, que se encargará de validar si en esa lista tenemos valores repetidos o no. Nos servirá para realizar la validación de las reglas del sudoku.

{% highlight java %}
/**
* Método que controla las operaciones necesarias para solucionar el sudoku
* @param tablero Tablero que contiene las casillas del sudoku
* @return boolean. True = Sudoku solucionado. False = Sudoku sin solucionar
*/
public Tablero solucionarSudoku(Tablero tablero) {

	ArrayList<Casilla> editables = this.extraerCasillasEditables(tablero.getCasillas());
	int i = 0;

	while (i < editables.size()) {
	
		// Control de salida. Si el primer resultado es igual a 0 y su valor superior al máximo permitido por el sudoku, 
		// error al solucionar el sudoku
		Casilla actual = editables.get(i);
		if (actual.getValor() > 9) {
			tablero.reestablecerCasillaPorPosicion(actual.getPosX(), actual.getPosY());
			i--;
			
			if (i < 0) {
				return null;
			}
			else {
				actual = editables.get(i);
				actual.setValor(actual.getValor() + 1);
				tablero.editarCasilla(actual);
			}
		}
		else {
			if (actual.getValor() == 0) {
				actual.setValor(1);
			}
			
			ArrayList<ArrayList<Casilla>> listasParaValidar = this.extraerCasillasComparables(tablero, actual);
			
			// Validar si listas cumplen reglas de Sudoku (salvo valor sin rellenar)
			if (validacionFCS(listasParaValidar)) {
				tablero.editarCasilla(actual);
				i++;
			}
			else
			{
				actual.setValor(actual.getValor() + 1);
				if (actual.getValor() > 9) {
					tablero.reestablecerCasillaPorPosicion(actual.getPosX(), actual.getPosY());
					if (i != 0) {
						i--;
						actual = editables.get(i);
						actual.setValor(actual.getValor() + 1);
						tablero.editarCasilla(actual);
					}
					else {
						return null;
					}
				}
			}
		}
		
	}

	return tablero;
}
{% endhighlight %}

Y aquí tenemos al método padre. El método principal que se encarga de gestionar los anteriormente descritos.
Le pasamos un tablero como parámetro, y su tarea es entrar en un bucle que recorra todas las casillas editables, del que sólo saldrá si ya no podemos darle más valor a la primera casilla editable, devolviendo un nulo, o si hemos llegado al final del sudoku completando todas las casillas, devolviendo el tablero ya resuelto.
<br><br>

De esta forma, dependiendo del resultado nosotros podremos pintar el tablero ya resulto o mostrar un mensaje de "imposible resolver" o algo similar

![Sudoku solved]({{ site.baseurl }}/images/posts/sudoku_solved.png)

![Sudoku unsolved]({{ site.baseurl }}/images/posts/sudoku_unsolved.png)

Como ya dije previamente, éste post solo muestra la **lógica resolutiva del sudoku**. Si quieres ver como está hecha la **interfaz gráfica**, como volcar un sudoku desde un CSV, una imagen... te recomiendo que revises el repositorio de [**SudokuSolver** en GitHub](https://github.com/inazense/SudokuSolver){:target="blank"}.
<br><br>

**¡Salud y coding!**