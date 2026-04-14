---
title: "Programación multimedia. Segunda aplicación. Transparentando una imagen"
description: Aplicación Android que modifica la transparencia de una imagen a partir de un porcentaje introducido por el usuario, y cambia el color de fondo aleatoriamente.
author: Inazio Claver
date: 2015-10-18 19:00:00 +0800
categories: [Android]
tags: [android, android-studio, imageview, transparencia, alpha, color, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Segunda aplicación Android: modifica la transparencia de una imagen a partir de un porcentaje (0-100) introducido por el usuario, convirtiéndolo a la escala de transparencia de Android (0-255). Incluye además un botón para cambiar el color de fondo aleatoriamente.

## Consideraciones técnicas

- El método `setAlpha()` está **obsoleto** desde API 16.
- El método `setImageAlpha()` funciona **desde API 11** en adelante.
- El valor de porcentaje debe procesarse como `double` antes de convertirlo a `int` para evitar pérdida de precisión.
- `0` representa transparencia total y `255` opacidad completa.

## Diseño del layout

![Layout inicial de la aplicación](/img/posts/20151018_63.png)

![Vista del emulador con la imagen de los Lagos de Orduña](/img/posts/20151018_64.png)

![Interfaz con campo de porcentaje y botones](/img/posts/20151018_65.png)

## Código Java: versión 1 (transparencia)

```java
package es.claver.inazio.transparencia;

import android.annotation.TargetApi;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

public class Transparencia extends AppCompatActivity {

    private Button btnConversor;
    private ImageView ordicuso;
    private EditText txtPorcentaje;
    private Button btnColor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_transparencia);

        btnConversor = (Button)findViewById(R.id.btnCambiar);
        btnConversor.setOnClickListener(new View.OnClickListener() {
            @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
            @Override
            public void onClick(View v) {
                ordicuso = (ImageView)findViewById(R.id.imgOrdicuso);
                txtPorcentaje = (EditText)findViewById(R.id.txtPorcentaje);
                double p = Double.parseDouble(txtPorcentaje.getText().toString());

                if (p > 100 || p < 0){
                    Toast t = Toast.makeText(getApplicationContext(),
                        "Valor de transparencia no permitido", Toast.LENGTH_SHORT);
                    t.show();
                }
                else{
                    double r = (255 / 100) * p;
                    int porcentaje = (int)Math.floor(r);
                    ordicuso.setImageAlpha(porcentaje);
                }
            }
        });

        btnColor = (Button)findViewById(R.id.btnNuevoColor);
        btnColor.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                getWindow().setBackgroundDrawable(new ColorDrawable(
                    Color.argb(Color.alpha(generarColor()),
                    Color.red(generarColor()),
                    Color.green(generarColor()),
                    Color.blue(generarColor()))));
            }
        });
    }

    public int generarColor(){
        return (int)Math.random()*255+1;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_transparencia, menu);
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

![Aplicación con transparencia al 50%](/img/posts/20151018_66.png)

![Aplicación con transparencia al 100% (imagen invisible)](/img/posts/20151018_67.png)

## Versión 2: cambio de color de fondo

La segunda versión añade un botón que genera un color de fondo aleatorio usando `Color.argb()` con valores RGB aleatorios. El método `setBackgroundDrawable()` aplica el nuevo color a la ventana.

![Versión 2 con cambio de color de fondo](/img/posts/20151018_68.png)

![Color de fondo aleatorio generado](/img/posts/20151018_69.png)

![Otro color generado aleatoriamente](/img/posts/20151018_70.png)

![Vista final de la aplicación completa](/img/posts/20151018_71.png)
