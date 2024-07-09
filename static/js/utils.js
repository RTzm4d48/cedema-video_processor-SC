export function obtain_date() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();

    return `${dia}_${string_month(mes)}_${anio}`;
}
function string_month(mes) {
    const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return month[mes];
}

// NOTE : OBTENERMOS EL csrftoken DE LAS KOOKIES
export function getCookie(name) {
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

export function createCode() {
    return caracter_random() + caracter_random() + date(0) + caracter_random() + date(1) + caracter_random() + date(2) + caracter_random();
}

function caracter_random() {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultado = '';
    for (let i = 0; i < 1; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }
    return resultado;
}

function date(d) {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth()+1;
    const anio = fechaActual.getFullYear();
    let cadena = anio.toString();
    let ultimosDos = cadena.substring(2, 4);

    const date = [dia, mes, ultimosDos];
    return date[d];
}

// NOTE : AGEGA VALIDACIONES AL TITULO Y RETORNA EL TITULO
export function put_name_files(value) {
    const text__ = value.replace(/ /g, "_");
    let titulo = text__ != '' ? text__ : 'unnamed';
    return titulo;
}