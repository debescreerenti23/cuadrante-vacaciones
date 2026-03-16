const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Estado inicial: 12 meses, cada uno con 2 quincenas, cada quincena con un array vacío de empleados
let cuadrante = JSON.parse(localStorage.getItem('vacaciones_seguridad')) || 
    meses.map(mes => ({
        nombre: mes,
        q1: [], // Máximo 2 nombres
        q2: []  // Máximo 2 nombres
    }));

function renderizarCuadrante() {
    const container = document.getElementById('cuadrante-container');
    container.innerHTML = "";

    cuadrante.forEach((mes, index) => {
        const mesCard = document.createElement('div');
        mesCard.className = 'mes-card'; // Estilo neomórfico
        
        mesCard.innerHTML = `
            <h3>${mes.nombre}</h3>
            <div class="quincena-seccion">
                <div class="q-box">
                    <strong>1ª Quincena</strong>
                    <ul>${renderizarEmpleados(mes.q1, index, 'q1')}</ul>
                </div>
                <div class="q-box">
                    <strong>2ª Quincena</strong>
                    <ul>${renderizarEmpleados(mes.q2, index, 'q2')}</ul>
                </div>
            </div>
        `;
        container.appendChild(mesCard);
    });
    actualizarFooter();
}

function renderizarEmpleados(lista, mesIndex, quincena) {
    let html = "";
    // Mostramos los nombres o "Hueco libre"
    for (let i = 0; i < 2; i++) {
        if (lista[i]) {
            html += `<li>${lista[i]} <button onclick="eliminarVigilante(${mesIndex}, '${quincena}', ${i})">×</button></li>`;
        } else {
            html += `<li class="hueco-libre">Disponible</li>`;
        }
    }
    return html;
}

function asignarVacaciones() {
    const nombre = document.getElementById('nombre-empleado').value.trim();
    const mesIndex = document.getElementById('select-mes').value;
    const quincena = document.getElementById('select-quincena').value;

    if (!nombre) return alert("Escribe un nombre");

    if (cuadrante[mesIndex][quincena].length < 2) {
        cuadrante[mesIndex][quincena].push(nombre);
        guardarYRenderizar();
        document.getElementById('nombre-empleado').value = "";
    } else {
        alert("⚠️ Error: Ya hay 2 personas en esta quincena. Máximo alcanzado.");
    }
}

function eliminarVigilante(mesIndex, quincena, vigilanteIndex) {
    cuadrante[mesIndex][quincena].splice(vigilanteIndex, 1);
    guardarYRenderizar();
}

function guardarYRenderizar() {
    localStorage.setItem('vacaciones_seguridad', JSON.stringify(cuadrante));
    renderizarCuadrante();
}

function actualizarFooter() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

window.onload = renderizarCuadrante;