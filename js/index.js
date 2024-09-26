const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const arrayDayWeek = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado"]
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");

const dialogPonto = document.getElementById("dialog-ponto");


navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
});


let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}

const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    let dialogSelect = document.getElementById("select-tipos-ponto");
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    dialogSelect.value = proxPonto[ultimoPonto];

    dialogData.textContent = "Data: " + dataCompleta();
    dialogHora.textContent = "Hora: " + horaCompleta();
    
    dialogPonto.showModal();
});


const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});


function recuperaPontosLocalStorage() {
    let todosOsPontos = localStorage.getItem("registro");

    if(!todosOsPontos) {
        return [];
    }

    return JSON.parse(todosOsPontos);
}



function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperaPontosLocalStorage();
    
    pontos.push(ponto);

    localStorage.setItem("registro", JSON.stringify(pontos));
}

const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "id": 1
    }


    salvarRegistroLocalStorage(ponto);
    
    localStorage.setItem("tipoUltimoPonto", tipoPonto);


    console.log(ponto);
    dialogPonto.close();
});

function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

atualizaHora();
setInterval(atualizaHora, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();