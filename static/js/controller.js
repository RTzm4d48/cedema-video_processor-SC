import {createCode, put_name_files} from './utils.js';

class MyController {
    constructor() {
        this.rows = 0;
        this.title = '----';
        this.acronime = '----';
        this.code = '----';
        this.num_imgs = 0;
        this.extension = '----';
        this.json_fileName = [];
        this.validVideo = false;
    }

    get config_json_fileName() {
        this.json_fileName = [];
        if (this.validVideo) {
            this.json_fileName.push({'url_icon': 'file_video', 'title': this.title, 'acronim': this.acronime, 'code': this.code, 'num_imgs': 'i'+this.num_imgs, 'extension': '.mp4'});
        }
        for (let i = 0; i < this.rows; i++) {
            this.json_fileName.push({'url_icon': 'file_image', 'title': this.title, 'acronim': this.acronime, 'code': this.code, 'num_imgs': i+1, 'extension': '.png'});
        }
        return this.json_fileName;
    }

    set param_rows(row) {
        this.rows = this.rows + row;
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
        this.num_imgs = this.num_imgs + num_imgs;
    }
    get param_num_imgs() {
        return this.num_imgs;
    }
    set param_extension(extension) {
        this.extension = extension;
    }
    get param_extension() {
        return this.extension;
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
    controller.param_rows = 1;
}

// NOTE : FILE_NAME PREVIEW : TITTLE
export function controller_title(value) {
    controller.param_title = put_name_files(value);
    paint_name_reference();
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
    controller.param_num_imgs = 1;
}

// NOTE : FILE_NAME PREVIEW : EXTENSION
export function controller_extension(value) {
    controller.param_extension = value;
    paint_name_reference();
}

export function subir_imagen() {
    controller_rows();
    controller_num_imgs();
    paint_name_reference();
    return controller.param_num_imgs;
}
export function obtain_num_imgs() {
    return controller.param_num_imgs;
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
            <p class="id_view_code color3">${data['code']}</p>
            <p>-</p>
            <p id="num_imgs_in_video" class="color1">${data['num_imgs']}</p>
            <p class="">${data['extension']}</p>
        </div>
        `;
        document.getElementById('names_references').innerHTML += element;
    }
}