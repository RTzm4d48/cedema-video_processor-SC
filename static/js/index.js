import {capture_second, create_elemet_capture, create_element_video, create_image_view, captured_image_capturate} from './gestor_imagen_capture.js';
import {consult_guias, init_program, deleted_video, create_video} from './crud.js';
import {subir_imagen, subir_video, controller_title, controller_acronime, controller_code, obtain_params_data, controller_position, reset_images} from './controller.js';

class MyViews {
    constructor() {
    }

    select_guia(data) {
        // Crear el elemento select
        let select = document.getElementById('seleccion_category');
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', data[i]['acronimo']);
            option.textContent = data[i]['name'];
            select.appendChild(option);
        }
    }

    // NOTE : PRINT DATA OF VIDEOS
    pinter_data(data, stack){
        let script_color = ``;
        document.getElementById('table_videos').innerHTML = '';
        document.getElementById("insert_code").innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            const video_name = data[i].video_name;
            const old_name = data[i].old_name;
            const extension = data[i].extension;
            const file_name = data[i].file_name;
            const code = data[i].code;
            const acronym = data[i].acronym;
            const images_num = data[i].images_num;
            const fecha = data[i].fecha;
            const position = data[i].position;
            
            const comas = i == data.length - 1 ? '' : ',';

            let script = `{name: "${video_name}", extension: "${extension}", acronimo: "${acronym}", code: "${code}", files_name: "${file_name}", fecha: "${fecha}", position: "${position}", images_num: ${images_num}, GO: 6}${comas}`;
            
            const html_table = `
            <tr class="ligth">
                <th class="organism_th_1 tittle_cont">
                    <div class="icon">
                        <img width="26px" height="23" src="static/img/icon_vid.png" alt="">
                    </div>
                    <div class="tittle">
                        <p class="thetitle">${file_name}-i${images_num}${extension}</p>
                        <span>
                            <p><strong style="color: #EF4E69;">Before: </strong> ${old_name}</p>
                        </span>
                    </div>
                </th>
                <th class="organism_th_2"><p>${images_num}</p></th>
                <th class="organism_th_3">
                    <div class="actions">
                        <img onclick="deleted_video(${acronym})" height="16px" src="static/img/icon_deleted.png" alt="">
                    </div>
                </th>
            </tr>
            `;

            document.getElementById('table_videos').innerHTML += html_table;
            script_color += this.highlightCode(script);
        }
        const json_modificadores_open = `jq '[`;
        const json_modificadores_close = `] + .' data_videosStack_n${stack}.json > temp.json && mv temp.json data_videosStack_n${stack}.json`

        document.getElementById("insert_code").innerHTML += `<span class='especiales'>${json_modificadores_open}</span><br>${script_color}<span class='especiales'>${json_modificadores_close}</span>`;
    }

    highlightCode(code) {
        // Reemplaza las partes del código con etiquetas HTML para el resaltado de sintaxis
        code = code.replace(/(".*?")/g, "<span class='string'>$1</span>");
        code = code.replace(/(var|obj|name|extension|acronimo|file_name|images_num|files_name|code|fecha|position| GO)/g, "<span class='keyword'>$1</span>");
        code = code.replace(/(\{|\})/g, "<span class='signos'>$1</span>");
        code = code.replace(/( 1| 2| 3 | 4| 5| 6| 7)/g, "<span class='number'>$1</span>");
        
        return code+"<br>";
        // Inserta el código resaltado en el elemento <code>
        // document.getElementById("insert_code").innerHTML += `${code}<br>`;
    }
}

let views = new MyViews();

init();
async function init(stack=1) {
    // NOTE: SELECT CATEGORIES OF DATABASE
    let data = await consult_guias();
    views.select_guia(data);

    // NOTE: SELECT VIDEOS OF DATABASE
    let data_videos = await init_program();
    views.pinter_data(data_videos, stack);
    
    // NOTE : PRINT CODE
    controller_code();
}

