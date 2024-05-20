// Tiempos específicos en los que se pausará el video para mostrar preguntas (en segundos)
const questionTimes = [91, 173, 236, 283, 326, 369, 397, 423, 491, 515, 532, 611, 635, 696, 780, 805, 902, 977, 1040]; // Ajusta los tiempos según sea necesario
let currentQuestionIndex = 0;

const video = document.getElementById('video');
const questionOverlay = document.getElementById('question-overlay');

// Preguntas y respuestas
const questions = [
    {
        question: "¿Qué es SCRUM?",
        answers: ["Una metodología de desarrollo ágil", "Un lenguaje de programación", "Una base de datos"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál de las siguientes opciones no es un propósito de SCRUM?",
        answers: ["Mejorar la Productividad", "Desarrollar proyectos de software","Fomentar Trabajo en Equipo", "Identificar problemas"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es el rol del Scrum Master en un equipo Scrum?",
        answers: ["Garantizar que el equipo Scrum siga los principios y valores de Scrum", "Asignar tareas a los miembros del equipo", "Realizar las reuniones diarias del equipo"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es la responsabilidad principal del Product Owner?",
        answers: ["Priorizar el trabajo del equipo para el Sprint", "Asistir a todas las reuniones del equipo Scrum", "Representar los intereses de los stakeholders en el desarrollo del producto."],
        correctAnswer: 2
    },
    {
        question: "¿Qué significa auto-organización en el contexto del Equipo de Desarrollo en Scrum?",
        answers: ["Que el equipo decide quién hace qué y cómo se realizará el trabajo", "Que el Scrum Master asigna las tareas a los miembros del equipo", "Que el Product Owner define las prioridades de trabajo para el equipo"],
        correctAnswer: 0
    },
    {
        question: "¿Qué es el Product Backlog en Scrum?",
        answers: ["La lista ordenada de todo el trabajo que se necesita realizar en el proyecto", "La lista de bugs reportados por los usuarios", "Un documento estático que no cambia durante el proyecto"],
        correctAnswer: 0
    },
    {
        question: "¿Qué contiene el Sprint Backlog en Scrum?",
        answers: ["El plan detallado para todo el proyecto", "Las tareas específicas que el equipo ha identificado para completar durante el Sprint", "Los objetivos de alto nivel para el proyecto"],
        correctAnswer: 1
    },
    {
        question: "¿Qué representa el Incremento en Scrum?",
        answers: ["Un documento de planificación detallado para el próximo Sprint", "El resultado del trabajo del equipo al final de cada Sprint", "Un informe de progreso para el Product Owner"],
        correctAnswer: 1
    },
    {
        question: "¿Qué objetivo tiene el Sprint Planning en Scrum?",
        answers: ["Revisar el trabajo completado en el Sprint anterior", "Discutir problemas no relacionados con el proyecto", "Definir el trabajo que se realizará durante el Sprint"],
        correctAnswer: 2
    },
    {
        question: "¿Cuál es el propósito del Daily Scrum en Scrum?",
        answers: ["Actualizar al Product Owner sobre el progreso", "Identificar y resolver impedimentos", "Revisar y modificar el Product Backlog"],
        correctAnswer: 1
    },
    {
        question: "¿Qué se hace durante el Sprint Review en Scrum?",
        answers: ["Se revisa el trabajo completado y se adapta el Product Backlog si es necesario", "Se planifica el próximo Sprint", "Se realiza una demostración del Incremento completado"],
        correctAnswer: 2
    },
    {
        question: "¿Qué ocurre durante la fase de Planificación en el ciclo de vida de un Sprint en Scrum?",
        answers: ["Se define el objetivo del Sprint y se seleccionan las tareas", "Se realiza la ejecución del trabajo planificado", "Se revisa el trabajo completado y se realiza una retrospectiva"],
        correctAnswer: 0
    },
    {
        question: "¿Qué actividades se llevan a cabo durante la fase de Ejecución en Scrum?",
        answers: ["Se planifica el próximo Sprint", "Se realizan las reuniones diarias (Daily Scrum)", "Se trabaja en las tareas definidas en el Sprint Backlog"],
        correctAnswer: 2
    },
    {
        question: "¿Qué se hace durante la fase de Revisión en el ciclo de vida de un Sprint en Scrum?",
        answers: ["Se realiza una demostración del Incremento completado", "Se identifican y resuelven impedimentos", "Se planifica el próximo Sprint"],
        correctAnswer: 0
    },
    {
        question: "¿Qué representan las User Stories en el desarrollo ágil?",
        answers: ["Detalles técnicos de una función", "Pequeñas descripciones de una funcionalidad desde la perspectiva del usuario", "Tareas específicas que deben completarse"],
        correctAnswer: 1
    },
    {
        question: "¿Qué técnica se utiliza comúnmente para la estimación ágil en Scrum?",
        answers: ["Puntos de historia", "Horas de trabajo", "Días hábiles"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es el objetivo de la entrega continua en las prácticas ágiles?",
        answers: ["Entregar el producto completo al final del proyecto", "Entregar incrementos de producto de forma regular y frecuente", "Realizar entregas solo al final del proyecto"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es un beneficio clave de utilizar Scrum en el desarrollo de software?",
        answers: ["Mayor transparencia y visibilidad del progreso del proyecto", "Menor necesidad de colaboración entre el equipo y los stakeholders", "Mayor rigidez en los procesos de desarrollo"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es un desafío común al implementar Scrum en equipos nuevos?",
        answers: ["Exceso de planificación", "Falta de roles claros", "Resistencia al cambio"],
        correctAnswer: 2
    }
];

// Función para mostrar la pregunta
function showQuestion(index) {
    const questionData = questions[index];
    questionOverlay.innerHTML = `
        <div class="question-box">
            <p>${questionData.question}</p>
            ${questionData.answers.map((answer, i) => `
                <button onclick="checkAnswer(${index}, ${i})">${answer}</button>
            `).join('')}
        </div>
    `;
    questionOverlay.style.display = 'block';
}

// Función para verificar la respuesta
function checkAnswer(questionIndex, answerIndex) {
    const isCorrect = answerIndex === questions[questionIndex].correctAnswer;
    const aciertos = document.getElementById('aciertos');
    const errores = document.getElementById('errores');

    if (isCorrect) {
        aciertos.textContent = parseInt(aciertos.textContent) + 1;
    } else {
        errores.textContent = parseInt(errores.textContent) + 1;
    }

    questionOverlay.style.display = 'none';
    currentQuestionIndex++;
    if (currentQuestionIndex < questionTimes.length) {
        video.play();
    }
}

// Event listener para pausar el video en momentos específicos
video.addEventListener('timeupdate', () => {
    if (currentQuestionIndex < questionTimes.length && video.currentTime >= questionTimes[currentQuestionIndex]) {
        video.pause();
        showQuestion(currentQuestionIndex);
    }
});