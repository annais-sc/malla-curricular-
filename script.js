// Se ejecuta cuando todo el contenido de la página se ha cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINICIÓN DE DATOS ---

    // Lista completa de ramos con sus IDs, nombres, semestres y requisitos.
    // Los IDs son únicos y se usan para identificar cada ramo.
    const ramos = [
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
        { id: 'calculo-i', nombre: 'Cálculo I', semestre: 2, requisitos: [] }, // Asumimos que no tiene pre-requisito directo de la lista
        { id: 'introduccion-economia', nombre: 'Introducción a la Economía', semestre: 2, requisitos: [] },
        { id: 'contabilidad-ii', nombre: 'Contabilidad II', semestre: 2, requisitos: ['contabilidad-i'] },
        { id: 'ingles-i', nombre: 'Inglés I', semestre: 2, requisitos: [] },
        { id: 'formacion-extra-1', nombre: 'Formación Integral Actividad Extra Programática', semestre: 2, requisitos: [] },
        // Semestre 3
        { id: 'calculo-ii', nombre: 'Cálculo II', semestre: 3, requisitos: [] }, // Asumimos que requiere Cálculo I, pero no está en la lista de req.
        { id: 'marketing-i', nombre: 'Marketing I', semestre: 3, requisitos: ['administracion-estrategica'] },
        { id: 'microeconomia-i', nombre: 'Microeconomía I', semestre: 3, requisitos: ['introduccion-economia'] },
        { id: 'costos', nombre: 'Costos', semestre: 3, requisitos: ['contabilidad-i'] },
        { id: 'ingles-ii', nombre: 'Inglés II', semestre: 3, requisitos: ['ingles-i'] },
        { id: 'formacion-integral-2', nombre: 'Formación Integral Oferta Institucional', semestre: 3, requisitos: [] },
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
        { id: 'formacion-extra-2', nombre: 'Formación Integral Actividad Extra Programática', semestre: 5, requisitos: [] },
        // Semestre 6
        { id: 'comportamiento-org', nombre: 'Comportamiento Organizacional', semestre: 6, requisitos: [] }, // No especificado en la lista
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
        { id: 'formulacion-proyectos', nombre: 'Formulación y Evaluación de Proyectos', semestre: 7, requisitos: ['mercados-capitales'] },
        { id: 'formacion-integral-3', nombre: 'Formación Integral Oferta Institucional', semestre: 7, requisitos: [] },
        // Semestre 8
        { id: 'emprendimiento', nombre: 'Emprendimiento', semestre: 8, requisitos: [] },
        { id: 'desarrollo-org', nombre: 'Desarrollo Organizacional', semestre: 8, requisitos: ['comportamiento-org'] },
        { id: 'responsabilidad-social', nombre: 'Responsabilidad Social', semestre: 8, requisitos: [] },
        { id: 'direccion-estrategica-i', nombre: 'Dirección Estratégica I', semestre: 8, requisitos: ['control-gestion'] },
        { id: 'gestion-financiera-lp', nombre: 'Gestión Financiera de Largo Plazo', semestre: 8, requisitos: ['formulacion-proyectos'] },
        { id: 'formacion-integral-4', nombre: 'Formación Integral Oferta Institucional', semestre: 8, requisitos: [] },
        // Semestre 9
        { id: 'electivo-i', nombre: 'Electivo I', semestre: 9, requisitos: [] },
        { id: 'electivo-ii', nombre: 'Electivo II', semestre: 9, requisitos: [] },
        { id: 'electivo-iii', nombre: 'Electivo III', semestre: 9, requisitos: [] },
        { id: 'direccion-estrategica-ii', nombre: 'Dirección Estratégica II', semestre: 9, requisitos: ['direccion-estrategica-i'] },
        { id: 'practica-profesional-ii', nombre: 'Práctica Profesional II', semestre: 9, requisitos: [] },
        { id: 'formacion-integral-5', nombre: 'Formación Integral Oferta Institucional', semestre: 9, requisitos: [] },
        // Semestre 10
        { id: 'habilitacion-profesional', nombre: 'Habilitación Profesional', semestre: 10, requisitos: [] },
        { id: 'electivo-iv', nombre: 'Electivo IV', semestre: 10, requisitos: [] },
        { id: 'electivo-v', nombre: 'Electivo V', semestre: 10, requisitos: [] },
        { id: 'taller-integrado', nombre: 'Taller Integrado', semestre: 10, requisitos: [] },
        { id: 'formacion-extra-3', nombre: 'Formación Integral Actividad Extra Programática', semestre: 10, requisitos: [] },
    ];
    
    const frasesMotivadoras = [
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
        "Cree en ti y todo será posible.",
        "La única forma de hacer un gran trabajo es amar lo que haces.",
        "El futuro pertenece a quienes creen en la belleza de sus sueños.",
        "No te detengas hasta que te sientas orgulloso."
    ];

    // --- 2. REFERENCIAS AL DOM ---
    const mallaContainer = document.getElementById('malla-curricular');
    const fraseMotivadoraEl = document.getElementById('frase-motivadora');
    const modal = document.getElementById('modal-requisitos');
    const modalMensaje = document.getElementById('modal-mensaje');
    const modalClose = document.querySelector('.modal-close');


    // --- 3. FUNCIONES ---

    /**
     * Carga el estado de los ramos aprobados desde el localStorage del navegador.
     * @returns {Set<string>} Un Set con los IDs de los ramos aprobados.
     */
    const cargarEstado = () => {
        const data = localStorage.getItem('ramosAprobados');
        return data ? new Set(JSON.parse(data)) : new Set();
    };

    /**
     * Guarda el estado actual de los ramos aprobados en el localStorage.
     * @param {Set<string>} aprobados - El Set con los IDs de los ramos aprobados.
     */
    const guardarEstado = (aprobados) => {
        // Convertimos el Set a un Array para poder guardarlo como JSON
        localStorage.setItem('ramosAprobados', JSON.stringify(Array.from(aprobados)));
    };

    let ramosAprobados = cargarEstado();

    /**
     * Genera dinámicamente el HTML de la malla curricular.
     */
    const generarMalla = () => {
        const numSemestres = Math.max(...ramos.map(r => r.semestre));
        
        // Crea las columnas de los semestres
        for (let i = 1; i <= numSemestres; i++) {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.innerHTML = `<h2>Semestre ${i}</h2>`;
            mallaContainer.appendChild(semestreDiv);
        }

        // Añade cada ramo a su semestre correspondiente
        ramos.forEach(ramo => {
            const ramoDiv = document.createElement('div');
            ramoDiv.className = 'ramo';
            ramoDiv.textContent = ramo.nombre;
            ramoDiv.dataset.id = ramo.id; // Usamos data-attributes para guardar el id
            
            // Busca la columna del semestre y añade el ramo
            mallaContainer.children[ramo.semestre - 1].appendChild(ramoDiv);
        });
    };

    /**
     * Actualiza la apariencia de todos los ramos según su estado (aprobado o no).
     */
    const actualizarVisualizacion = () => {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            if (ramosAprobados.has(ramoDiv.dataset.id)) {
                ramoDiv.classList.add('aprobado');
            } else {
                ramoDiv.classList.remove('aprobado');
            }
        });
    };
    
    /**
     * Muestra el modal con un mensaje específico.
     * @param {string} mensaje - El texto a mostrar en el modal.
     */
    const mostrarModal = (mensaje) => {
        modalMensaje.innerHTML = mensaje;
        modal.style.display = 'flex';
    };

    /**
     * Oculta el modal.
     */
    const ocultarModal = () => {
        modal.style.display = 'none';
    };


    // --- 4. MANEJADORES DE EVENTOS ---

    // Evento principal al hacer clic en cualquier parte de la malla
    mallaContainer.addEventListener('click', (e) => {
        // Si el clic fue sobre un elemento con la clase 'ramo'
        if (e.target.classList.contains('ramo')) {
            const ramoId = e.target.dataset.id;
            const ramoInfo = ramos.find(r => r.id === ramoId);

            // Si el ramo ya está aprobado, lo des-aprobamos (toggle)
            if (ramosAprobados.has(ramoId)) {
                ramosAprobados.delete(ramoId);
            } else {
                // Si no está aprobado, verificamos los requisitos
                const requisitosFaltantes = ramoInfo.requisitos.filter(reqId => !ramosAprobados.has(reqId));

                if (requisitosFaltantes.length > 0) {
                    // Si faltan requisitos, mostramos el modal de advertencia
                    const nombresRequisitos = requisitosFaltantes.map(reqId => {
                        return `<li><strong>${ramos.find(r => r.id === reqId).nombre}</strong></li>`;
                    }).join('');
                    mostrarModal(`Para aprobar <strong>${ramoInfo.nombre}</strong>, primero debes cursar: <ul>${nombresRequisitos}</ul>`);
                } else {
                    // Si cumple los requisitos, lo aprobamos
                    ramosAprobados.add(ramoId);
                }
            }
            
            // Guardamos el nuevo estado y actualizamos la vista
            guardarEstado(ramosAprobados);
            actualizarVisualizacion();
        }
    });

    // Eventos para cerrar el modal
    modalClose.addEventListener('click', ocultarModal);
    modal.addEventListener('click', (e) => {
        // Si se hace clic en el fondo oscuro, también se cierra
        if (e.target === modal) {
            ocultarModal();
        }
    });


    // --- 5. INICIALIZACIÓN ---
    
    // Muestra una frase motivadora aleatoria al cargar la página
    fraseMotivadoraEl.textContent = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];
    
    // Dibuja la malla en la pantalla
    generarMalla();

    // Aplica los estilos a los ramos que ya estaban aprobados
    actualizarVisualizacion();
});
