---
title: "Programación multimedia. Controles de selección"
description: Controles de selección en Android (Spinner, ListView, GridView, Gallery) y uso de adaptadores como ArrayAdapter para vincular datos con listas.
author: Inazio Claver
date: 2015-10-18 23:44:00 +0800
categories: [Android]
tags: [android, android-studio, spinner, listview, arrayadapter, listadapter, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Android proporciona varios controles para que el usuario seleccione una opción de una lista:

- **Spinner**: lista desplegable
- **ListView**: lista vertical desplazable
- **GridView**: cuadrícula de elementos
- **Gallery**: galería horizontal

Para vincular datos con estas listas se usan adaptadores: `ArrayAdapter`, `SimpleCursorAdapter`, `ListAdapter`, `SpinnerAdapter` y adaptadores personalizados.

## ArrayAdapter

El `ArrayAdapter` vincula clases `AdapterView` con un array de objetos (por defecto de tipo `String`). Los pasos básicos para usarlo con un `Spinner` son:

```java
sp1 = (Spinner)findViewById(R.id.spinner1);
ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
    android.R.layout.simple_spinner_item, opcion);
adapter.setDropDownViewResource(android.R.layout.simple_spinner_item);
sp1.setAdapter(adapter);
sp1.setOnItemSelectedListener(this);
```

![Spinner con ArrayAdapter en el emulador](/img/posts/20151018_72.png)

## ListAdapter con asignaturas

Este ejemplo muestra una lista de asignaturas con su curso correspondiente. Al pulsar un elemento de la lista se muestra a qué curso pertenece.

### strings.xml

```xml
<string-array name="curso">
    <item>1º</item>
    <item>1º</item>
    <item>2º</item>
</string-array>

<string-array name="opcion">
    <item>BD</item>
    <item>XML</item>
    <item>Android</item>
</string-array>
```

### MainActivity.java

La clase extiende `ListActivity`, que proporciona métodos específicos para trabajar con listas. El layout usa el id predefinido `@android:id/list` para el `ListView`. El método `onListItemClick()` detecta la pulsación recibiendo como parámetros el `ListView`, la `View`, la posición y el identificador del elemento.

```java
package programaciones.inazio.listadapter;

import android.app.ListActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import org.w3c.dom.Text;

public class Listas extends ListActivity {
    private TextView resultado;
    private ListView lista;
    private String[] cursos;
    private String[] asignaturas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listas);
        resultado = (TextView)findViewById(R.id.lblResultado);
        lista = (ListView)findViewById(android.R.id.list);

        asignaturas = getResources().getStringArray(R.array.opcion);
        ListAdapter adapter = new ArrayAdapter<String>(this,
            android.R.layout.simple_list_item_1, asignaturas);
        lista.setAdapter(adapter);
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id){
        super.onListItemClick(l, v, position, id);
        cursos = getResources().getStringArray(R.array.curso);
        resultado.setText(l.getItemAtPosition(position) + " es de " +
            cursos[position]);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_listas, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
```

![ListView con las asignaturas](/img/posts/20151018_73.png)

![Resultado al pulsar un elemento de la lista](/img/posts/20151018_74.png)

![Vista completa de la aplicación con lista y resultado](/img/posts/20151018_75.png)
