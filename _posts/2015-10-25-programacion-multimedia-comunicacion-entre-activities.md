---
title: "Programación multimedia. Comunicación entre Activities"
description: Cómo comunicar dos Activities en Android usando Intent explícito e implícito, pasar datos con Bundle y putExtra, y cargar páginas web con WebView.
author: Inazio Claver
date: 2015-10-25 21:10:00 +0800
categories: [Android]
tags: [android, java, programacion-multimedia, intent, bundle, webview, activity]
pin: false
math: false
mermaid: false
---

Este apartado trata cómo comunicar dos activities dentro del mismo proyecto Android. Para generar una nueva actividad se hace click derecho en la sección Project → New → Activity.

## Intents

Para llamar desde una activity a otra se utiliza la clase **Intent**. Permite invocar actividades, pasar información a otras actividades y servicios, y recibirla.

Existen dos tipos de Intents:

- **Explícitos:** Nombran directamente el componente necesario, especificando la clase a utilizar
- **Implícitos:** Solo llaman a la actividad sin indicar qué método debe recibirlo

### Método explícito

```java
public void onClick(View arg0) {
     Intent i = new Intent(this, SegundaActividad.class);
     startActivity(i);
}
```

## Tercera aplicación: calculadora de IMC

Aplicación que calcula el Índice de Masa Corporal usando dos interfaces gráficas distintas (`Theme.AppCompat` y `Base.Theme.AppCompat.Dialog.FixedSize`).

![IMC - pantalla principal](/img/posts/20151025_1.png)

![IMC - pantalla de ayuda](/img/posts/20151025_2.png)

![IMC - resultado](/img/posts/20151025_3.png)

![IMC - estructura del proyecto](/img/posts/20151025_4.png)

![IMC - layout principal](/img/posts/20151025_5.png)

![IMC - layout ayuda](/img/posts/20151025_6.png)

![IMC - tema dialogo](/img/posts/20151025_7.png)

**IMC.java:**

```java
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.text.DecimalFormat;

public class IMC extends AppCompatActivity {

    private Button btnCalcula;
    private Button btnAyuda;
    private EditText txtKilos;
    private EditText txtAltura;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_imc);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_imc, menu);
        return true;
    }

    public void calcularIMC(View arg0) {
        btnCalcula = (Button)findViewById(R.id.btnCalcula);
        btnAyuda = (Button)findViewById(R.id.btnAyuda);
        txtKilos = (EditText)findViewById(R.id.txtKilos);
        txtAltura = (EditText)findViewById(R.id.txtAltura);

        if (txtKilos.getText().toString().equals("") || txtAltura.getText().toString().equals("")) {
            Toast.makeText(this, "Debe rellenar los campos de peso y altura", Toast.LENGTH_SHORT).show();
        } else {
            double peso = Double.parseDouble(txtKilos.getText().toString());
            double altura = Double.parseDouble(txtAltura.getText().toString());

            if (peso <= 0 || altura <= 0) {
                Toast.makeText(this, "El valor 0 no es admisible. Usted ocupa más volumen que eso", Toast.LENGTH_SHORT).show();
            } else {
                altura = altura / 100;
                double imc = peso / (altura * altura);
                DecimalFormat f = new DecimalFormat("#.##");
                String resultado = "Indice de masa corporal: " + f.format(imc);

                if (imc < 16.00) {
                    resultado = resultado + ". \nDelgadez severa";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 16.00 && imc < 17.00) {
                    resultado = resultado + ". \nDelgadez moderada";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 17.00 && imc < 18.50) {
                    resultado = resultado + ". \nDelgadez leve";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 18.00 && imc < 25.00) {
                    resultado = resultado + ". \nIMC normal";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 25.00 && imc < 30.00) {
                    resultado = resultado + ". \nTiene sobrepeso";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 30.00 && imc < 35.00) {
                    resultado = resultado + ". \nObesidad leve";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 35.00 && imc < 40.00) {
                    resultado = resultado + ". \nObesidad media";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
                if (imc >= 40.00) {
                    resultado = resultado + ". \nObesidad mórbida";
                    Toast.makeText(this, resultado, Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    public void onClick(View v) {
        Intent i = new Intent(this, IMCAyuda.class);
        startActivity(i);
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

**IMCAyuda.java:**

```java
import android.support.v4.view.MotionEventCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;

