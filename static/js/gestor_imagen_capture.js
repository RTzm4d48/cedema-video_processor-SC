// ANCHOR : CAPTURE SECOND
export function capture_second(id) {
    var video = document.getElementById(id);
    // var rondedNum = Math.round(video.currentTime);
    // var rondedNum = video.currentTime;
    return video.currentTime;
}

// ANCHOR : CREATE ENLACE OF DOWNLOAD
// function DownloadImageCaptured(base64Image) {
//     console.log('DESDE DOWNLOAD:', base64Image);

//     var link = document.createElement('a');
//     link.href = base64Image;
//     link.download = 'static/temp/frame.jpg'; // establece el nombre del archivo de la imagen
//     link.click(); // inicia la descarga

//     // Muestra la imagen en una etiqueta <img>
//     // var img = document.getElementById('img_capture');
//     // img.src = base64Image;
// }

// ANCHOR : CREATE ELEMENT CAPTURE
export function create_elemet_capture(url, second){
    // Crea un elemento de video y carga el video
    var video = document.createElement('video');
    video.src = url;
    video.id = 'screen_video';
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
}

// NOTE : CREAMOS LOS ELEMENTOS DE LAS IMAGENES
export function create_image_view(url, num_img){
    var img = document.createElement('img');
    img.src = url;
    img.id = 'generated_img_' + num_img;
    document.getElementById('id_only_imgs').appendChild(img);
}

// ANCHOR : CREATE ELEMENT VIDEO
export function create_element_video(url){
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

// function capture() {
//     alert("Capturando video...")
//     console.log("Capturando video...");
//     var fileInput = document.getElementById('video_file');
//     var file = fileInput.files[0];
//     var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo


//     var numSecond = capture_second('video_reproductor');
//     console.log(numSecond);

//     create_elemet_capture(url, numSecond);
// }

export function captured_image_capturate(screen_video) {
    // NOTE : Crea un nuevo elemento de canvas y obtén su contexto
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Asegúrate de que el canvas tenga el mismo tamaño que el screen_video
    canvas.width = screen_video.videoWidth;
    canvas.height = screen_video.videoHeight;

    // Dibuja el frame actual del screen_video en el canvas
    context.drawImage(screen_video, 0, 0, canvas.width, canvas.height);

    // Obtiene la imagen en formato base64
    var base64Image = canvas.toDataURL('image/jpeg');
    return base64Image;
}