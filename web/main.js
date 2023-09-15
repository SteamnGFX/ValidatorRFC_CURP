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

let errores = [];

let inputCURP = document.getElementById('txtCURP');
let inputRFC = document.getElementById('txtRFC');

let closenBtn = document.getElementById("close");

let infoC = document.getElementById("infoCURP");
let infoR = document.getElementById("infoRFC"); 
let errC = document.getElementById("errCURP");
let errR = document.getElementById("errRFC"); 
let msgIgual = document.getElementById("msgIgual");

let curpComp = "";
let rfcComp = "";

inputCURP.addEventListener('input', e =>{

    let curpValue = e.target.value;
    let msg = document.getElementById("msgCURP");

    let btnError = document.getElementById("btnErrorCURP");
    let btnInfo = document.getElementById("btnInfoCURP");

    btnInfo.style.display = "none";
    btnError.style.display = "none";
    msg.style.display = "none";
    inputCURP.style.border = "none";
    msgIgual.style.display = "none";

    // Elimina caracteres especiales utilizando una expresión regular
    curpValue = curpValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    if (curpValue.length < 18) {
        e.target.style.color = "red";
    } else {
        e.target.style.color = "green";
    }

    // Actualiza el valor del campo con los caracteres válidos
    e.target.value = curpValue;

});

inputRFC.addEventListener('input', e =>{

    let rfcValue = e.target.value;
    let msg = document.getElementById("msgRFC");
    let btnError = document.getElementById("btnErrorRFC");
    let btnInfo = document.getElementById("btnInfoRFC");

    btnInfo.style.display = "none";
    btnError.style.display = "none"
    msg.style.display = "none";
    inputRFC.style.border = "none";
    msgIgual.style.display = "none";

    // Elimina caracteres especiales utilizando una expresión regular
    rfcValue = rfcValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    if (rfcValue.length < 12) {
        e.target.style.color = "red";
    } else {
        e.target.style.color = "green";
    }

    // Actualiza el valor del campo con los caracteres válidos
    e.target.value = rfcValue;
});

closenBtn.addEventListener('click', ()=>{

    let box = document.getElementById("contInfo");

    box.style.display = "none";
});

contInfo.addEventListener('click', (e)=>{
    contInfo.style.display = "none";
});

function validarCtrCatr(caracteres){
    // Validar que los cuatro primeros caracteres sean letras
    if (!/^[A-Za-z]+$/.test(caracteres)) {
        errores.push({'msg':"Los primeros cuatro caracteres deben ser letras."});
        return false;
    }

    return true;
}

function validarFecha(fecha){

    if (!/^[0-9]+$/.test(fecha)) {
        errores.push({'msg':"La fecha de la CURP deben ser numeros."});
    }

    var anio = parseInt(fecha.slice(0, 2));
    var mes = parseInt(fecha.slice(2, 4));
    var dia = parseInt(fecha.slice(4, 6));

    // Verifica que el año esté dentro de un rango válido
    if (anio >= 0 && anio <= 99) {
        // Verifica que el mes esté dentro del rango válido (1-12)
        if (mes >= 1 && mes <= 12) {
            // Verifica que el día esté dentro del rango válido para el mes dado
            if (dia >= 1 && dia <= diasEnMes(anio, mes)) {
                return true;
            }
        }
    }

    return false;
}

function diasEnMes(anio, mes) {
    return new Date(anio, mes, 0).getDate();
}

function validarSexo(sexo){
    let sexoTexto = "";

    if (sexo == 'H') {
        sexoTexto = "Hombre";
    } else if (sexo == 'M') {
        sexoTexto = "Mujer";
    } else if (sexo == 'X') {
        sexoTexto = "Otro";
    } else {
        errores.push({'msg':"El identificador de sexo en la CURP no es válido."});
        return false;
    }

    return sexoTexto;
}

function validarEstado(estado){
    let estadoNombre = estadosMap[estado];

    if (!estadoNombre) {
        errores.push({'msg':"El identificador de estado en la CURP no es válido."});
        return false;
    }

    return estadoNombre;
}

