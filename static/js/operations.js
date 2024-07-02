export function createCode() {

    const caracteres = '0123456789abcdfghijkmnñopqrstuvwyz';
    const caracteres2 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let resultado = '';
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres2.length);
        resultado += caracteres2.charAt(indiceAleatorio);
    }
    return resultado;
}

export function put_name_files(value) {
    const text__ = value.replace(/ /g, "_");
    SetPartsNames(text__)
}

export function SetPartsNames(text__) {
    setTimeout(function() { // importante
        let elements = document.getElementsByClassName("id_view_tittle");
        let titulo = text__ != '' ? text__ : 'unnamed';
        for(let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = titulo;
        }
    }, 1000);
}

// ANCHOR : BUCLE OF RENAME FILES
// setInterval(function() {
//     var title = document.getElementById('id_title').value.trim();
//     put_name_files(title);
// }, 5000);

// function put_name_files(name) {
//     console.log(name);
//     let elements = document.getElementsByClassName("id_view_tittle");
//     for(let i = 0; i < elements.length; i++) {
//         elements[i].innerHTML = name;
//     }
// }


function create_file_names() {
    let video_name = document.getElementById('id_name_video');
    let html = `
    <img src="/static/img/file_video.png" alt="">
    <p>Patroclo__aala_niña_que_no_sabia_poner_un_billete-</p>
    <p class="color2">ES</p>
    <p>-</p>
    <p class="color3">dsd94u</p>
    <p class="">.mp4</p>
    `;
    video_name.innerHTML = html;
}

// export function asigned_code() {
//     const the_code = createCode();
//     document.getElementById('id_code').value = the_code;
//     let elements = document.getElementsByClassName("id_view_code");
//     for(let i = 0; i < elements.length; i++) {
//         elements[i].innerHTML = the_code;
//     }
// }

// export function insertAcronime(acronime) {
//     if(acronime == 'other') {
//         activate_edit_acronime();
//         acronime = 'N';
//     }else{
//         disable_edit_acronime();
//         acronime = acronime;
//     }
//     put_view_acronime(acronime);
// }
