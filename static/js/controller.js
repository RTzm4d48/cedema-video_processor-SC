import {obtain_date, createCode, put_name_files} from './utils.js';
import {capture_second, create_elemet_capture} from './gestor_imagen_capture.js';

class MyController {
    constructor() {
        this.rows = 0;
        this.title = '';
        this.title_original = '';
        this.acronime = '';
        this.code = '';
        this.num_imgs = 0;
        this.fecha = obtain_date();
        this.position = 'pH'
        this.json_fileName = [];
        this.validVideo = false;
    }

    get config_json_fileName() {
        this.json_fileName = [];
        if (this.validVideo) {
            this.json_fileName.push({'url_icon': 'file_video', 'title': this.title, 'acronim': this.acronime, 'code': this.code, 'num_imgs': 'i'+this.num_imgs, 'fecha': this.fecha, 'position': this.position, 'extension': '.mp4'});
        }
        for (let i = 0; i < this.rows; i++) {
            this.json_fileName.push({'url_icon': 'file_image', 'title': this.title, 'acronim': this.acronime, 'code': this.code, 'num_imgs': i+1, 'fecha': this.fecha, 'position': this.position, 'extension': '.png'});
        }
        return this.json_fileName;
    }

    // ANCHOR : SETTERS Y GETTERS PARA LAS PROPIEDADES DE LOS FILES
    set param_rows(row) {
        this.rows = row;
    }
    get param_rows() {
        return this.rows;
    }
    set param_title(title) {
        this.title = title;
    }
    get param_title() {
        return this.title;
    }
    set param_title_original(title) {
        this.title_original = title;
    }
    get param_title_original() {
        return this.title_original;
    }
    set param_acronime(acronime) {
        this.acronime = acronime;
    }
    get param_acronime() {
        return this.acronime;
    }
    set param_code(code) {
        this.code = code;
    }
    get param_code() {
        return this.code;
    }
    set param_num_imgs(num_imgs) {
        this.num_imgs = num_imgs;
    }
    get param_num_imgs() {
        return this.num_imgs;
    }
    set param_position(position) {
        this.position = position;
    }
    get param_position() {
        return this.position;
    }
    set param_validVideo(value) {
        this.validVideo = value;
    }
    get param_validVideo() {
        return this.validVideo;
    }
}

const controller = new MyController();

// NOTE : FILE_NAME PREVIEW : ROWS
export function controller_rows() {
    let new_value = controller.param_rows + 1;
    controller.param_rows = new_value;
}

// NOTE : FILE_NAME PREVIEW : TITLE
export function controller_title(value) {
    controller.param_title = put_name_files(value);
    controller_title_original(value);
    paint_name_reference();
}
function controller_title_original(value) {
    controller.param_title_original = value;
}

// NOTE : FILE_NAME PREVIEW : ACRONIME
export function controller_acronime(value) {
    controller.param_acronime = value;
    paint_name_reference();
}

// NOTE : FILE_NAME PREVIEW : CODE
export function controller_code() {
    asigned_code();
}
export function asigned_code() {
    const the_code = createCode();
    document.getElementById('id_code').value = the_code;
    controller.param_code = the_code;
}

// NOTE : FILE_NAME PREVIEW : NUM_IMGS
function controller_num_imgs() {
    let new_value = controller.param_num_imgs + 1;
    controller.param_num_imgs = new_value;
}

// NOTE : CUANDO DA AL BORTON DE ELIMINAR IMAGENES RESETEAMOS LAS IMAGENES Y LOS ROWS
export function controller_reset_imgs() {
    controller.param_num_imgs = 0;
}
export function controller_reset_rows() {
    controller.param_rows = 0;
}
export function reset_images() {
    controller_reset_imgs();
    controller_reset_rows();
    paint_name_reference();
}

// NOTE : FILE_NAME PREVIEW : POSITION
export function controller_position(value) {
    controller.param_position = value;
    paint_name_reference();
}

export function subir_imagen() {
    controller_rows();
    controller_num_imgs();
    paint_name_reference();
    return controller.param_num_imgs;
}

export function obtain_params_data(){
    return [{'title': controller.param_title, 'title_original': controller.param_title_original, 'acronime': controller.param_acronime, 'code':controller.param_code, 'num_img':controller.param_num_imgs, 'fecha': controller.fecha, 'position': controller.param_position}];
}

export function subir_video() {
    controller.param_validVideo = true;
    paint_name_reference();
}

function paint_name_reference() {
    document.getElementById('names_references').innerHTML = '';
    for (let i = 0; i < controller.config_json_fileName.length; i++) {
        let data = controller.config_json_fileName[i];
        let element = `
        <div class="file">
            <img src="static/img/${data['url_icon']}.png" alt="">
            <p class="">${data['title']}</p>
            <p>-</p>
            <p class="id_view_acronime color2">${data['acronim']}</p>
            <p>-</p>
            <p class=" color3">${data['code']}</p>
            <p>-</p>
            <p class="color1">${data['num_imgs']}</p>
            <p>-</p>
            <p class="id_view_acronime color2">${data['fecha']}</p>
            <p>-</p>
            <p class="color1">${data['position']}</p>
            <p class="">${data['extension']}</p>
        </div>
        `;
        document.getElementById('names_references').innerHTML += element;
    }
}

// NOTE : ALGUNAS FUNCIONES DEL DEL PROGRAMA

export function capture_video_screen() {
    var fileInput = document.getElementById('video_file');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
    var numSecond = capture_second('video_reproductor');
    create_elemet_capture(url, numSecond)
}