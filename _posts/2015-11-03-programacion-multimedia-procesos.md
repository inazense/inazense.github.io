---
title: "Programación multimedia. Procesos"
description: Gestión de procesos en Android y ciclo de vida de las actividades, con los siete métodos del ciclo de vida y un ejemplo práctico usando Toast para observar cada transición.
date: 2015-11-03 12:00:00 +0800
categories: [Android]
tags: [android, procesos, ciclo-de-vida, activity, programacion-multimedia]
pin: false
math: false
mermaid: false
---

## Gestión de procesos en Android

La mayoría de las aplicaciones Android se ejecutan de forma independiente en su propio proceso con una máquina virtual Java dedicada. El sistema asigna a cada aplicación un identificador de usuario (UID) único y gestiona dinámicamente la vida de los procesos y la asignación de memoria.

## Estados de una actividad

Una actividad puede encontrarse en uno de los siguientes estados:

| Estado | Descripción |
|--------|-------------|
| **Activa** | Se está ejecutando en primer plano |
| **Pausada** | Es visible pero está parcialmente tapada por otra actividad |
| **Parada** | Está oculta por completo por otra actividad |
| **Terminada** | Nunca se inició o fue destruida por el sistema |

## Métodos del ciclo de vida

El ciclo de vida de una actividad Android se gestiona a través de siete métodos:

| Método | Cuándo se llama |
|--------|----------------|
| `onCreate()` | Al crear la actividad por primera vez |
| `onStart()` | Cuando el sistema va a mostrar la actividad |
| `onResume()` | Cuando la actividad pasa a ser totalmente visible |
| `onPause()` | Cuando el usuario deja de interactuar con ella |
| `onStop()` | Cuando la actividad queda completamente oculta |
| `onRestart()` | Cuando una actividad parada vuelve a mostrarse |
| `onDestroy()` | Justo antes de destruir la actividad |

## Ejemplo práctico

El siguiente ejemplo muestra un `Toast` en cada método del ciclo de vida para observar la secuencia completa de transiciones durante la ejecución:

```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);
        Toast.makeText(this, "onCreate", Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onStart() {
        super.onStart();
        Toast.makeText(this, "onStart", Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Toast.makeText(this, "onResume", Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onPause() {
        Toast.makeText(this, "onPause", Toast.LENGTH_SHORT).show();
        super.onPause();
    }

    @Override
    protected void onStop() {
        Toast.makeText(this, "onStop", Toast.LENGTH_SHORT).show();
        super.onStop();
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Toast.makeText(this, "onRestart", Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onDestroy() {
        Toast.makeText(this, "onDestroy", Toast.LENGTH_SHORT).show();
        super.onDestroy();
    }
}
```

Al lanzar la aplicación se ejecutan en orden `onCreate` → `onStart` → `onResume`. Al pulsar el botón Inicio se llama `onPause` → `onStop`. Al volver a la aplicación: `onRestart` → `onStart` → `onResume`. Al pulsar Atrás: `onPause` → `onStop` → `onDestroy`.
