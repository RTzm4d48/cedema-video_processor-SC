// ANCHOR : NUMBER ITEMS FUNCTION
var input = document.getElementById('id_total_items');
input.addEventListener('input', function() {
    const inputValue = input.value;
    var value_int = parseInt(inputValue);
    document.getElementById('id_new_item').value = value_int+1;
});

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
        var title = data[i].title;
        var code = data[i].code;
        var extension = data[i].extension;
        var num_items = data[i].num_items;
        var old_title = data[i].old_title;
        var html_table = `
        <tr class="ligth">
            <th class="organism_th_1 tittle_cont">
                <div class="icon">
                    <img width="26px" height="23" src="static/img/icon_vid.png" alt="">
                </div>
                <div class="tittle">
                    <p class="thetitle">${title}${extension}</p>
                    <span>
                        <p class="before">Before:</p>
                        <p>${old_title}</p>
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
        document.getElementById('insert_code').innerHTML += `${code},<br>`;
    }
}