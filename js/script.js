const botonEncriptar = document.querySelector(".btn__encriptar");
const botonDesencriptar = document.querySelector(".btn__desencriptar");
const munieco = document.querySelector(".munieco");
const contenedorParrafo = document.querySelector(".mensaje__final");
const rightParrafo = document.querySelector(".right__info");
const botonCopiar = document.querySelector(".btn__copiar");
const textoOriginal = document.querySelector(".textarea__texto");

function encriptar(frase) {
    return frase.toLowerCase().replace(/[aeiou]/g, match => ({
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    })[match] || match);
}

function desencriptar(palabra) {
    return palabra.replace(/enter|imes|ai|ober|ufat/g, match => ({
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    })[match] || match);
}

function validarTexto() {
    const texto = textoOriginal.value;
    const caracteresInvalidos = /[^\sa-z]/.test(texto);
    if (caracteresInvalidos) {
        alert("El texto contiene caracteres inválidos. Por favor, utiliza solo letras minúsculas y espacios en blanco.");
        textoOriginal.focus();
        return false;
    }
    return true;
}

function mostrarResultado(texto) {
    const key = texto ? 1 : 0;
    mostrarOcultar(key);
    contenedorParrafo.textContent = texto || "Ningún mensaje fue encontrado";
}

function mostrarOcultar(key) {
    munieco.classList.toggle("oculto", key === 1);
    rightParrafo.classList.toggle("oculto", key === 1);
    botonCopiar.style.display = key === 1 ? 'block' : 'none';
}

botonEncriptar.addEventListener("click", () => {
    if (validarTexto()) {
        mostrarResultado(encriptar(textoOriginal.value));
    }
});

botonDesencriptar.addEventListener("click", () => {
    if (validarTexto()) {
        mostrarResultado(desencriptar(textoOriginal.value));
    }
});

botonCopiar.addEventListener("click", () => {
    const contenido = contenedorParrafo.textContent;
    navigator.clipboard.writeText(contenido);
    textoOriginal.value = contenido;
    mostrarResultado("");
});
