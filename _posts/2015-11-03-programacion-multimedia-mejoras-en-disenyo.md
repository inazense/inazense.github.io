---
title: "Programación multimedia. Mejoras en diseño"
description: Elementos para mejorar el diseño de aplicaciones Android, incluyendo iconos del sistema, barra de acción, pestañas con TabHost y recursos de iconografía.
date: 2015-11-03 13:00:00 +0800
categories: [Android]
tags: [android, disenyo, tabhost, iconos, actionbar, programacion-multimedia]
pin: false
math: false
mermaid: false
---

## Elementos de diseño en Android

Los principales elementos de diseño en una aplicación Android son:

- **Lanzadores**: Representación de la app en la pantalla principal.
- **Barra de estados**: Iconos de notificaciones del sistema.
- **Menú**: Menú por actividad.
- **Barra de acciones**: Proporciona una experiencia de usuario unificada.
- **Pestañas**: Para organizar contenido en secciones.

## Iconos

Se pueden usar tanto iconos del sistema como iconos personalizados. Para acceder a los recursos del sistema:

```java
Resources recursos = getResources();
Drawable db1 = recursos.getDrawable(android.R.drawable.ic_secure);
```

Recursos útiles para iconos:

- [http://androiddrawables.com](http://androiddrawables.com) — catálogo de drawables del sistema Android.
- Google Design Spec — especificaciones de iconografía de Material Design.
- Android Asset Studio — herramienta online para crear iconos para Android.

## Ejemplo: aplicación con pestañas (TabHost)

La estructura del layout para pestañas sigue este esquema:

```
TabHost
  └─ LinearLayout
       ├─ TabWidget
       └─ FrameLayout
            ├─ (contenido tab 1)
            ├─ (contenido tab 2)
            └─ (contenido tab 3)
```

### Layout XML (activity_main.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<TabHost xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/tabhost"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <TabWidget
            android:id="@android:id/tabs"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <FrameLayout
            android:id="@android:id/tabcontent"
            android:layout_width="match_parent"
            android:layout_height="match_parent">

            <LinearLayout
                android:id="@+id/tab1"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="vertical" />

            <LinearLayout
                android:id="@+id/tab2"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="vertical" />

            <LinearLayout
                android:id="@+id/tab3"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="vertical" />

        </FrameLayout>
    </LinearLayout>
</TabHost>
```

### Código Java (MainActivity.java)

```java
import android.app.Activity;
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.widget.TabHost;
import androidx.core.content.ContextCompat;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Resources recursos = getResources();
        Drawable icono1 = ContextCompat.getDrawable(this, android.R.drawable.ic_secure);

        TabHost tabs = (TabHost) findViewById(android.R.id.tabhost);
        tabs.setup();

        TabHost.TabSpec spec = tabs.newTabSpec("mitab1");
        spec.setContent(R.id.tab1);
        spec.setIndicator("TAB1", icono1);
        tabs.addTab(spec);

        spec = tabs.newTabSpec("mitab2");
        spec.setContent(R.id.tab2);
        spec.setIndicator("CONTACTO", icono1);
        tabs.addTab(spec);

        spec = tabs.newTabSpec("mitab3");
        spec.setContent(R.id.tab3);
        spec.setIndicator("INFORMACIÓN", icono1);
        tabs.addTab(spec);
    }
}
```

> **Nota:** Android actualmente recomienda usar `ActionBar` con fragmentos en lugar de `TabHost`, que ha quedado en desuso en versiones modernas.