MyEvents();
function MyEvents() {
    // NOTE : EVENTOS DE LISTAS DESPLEGABLES
    document.getElementById('seleccion_category').addEventListener('change', function() {
        let seleccion = this.value;
        document.getElementById('id_acronime').value = seleccion;
        controller_acronime(seleccion);
    });

    document.getElementById('select_stack').addEventListener('change', function() {
        let seleccion = this.value;
        init(seleccion);
    });
    
    // NOTE : RADIO BUTTONS DE LA POSICIÓN DEL VIDEO
    for (const n of document.getElementsByName('opciones')) {
        n.addEventListener('change', (event) => {
            controller_position(event.target.value);
        });
    }

    // NOTE : BOTÓN DE SUBIR ARCHIVOS
    document.getElementById('id_submit').addEventListener('click', function() {
        let data = obtain_params_data()[0];
        const file = document.getElementById('video_file');
        var regex = /^[a-zA-Z0-9 ]*$/;

        if (file.files.length == 0) {
            alert("Seleccione un archivo.");
        } else if (data['title'] === '') {
            alert("ingrese la descripcion del documento.");
        } else if (data['acronime'] == '') {
            alert("Seleccione una categoria.");
        }else if (data['num_img'] == 0) {
            alert("Capture una imagen.");
        // }else if (!regex.test(data['title_original'])){
        //     alert("La descripcion del documento no puede contener caracteres especiales.");
        } else {
            create_video(data, file);
        }
    });

    // NOTE : BOTÓN DE LIMPIAR (BORRAR TODO)
    document.getElementById('id_clear').addEventListener('click', function() {
        deleted_video();
    });
    
    // NOTE : BOTÓN DE CAPTURAR FRAME DE VIDEO
    document.getElementById('btn_capture').addEventListener('click', function() {
        var fileInput = document.getElementById('video_file');
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
        var numSecond = capture_second('video_reproductor');
        create_elemet_capture(url, numSecond)
    });

    // NOTE : CARGAR LA IMAGEN QUE ESTA CAPTURADA
    document.getElementById('charger_capture').addEventListener('click', function() {
        var screen_video = document.getElementById('screen_video');
        const base64Image = captured_image_capturate(screen_video);
        let num_img = subir_imagen();
        create_image_view(base64Image, num_img);
    });

    document.getElementById('move_after').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.currentTime = video.currentTime + 0.02;
    });

    document.getElementById('move_before').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.currentTime = video.currentTime - 0.02;
    });
    document.getElementById('btn_next1').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.currentTime = video.currentTime + 1;
    });

    document.getElementById('btn_next2').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.currentTime = video.currentTime - 1;
    });
    document.getElementById('btn_volume').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        if (video.volume == 0) {
            video.volume = 1;
        }else {
            video.volume = 0;
        }
        console.log(video.volume);
    });
    document.getElementById('btn_slow').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.playbackRate = 0.25;
        if  (video.paused) {
            video.play();
        }else {
            video.pause();
        }
    });
    document.getElementById('btn_pause_play').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        video.playbackRate = 1;
        if  (video.paused) {
            video.play();
        }else {
            video.pause();
        }
    });
    document.getElementById('btn_clear').addEventListener('click', function() {
        var video = document.getElementById('video_reproductor');
        if (video.controls) {
            video.controls = false;
        }else {
            video.controls = true;
        }
    });
    document.getElementById('deleted_images').addEventListener('click', function() {
        document.getElementById('id_only_imgs').innerHTML = '';
        reset_images();
    });
    
    // NOTE : CARGAR VÍDEO (EL ARRASTRA AQUÍ)
    var fileInput = document.getElementById('video_file');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
    
        create_elemet_capture(url, 0)
        create_element_video(url)
    
        subir_video();
        document.getElementById('label_file').innerHTML = file.name;
    });
    
    // NOTE : CARGAR IMAGEN DE MINIATURA
    document.getElementById('image_file').addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64Image = reader.result;
            let num_img = subir_imagen();
            create_image_view(base64Image, num_img);
        };
        // var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
        reader.readAsDataURL(file);
    });
    
    // NOTE : MOSTRAMOS NUMERO Y TAMBIEN CAPTURAMOS LO QUE ESCRIBIMOS EN EL TITULO
    document.getElementById('id_title').addEventListener('input', function(e) {
        var value = e.target.value;
        controller_title(value);
        var length = value.length;
        document.getElementById('total_description').innerHTML = length+'/70';
    });

    // NOTE Copiamos el script generado
    document.getElementById('copy_code').addEventListener('click', function() {
        var code = document.getElementById("insert_code");
        navigator.clipboard.writeText(code.innerText);
        code.classList.add('atom_finished');
    });
}