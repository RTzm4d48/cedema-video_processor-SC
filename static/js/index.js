// Initialize the input
var input = document.getElementById('id_total_items');
input.addEventListener('input', function() {
    const inputValue = input.value;
    capture_num_item(inputValue);
});

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

// Define your function
function capture_num_item(value) {
    console.log(value);
    var value_int = parseInt(value);
    document.getElementById('id_new_item').value = value_int+1;
}

document.getElementById('id_submit').addEventListener('click', function() {
    var items = document.getElementById('id_total_items').value;
    var file = document.getElementById('video_file');
    var tittle = document.getElementById('id_tittle');
    const instancia = new PROCESS_DATA(items, file, tittle); instancia.submit_form();
});

class PROCESS_DATA {
    constructor(items, file, tittle) {
        this.items = items;
        this.file = file;
        this.tittle = tittle;
    }
  
    submit_form() {
        if (this.file.files.length == 0) {
            alert("Seleccione un archivo.");
        } else if (this.tittle.value.trim() === '') {
            alert("ingrese la descripcion del documento.");
        } else if (this.items == 0 || this.items === '') {
            alert("ingrese la cantidad de items.");
        } else {
            console.log("SE ENVIO EL FORMULARIO :v");
            this.validateForm()
        }
    }
  
    validateForm() {
        console.log("VALIDANDO FORMULARIO XD");
        console.log(this.items);
        console.log(this.file.files[0].name);
        console.log(this.tittle.value);

        var self = this; // Guarda una referencia a `this`

        $(document).ready(function() {
            // var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
            var csrftoken = getCookie('csrftoken');
            var formData = new FormData();
            formData.append('title', 'Titulo del video');
            formData.append('num_item', '9');
            formData.append('old_title', 'Titulo del video viejo');
            // formData.append('attach_file', self.file.files[0]);
            $.ajax({
                url: '/api/my_apis/create_video/',
                type: 'POST',
                data: formData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                },
                success: function(data) {
                    console.log('Datos de la API AAAAAAAAAAAAAAAA:', data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    // Manejar errores si la solicitud falla
                    console.error('Error al obtener datos de la API:', errorThrown);
                }
            });
        });
    }
  }
init_program();
function init_program() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/my_apis/select_videos/',
            type: 'GET',
            success: function(data) {
                console.log('Datos obtenidos de la API XD:', data);
                pinter_data(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });

}

function pinter_data(data){
    for (var i = 0; i < data.length; i++) {
        var title = data[i].title;
        var code = data[i].code;
        var extension = data[i].extension;
        var num_items = data[i].num_items;

        console.log(title);

        var html_table = `
        <tr class="ligth">
            <th class="organism_th_1 tittle_cont">
                <div class="icon">
                    <img width="26px" height="23" src="static/img/icon_vid.png" alt="">
                </div>
                <div class="tittle">
                    <p>${title}${extension}</p>
                    <span>
                        <p class="before">Before:</p>
                        <p>vid_low_01</p>
                    </span>
                </div>
            </th>
            <th class="organism_th_2"><p>${num_items}</p></th>
            <th class="organism_th_3">
                <div class="actions">
                    <img height="16px" src="static/img/icon_edit.png" alt="">
                    <img height="16px" src="static/img/icon_deleted.png" alt="">
                </div>
            </th>
        </tr>
        `;
        document.getElementById('table_videos').innerHTML += html_table;
        document.getElementById('insert_code').innerHTML += `${code},<br>`;

    }
}