function calularEdad(fecha){

    let fechaAct = new Date();

    let anioNac = parseInt(fecha.substr(0,2));
    let mesNac = parseInt(fecha.substr(2,2));
    let diaNac = parseInt(fecha.substr(4,2));

    let anioAct = fechaAct.getFullYear();
    let mesAct = fechaAct.getMonth() + 1;
    let diaAct = fechaAct.getDate();

    // Determina si el año de nacimiento corresponde a 1900 o 2000
    if (anioNac >= 0 && anioNac <= (anioAct % 100)) {
        anioNac += 2000;
    } else {
        anioNac += 1900;
    }

    // Calcula la edad
    var edad = anioAct - anioNac;

    // Verifica si ya ha pasado el cumpleaños este año
    if (mesAct < mesNac || (mesAct === mesNac && diaAct < diaNac)) {
        edad--; // Todavía no ha cumplido años este año
    }

    return edad;
}

function compararInputs(curp, rfc){
    if (curp != "" && rfc != "") {

        msgIgual.innerHTML = "";

        let sp = document.createElement("span");

        if (curp.substr(0,10) == rfc.substr(0,10)) {     
            sp.textContent = "LA CURP Y RFC COINCIDEN";
            msgIgual.classList.remove("msgErr");
            msgIgual.classList.add("msgSucc");
        } else {
            sp.textContent = "LA CURP Y RFC NO COINCIDEN";
            msgIgual.classList.remove("msgSucc");
            msgIgual.classList.add("msgErr");
        }

        msgIgual.appendChild(sp);
        msgIgual.style.display = "flex";
    }
}

function mostrarInfo (id, sexo, estado, edad){

    let sp = document.createElement('span');
    
    let msg = document.getElementById("msg"+id);

    if (id == "CURP") {
        msg.innerHTML = "";
        sp.textContent = "CURP Válida";
        msg.appendChild(sp);
        inputCURP.style.color = "green";
        inputCURP.style.border = "2px solid green";

        let infoCURP = `<p> Sexo: ${sexo} </p> <p> Estado: ${estado} </p> <p> Edad: ${edad} años </p>`;
        
        infoC.innerHTML = infoCURP;

    } else {
        msg.innerHTML = "";
        sp.textContent = "RFC Valido";
        msg.appendChild(sp);
        inputRFC.style.color = "green";
        inputRFC.style.border = "2px solid green";

        let infoRFC = `<p> Edad: ${edad} años </p>`;

        infoR.innerHTML = infoRFC;
    }

    errC.style.display = "none";
    errR.style.display = "none";

    msg.classList.remove('msgErr');
    msg.classList.add('msgSucc');
    msg.style.display = "flex";

    let btnInfo = document.getElementById("btnInfo" + id);
    
    btnInfo.style.display = "flex";

    btnInfo.addEventListener('click', e =>{


        if (e.target.id == "btnInfoCURP") {
            infoR.style.display = "none";
            infoC.style.display = "flex";   
            errC.style.display = "none";
            errR.style.display = "none";     
        } else {
            infoC.style.display = "none";
            infoR.style.display = "flex";
            errC.style.display = "none";
            errR.style.display = "none"; 
        }

        contInfo.style.display = "flex";

    });
}

