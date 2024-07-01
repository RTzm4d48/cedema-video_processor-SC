import {saludar,
        capture_second,
        create_elemet_capture,
        create_element_video,
        create_image_view,
        captured_image_capturate,
} from './gestor_imagen_capture.js';

import {obtain_date, getCookie} from './utils.js';

import {asigned_code, put_name_files, insertAcronime, put_view_acronime} from './operations.js';



class MySettings {
    constructor() {
        this.video_position = 'H';
    }
    get position() {
        return this.video_position;
    }
    set position(value) {
        this.video_position = value;
    }
}
















init();
function init() {
    // ANCHOR : ASIGNAMOS EL CODIGO AL INPUT
    asigned_code();
    // ANCHOR : ASIGNAMOS NUESTRAS GUIAS AL SELECTOR
    consult_guias();

    // ANCHOR : VARIABLES WINDOWS, OBJETO GLOBAL
    window.img_viwe_generated = 0;
    window.VideoPosition = 'H';
}

// ANCHOR : RADIO BUTTONS DE LA POSICIÓN DEL VIDEO
function handleChange(event) {
    if (event.target.checked) {
        window.VideoPosition = event.target.value;
    }
}
let nombre = document.getElementsByName('opciones');
for (const n of nombre) {
    n.addEventListener('change', handleChange);
}

// ANCHOR : CLICK CREATE CAPTURE
document.getElementById('btn_capture').addEventListener('click', function() {
    console.log("Capturando video...");
    var fileInput = document.getElementById('video_file');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo

    var numSecond = capture_second('video_reproductor');

    create_elemet_capture(url, numSecond)

});

// NOTE : NO TIENE FUNCIONALIDAD
document.getElementById('btn_download').addEventListener('click', function() {
    alert("Descargando video...");    
});

// ANCHOR : CARGAR LA IMAGEN QUE ESTA CAPTURADA
document.getElementById('charger_capture').addEventListener('click', function() {
    var screen_video = document.getElementById('screen_video');
    const base64Image = captured_image_capturate(screen_video);
    create_image_view(base64Image);
});

// ANCHOR : CLICK CREATE VIDEO AND CAPTURE
var fileInput = document.getElementById('video_file');
fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo

    create_elemet_capture(url, 0)
    create_element_video(url)

    document.getElementById('id_name_video').classList.add('show');

    document.getElementById('label_file').innerHTML = file.name;
});

const imageFileImput = document.getElementById('image_file');
imageFileImput.addEventListener('change', function() {
    var file = imageFileImput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo

    create_image_view(url);
});


// ANCHOR : CLICK CREATE VIDEOS
document.getElementById('id_submit').addEventListener('click', function() {

    const video_name = document.getElementById('id_title').value.trim();
    const code = document.getElementById('id_code').value.trim();
    const acronym = document.getElementById('id_acronime').value.trim();
    const file = document.getElementById('video_file');
    
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
        create_video(code, acronym, video_name, file);
    }
});

// ANCHOR : CLICK DELETED VIDEOS
document.getElementById('id_clear').addEventListener('click', function() {
    deleted_video();
});

document.getElementById('seleccion').addEventListener('change', function() {
    let seleccion = this.value;
    // alert(seleccion);
    insertAcronime(seleccion);
});

function select_guia(data) {
    // console.log("GUIA SELECCIONADA");
    // const select_guia = document.getElementById('select_guia');

    // Crear el elemento select
    let select = document.getElementById('seleccion');
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
    
    // select_guia.appendChild(select);
}

function consult_guias() {
    $(document).ready(function() {
        // Realizar una solicitud GET a la API cuando se carga la página
        $.ajax({
            url: '/api/my_apis/slecet_guias/',
            type: 'GET',
            success: function(data) {
                select_guia(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                // Manejar errores si la solicitud falla
                console.error('Error al obtener datos de la API:', errorThrown);
            }
        });
    });
}

// #region # TODO: SELECT VIDEOS
init_program();
function init_program() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/my_apis/select_videos/',
            type: 'GET',
            success: function(data) {
                console.log('VIDEOS GUIA OBTENIDOS', data);
                pinter_data(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });
}

// #region TODO: CREATE VIDEOS
function create_video(code, acronym, video_name, file) {
    // const imagen_num = window.img_viwe_generated;
    $(document).ready(function() {
        var csrftoken = getCookie('csrftoken');
        var formData = new FormData();
        formData.append('video_name', video_name);
        formData.append('code', code);
        formData.append('acronym', acronym);
        formData.append('old_name', file.files[0].name);
        formData.append('attach_file', file.files[0]);
        formData.append('images_num', img_viwe_generated);
        formData.append('fecha', obtain_date());
        formData.append('position', window.VideoPosition);
        if (img_viwe_generated > 0) {
            for (let i = 1; i <= img_viwe_generated; i++) {
                let image = document.getElementById(`generated_img_${i}`);
                formData.append(`generated_img_${i}`, image.src);
            }
        }
        $.ajax({
            url: '/api/my_apis/create_video/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(data) {
                console.log('VIDEO GUIA CREATE!', data);
                location.reload();
            },
            error: function(xhr, textStatus, errorThrown) {
                // Manejar errores si la solicitud falla
                console.error('Error al obtener datos de la API:', errorThrown);
            }
        });
    });
}

// #region TODO: DELETED VIDEOS
function deleted_video(item) {
    var csrftoken = getCookie('csrftoken');
    $(document).ready(function() {
            $.ajax({
            url: '/api/my_apis/deleted_video/',
            type: 'POST',
            data: {
                'num_item': 'item'
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(data) {
                console.log('VIDEO DELETD SUCESSFULL!', data);
                location.reload();
            },
            error: function(xhr, textStatus, errorThrown) {
                // Manejar errores si la solicitud falla
                console.error('Error al obtener datos de la API:', errorThrown);
            }
        });
    });
}

// NOTE : PRINT DATA
function pinter_data(data){
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
        // document.getElementById('insert_code').innerHTML += `${script},<br>`;
        highlightCode(script);
    }
}

function highlightCode(code) {
    // Reemplaza las partes del código con etiquetas HTML para el resaltado de sintaxis
    code = code.replace(/('.*?')/g, "<span class='string'>$1</span>");
    code = code.replace(/(var|obj|name|extencion|acronimo|file_name|images_num|files_name|code|fecha|position)/g, "<span class='keyword'>$1</span>");
    code = code.replace(/(\{|\})/g, "<span class='signos'>$1</span>");
    code = code.replace(/( 1| 2| 3)/g, "<span class='number'>$1</span>");
    
    // Inserta el código resaltado en el elemento <code>
    document.getElementById("insert_code").innerHTML += `${code}<br>`;
}

// VERMOS QUE ES ESTO
function copyCode() {
    // Copia el código al portapapeles
    var code = document.getElementById("insert_code").innerText;
    navigator.clipboard.writeText(code);
    alert("Código copiado al portapapeles");
}

function view_video() {
    var html_view_video = `
    <source src="" type="video/mp4">
    `;
    document.getElementById('video_output').style.display = 'block';
}

// ANCHOR : MOSTRAMOS NUMERO Y TAMBIEN CAPTURAMOS LO QUE ESCRIBIMOS EN EL TITULO
document.getElementById('id_title').addEventListener('input', function(e) {
    var value = e.target.value;
    put_name_files(value);

    var length = value.length;
    document.getElementById('total_description').innerHTML = `${length}/70`;
});

document.getElementById('id_acronime').addEventListener('input', function(e) {
    var value = e.target.value;
    put_view_acronime(value);
});