public class IMCAyuda extends AppCompatActivity {

    public static final String DEBUG_TAG = "IMCAyuda";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_imcayuda);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_imcayuda, menu);
        return true;
    }

    public boolean onTouchEvent(MotionEvent event) {
        int action = MotionEventCompat.getActionMasked(event);

        switch (action) {
            case (MotionEvent.ACTION_DOWN):
                this.finish();
                return true;
            case (MotionEvent.ACTION_UP):
                this.finish();
                return true;
            case (MotionEvent.ACTION_MOVE):
                this.finish();
                return true;
            default:
                return super.onTouchEvent(event);
        }
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

## Método implícito: pasar datos entre Activities

Se envía un "extra" al generar el Intent y se captura en la segunda actividad con la clase `Bundle`.

**Actividad A (envío):**

```java
public void onClick(View v) {
     Intent i = new Intent(this, SegundaActividad.class);
     i.putExtra("nombreDelDatoAEnviar", txtInfo.getText().toString());
     startActivity(i);
}
```

**Actividad B (recepción):**

```java
EditText txtPrueba = (EditText)findViewById(R.id.txtPrueba);
Bundle bundle = getIntent().getExtras();
txtPrueba.setText(bundle.getString("nombreDelDatoAEnviar"));
```

Para múltiples valores:

```java
Bundle bundle = new Bundle();
bundle.putString("nombre", txtNombre.getNombre().toString());
bundle.putInt("edad", txtEdad.getEdad());
intent.putExtras(bundle);
```

## Cuarta aplicación: navegador web con WebView

**WebView** permite cargar páginas web dentro de una aplicación Android. Es necesario habilitar el permiso de Internet en el `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

![Navegador web - pantalla principal](/img/posts/20151025_8.png)

![Navegador web - resultado](/img/posts/20151025_9.png)

![Navegador web - estructura del proyecto](/img/posts/20151025_10.png)

![Navegador web - layout navegador](/img/posts/20151025_11.png)

![Navegador web - layout web](/img/posts/20151025_12.png)

![Navegador web - manifest](/img/posts/20151025_13.png)

![Navegador web - Navegador.java](/img/posts/20151025_14.png)

![Navegador web - Web.java](/img/posts/20151025_15.png)

![Navegador web - funcionamiento](/img/posts/20151025_16.png)

**Layout activity_web.xml:**

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="0dp"
    android:paddingRight="0dp"
    android:paddingTop="0dp"
    android:paddingBottom="0dp"
    tools:context="es.claver.inazio.navegadorweb.Web"
    android:background="#0288d1">

    <WebView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/pagWeb"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />
</RelativeLayout>
```

**Navegador.java:**

```java
public void enviarPagina(View v) {
     btnGo = (Button)findViewById(R.id.btnGo);
     txtURL = (EditText)findViewById(R.id.txtURL);
     Intent i = new Intent(this, Web.class);
     i.putExtra("pagina", txtURL.getText().toString());
     startActivity(i);
}
```

**Web.java:**

```java
protected void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_web);
     cargarWeb();
}

public void cargarWeb() {
     pagWeb = (WebView)findViewById(R.id.pagWeb);
     pagWeb.setWebViewClient(new WebViewClient());
     bundle = getIntent().getExtras();
     pagWeb.loadUrl("http://" + bundle.getString("pagina"));

     WebSettings webSettings = pagWeb.getSettings();
     webSettings.setJavaScriptEnabled(true);
}
```
