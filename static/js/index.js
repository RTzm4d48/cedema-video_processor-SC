// Get the input element
const input = document.getElementById('id_total_items');

// Add an event listener for the 'input' event
input.addEventListener('input', function() {
    // Get the value of the input
    const inputValue = input.value;

    // Call your function here with the input value
    yourFunction(inputValue);
});

// Define your function
function yourFunction(value) {
    // Do something with the input value
    value_int = parseInt(value);
    document.getElementById('id_new_item').value = value_int+1;

    // Capture the name of the selected file
    const fileInput = document.getElementById('video_file');
    const selectedFileName = fileInput.files[0].name;
    console.log(selectedFileName);
}


