
/* =========================================
   VIOLET MACHINE
   LÓGICA PRINCIPAL
========================================= */

const screens = {
    home: document.getElementById("homeScreen"),
    choice: document.getElementById("choiceScreen"),
    preparing: document.getElementById("preparingScreen"),
    result: document.getElementById("resultScreen")
};

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const brandHome = document.getElementById("brandHome");

const optionsContainer = document.getElementById("options");

const stepLabel = document.getElementById("stepLabel");
const progressBar = document.getElementById("progressBar");

const choiceTitle = document.getElementById("choiceTitle");
const choiceSubtitle = document.getElementById("choiceSubtitle");
const selectionHint = document.getElementById("selectionHint");

const bouquetIllustration = document.getElementById(
    "bouquetIllustration"
);


/* =========================================
   DATOS DE LAS ELECCIONES
========================================= */

const steps = [
    {
        title: "¿Qué estilo de ramo<br>te apetece?",
        subtitle: "Empezamos por lo importante: las flores.",
        hint: "ELIGE TU ESTILO",

        options: [
            {
                id: "natural",
                title: "Natural",
                description: "Sencillo y silvestre",
                visual: `
                    <div class="preview-bouquet natural">
                        <span class="flower-head f1"></span>
                        <span class="flower-head f2"></span>
                        <span class="flower-head f3"></span>
                        <span class="flower-head f4"></span>
                        <span class="flower-head f5"></span>
                        <span class="paper"></span>
                        <span class="stem"></span>
                    </div>
                `
            },
            {
                id: "special",
                title: "Especial",
                description: "Un poco más de todo",
                visual: `
                    <div class="preview-bouquet special">
                        <span class="flower-head f1"></span>
                        <span class="flower-head f2"></span>
                        <span class="flower-head f3"></span>
                        <span class="flower-head f4"></span>
                        <span class="flower-head f5"></span>
                        <span class="paper"></span>
                        <span class="stem"></span>
                    </div>
                `
            }
        ]
    },

    {
        title: "Ahora toca elegir<br>el envoltorio.",
        subtitle: "Porque la presentación también cuenta.",
        hint: "ELIGE EL ENVOLTORIO",

        options: [
            {
                id: "kraft",
                title: "Kraft",
                description: "Un toque natural",
                visual: `
                    <div class="wrap-preview kraft"></div>
                `
            },
            {
                id: "lavender",
                title: "Lavanda",
                description: "Muy del día de hoy",
                visual: `
                    <div class="wrap-preview lavender"></div>
                `
            },
            {
                id: "white",
                title: "Blanco",
                description: "Clásico y elegante",
                visual: `
                    <div class="wrap-preview white"></div>
                `
            }
        ]
    },

    {
        title: "Y para terminar...<br>¿algún extra?",
        subtitle: "El último detalle antes de preparar el ramo.",
        hint: "ELIGE TU EXTRA",

        options: [
            {
                id: "green",
                title: "Hojitas verdes",
                description: "Un toque silvestre",
                visual: `
                    <div class="extra-preview green">❧</div>
                `
            },
            {
                id: "bow",
                title: "Lazo morado",
                description: "Un bonito acabado",
                visual: `
                    <div class="extra-preview">🎀</div>
                `
            },
            {
                id: "all",
                title: "Un poco de todo",
                description: "Que no falte detalle",
                visual: `
                    <div class="extra-preview all">✿ ❧</div>
                `
            }
        ]
    }
];


/* =========================================
   ESTADO DE LA EXPERIENCIA
========================================= */

let currentStep = 0;

const selections = {
    style: null,
    wrapping: null,
    extra: null
};

const selectionKeys = [
    "style",
    "wrapping",
    "extra"
];

const selectionNames = {
    natural: "Natural",
    special: "Especial",

    kraft: "Kraft",
    lavender: "Lavanda",
    white: "Blanco",

    green: "Hojitas verdes",
    bow: "Lazo morado",
    all: "Un poco de todo"
};


/* =========================================
   CAMBIO DE PANTALLAS
========================================= */

function showScreen(screenName) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
    });

    screens[screenName].classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   INICIAR EXPERIENCIA
========================================= */

startBtn.addEventListener("click", () => {

    currentStep = 0;

    renderStep();

    showScreen("choice");

});


/* =========================================
   VOLVER AL INICIO
========================================= */

brandHome.addEventListener("click", (event) => {

    event.preventDefault();

    showScreen("home");

});


/* =========================================
   PINTAR PASO ACTUAL
========================================= */

