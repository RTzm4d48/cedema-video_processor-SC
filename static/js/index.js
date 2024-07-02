import {capture_second,
        create_elemet_capture,
        create_element_video,
        create_image_view,
        captured_image_capturate,
} from './gestor_imagen_capture.js';
// import {obtain_date, getCookie} from './utils.js';
// import {asigned_code, put_name_files, insertAcronime, put_view_acronime} from './operations.js';
import {put_name_files} from './operations.js';
import {consult_guias, init_program, deleted_video} from './crud.js';



class MySettings {
    constructor(category = null, preset = 'lav', video_position = 'H') {
        window.img_viwe_generated = 0;
        //-----------------------
        this.category = category;
        this.preset = preset;
        this.video_position = video_position;
    }
    
    get config_categoryes() {
        return this.category;
    }
    set config_categoryes(value) {
        document.getElementById('id_acronime').value = value;
        if (value == 'other') views.activate_edit_acronime();
        if (value != 'other') views.disable_edit_acronime();
        this.category = value;
    }
    
    get config_my_preset() {
        return this.preset;
    }
    set config_my_preset(value) {
        this.preset = value;
    }

    get config_video_position() {
        return this.video_position;
    }
    set config_video_position(value) {
        this.video_position = value;
    }
}

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
        // NOTE : AGREGAMOS EL OTHERS
        let option = document.createElement('option');
        option.setAttribute('value', 'other');
        option.textContent = 'other';
        select.appendChild(option);        
    }

    // NOTE : PRINT DATA OF VIDEOS
    pinter_data(data){
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


            const script = `{name: '${video_name}', extencion: '${extension}', acronimo: '${acronym}', code: '${code}', files_name: '${file_name}', fecha: '${fecha}', position: '${position}', images_num: ${images_num}},`;

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
            this.highlightCode(script);
        }
    }

    highlightCode(code) {
        // Reemplaza las partes del código con etiquetas HTML para el resaltado de sintaxis
        code = code.replace(/('.*?')/g, "<span class='string'>$1</span>");
        code = code.replace(/(var|obj|name|extencion|acronimo|file_name|images_num|files_name|code|fecha|position)/g, "<span class='keyword'>$1</span>");
        code = code.replace(/(\{|\})/g, "<span class='signos'>$1</span>");
        code = code.replace(/( 1| 2| 3)/g, "<span class='number'>$1</span>");
        
        // Inserta el código resaltado en el elemento <code>
        document.getElementById("insert_code").innerHTML += `${code}<br>`;
    }

    activate_edit_acronime() {
        let element = document.getElementById('id_acronime');
        element.value = '';
        element.removeAttribute('disabled');
        element.style.color = 'white';
    }

    disable_edit_acronime() {
        let element = document.getElementById('id_acronime');
        element.setAttribute('disabled', '');
        element.removeAttribute('style');
        // element.style.color = 'white';
    }
}


let views = new MyViews();
let settings = new MySettings();


init();
async function init() {
    let data = await consult_guias();
    views.select_guia(data);

    // #region # TODO: SELECT VIDEOS
    let data_videos = await init_program();
    views.pinter_data(data_videos);
}

MyEvents();
function MyEvents() {
    // NOTE : EVENTOS DE LISTAS DESPLEGABLES
    document.getElementById('seleccion_category').addEventListener('change', function() {
        let seleccion = this.value;
        settings.config_categoryes = seleccion;
    });
    
    // NOTE : EVENTOS DE LISTAS DESPLEGABLES
    document.getElementById('seleccion_preset').addEventListener('change', function() {
        let seleccion = this.value;
        settings.config_my_preset = seleccion;
    });
    
    // NOTE : INPUT TEXT DEL ACROINMO
    document.getElementById('id_acronime').addEventListener('input', function(e) {
        var value = e.target.value;
        settings.config_categoryes = value;
    });
    
    // NOTE : RADIO BUTTONS DE LA POSICIÓN DEL VIDEO
    for (const n of document.getElementsByName('opciones')) {
        n.addEventListener('change', (event) => {
            settings.config_video_position = event.target.value;
        });
    }
    
    // NOTE : BOTÓN DE SUBIR ARCHIVOS
    document.getElementById('id_submit').addEventListener('click', function() {
        const video_name = document.getElementById('id_title').value.trim();
        const code = document.getElementById('id_code').value.trim();
        const acronym = document.getElementById('id_acronime').value.trim();
        const file = document.getElementById('video_file');
        const VideoPosition = settings.config_video_position;
        const img_viwe_generated = window.img_viwe_generated;
    
        var regex = /^[a-zA-Z0-9 ]*$/;
        console.log("AQUI-----------")
        console.log(regex.test(video_name));
    
        if (file.files.length == 0) {
            alert("Seleccione un archivo.");
        } else if (video_name === '') {
            alert("ingrese la descripcion del documento.");
        } else if (code == '' || acronym == '') {
            alert("Ingrese el codigo y el acronimo.");
        }else if (img_viwe_generated == 0) {
            alert("Capture una imagen.");
        }else if (!regex.test(video_name)){
            alert("La descripcion del documento no puede contener caracteres especiales.");
        } else {
            create_video(code, acronym, video_name, file, VideoPosition, img_viwe_generated);
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
    
    // NOTE : DESCARGAR IMAGEN YA CAPTURADA (NO TIENE FUNCIONALIDAD)
    // document.getElementById('btn_download').addEventListener('click', function() {
    //     alert("Descargando video...");    
    // });
    
    // NOTE : CARGAR LA IMAGEN QUE ESTA CAPTURADA
    document.getElementById('charger_capture').addEventListener('click', function() {
        var screen_video = document.getElementById('screen_video');
        const base64Image = captured_image_capturate(screen_video);
        create_image_view(base64Image);
    });
    
    // NOTE : CARGAR VÍDEO (EL ARRASTRA AQUÍ)
    var fileInput = document.getElementById('video_file');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
    
        create_elemet_capture(url, 0)
        create_element_video(url)
    
        document.getElementById('id_name_video').classList.add('show');
        document.getElementById('label_file').innerHTML = file.name;
    });
    
    // NOTE : CARGAR IMAGEN DE MINIATURA
    document.getElementById('image_file').addEventListener('change', function() {
        var file = imageFileImput.files[0];
        var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
        create_image_view(url);
    });
    
    // NOTE : MOSTRAMOS NUMERO Y TAMBIEN CAPTURAMOS LO QUE ESCRIBIMOS EN EL TITULO
    document.getElementById('id_title').addEventListener('input', function(e) {
        var value = e.target.value;
        put_name_files(value);
    
        var length = value.length;
        document.getElementById('total_description').innerHTML = `${length}/70`;
    });
    
    // NOTE COÍAR CODIGO (VERMOS QUE ES ESTO)
    function copyCode() {
        // Copia el código al portapapeles
        var code = document.getElementById("insert_code").innerText;
        navigator.clipboard.writeText(code);
        alert("Código copiado al portapapeles");
    }
}


// function view_video() {
//     var html_view_video = `
//     <source src="" type="video/mp4">
//     `;
//     document.getElementById('video_output').style.display = 'block';
// }