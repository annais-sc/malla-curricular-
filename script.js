// Espera a que todo el HTML esté cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS DE LA CARRERA ---
    // Definimos todos los ramos con un ID único, nombre, semestre y sus requisitos.
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
        { id: 'calculo-i', nombre: 'Cálculo I', semestre: 2, requisitos: [] },
        { id: 'introduccion-economia', nombre: 'Introducción a la Economía', semestre: 2, requisitos: [] },
        { id: 'contabilidad-ii', nombre: 'Contabilidad II', semestre: 2, requisitos: ['contabilidad-i'] },
        { id: 'ingles-i', nombre: 'Inglés I', semestre: 2, requisitos: [] },
        { id: 'formacion-extra-1', nombre: 'Formación Integral Actividad Extra Programática', semestre: 2, requisitos: [] },
        // Semestre 3
        { id: 'calculo-ii', nombre: 'Cálculo II', semestre: 3, requisitos: ['calculo-i'] },
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
        { id: 'comportamiento-org', nombre: 'Comportamiento Organizacional', semestre: 6, requisitos: ['gestion-rrhh-i'] },
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

    // --- 2. ELEMENTOS DEL DOM ---
    const mallaContainer = document.getElementById('malla-curricular');
    const fraseMotivadoraEl = document.getElementById('frase-motivadora');
    const modal = document.getElementById('modal-requisitos');
    const modalMensaje = document.getElementById('modal-mensaje');
    const modalClose = document.querySelector('.modal-close');

    // --- 3. LÓGICA DE LA APLICACIÓN ---

    // Carga los ramos aprobados desde el almacenamiento local o crea un conjunto vacío.
    let ramosAprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados')) || []);

    // Genera el HTML de la malla curricular.
    const generarMalla = () => {
        const numSemestres = Math.max(...ramos.map(r => r.semestre));
        for (let i = 1; i <= numSemestres; i++) {
            mallaContainer.innerHTML += `<div class="semestre" data-semestre="${i}"><h2>Semestre ${i}</h2></div>`;
        }
        ramos.forEach(ramo => {
            const semestreDiv = mallaContainer.querySelector(`.semestre[data-semestre='${ramo.semestre}']`);
            semestreDiv.innerHTML += `<div class="ramo" data-id="${ramo.id}">${ramo.nombre}</div>`;
        });
    };

    // Actualiza la apariencia de todos los ramos (aprobado, bloqueado, disponible).
    const actualizarVisualizacion = () => {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            const id = ramoDiv.dataset.id;
            const ramoInfo = ramos.find(r => r.id === id);
            
            // Limpiamos clases de estado previas
            ramoDiv.classList.remove('aprobado', 'bloqueado');

            if (ramosAprobados.has(id)) {
                ramoDiv.classList.add('aprobado');
            } else {
                const requisitosFaltantes = ramoInfo.requisitos.some(reqId => !ramosAprobados.has(reqId));
                if (requisitosFaltantes) {
                    ramoDiv.classList.add('bloqueado');
                }
            }
        });
    };
    
    // Guarda el estado actual en el almacenamiento local.
    const guardarEstado = () => {
        localStorage.setItem('ramosAprobados', JSON.stringify([...ramosAprobados]));
    };

    // Maneja el clic en un ramo.
    const handleRamoClick = (e) => {
        if (!e.target.classList.contains('ramo')) return;

        const ramoDiv = e.target;
        const id = ramoDiv.dataset.id;

        if (ramoDiv.classList.contains('bloqueado')) {
            const ramoInfo = ramos.find(r => r.id === id);
            const nombresRequisitos = ramoInfo.requisitos
                .filter(reqId => !ramosAprobados.has(reqId))
                .map(reqId => `<li><strong>${ramos.find(r => r.id === reqId).nombre}</strong></li>`)
                .join('');
            
            modalMensaje.innerHTML = `Para cursar <strong>${ramoInfo.nombre}</strong>, necesitas aprobar:<ul>${nombresRequisitos}</ul>`;
            modal.style.display = 'flex';
            return;
        }

        // Alternar estado: si está aprobado, se desaprueba, y viceversa.
        if (ramosAprobados.has(id)) {
            ramosAprobados.delete(id);
        } else {
            ramosAprobados.add(id);
        }

        guardarEstado();
        actualizarVisualizacion();
    };

    // --- 4. INICIALIZACIÓN Y EVENTOS ---

    // Muestra una frase motivadora al azar.
    fraseMotivadoraEl.textContent = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];
    
    generarMalla();
    actualizarVisualizacion();

    // Asignar eventos
    mallaContainer.addEventListener('click', handleRamoClick);
    modalClose.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});
