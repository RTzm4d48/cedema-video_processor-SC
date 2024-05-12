// Initialize the input
document.getElementById('id_total_items').addEventListener('input', function() {
    const inputValue = input.value;
    capture_num_item(inputValue);
});

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

        
    }
  }