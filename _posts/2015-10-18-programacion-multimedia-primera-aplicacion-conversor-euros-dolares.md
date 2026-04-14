---
title: "Programación multimedia. Primera aplicación. Conversor de euros - dólares"
description: Primera aplicación Android completa, un conversor de euros a dólares y viceversa, con botones de conversión y cierre y manejo de errores de entrada.
author: Inazio Claver
date: 2015-10-18 18:00:00 +0800
categories: [Android]
tags: [android, android-studio, aplicacion, conversor, edittext, button, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Primera aplicación Android completa: un conversor de divisas entre euros y dólares. La tasa de cambio usada es 1 euro = 1,13 dólares.

## Diseño del layout

La aplicación tiene dos campos `EditText` (uno para euros y otro para dólares), dos botones de conversión y un `ImageButton` para cerrar la aplicación.

![Layout del conversor de euros a dólares](/img/posts/20151018_59.png)

![Vista del layout en el editor](/img/posts/20151018_60.png)

![Resultado de la aplicación en el emulador](/img/posts/20151018_61.png)

![Conversor en funcionamiento](/img/posts/20151018_62.png)

## Código Java

**Conversor.java:**

```java
package programaciones.inazio.conversor;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;

public class Conversor extends AppCompatActivity {

    private EditText txtEuros;
    private EditText txtDolares;
    private Button btnEurosDolares;
    private Button btnDolaresEuros;
    private ImageButton btnSalir;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_conversor);

        txtEuros = (EditText)findViewById(R.id.txtEuros);
        txtDolares = (EditText)findViewById(R.id.txtDolares);
        btnEurosDolares = (Button)findViewById(R.id.btnEurosDolares);
        btnDolaresEuros = (Button)findViewById(R.id.btnDolaresEuros);
        btnSalir = (ImageButton)findViewById(R.id.btnSalir);

        btnEurosDolares.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    float euros = Float.parseFloat(txtEuros.getText().toString());
                    float dolares = euros * 1.13f;
                    txtDolares.setText(String.valueOf(dolares));
                } catch (Exception e) {
                    txtDolares.setText("Error");
                }
            }
        });

        btnDolaresEuros.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    float dolares = Float.parseFloat(txtDolares.getText().toString());
                    float euros = dolares / 1.13f;
                    txtEuros.setText(String.valueOf(euros));
                } catch (Exception e) {
                    txtEuros.setText("Error");
                }
            }
        });

        btnSalir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_conversor, menu);
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