function mostrarErrores(id){
    curpComp = "";
    rfcComp = "";

    let sp = document.createElement('span');
    
    let msg = document.getElementById("msg"+id);

    if (id == "CURP") {
        msg.innerHTML = "";
        sp.textContent = "CURP Invalida";
        msg.appendChild(sp);

        inputCURP.style.color = "red";
        inputCURP.style.border = "2px solid red";

        let infoCURP = "";

        errores.forEach(er => {
            infoCURP += "<p>" + er.msg + "</p>";
        });
        
        errC.innerHTML = infoCURP;
        errR.style.display = "none";
        errC.style.display = "flex"; 
        contInfo.style.display = "flex";

    } else {

        msg.innerHTML = "";
        sp.textContent = "RFC Invalido";
        msg.appendChild(sp);

        inputRFC.style.color = "red";
        inputRFC.style.border = "2px solid red";

        let infoRFC = "";

        errores.forEach(er => {
            infoRFC += "<p>" + er.msg + "</p>";
        });

        errR.innerHTML = infoRFC;
        errC.style.display = "none";
        errR.style.display = "flex"; 
        contInfo.style.display = "flex";
    }

    infoC.style.display = "none";
    infoR.style.display = "none";

    msg.classList.remove('msgSucc');
    msg.classList.add('msgErr');
    msg.style.display = "flex";

    let btnErr = document.getElementById("btnError" + id);
    
    btnErr.style.display = "flex";

    btnErr.addEventListener('click', e =>{

        if (e.target.id == "btnErrorCURP") {
            errR.style.display = "none";
            errC.style.display = "flex";   
            infoR.style.display = "none";
            infoC.style.display = "none"; 
                   
        } else {
            errC.style.display = "none";
            errR.style.display = "flex";
            infoR.style.display = "none";
            infoC.style.display = "none";  
        }

        contInfo.style.display = "flex";

    });

    
}

// Función para validar la CURP
function validarCURP() {

    errores = [];
    let edad = 0;

    let curp = document.getElementById('txtCURP').value.trim();

    // Validar la longitud
    if (curp.length < 18) {

        errores.push({'msg':`La CURP debe tener maximo 18 caracteres, actualmente: ${curp.length}`});

        mostrarErrores("CURP");

    } else {

        let ObCURP = {
            'CtrCart' : curp.substr(0, 4),
            'fecha' : curp.substr(4, 6),
            'sexo' : curp.charAt(10),
            'estado' : curp.substr(11, 2)
        };

        let res = validarCtrCatr(ObCURP.CtrCart);

        // Validar que la fecha no tenga letras
        let fecha = validarFecha(ObCURP.fecha);

        if (fecha){
            // Verificar que los dígitos de la fecha sean válidos (caracteres 5 al 10)
            edad = calularEdad(ObCURP.fecha);
        } else {
            errores.push({'msg':"La fecha de nacimiento en la CURP no es válida."});
        }

        // Validar el identificador del sexo
        let sexo = validarSexo(ObCURP.sexo);

        // Validar el identificador del estado
        let estadoNombre = validarEstado(ObCURP.estado);

        if (!res || !fecha || !sexo || !estadoNombre) {
            mostrarErrores("CURP");
        } else {
            mostrarInfo("CURP", sexo, estadoNombre, edad);
            curpComp = curp;
            compararInputs(curpComp, rfcComp);
        }
    }
}

// Función para validar el RFC
function validarRFC() {
    //Extraemos el texto ingresado y eliminamos cualquier espacio en blanco extra
    errores = [];
    let edad = 0;

    let rfc = document.getElementById('txtRFC').value.trim();

    if (rfc.length < 13) {

        errores.push({'msg':`El RFC debe tener 13 caracteres, actualmente: ${rfc.length}`});

        mostrarErrores("RFC");

        console.log("eror")
    } else {

        let ObRCF = {
            'CtrCart' : rfc.substr(0, 4),
            'fecha' : rfc.substr(4, 6),
        };

        let res = validarCtrCatr(ObRCF.CtrCart);

        // Validar que la fecha no tenga letras
        let fecha = validarFecha(ObRCF.fecha);

        if (fecha){
            // Verificar que los dígitos de la fecha sean válidos (caracteres 5 al 10)
            edad = calularEdad(ObRCF.fecha);
        } else {
            errores.push({'msg':"La fecha de nacimiento en el RFC no es válida."});
        }

        if (!res || !fecha) {
            mostrarErrores("RFC");
        } else {
            mostrarInfo("RFC", false, false, edad);
            rfcComp = rfc;
            compararInputs(curpComp, rfcComp);
        }
    }

}

// Agregar eventos a los botones
let btnCURP = document.getElementById('validarCURPButton');
let btnRFC = document.getElementById('validarRFCButton');

btnCURP.addEventListener('click', validarCURP);
btnRFC.addEventListener('click', validarRFC);