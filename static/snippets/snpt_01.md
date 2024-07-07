# 🧩 - [SNIPPET] - MANUAL


## ENVIAR ARCHIVOS A LAV

❗En estos ejemplo usamos EL `LAV` de **categoria** `LG` y el **Stack** `1`

1. Asegurarnos cuantos elementos `json` y archivos de `videos` tenmos en la categoria del `LAV` al que queremos enviar.

~~~
jsons_videos_elements_stack "LG" "1"
~~~

<sup># 💬 : Si el numero de items de nuestro `Stack` no supera los `144` podemos continuar, de lo contrario cambiamos de `Stack`. `🚩C_301555_midi`</sup>

2. Primero movemos los `videos` y las `imagenes` con el siguente comando

~~~
move_files_to_lav "LG" "1"
~~~

3. Si todo esta bien continuamos el `json` de nuestro `LAV`

~~~
open_lav_json "LG" "1"
~~~

❗el código de las funciones están en el modulo de SHELL `🧾C_2N6TD7oQ24_modulo`

🌟 Y ya estaria! acabamos de mover nuestros videos procesado con `SC` video_processor a nuestro sistema `LAV`

---

# 🚩MIDI

> **(Más Información Detallada e Integrada)**

---

**Como aumentar STACKs a nuestros LAV `🚩C_301555_midi`**<br>

Lo que tenemos que hacer en la categorian en nonde querramos agregar un nuevo `Stack` es lo siguente:<br>
- Crear las siguentes carpetas:

`📁imagesStack_n2`<br>
`📁videosStack_n2`

- y el siguente archivo `json`:

📄data_videosStack_n2.json

❗Los creamos estos segun la nomenclatura que les corresponda.

~~~
📁 ESvideos/
│
├── 📁images/
│ ├── 📁imagesStack_n1
│ │  ├──── 📄nombre_de_ejemplo-ES-U2SGYY-1.png
│ │  └── 📄nombre_de_ejemplo_dos-ES-U2SGYY-1.png
│ └── 📁imagesStack_n2☀️
│
├── 📁videos/
│ ├── 📁videosStack_n1
│ │  ├── 📄nombre_de_ejemplo-ES-U2SGYY-i1.mp4
│ │  └── 📄nombre_de_ejemplo_dos-ES-U2SGYY-i1.mp4
│ └── 📁videosStack_n2☀️
│
├── 📁jsonData_stackVideos/
│ ├── 📄data_videosStack_n1.json
│ └── 📄data_videosStack_n2.json☀️
│
└── 📄data_videosSections.json
~~~

---