function renderStep() {

    const step = steps[currentStep];

    const key = selectionKeys[currentStep];

    choiceTitle.innerHTML = step.title;

    choiceSubtitle.textContent = step.subtitle;

    selectionHint.textContent = step.hint;

    stepLabel.textContent =
        `PASO 0${currentStep + 1} / 03`;

    progressBar.style.width =
        `${((currentStep + 1) / 3) * 100}%`;


    // Cambiar el texto del botón

    if (currentStep === 2) {

        nextBtn.innerHTML = `
            PREPARAR MI RAMO
            <span>✿</span>
        `;

    } else {

        nextBtn.innerHTML = `
            SIGUIENTE
            <span>→</span>
        `;

    }


    // Generar tarjetas

    optionsContainer.innerHTML = "";

    step.options.forEach(option => {

        const card = document.createElement("button");

        card.type = "button";

        card.className = "option-card";

        card.dataset.value = option.id;

        card.innerHTML = `
            <span class="option-check">✓</span>

            <div class="option-visual">
                ${option.visual}
            </div>

            <strong>${option.title}</strong>

            <small>${option.description}</small>
        `;


        // Recuperar selección anterior

        if (selections[key] === option.id) {

            card.classList.add("selected");

        }


        card.addEventListener("click", () => {

            selectOption(option.id);

        });


        optionsContainer.appendChild(card);

    });


    updateNextButton();

}


/* =========================================
   SELECCIONAR OPCIÓN
========================================= */

function selectOption(value) {

    const key = selectionKeys[currentStep];

    selections[key] = value;

    document.querySelectorAll(".option-card").forEach(card => {

        card.classList.toggle(
            "selected",
            card.dataset.value === value
        );

    });

    updateNextButton();

}


/* =========================================
   ACTUALIZAR BOTÓN
========================================= */

function updateNextButton() {

    const key = selectionKeys[currentStep];

    const selected = selections[key] !== null;

    nextBtn.disabled = !selected;

    nextBtn.style.opacity = selected ? "1" : ".45";

    nextBtn.style.cursor = selected ? "pointer" : "not-allowed";

}


/* =========================================
   SIGUIENTE PASO
========================================= */

nextBtn.addEventListener("click", () => {

    const key = selectionKeys[currentStep];

    if (!selections[key]) return;


    if (currentStep < 2) {

        currentStep++;

        renderStep();

    } else {

        prepareBouquet();

    }

});


/* =========================================
   VOLVER AL PASO ANTERIOR
========================================= */

backBtn.addEventListener("click", () => {

    if (currentStep === 0) {

        showScreen("home");

        return;

    }

    currentStep--;

    renderStep();

});


/* =========================================
   PREPARACIÓN DEL RAMO
========================================= */

function prepareBouquet() {

    showScreen("preparing");


    const prepareTitle = document.getElementById("prepareTitle");

    const prepareText = document.getElementById("prepareText");


    const messages = [
        {
            title: "Seleccionando las flores...",
            text: "Buscando las violetas más bonitas."
        },
        {
            title: "Preparando el envoltorio...",
            text: "Que quede todo en su sitio."
        },
        {
            title: "Añadiendo los últimos detalles...",
            text: "Ya casi está."
        }
    ];


    let messageIndex = 0;

    prepareTitle.textContent = messages[0].title;

    prepareText.textContent = messages[0].text;


    const messageInterval = setInterval(() => {

        messageIndex++;

        if (messageIndex < messages.length) {

            prepareTitle.textContent =
                messages[messageIndex].title;

            prepareText.textContent =
                messages[messageIndex].text;

        }

    }, 900);


    setTimeout(() => {

        clearInterval(messageInterval);

        showResult();

    }, 3200);

}


/* =========================================
   MOSTRAR RESULTADO
========================================= */

function showResult() {

    updateReceipt();

    createBouquet();

    showScreen("result");

}


/* =========================================
   ACTUALIZAR TICKET
========================================= */

function updateReceipt() {

    document.getElementById("receiptStyle").textContent =
        selectionNames[selections.style];

    document.getElementById("receiptWrap").textContent =
        selectionNames[selections.wrapping];

    document.getElementById("receiptExtra").textContent =
        selectionNames[selections.extra];

}


/* =========================================
   GENERADOR DE VIOLETAS SVG
========================================= */

/*
    Cada flor se construye con:

    - Cinco pétalos independientes.
    - Centro amarillo.
    - Pequeños detalles de luz.
    - Variaciones de tamaño y rotación.

    Así evitamos que parezcan simples círculos.
*/

