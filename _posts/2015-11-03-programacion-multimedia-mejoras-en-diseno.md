---
title: "Programación multimedia. Mejoras en diseño"
description: Elementos para mejorar el diseño de aplicaciones Android, iconos del sistema, recursos gráficos, y creación de una interfaz con pestañas usando TabHost.
date: 2015-11-03 13:00:00 +0800
categories: [Android]
tags: [android, diseno, tabhost, iconos, programacion-multimedia]
pin: false
math: false
mermaid: false
---

En esta entrada se presentan elementos para mejorar el diseño de aplicaciones Android:

- Lanzadores (representación en la pantalla principal)
- Barra de estados (iconos de notificaciones)
- Menú (por actividad)
- Barra de acciones (experiencia unificada)
- Pestañas
- Otros elementos

## Iconos

Se pueden usar iconos del sistema Android o crear iconos propios. Para acceder a los recursos del sistema:

```java
Resources recursos = getResources();
Drawable db1 = recursos.getDrawable(android.R.drawable.ic_secure);
```

Recursos útiles para encontrar o crear iconos:

- [http://androiddrawables.com](http://androiddrawables.com) — catálogo de drawables del sistema
- Google Design Spec — guía de iconografía de Material Design
- Android Asset Studio — generador de iconos online

## Ejemplo: Aplicación con pestañas (TabHost)

La estructura del layout necesaria para `TabHost` es:

```
TabHost → LinearLayout → TabWidget + FrameLayout
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
import android.os.Bundle;
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
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

> **Nota:** Android actualmente recomienda usar **ActionBar** con fragmentos en lugar de `TabHost`, que está considerado obsoleto.
