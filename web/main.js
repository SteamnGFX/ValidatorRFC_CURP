let estadosMap = {
    "AS": "Aguascalientes",
    "BC": "Baja California",
    "BS": "Baja California Sur",
    "CC": "Campeche",
    "CL": "Coahuila",
    "CM": "Colima",
    "CS": "Chiapas",
    "CH": "Chihuahua",
    "DF": "Ciudad de México",
    "DG": "Durango",
    "GT": "Guanajuato",
    "GR": "Guerrero",
    "HG": "Hidalgo",
    "JC": "Jalisco",
    "MC": "Estado de México",
    "MN": "Michoacán",
    "MS": "Morelos",
    "NT": "Nayarit",
    "NL": "Nuevo León",
    "OC": "Oaxaca",
    "PL": "Puebla",
    "QT": "Querétaro",
    "QR": "Quintana Roo",
    "SP": "San Luis Potosí",
    "SL": "Sinaloa",
    "SR": "Sonora",
    "TC": "Tabasco",
    "TS": "Tamaulipas",
    "TL": "Tlaxcala",
    "VZ": "Veracruz",
    "YN": "Yucatán",
    "ZS": "Zacatecas",
    "NE": "Nacido en el extranjero"
};

// Función para validar la CURP
function validarCURP() {
    //Extraemos el texto ingresado y eliminamos cualquier espacio en blanco extra
    let curp = document.getElementById('txtCURP').value.trim();

    // Validar la longitud
    if (curp.length > 18) {
        mensaje('La CURP debe tener 18 caracteres, actualmente: ' + curp.length);
        return;
    } else if (curp.length < 18) {
        mensaje('La CURP debe tener 18 caracteres, actualmente: ' + curp.length);
        return;

    }

    // Validar que los cuatro primeros caracteres sean letras
    let primerosCuatroCaracteres = curp.substr(0, 4);
    if (!/^[A-Za-z]+$/.test(primerosCuatroCaracteres)) {
        mensaje('Los primeros cuatro caracteres de la CURP deben ser letras.');
        return;
    }

// Validar que la fecha no tenga letras
let fechaCaracteres = curp.substr(4, 6);
if (!/^[0-9]+$/.test(fechaCaracteres)) {
    mensaje('La fecha de la CURP deben ser numeros.');
    return;
}

    // Validar el identificador del sexo
    let sexo = curp.charAt(10);
    let sexoTexto = "";

    if (sexo == 'H') {
        sexoTexto = "Hombre";
    } else if (sexo == 'M') {
        sexoTexto = "Mujer";
    } else {
        mensaje('El identificador de sexo en la CURP no es válido.');
        return;
    }

    // Validar el identificador del estado
    let estado = curp.substr(11, 2);
    let estadoNombre = estadosMap[estado];

    if (!estadoNombre) {
        mensaje('El identificador de estado en la CURP no es válido.');
        return;
    }

    // Verificar que los dígitos de la fecha sean válidos (caracteres 5 al 10)
    let fechaNacimientoStr = curp.substr(4, 6);
    let anio = parseInt(fechaNacimientoStr.substr(0, 2), 10); // Los primeros dos dígitos son el año
    let mes = parseInt(fechaNacimientoStr.substr(2, 2), 10); // Los siguientes dos dígitos son el mes
    let dia = parseInt(fechaNacimientoStr.substr(4, 2), 10); // Los últimos dos dígitos son el día

    if (isNaN(anio) || isNaN(mes) || isNaN(dia) || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        mensaje('La fecha de nacimiento en la CURP no es válida.');
        return;
    }

    // Obtener el año actual
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();

    // Calcular la edad
    let edad = anioActual - (2000 + anio); // Suponiendo que el año de nacimiento esté en formato de dos dígitos

    mensaje('CURP Válida <br>Sexo: ' + sexoTexto + '<br>Estado: ' + estadoNombre + '<br>Edad: ' + edad + ' años');
}

// Función para validar el RFC
function validarRFC() {
    let rfc = document.getElementById('txtRFC').value.trim();
    let rfcCortado = rfc.substr(0, 10);
    let curp = document.getElementById('txtCURP').value.trim().substr(0, 10);
    console.log(curp);

    // Validar la longitud
    if (rfc.length > 13) {
        mensaje('El RFC debe tener 13 caracteres, actualmente: ' + rfc.length);
        return;
    } else if (rfc.length < 9) {
        mensaje('El RFC debe tener 13 caracteres, actualmente: ' + rfc.length);
        return;
    }

    if (curp === rfcCortado){
        mensaje('RFC válido.');

    } else {
        mensaje('El RFC No coincide')
    }

}

function mensaje(mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
}

// Agregar eventos a los botones
let validarCURPButton = document.getElementById('validarCURPButton');
let validarRFCButton = document.getElementById('validarRFCButton');

validarCURPButton.addEventListener('click', validarCURP);
validarRFCButton.addEventListener('click', validarRFC);