function createFlower(x, y, scale, rotation, color, delay = 0) {

    const petals = [];

    for (let i = 0; i < 5; i++) {

        const angle = i * 72;

        petals.push(`
            <ellipse
                cx="0"
                cy="-11"
                rx="7.8"
                ry="12"
                fill="${color}"
                stroke="#542477"
                stroke-width="0.7"
                transform="rotate(${angle})"
            />
        `);

    }


    return `
        <g
            transform="
                translate(${x} ${y})
                rotate(${rotation})
                scale(${scale})
            "
        >

            <g>
                ${petals.join("")}
            </g>

            <circle
                cx="0"
                cy="0"
                r="4.1"
                fill="#f5d76d"
            />

            <circle
                cx="-1.2"
                cy="-1.2"
                r="1.1"
                fill="#fff0a5"
                opacity=".9"
            />

        </g>
    `;

}


/* =========================================
   GENERADOR DE HOJAS
========================================= */

function createLeaf(x, y, rotation, scale = 1) {

    return `
        <g
            transform="
                translate(${x} ${y})
                rotate(${rotation})
                scale(${scale})
            "
        >

            <path
                d="
                    M 0 0
                    C -24 -24 -39 -14 -30 2
                    C -20 17 -7 10 0 0
                    Z
                "
                fill="#557e56"
                stroke="#355c3d"
                stroke-width="1"
            />

            <path
                d="M -27 1 Q -13 -3 0 0"
                stroke="#a7c69a"
                stroke-width="1.1"
                fill="none"
                opacity=".8"
            />

        </g>
    `;

}


/* =========================================
   GENERADOR DE TALLOS
========================================= */

function createStem(x, y, bend = 0) {

    return `
        <path
            d="
                M ${x} ${y}
                Q ${x + bend} ${y + 90}
                250 355
            "
            stroke="#537d51"
            stroke-width="4"
            stroke-linecap="round"
            fill="none"
        />
    `;

}


/* =========================================
   CONSTRUIR EL RAMO COMPLETO
========================================= */

