// ANCHOR : NUMBER ITEMS FUNCTION
var input = document.getElementById('id_total_items');
input.addEventListener('input', function() {
    const inputValue = input.value;
    var value_int = parseInt(inputValue);
    document.getElementById('id_new_item').value = value_int+1;
});

// TODO: : CLICK CREATE CAPTURE
document.getElementById('btn_capture').addEventListener('click', function() {
    console.log("Capturando video...");
    var fileInput = document.getElementById('video_file');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo


    var numSecond = capture_second('video_reproductor');
    console.log(numSecond)

    create_elemet_capture(url, numSecond)

});

// ANCHOR : CAPTURE SECOND
function capture_second(id) {
    var video = document.getElementById(id);
    var rondedNum = Math.round(video.currentTime);
    return rondedNum;
}

// TODO: : CLICK CREATE VIDEO AND CAPTURE
var fileInput = document.getElementById('video_file');
fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo

    create_elemet_capture(url, 0)

    create_element_video(url)

    document.getElementById('label_file').innerHTML = file.name;
});

// ANCHOR : CREATE ENLACE OF DOWNLOAD
function DownloadImageCaptured(base64Image) {
    console.log('DESDE DOWNLOAD:', base64Image);

    var link = document.createElement('a');
    link.href = base64Image;
    link.download = 'static/temp/frame.jpg'; // establece el nombre del archivo de la imagen
    link.click(); // inicia la descarga

    // Muestra la imagen en una etiqueta <img>
    var img = document.getElementById('img_capture');
    img.src = base64Image;
}

// ANCHOR : CREATE ELEMENT CAPTURE
function create_elemet_capture(url, second){
    // Crea un elemento de video y carga el video
    var video = document.createElement('video');
    video.src = url;
    video.className = 'video_styles';
    // Crea un elemento de canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    video.currentTime = second; // busca hasta ese segundo

    video.addEventListener('loadeddata', function() {
        // Asegúrate de que el canvas tenga el mismo tamaño que el video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Dibuja el frame actual del video en el canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtiene la imagen en formato base64
        var base64Image = canvas.toDataURL('image/jpeg');
    });
    document.getElementById('captura_output').innerHTML = '';
    document.getElementById('captura_output').appendChild(video);
    // console.log('Imagen capturada:', base64Image);
    // console.log(base64Image)
    // return base64Image;
}

// ANCHOR : CREATE ELEMENT VIDEO
function create_element_video(url){
    // Crea el elemento <video>
    var video = document.createElement('video');
    video.id = 'video_reproductor';
    video.controls = true;

    // Crea el elemento <source>
    var source = document.createElement('source');
    source.src = url;
    source.type = 'video/mp4';

    // Agrega el elemento <source> al elemento <video>
    video.appendChild(source);

    // Agrega el elemento <video> al cuerpo del documento
    document.getElementById('video_output').innerHTML = '';
    document.getElementById('video_output').appendChild(video)
}


document.getElementById('id_title').addEventListener('input', function(e) {
    var value = e.target.value;
    var length = value.length;
    console.log('Cantidad de caracteres ingresados: ' + length);
    document.getElementById('total_description').innerHTML = `${length}/70`;
});

function capture() {
    alert("Capturando video...")
    console.log("Capturando video...");
    var fileInput = document.getElementById('video_file');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo


    var numSecond = capture_second('video_reproductor');
    console.log(numSecond);

    create_elemet_capture(url, numSecond);

}

// ANCHOR : CLICK CREATE VIDEOS
document.getElementById('id_submit').addEventListener('click', function() {
    var items = document.getElementById('id_new_item').value.trim();
    var int_items = parseInt(items);
    var file = document.getElementById('video_file');
    var title = document.getElementById('id_title').value.trim();

    if (file.files.length == 0) {
        alert("Seleccione un archivo.");
    } else if (title === '') {
        alert("ingrese la descripcion del documento.");
    } else if (items == 0 || this.items === '') {
        alert("ingrese la cantidad de items.");
    } else {
        create_video(int_items, title, file);
    }
});

// ANCHOR : CLICK DELETED VIDEOS
document.getElementById('id_clear').addEventListener('click', function() {
    deleted_video();
});

// #region TODO: SELECT VIDEOS
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
function create_video(items, title, file) {
    $(document).ready(function() {
        var csrftoken = getCookie('csrftoken');
        var formData = new FormData();
        formData.append('title', items+'_'+title);
        formData.append('num_item', items);
        formData.append('old_title', file.files[0].name);
        formData.append('attach_file', file.files[0]);
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
    $(document).ready(function() {
            $.ajax({
            url: '/api/my_apis/deleted_video/',
            type: 'POST',
            data: {
                'num_item': item
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

// NOTE : GET COOKIE
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // ¿El cookie comienza con el nombre que queremos?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// NOTE : PRINT DATA
function pinter_data(data){
    for (var i = 0; i < data.length; i++) {
        var video_name = data[i].video_name;
        var code = data[i].script;
        var extension = data[i].extension;
        var num_items = i;
        var old_name = data[i].old_name;
        var html_table = `
        <tr class="ligth">
            <th class="organism_th_1 tittle_cont">
                <div class="icon">
                    <img width="26px" height="23" src="static/img/icon_vid.png" alt="">
                </div>
                <div class="tittle">
                    <p class="thetitle">${video_name}${extension}</p>
                    <span>
                        <p class="before">Before:</p>
                        <p>${old_name}</p>
                    </span>
                </div>
            </th>
            <th class="organism_th_2"><p>${num_items}</p></th>
            <th class="organism_th_3">
                <div class="actions">
                    <img height="16px" src="static/img/icon_edit.png" alt="">
                    <img onclick="deleted_video(${num_items})" height="16px" src="static/img/icon_deleted.png" alt="">
                </div>
            </th>
        </tr>
        `;
        document.getElementById('table_videos').innerHTML += html_table;
        // document.getElementById('insert_code').innerHTML += `${code},<br>`;
        highlightCode(code);
    }
}

function highlightCode(code) {
    // Reemplaza las partes del código con etiquetas HTML para el resaltado de sintaxis
    code = code.replace(/('.*?')/g, "<span class='string'>$1</span>");
    code = code.replace(/(var|obj|titulo|extencion|number)/g, "<span class='keyword'>$1</span>");
    code = code.replace(/(\{|\})/g, "<span class='number'>$1</span>");
    // code = code.replace(/(\:)/g, "<span class='number'>$1</span>");
    
    // Inserta el código resaltado en el elemento <code>
    document.getElementById("insert_code").innerHTML += `${code} <br>`;
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