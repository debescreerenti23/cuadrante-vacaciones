const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let cuadrante = [];

async function cargarDatos() {
    try {
        // Añadimos un pequeño truco (?v=...) para evitar que el navegador guarde una versión vieja del JSON en caché
        const respuesta = await fetch('vacaciones.json?v=' + new Date().getTime());
        if (!respuesta.ok) throw new Error("No se pudo cargar el archivo de vacaciones");
        cuadrante = await respuesta.json();
        renderizarCuadrante();
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('cuadrante-container').innerHTML = "<p style='text-align:center;'>Error al cargar el cuadrante. Contacte con el jefe de equipo.</p>";
    }
}

function renderizarCuadrante() {
    const container = document.getElementById('cuadrante-container');
    container.innerHTML = "";

    cuadrante.forEach((mes) => {
        const mesCard = document.createElement('div');
        mesCard.className = 'mes-card';
        
        mesCard.innerHTML = `
            <h3>${mes.nombre}</h3>
            <div class="quincena-seccion">
                <div class="q-box">
                    <strong>1ª Quincena</strong>
                    <ul>${renderizarLista(mes.q1)}</ul>
                </div>
                <div class="q-box">
                    <strong>2ª Quincena</strong>
                    <ul>${renderizarLista(mes.q2)}</ul>
                </div>
            </div>
        `;
        container.appendChild(mesCard);
    });
    actualizarFooter();
}

function renderizarLista(lista) {
    let html = "";
    for (let i = 0; i < 2; i++) {
        if (lista && lista[i]) {
            html += `<li><span class="icon">👤</span> ${lista[i]}</li>`;
        } else {
            html += `<li class="hueco-libre">Disponible</li>`;
        }
    }
    return html;
}

function actualizarFooter() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function imprimirCuadrante() {
    // Cambiamos temporalmente el título de la página para que el PDF salga con nombre limpio
    const tituloOriginal = document.title;
    document.title = "Cuadrante_Vacaciones_Las_Terrazas_" + new Date().getFullYear();
    
    window.print();
    
    document.title = tituloOriginal;
}

const tema = document.getElementById('btn-tema');
const emoji = document.getElementById('emoji');

tema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')

    if(document.body.classList.contains('dark-mode')) {
        emoji.textContent = "☀️"
    } else {
        emoji.textContent = "🌙"
    }
});

window.onload = cargarDatos;

