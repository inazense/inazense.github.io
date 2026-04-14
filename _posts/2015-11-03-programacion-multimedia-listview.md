---
title: "Programación multimedia. ListView personalizados"
description: Cómo crear un ListView personalizado en Android con iconos en cada ítem usando un layout propio y ArrayAdapter, con gestión de eventos de selección.
date: 2015-11-03 14:00:00 +0800
categories: [Android]
tags: [android, listview, adapter, programacion-multimedia, arrayadapter]
pin: false
math: false
mermaid: false
---

En esta entrada se muestra cómo mejorar un `ListView` en Android añadiendo un icono a cada opción de la lista mediante un layout de ítem personalizado.

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

## Puntos clave

- `?android:attr/listPreferredItemHeight` es una constante del sistema que proporciona la altura estándar recomendada para los ítems de una lista.
- El `ArrayAdapter` personalizado se configura indicando el layout del ítem (`R.layout.item_layout`) y el `TextView` donde se colocará el texto (`R.id.titulo`).
- Los arrays `opcion` y `curso` se definen en `res/values/strings.xml` como recursos de tipo `string-array`.
