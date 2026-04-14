---
title: "Programación multimedia. Menús"
description: Implementación de menús en Android, tipos de menú (principal, submenú y contextual), definición en XML y gestión en Java con onCreateOptionsMenu y onOptionsItemSelected.
date: 2015-11-09 12:00:00 +0800
categories: [Android]
tags: [android, menus, menu-contextual, programacion-multimedia, actionbar]
pin: false
math: false
mermaid: false
---

Desde la versión 3 de Android, los menús han sido relegados a un segundo plano en sustitución de la **ActionBar**. No obstante, siguen siendo una opción válida en muchas aplicaciones.

## Tipos de menú

| Tipo | Descripción |
|------|-------------|
| **Menú principal** | Aparece en la parte inferior de la pantalla al pulsar el botón de menú |
| **Submenú** | Menú secundario que se despliega desde una opción del menú principal |
| **Menú contextual** | Aparece al mantener pulsado un elemento de la pantalla |

Los menús pueden crearse mediante **XML** en la carpeta `res/menu/` o directamente por **código Java**.

## Menú principal

### Definición en XML (res/menu/activity_main.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/configuracion"
        android:title="Configuración"
        android:icon="@android:drawable/ic_menu_preferences" />
    <item
        android:id="@+id/acerca_de"
        android:title="Acerca de"
        android:icon="@android:drawable/ic_menu_info_details" />
</menu>
```

### Inflar el menú XML en Java

```java
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.activity_main, menu);
    return true;
}
```

### Crear el menú por código

```java
private static final int MNU_OPC1 = 1;
private static final int MNU_OPC2 = 2;

@Override
public boolean onCreateOptionsMenu(Menu menu) {
    menu.add(Menu.NONE, MNU_OPC1, Menu.NONE, "Opción 1")
        .setIcon(android.R.drawable.ic_menu_preferences);
    menu.add(Menu.NONE, MNU_OPC2, Menu.NONE, "Opción 2")
        .setIcon(android.R.drawable.ic_menu_info_details);
    return true;
}
```

### Gestionar la selección

```java
public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
        case MNU_OPC1:
            Toast.makeText(getApplicationContext(), "Opcion 1",
                Toast.LENGTH_SHORT).show();
            return true;
        case MNU_OPC2:
            Toast.makeText(getApplicationContext(), "Opcion 2",
                Toast.LENGTH_SHORT).show();
            return true;
        default:
            return super.onOptionsItemSelected(item);
    }
}
```

## Menú contextual

El menú contextual aparece al mantener pulsado un elemento. En este ejemplo, al mantener pulsado un `TextView` con una pregunta sobre Aragón, aparece un menú con las tres provincias.

### XML del menú contextual (res/menu/menu_aragon.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@+id/huesca" android:title="Huesca" />
    <item android:id="@+id/zaragoza" android:title="Zaragoza" />
    <item android:id="@+id/teruel" android:title="Teruel" />
</menu>
```

### Implementación en Java

```java
TextView lblPregunta;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_menu_contextual);
    lblPregunta = (TextView) findViewById(R.id.lblPregunta);
    registerForContextMenu(lblPregunta);
}

@Override
public void onCreateContextMenu(ContextMenu menu, View v,
        ContextMenu.ContextMenuInfo menuInfo) {
    super.onCreateContextMenu(menu, v, menuInfo);
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.menu_aragon, menu);
}

@Override
public boolean onContextItemSelected(MenuItem item) {
    switch (item.getItemId()) {
        case R.id.huesca:
            lblPregunta.setText("¡¡¡Fato!!!");
            return true;
        case R.id.zaragoza:
            lblPregunta.setText("¡¡¡Cheposo!!!");
            return true;
        case R.id.teruel:
            lblPregunta.setText("Mmmm... ¡¡¡ababoles!!!");
            return true;
        default:
            return super.onContextItemSelected(item);
    }
}
```

La clave es registrar la vista con `registerForContextMenu()` en `onCreate()` para que Android sepa que debe mostrar el menú contextual al hacer pulsación larga sobre ella.
