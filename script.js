document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de Datos de la Malla Curricular ---
    // Cada ramo tiene un ID único, su nombre, el semestre al que pertenece, y una lista de requisitos (IDs de otros ramos).
    const mallaData = [
        // Semestre 1
        { id: 'derecho-empresarial', nombre: 'Derecho Empresarial', semestre: 1, requisitos: [] },
        { id: 'contabilidad-i', nombre: 'Contabilidad I', semestre: 1, requisitos: [] },
        { id: 'algebra-i', nombre: 'Álgebra I', semestre: 1, requisitos: [] },
        { id: 'habilidades-sociales', nombre: 'Habilidades Sociales', semestre: 1, requisitos: [] },
        { id: 'formacion-integral-1', nombre: 'Formación Integral Oferta Institucional', semestre: 1, requisitos: [] },
        { id: 'administracion-general', nombre: 'Administración General', semestre: 1, requisitos: [] },
        // Semestre 2
        { id: 'administracion-estrategica', nombre: 'Administración Estratégica', semestre: 2, requisitos: ['administracion-general'] },
        { id: 'algebra-ii', nombre: 'Álgebra II', semestre: 2, requisitos: ['algebra-i'] },
        { id: 'calculo-i', nombre: 'Cálculo I', semestre: 2, requisitos: [] },
        { id: 'introduccion-economia', nombre: 'Introducción a la Economía', semestre: 2, requisitos: [] },
        { id: 'contabilidad-ii', nombre: 'Contabilidad II', semestre: 2, requisitos: ['contabilidad-i'] },
        { id: 'ingles-i', nombre: 'Inglés I', semestre: 2, requisitos: [] },
        { id: 'formacion-integral-2', nombre: 'Formación Integral Actividad Extra Programática', semestre: 2, requisitos: [] },
        // Semestre 3
        { id: 'calculo-ii', nombre: 'Cálculo II', semestre: 3, requisitos: [] },
        { id: 'marketing-i', nombre: 'Marketing I', semestre: 3, requisitos: ['administracion-estrategica'] },
        { id: 'microeconomia-i', nombre: 'Microeconomía I', semestre: 3, requisitos: ['introduccion-economia'] },
        { id: 'costos', nombre: 'Costos', semestre: 3, requisitos: ['contabilidad-i'] },
        { id: 'ingles-ii', nombre: 'Inglés II', semestre: 3, requisitos: ['ingles-i'] },
        { id: 'formacion-integral-3', nombre: 'Formación Integral Oferta Institucional', semestre: 3, requisitos: [] },
        // Semestre 4
        { id: 'marketing-ii', nombre: 'Marketing II', semestre: 4, requisitos: ['marketing-i'] },
        { id: 'ingles-iii', nombre: 'Inglés III', semestre: 4, requisitos: ['ingles-ii'] },
        { id: 'ingles-negocios-i', nombre: 'Inglés Para Negocios I', semestre: 4, requisitos: ['ingles-ii'] },
        { id: 'estadistica-i', nombre: 'Estadística I', semestre: 4, requisitos: ['algebra-ii'] },
        { id: 'macroeconomia-i', nombre: 'Macroeconomía I', semestre: 4, requisitos: ['calculo-i'] },
        { id: 'microeconomia-ii', nombre: 'Microeconomía II', semestre: 4, requisitos: ['calculo-ii', 'microeconomia-i'] },
        // Semestre 5
        { id: 'gestion-rrhh-i', nombre: 'Gestión de Recursos Humanos I', semestre: 5, requisitos: ['administracion-estrategica'] },
        { id: 'sistemas-informacion', nombre: 'Sistemas de Información', semestre: 5, requisitos: ['administracion-estrategica'] },
        { id: 'estadistica-ii', nombre: 'Estadística II', semestre: 5, requisitos: ['estadistica-i'] },
        { id: 'macroeconomia-ii', nombre: 'Macroeconomía II', semestre: 5, requisitos: ['macroeconomia-i'] },
        { id: 'gestion-financiera-cp', nombre: 'Gestión Financiera de Corto Plazo', semestre: 5, requisitos: ['microeconomia-i', 'contabilidad-ii'] },
        { id: 'ingles-negocios-ii', nombre: 'Inglés Para Negocios II', semestre: 5, requisitos: ['ingles-negocios-i', 'ingles-ii'] },
        { id: 'formacion-integral-4', nombre: 'Formación Integral Actividad Extra Programática', semestre: 5, requisitos: [] },
        // Semestre 6
        { id: 'comportamiento-organizacional', nombre: 'Comportamiento Organizacional', semestre: 6, requisitos: [] },
        { id: 'econometria', nombre: 'Econometría', semestre: 6, requisitos: ['estadistica-ii'] },
        { id: 'economia-internacional', nombre: 'Economía Internacional', semestre: 6, requisitos: ['macroeconomia-ii'] },
        { id: 'mercados-capitales', nombre: 'Mercados de Capitales', semestre: 6, requisitos: ['gestion-financiera-cp'] },
        { id: 'ingles-negocios-iii', nombre: 'Inglés Para Negocios III', semestre: 6, requisitos: ['ingles-negocios-ii', 'ingles-negocios-i', 'ingles-ii'] },
        { id: 'practica-profesional-i', nombre: 'Práctica Profesional', semestre: 6, requisitos: [] },
        // Semestre 7
        { id: 'comercio-exterior', nombre: 'Comercio Exterior', semestre: 7, requisitos: ['marketing-i'] },
        { id: 'gestion-rrhh-ii', nombre: 'Gestión de Recursos Humanos II', semestre: 7, requisitos: ['gestion-rrhh-i'] },
        { id: 'administracion-produccion', nombre: 'Administración de la Producción', semestre: 7, requisitos: ['estadistica-ii'] },
        { id: 'control-gestion', nombre: 'Control de Gestión', semestre: 7, requisitos: ['gestion-financiera-cp'] },
        { id: 'formulacion-evaluacion-proyectos', nombre: 'Formulación y Evaluación de Proyectos', semestre: 7, requisitos: ['mercados-capitales'] },
        { id: 'formacion-integral-5', nombre: 'Formación Integral Oferta Institucional', semestre: 7, requisitos: [] },
        // Semestre 8
        { id: 'emprendimiento', nombre: 'Emprendimiento', semestre: 8, requisitos: [] },
        { id: 'desarrollo-organizacional', nombre: 'Desarrollo Organizacional', semestre: 8, requisitos: ['comportamiento-organizacional'] },
        { id: 'responsabilidad-social', nombre: 'Responsabilidad Social', semestre: 8, requisitos: [] },
        { id: 'direccion-estrategica-i', nombre: 'Dirección Estratégica I', semestre: 8, requisitos: ['control-gestion'] },
        { id: 'gestion-financiera-lp', nombre: 'Gestión Financiera de Largo Plazo', semestre: 8, requisitos: ['formulacion-evaluacion-proyectos'] },
        { id: 'formacion-integral-6', nombre: 'Formación Integral Oferta Institucional', semestre: 8, requisitos: [] },
        // Semestre 9
        { id: 'electivo-i', nombre: 'Electivo I', semestre: 9, requisitos: [] },
        { id: 'electivo-ii', nombre: 'Electivo II', semestre: 9, requisitos: [] },
        { id: 'electivo-iii', nombre: 'Electivo III', semestre: 9, requisitos: [] },
        { id: 'direccion-estrategica-ii', nombre: 'Dirección Estratégica II', semestre: 9, requisitos: ['direccion-estrategica-i'] },
        { id: 'practica-profesional-ii', nombre: 'Práctica Profesional II', semestre: 9, requisitos: [] },
        { id: 'formacion-integral-7', nombre: 'Formación Integral Oferta Institucional', semestre: 9, requisitos: [] },
        // Semestre 10
        { id: 'habilitacion-profesional', nombre: 'Habilitación Profesional', semestre: 10, requisitos: [] },
        { id: 'electivo-iv', nombre: 'Electivo IV', semestre: 10, requisitos: [] },
        { id: 'electivo-v', nombre: 'Electivo V', semestre: 10, requisitos: [] },
        { id: 'taller-integrado', nombre: 'Taller Integrado', semestre: 10, requisitos: [] },
        { id: 'formacion-integral-8', nombre: 'Formación Integral Actividad Extra Programática', semestre: 10, requisitos: [] }
    ];

    const contenedorMalla = document.getElementById('malla-curricular');
    const modal = document.getElementById('modal-requisitos');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const listaRequisitosModal = document.getElementById('lista-requisitos');
    
    // Carga los ramos aprobados desde localStorage o inicializa un Set vacío.
    // Usamos un Set para búsquedas más eficientes (O(1) en promedio).
    let ramosAprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados')) || []);

    /**
     * Guarda el estado actual de los ramos aprobados en el localStorage del navegador.
     */
    function guardarProgreso() {
        localStorage.setItem('ramosAprobados', JSON.stringify(Array.from(ramosAprobados)));
    }

    /**
     * Comprueba si todos los requisitos de un ramo están aprobados.
     * @param {string} ramoId - El ID del ramo a comprobar.
     * @returns {string[]} - Una lista de los IDs de los requisitos que faltan.
     */
    function verificarRequisitos(ramoId) {
        const ramo = mallaData.find(r => r.id === ramoId);
        if (!ramo) return [];
        
        const requisitosFaltantes = ramo.requisitos.filter(reqId => !ramosAprobados.has(reqId));
        return requisitosFaltantes;
    }

    /**
     * Muestra la ventana modal con la lista de requisitos faltantes.
     * @param {string[]} requisitosFaltantesIds - IDs de los ramos que faltan.
     */
    function mostrarModalRequisitos(requisitosFaltantesIds) {
        listaRequisitosModal.innerHTML = ''; // Limpia la lista anterior
        
        requisitosFaltantesIds.forEach(id => {
            const ramoRequisito = mallaData.find(r => r.id === id);
            if(ramoRequisito) {
                const li = document.createElement('li');
                li.textContent = ramoRequisito.nombre;
                listaRequisitosModal.appendChild(li);
            }
        });
        
        modal.style.display = 'flex';
    }

    /**
     * Oculta la ventana modal.
     */
    function cerrarModal() {
        modal.style.display = 'none';
    }

    /**
     * Actualiza la clase de cada ramo en el DOM según su estado (aprobado, bloqueado, disponible).
     */
    function actualizarVista() {
        const todosLosRamos = document.querySelectorAll('.ramo');
        
        todosLosRamos.forEach(ramoEl => {
            const ramoId = ramoEl.dataset.id;
            
            ramoEl.classList.remove('aprobado', 'bloqueado');

            if (ramosAprobados.has(ramoId)) {
                ramoEl.classList.add('aprobado');
            } else {
                const requisitosFaltantes = verificarRequisitos(ramoId);
                if (requisitosFaltantes.length > 0) {
                    ramoEl.classList.add('bloqueado');
                }
            }
        });
    }

    /**
     * Maneja el evento de clic en un ramo.
     * @param {Event} e - El objeto del evento de clic.
     */
    function manejarClicRamo(e) {
        const ramoEl = e.target.closest('.ramo');
        if (!ramoEl) return; // Si el clic no fue en un ramo, no hacer nada

        const ramoId = ramoEl.dataset.id;

        // Si ya está aprobado, permite desmarcarlo (para corregir errores)
        if (ramosAprobados.has(ramoId)) {
            ramosAprobados.delete(ramoId);
        } else {
            // Si no está aprobado, verificar requisitos
            const requisitosFaltantes = verificarRequisitos(ramoId);
            if (requisitosFaltantes.length > 0) {
                mostrarModalRequisitos(requisitosFaltantes);
                return; // Detiene la ejecución si hay requisitos faltantes
            }
            ramosAprobados.add(ramoId);
        }
        
        guardarProgreso();
        actualizarVista();
    }

    /**
     * Dibuja la malla curricular completa en el DOM.
     */
    function crearMalla() {
        // Obtiene el número total de semestres de los datos
        const totalSemestres = Math.max(...mallaData.map(r => r.semestre));

        for (let i = 1; i <= totalSemestres; i++) {
            // Crea un div para la columna del semestre
            const semestreColumna = document.createElement('div');
            semestreColumna.classList.add('semestre');
            
            // Crea y añade el título del semestre
            const tituloSemestre = document.createElement('h3');
            tituloSemestre.classList.add('semestre-titulo');
            tituloSemestre.textContent = `Semestre ${i}`;
            semestreColumna.appendChild(tituloSemestre);
            
            // Filtra los ramos que pertenecen a este semestre
            const ramosDelSemestre = mallaData.filter(r => r.semestre === i);
            
            // Crea un elemento div por cada ramo
            ramosDelSemestre.forEach(ramo => {
                const ramoEl = document.createElement('div');
                ramoEl.classList.add('ramo');
                ramoEl.textContent = ramo.nombre;
                ramoEl.dataset.id = ramo.id; // Asigna el ID del ramo al elemento
                semestreColumna.appendChild(ramoEl);
            });
            
            contenedorMalla.appendChild(semestreColumna);
        }
        
        actualizarVista(); // Aplica los estados iniciales (aprobado/bloqueado)
    }

    // --- Inicialización y Event Listeners ---
    crearMalla();
    contenedorMalla.addEventListener('click', manejarClicRamo);
    cerrarModalBtn.addEventListener('click', cerrarModal);
    // Cierra el modal si se hace clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
});