function createBouquet() {

    const isSpecial = selections.style === "special";

    const wrapColor = {
        kraft: {
            main: "#c99b6b",
            light: "#e5c59d",
            dark: "#936642"
        },

        lavender: {
            main: "#b993cf",
            light: "#e4c9ef",
            dark: "#88649e"
        },

        white: {
            main: "#e9e1ec",
            light: "#ffffff",
            dark: "#b8a9c0"
        }

    }[selections.wrapping];


    const extra = selections.extra;

    const flowers = [];

    const stems = [];

    const leaves = [];


    // Posición de las flores

    const flowerPositions = [

        [151, 119, 1.00, -8],
        [207, 83, 1.08, 10],
        [265, 67, 1.15, -6],
        [325, 95, 1.04, 12],
        [365, 144, .96, -10],

        [179, 184, .94, 8],
        [235, 153, 1.04, -12],
        [296, 165, 1.03, 7],
        [341, 205, .91, -9]

    ];


    const flowerColors = [
        "#7841a6",
        "#66318f",
        "#8750b1",
        "#713b9e",
        "#9a69bd"
    ];


    const totalFlowers = isSpecial ? 9 : 7;


    for (let i = 0; i < totalFlowers; i++) {

        const [x, y, scale, rotation] = flowerPositions[i];

        const color = flowerColors[i % flowerColors.length];


        flowers.push(
            createFlower(
                x,
                y,
                scale,
                rotation,
                color
            )
        );


        stems.push(
            createStem(
                x,
                y + 8,
                (250 - x) * 0.25
            )
        );

    }


    // Hojas de base

    const leafPositions = [

        [171, 268, -35, 1.1],
        [202, 290, 25, 1],
        [299, 286, -15, 1.1],
        [340, 264, 35, 1],
        [145, 233, -55, .8],
        [356, 235, 45, .8],
        [250, 315, 90, .9]

    ];


    leafPositions.forEach(([x, y, rotation, scale]) => {

        leaves.push(
            createLeaf(x, y, rotation, scale)
        );

    });


    // El extra elegido

    let extraDecorations = "";


    if (extra === "green" || extra === "all") {

        extraDecorations += `
            ${createLeaf(133, 285, -65, 1.2)}
            ${createLeaf(365, 290, 48, 1.2)}
            ${createLeaf(185, 315, -30, .9)}
            ${createLeaf(320, 315, 30, .9)}
        `;

    }


    // Envoltorio

    const wrapping = `

        <!-- Papel posterior -->

        <path
            d="
                M 108 216
                Q 145 227 176 213
                L 250 367
                L 324 213
                Q 357 227 392 216
                L 299 397
                Q 250 425 201 397
                Z
            "
            fill="${wrapColor.dark}"
            opacity=".9"
        />

        <!-- Papel principal -->

        <path
            d="
                M 125 217
                Q 168 236 190 221
                L 250 386
                L 310 221
                Q 340 236 375 217
                L 292 393
                Q 250 417 208 393
                Z
            "
            fill="${wrapColor.main}"
            stroke="${wrapColor.dark}"
            stroke-width="1.4"
        />

        <!-- Pliegue izquierdo -->

        <path
            d="
                M 125 217
                Q 155 300 208 393
                L 250 386
                L 190 221
                Q 168 236 125 217
            "
            fill="${wrapColor.light}"
            opacity=".75"
        />

        <!-- Pliegue derecho -->

        <path
            d="
                M 310 221
                Q 340 236 375 217
                Q 347 310 292 393
                L 250 386
                Z
            "
            fill="${wrapColor.dark}"
            opacity=".35"
        />

        <!-- Borde superior -->

        <path
            d="
                M 125 217
                Q 165 245 190 221
                M 310 221
                Q 340 245 375 217
            "
            fill="none"
            stroke="${wrapColor.light}"
            stroke-width="3"
        />

    `;


    // Lazo

    let ribbon = "";


    if (extra === "bow" || extra === "all") {

        ribbon = `

            <g transform="translate(250 327)">

                <path
                    d="
                        M 0 0
                        C -48 -46 -88 -22 -60 6
                        C -39 23 -13 12 0 0
                    "
                    fill="#8050a8"
                    stroke="#583275"
                    stroke-width="2"
                />

                <path
                    d="
                        M 0 0
                        C 48 -46 88 -22 60 6
                        C 39 23 13 12 0 0
                    "
                    fill="#a879c7"
                    stroke="#583275"
                    stroke-width="2"
                />

                <path
                    d="
                        M -5 8
                        L -24 65
                        L -4 54
                        L 8 68
                        L 7 7
                    "
                    fill="#8050a8"
                />

                <path
                    d="
                        M 5 8
                        L 26 65
                        L 7 54
                        L -8 68
                        L -7 7
                    "
                    fill="#9a6aba"
                />

                <ellipse
                    cx="0"
                    cy="0"
                    rx="11"
                    ry="10"
                    fill="#c39bdd"
                    stroke="#70418f"
                    stroke-width="2"
                />

            </g>

        `;

    } else {

        ribbon = `

            <g transform="translate(250 327)">

                <path
                    d="M -8 0 Q 0 9 8 0"
                    fill="none"
                    stroke="#8050a8"
                    stroke-width="4"
                    stroke-linecap="round"
                />

            </g>

        `;

    }


    // SVG completo

    const svg = `

        <svg
            viewBox="0 0 500 440"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Ramo de violetas moradas con envoltorio decorativo"
        >

            <defs>

                <linearGradient
                    id="bouquetShadow"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop offset="0%" stop-color="#ffffff" stop-opacity=".1"/>
                    <stop offset="100%" stop-color="#160b22" stop-opacity=".3"/>
                </linearGradient>

                <filter id="flowerShadow">
                    <feDropShadow
                        dx="0"
                        dy="3"
                        stdDeviation="2"
                        flood-color="#21102f"
                        flood-opacity=".35"
                    />
                </filter>

            </defs>


            <!-- Sombra del ramo -->

            <ellipse
                cx="250"
                cy="409"
                rx="125"
                ry="13"
                fill="#100719"
                opacity=".35"
            />


            <!-- Tallos -->

            <g opacity=".95">
                ${stems.join("")}
            </g>


            <!-- Hojas -->

            <g>
                ${leaves.join("")}
                ${extraDecorations}
            </g>


            <!-- Flores -->

            <g filter="url(#flowerShadow)">
                ${flowers.join("")}
            </g>


            <!-- Envoltorio -->

            ${wrapping}


            <!-- Lazo -->

            ${ribbon}


            <!-- Detalle del papel -->

            <path
                d="M 221 383 Q 250 395 279 383"
                fill="none"
                stroke="${wrapColor.light}"
                stroke-width="2"
                opacity=".8"
            />

        </svg>

    `;


    bouquetIllustration.innerHTML = svg;

}


/* =========================================
   REINICIAR EXPERIENCIA
========================================= */

restartBtn.addEventListener("click", () => {

    selections.style = null;
    selections.wrapping = null;
    selections.extra = null;

    currentStep = 0;

    renderStep();

    showScreen("home");

});
