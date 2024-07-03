import {obtain_date, getCookie} from './utils.js';


export function consult_guias() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/my_apis/slecet_guias/',
            type: 'GET',
            success: (data) => {
                resolve(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });
}


// #region # TODO: SELECT VIDEOS
export function init_program() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/my_apis/select_videos/',
            type: 'GET',
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });
}

// #region TODO: CREATE VIDEOS
export function create_video(code, acronym, video_name, file, VideoPosition, img_viwe_generated) {
    console.log("CREAMOSSSS");
    console.log(img_viwe_generated)
    // $(document).ready(function() {
    //     var csrftoken = getCookie('csrftoken');
    //     var formData = new FormData();
    //     formData.append('video_name', video_name);
    //     formData.append('code', code);
    //     formData.append('acronym', acronym);
    //     formData.append('old_name', file.files[0].name);
    //     formData.append('attach_file', file.files[0]);
    //     formData.append('images_num', img_viwe_generated);
    //     formData.append('fecha', obtain_date());
    //     formData.append('position', VideoPosition);
    //     if (img_viwe_generated > 0) {
    //         for (let i = 1; i <= img_viwe_generated; i++) {
    //             let image = document.getElementById(`generated_img_${i}`);
    //             formData.append(`generated_img_${i}`, image.src);
    //         }
    //     }
    //     $.ajax({
    //         url: '/api/my_apis/create_video/',
    //         type: 'POST',
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         beforeSend: function(xhr) {
    //             xhr.setRequestHeader("X-CSRFToken", csrftoken);
    //         },
    //         success: function(data) {
    //             console.log('VIDEO GUIA CREATE!', data);
    //             location.reload();
    //         },
    //         error: function(xhr, textStatus, errorThrown) {
    //             // Manejar errores si la solicitud falla
    //             console.error('Error al obtener datos de la API:', errorThrown);
    //         }
    //     });
    // });
}

// #region TODO: DELETED VIDEOS
export function deleted_video(item) {
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