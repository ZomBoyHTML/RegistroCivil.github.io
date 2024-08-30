document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dni = document.getElementById('dni').value;
    const dob = document.getElementById('dob').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const address = document.getElementById('address').value;

    const userData = `Nombre: ${name}\nDNI: ${dni}\nFecha de Nacimiento: ${dob}\nSexo: ${sex}\nDirección: ${address}\n\n`;


    let userRecords = JSON.parse(localStorage.getItem('userRecords')) || [];
    userRecords.push(userData);
    localStorage.setItem('userRecords', JSON.stringify(userRecords));

    // Limpiar el formulario
    document.getElementById('registrationForm').reset();

    alert('¡Registro exitoso!');
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    let userRecords = JSON.parse(localStorage.getItem('userRecords')) || [];

    if (userRecords.length === 0) {
        alert('No hay datos para descargar.');
        return;
    }

    const blob = new Blob([userRecords.join('\n')], { type: 'text/plain;charset=utf-8' }); // Unir los datos correctamente
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'registro.txt';
    link.click();
    
});

document.getElementById('resetBtn').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres borrar todos los registros? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('userRecords');
        alert('¡Lista reseteada con éxito!');
    }
});
