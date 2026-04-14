---
title: "Programación multimedia. ListView personalizados"
description: Cómo personalizar un ListView en Android añadiendo iconos a cada ítem de la lista mediante un layout personalizado y ArrayAdapter.
date: 2015-11-03 14:00:00 +0800
categories: [Android]
tags: [android, listview, adapter, programacion-multimedia, layout]
pin: false
math: false
mermaid: false
---

En esta entrada se mejora un `ListView` añadiendo iconos a cada opción de la lista, mediante un layout personalizado para los ítems y un `ArrayAdapter`.

## Layout principal (activity_listas.xml)

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".Listas"
    android:background="#FF5722">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Ejemplo de listado"
        android:id="@+id/lblTitulo"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textColor="#FFFFFF"
        android:textSize="@dimen/abc_action_button_min_width_overflow_material"
        android:textStyle="bold"
        android:gravity="center_horizontal" />

    <ListView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@android:id/list"
        android:layout_below="@+id/lblTitulo"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_marginTop="40dp"
        android:touchscreenBlocksFocus="false"
        android:textAlignment="center"
        android:gravity="center" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Resultado"
        android:id="@+id/lblResultado"
        android:layout_below="@+id/lblTitulo"
        android:layout_centerHorizontal="true"
        android:textSize="@dimen/abc_dialog_padding_material"
        android:textColor="#FFFFFF"
        android:gravity="center_horizontal" />

</RelativeLayout>
```

## Layout personalizado para cada ítem (item_layout.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="?android:attr/listPreferredItemHeight">

    <ImageView
        android:layout_width="?android:attr/listPreferredItemHeight"
        android:layout_height="?android:attr/listPreferredItemHeight"
        android:id="@+id/icono"
        android:src="@drawable/android"
        android:layout_alignParentLeft="true" />

    <TextView
        android:layout_width="?android:attr/listPreferredItemHeight"
        android:layout_height="?android:attr/listPreferredItemHeight"
        android:id="@+id/titulo"
        android:layout_marginLeft="70dp" />

</RelativeLayout>
```

El valor `?android:attr/listPreferredItemHeight` usa la altura estándar recomendada por el sistema para ítems de lista.

## Código Java (Listas.java)

```java
private TextView resultado;
private ListView lista;
private String[] cursos;
private String[] asignaturas;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_listas);
    resultado = (TextView) findViewById(R.id.lblResultado);
    lista = (ListView) findViewById(android.R.id.list);

    asignaturas = getResources().getStringArray(R.array.opcion);
    ListAdapter adapter = new ArrayAdapter<String>(
        this, R.layout.item_layout, R.id.titulo, asignaturas
    );
    lista.setAdapter(adapter);
}

@Override
protected void onListItemClick(ListView l, View v, int position, long id) {
    super.onListItemClick(l, v, position, id);
    cursos = getResources().getStringArray(R.array.curso);
    resultado.setText(l.getItemAtPosition(position) + " es de " + cursos[position]);
}
```

El constructor de `ArrayAdapter` recibe:
1. El contexto.
2. El layout personalizado del ítem (`R.layout.item_layout`).
3. El id del `TextView` dentro de ese layout donde se coloca el texto (`R.id.titulo`).
4. El array de cadenas a mostrar.

Los arrays `R.array.opcion` y `R.array.curso` se definen en `res/values/strings.xml`.
