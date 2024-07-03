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

// NOTE : GET COOKIE
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
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let resultado = '';
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }
    return resultado;
}

// NOTE : AGEGA VALIDACIONES AL TITULO Y RETORNA EL TITULO
export function put_name_files(value) {
    const text__ = value.replace(/ /g, "_");
    let titulo = text__ != '' ? text__ : 'unnamed';
    return titulo;
}