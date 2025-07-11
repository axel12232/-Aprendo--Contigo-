// Variables globales
let nombreUsuario = "";
let sexo = "";
let avatar = "";

// Función para síntesis de voz sin leer emojis
function hablar(texto) {
  if (!texto) return;
  // Quitar emojis del texto
  const textoSinEmoji = texto.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}]/gu, '').trim();
  if (!textoSinEmoji) return;
  const utterance = new SpeechSynthesisUtterance(textoSinEmoji);
  utterance.lang = "es-MX";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// Control de pantalla activa
function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => {
    p.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

// --- Bienvenida ---
const inputNombre = document.getElementById("nombre");
const botonesSexo = document.querySelectorAll(".sexoBtn");
const botonesAvatar = document.querySelectorAll(".avatar");
const botonIniciar = document.getElementById("botonIniciar");
const pantallaBienvenida = document.getElementById("bienvenida");
const menuPrincipal = document.getElementById("menuPrincipal");
const saludoUsuario = document.getElementById("saludoUsuario");

botonesSexo.forEach(btn => {
  btn.addEventListener("click", () => {
    sexo = btn.dataset.sexo;
    actualizarFondoPorSexo();
    verificarIniciar();
  });
});

botonesAvatar.forEach(btn => {
  btn.addEventListener("click", () => {
    avatar = btn.dataset.emoji;
    verificarIniciar();
  });
});

inputNombre.addEventListener("input", verificarIniciar);

function verificarIniciar() {
  nombreUsuario = inputNombre.value.trim();
  if (nombreUsuario !== "" && sexo !== "" && avatar !== "") {
    botonIniciar.disabled = false;
  } else {
    botonIniciar.disabled = true;
  }
}

function actualizarFondoPorSexo() {
  if (sexo === "nina") {
    document.body.style.backgroundColor = "#ffe6f0";
  } else {
    document.body.style.backgroundColor = "#e6f0ff";
  }
}

botonIniciar.addEventListener("click", () => {
  if (nombreUsuario && sexo && avatar) {
    saludoUsuario.textContent = `¡Hola ${nombreUsuario}! ${avatar}`;
    mostrarPantalla("menuPrincipal");
    hablar(`Bienvenido ${nombreUsuario}, elige un área para comenzar.`);
  }
});

// --- Menú principal ---
const botonesArea = document.querySelectorAll(".areaBtn");

botonesArea.forEach(btn => {
  btn.addEventListener("click", () => {
    const area = btn.dataset.area;
    if (area === "matematicas") {
      mostrarPantalla("matematicasNiveles");
      hablar("Bienvenido al área de Matemáticas. Elige un nivel.");
    } else if (area === "lenguaje") {
      mostrarPantalla("lenguajeNiveles");
      hablar("Bienvenido al área de Lenguaje. Elige un nivel.");
    } else if (area === "habilidades") {
      mostrarPantalla("habilidadesNiveles");
      hablar("Bienvenido al área de Habilidades Sociales. Elige un nivel.");
    } else if (area === "autonomia") {
      mostrarPantalla("autonomiaNiveles");
      hablar("Bienvenido al área de Autonomía. Elige un nivel.");
    } else if (area === "zonaFamiliar") {
      mostrarPantalla("zonaFamiliarPantalla");
      hablar("Bienvenido a la Zona Familiar.");
    }
  });
});

// Botón Volver menú Zona Familiar
document.getElementById("btnVolverMenuZona").addEventListener("click", () => {
  mostrarPantalla("menuPrincipal");
  hablar("Regresaste al menú principal.");
});

// --- Matemáticas Niveles ---
const botonesNivelMat = document.querySelectorAll("#matematicasNiveles .nivelBtn");
botonesNivelMat.forEach(btn => {
  btn.addEventListener("click", () => {
    const nivel = btn.dataset.nivel;
    mostrarPantalla(`matematicasNivel${nivel}`);
    iniciarMatematicasNivel(nivel);
  });
});
document.getElementById("volverMenuMatematicas").addEventListener("click", () => {
  mostrarPantalla("menuPrincipal");
  hablar("Regresaste al menú principal.");
});

// --- Lenguaje Niveles ---
const botonesNivelLen = document.querySelectorAll("#lenguajeNiveles .nivelBtnLenguaje");
botonesNivelLen.forEach(btn => {
  btn.addEventListener("click", () => {
    const nivel = btn.dataset.nivel;
    mostrarPantalla(`lenguajeNivel${nivel}`);
    iniciarLenguajeNivel(nivel);
  });
});
document.getElementById("volverMenuLenguaje").addEventListener("click", () => {
  mostrarPantalla("menuPrincipal");
  hablar("Regresaste al menú principal.");
});

// --- Habilidades Sociales Niveles ---
const botonesNivelHab = document.querySelectorAll("#habilidadesNiveles .nivelBtnHabilidades");
botonesNivelHab.forEach(btn => {
  btn.addEventListener("click", () => {
    const nivel = btn.dataset.nivel;
    mostrarPantalla(`habilidadesNivel${nivel}`);
    iniciarHabilidadesNivel(nivel);
  });
});
document.getElementById("volverMenuHabilidades").addEventListener("click", () => {
  mostrarPantalla("menuPrincipal");
  hablar("Regresaste al menú principal.");
});

// --- Autonomía Niveles ---
const botonesNivelAut = document.querySelectorAll("#autonomiaNiveles .nivelBtnAutonomia");
botonesNivelAut.forEach(btn => {
  btn.addEventListener("click", () => {
    const nivel = btn.dataset.nivel;
    mostrarPantalla(`autonomiaNivel${nivel}`);
    iniciarAutonomiaNivel(nivel);
  });
});
document.getElementById("volverMenuAutonomia").addEventListener("click", () => {
  mostrarPantalla("menuPrincipal");
  hablar("Regresaste al menú principal.");
});

// ------------------------
// MATEMÁTICAS NIVELES Y JUEGOS
// ------------------------
function iniciarMatematicasNivel(nivel) {
  // Variables
  let juegos = [];
  let respuestas = {};
  let indiceJuego = 0;

  // Mostrar juego según índice
  function mostrarJuego() {
    juegos.forEach((j, i) => {
      j.style.display = i === indiceJuego ? "block" : "none";
    });
    const textoPregunta = juegos[indiceJuego].querySelector("p").textContent.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{27BF}]/gu, '').trim();
    hablar(textoPregunta);
  }

  // Revisar respuesta
  function revisarRespuesta(inputId, resultadoId, correcta) {
    const input = document.getElementById(inputId);
    const resultado = document.getElementById(resultadoId);
    let valor;

    if(input.type === "number" || input.tagName === "INPUT") {
      valor = input.value.trim();
      if(valor === "") {
        resultado.textContent = "Escribe tu respuesta.";
        hablar("Escribe tu respuesta.");
        return false;
      }
    }

    // Validar
    if(valor.toLowerCase) valor = valor.toLowerCase();

    if(valor == correcta.toString().toLowerCase()) {
      resultado.textContent = "¡Correcto!";
      hablar("¡Correcto!");
      return true;
    } else {
      resultado.textContent = "Intenta de nuevo.";
      hablar("Intenta de nuevo.");
      return false;
    }
  }

  // Configuración de juegos según nivel
  if (nivel === "1") {
    juegos = [
      document.getElementById("juegoMat1-1"),
      document.getElementById("juegoMat1-2"),
      document.getElementById("juegoMat1-3"),
    ];
    respuestas = {
      "respuestaMat1-1": "3",
      "respuestaMat1-2": "2",
      "respuestaMat1-3": "4",
    };

    // Botones y eventos
    document.getElementById("btnRevisarMat1-1").onclick = () => revisarRespuesta("respuestaMat1-1", "resultadoMat1-1", respuestas["respuestaMat1-1"]);
    document.getElementById("btnRevisarMat1-2").onclick = () => revisarRespuesta("respuestaMat1-2", "resultadoMat1-2", respuestas["respuestaMat1-2"]);
    document.getElementById("btnRevisarMat1-3").onclick = () => revisarRespuesta("respuestaMat1-3", "resultadoMat1-3", respuestas["respuestaMat1-3"]);

    document.getElementById("btnSiguienteJuegoMat1").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("matematicas");
      }
    };

    document.getElementById("btnVolverNivelesMat1").onclick = () => {
      mostrarPantalla("matematicasNiveles");
      hablar("Regresaste a niveles de Matemáticas.");
    };

    document.getElementById("btnSalirMat1").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };

  } else if (nivel === "2") {
    juegos = [
      document.getElementById("juegoMat2-1"),
      document.getElementById("juegoMat2-2"),
      document.getElementById("juegoMat2-3"),
    ];
    respuestas = {
      "respuestaMat2-1": "4",
      "respuestaMat2-2": "16",
      "respuestaMat2-3": "10",
    };
    document.getElementById("btnRevisarMat2-1").onclick = () => revisarRespuesta("respuestaMat2-1", "resultadoMat2-1", respuestas["respuestaMat2-1"]);
    document.getElementById("btnRevisarMat2-2").onclick = () => revisarRespuesta("respuestaMat2-2", "resultadoMat2-2", respuestas["respuestaMat2-2"]);
    document.getElementById("btnRevisarMat2-3").onclick = () => revisarRespuesta("respuestaMat2-3", "resultadoMat2-3", respuestas["respuestaMat2-3"]);

    document.getElementById("btnSiguienteJuegoMat2").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("matematicas");
      }
    };

    document.getElementById("btnVolverNivelesMat2").onclick = () => {
      mostrarPantalla("matematicasNiveles");
      hablar("Regresaste a niveles de Matemáticas.");
    };

    document.getElementById("btnSalirMat2").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };

  } else if (nivel === "3") {
    juegos = [
      document.getElementById("juegoMat3-1"),
      document.getElementById("juegoMat3-2"),
      document.getElementById("juegoMat3-3"),
    ];
    respuestas = {
      "respuestaMat3-1": "4",
      "respuestaMat3-2": "8",
      "respuestaMat3-3": "14",
    };
    document.getElementById("btnRevisarMat3-1").onclick = () => revisarRespuesta("respuestaMat3-1", "resultadoMat3-1", respuestas["respuestaMat3-1"]);
    document.getElementById("btnRevisarMat3-2").onclick = () => revisarRespuesta("respuestaMat3-2", "resultadoMat3-2", respuestas["respuestaMat3-2"]);
    document.getElementById("btnRevisarMat3-3").onclick = () => revisarRespuesta("respuestaMat3-3", "resultadoMat3-3", respuestas["respuestaMat3-3"]);

    document.getElementById("btnSiguienteJuegoMat3").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("matematicas");
      }
    };

    document.getElementById("btnVolverNivelesMat3").onclick = () => {
      mostrarPantalla("matematicasNiveles");
      hablar("Regresaste a niveles de Matemáticas.");
    };

    document.getElementById("btnSalirMat3").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };
  }

  indiceJuego = 0;
  mostrarJuego();
}

// ----------------------
// LENGUAJE NIVELES Y JUEGOS
// ----------------------

function iniciarLenguajeNivel(nivel) {
  let juegos = [];
  let indiceJuego = 0;

  // Función para mostrar juegos
  function mostrarJuego() {
    juegos.forEach((j, i) => {
      j.style.display = i === indiceJuego ? "block" : "none";
    });
    const texto = juegos[indiceJuego].querySelector("p").textContent;
    hablar(texto);
  }

  // Configuración y eventos según nivel
  if (nivel === "1") {
    juegos = [
      document.getElementById("juegoLen1-1"),
      document.getElementById("juegoLen1-2"),
      document.getElementById("juegoLen1-3"),
    ];

    // Juego 1 respuestas botones
    const botonesL1 = juegos[0].querySelectorAll(".respuestaL1");
    botonesL1.forEach(btn => {
      btn.onclick = () => {
        if(btn.dataset.resp.toLowerCase() === "g"){
          document.getElementById("resultadoL1").textContent = "¡Correcto!";
          hablar("¡Correcto!");
        } else {
          document.getElementById("resultadoL1").textContent = "Intenta de nuevo.";
          hablar("Intenta de nuevo.");
        }
      };
    });

    // Juego 2 respuestas botones
    const botonesL2 = juegos[1].querySelectorAll(".respuestaL2");
    botonesL2.forEach(btn => {
      btn.onclick = () => {
        if(btn.dataset.resp === "correcto"){
          document.getElementById("resultadoL2").textContent = "¡Correcto!";
          hablar("¡Correcto!");
        } else {
          document.getElementById("resultadoL2").textContent = "Intenta de nuevo.";
          hablar("Intenta de nuevo.");
        }
      };
    });

    // Juego 3 input texto
    document.getElementById("btnRevisarL3").onclick = () => {
      const val = document.getElementById("respuestaL3").value.trim().toLowerCase();
      if(val === "c"){
        document.getElementById("resultadoL3").textContent = "¡Correcto!";
        hablar("¡Correcto!");
      } else {
        document.getElementById("resultadoL3").textContent = "Intenta de nuevo.";
        hablar("Intenta de nuevo.");
      }
    };

    document.getElementById("btnSiguienteJuegoLen1").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("lenguaje");
      }
    };

    document.getElementById("btnVolverNivelesLen1").onclick = () => {
      mostrarPantalla("lenguajeNiveles");
      hablar("Regresaste a niveles de Lenguaje.");
    };

    document.getElementById("btnSalirLen1").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };

  } else if (nivel === "2") {
    juegos = [
      document.getElementById("juegoLen2-1"),
      document.getElementById("juegoLen2-2"),
      document.getElementById("juegoLen2-3"),
    ];

    // Juego 1
    document.getElementById("btnRevisarLen2-1").onclick = () => {
      const val = document.getElementById("respuestaLen2-1").value.trim().toLowerCase();
      if(val === "c"){
        document.getElementById("resultadoLen2-1").textContent = "¡Correcto!";
        hablar("¡Correcto!");
      } else {
        document.getElementById("resultadoLen2-1").textContent = "Intenta de nuevo.";
        hablar("Intenta de nuevo.");
      }
    };

    // Juego 2 botones
    const botonesLen2 = juegos[1].querySelectorAll(".respuestaLen2");
    botonesLen2.forEach(btn => {
      btn.onclick = () => {
        if(btn.dataset.resp === "correcto"){
          document.getElementById("resultadoLen2-2").textContent = "¡Correcto!";
          hablar("¡Correcto!");
        } else {
          document.getElementById("resultadoLen2-2").textContent = "Intenta de nuevo.";
          hablar("Intenta de nuevo.");
        }
      };
    });

    // Juego 3 texto
    document.getElementById("btnRevisarLen2-3").onclick = () => {
      const val = document.getElementById("respuestaLen2-3").value.trim().toLowerCase();
      if(val === "sol"){
        document.getElementById("resultadoLen2-3").textContent = "¡Correcto!";
        hablar("¡Correcto!");
      } else {
        document.getElementById("resultadoLen2-3").textContent = "Intenta de nuevo.";
        hablar("Intenta de nuevo.");
      }
    };

    document.getElementById("btnSiguienteJuegoLen2").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("lenguaje");
      }
    };

    document.getElementById("btnVolverNivelesLen2").onclick = () => {
      mostrarPantalla("lenguajeNiveles");
      hablar("Regresaste a niveles de Lenguaje.");
    };

    document.getElementById("btnSalirLen2").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };

  } else if (nivel === "3") {
    juegos = [
      document.getElementById("juegoLen3-1"),
      document.getElementById("juegoLen3-2"),
      document.getElementById("juegoLen3-3"),
    ];

    // Juego 1 botones
    const botonesLen3_1 = juegos[0].querySelectorAll(".respuestaLen3");
    botonesLen3_1.forEach(btn => {
      btn.onclick = () => {
        if(btn.dataset.resp.toLowerCase() === "s"){
          document.getElementById("resultadoLen3-1").textContent = "¡Correcto!";
          hablar("¡Correcto!");
        } else {
          document.getElementById("resultadoLen3-1").textContent = "Intenta de nuevo.";
          hablar("Intenta de nuevo.");
        }
      };
    });

    // Juego 2 botones
    const botonesLen3_2 = juegos[1].querySelectorAll(".respuestaLen3");
    botonesLen3_2.forEach(btn => {
      btn.onclick = () => {
        if(btn.dataset.resp === "correcto"){
          document.getElementById("resultadoLen3-2").textContent = "¡Correcto!";
          hablar("¡Correcto!");
        } else {
          document.getElementById("resultadoLen3-2").textContent = "Intenta de nuevo.";
          hablar("Intenta de nuevo.");
        }
      };
    });

    // Juego 3 texto
    document.getElementById("btnRevisarLen3-3").onclick = () => {
      const val = document.getElementById("respuestaLen3-3").value.trim().toLowerCase();
      if(val === "agua"){
        document.getElementById("resultadoLen3-3").textContent = "¡Correcto!";
        hablar("¡Correcto!");
      } else {
        document.getElementById("resultadoLen3-3").textContent = "Intenta de nuevo.";
        hablar("Intenta de nuevo.");
      }
    };

    document.getElementById("btnSiguienteJuegoLen3").onclick = () => {
      if(indiceJuego < juegos.length -1){
        indiceJuego++;
        mostrarJuego();
      } else {
        mostrarMedallaConfeti("lenguaje");
      }
    };

    document.getElementById("btnVolverNivelesLen3").onclick = () => {
      mostrarPantalla("lenguajeNiveles");
      hablar("Regresaste a niveles de Lenguaje.");
    };

    document.getElementById("btnSalirLen3").onclick = () => {
      mostrarPantalla("menuPrincipal");
      hablar("Has salido al menú principal.");
    };
  }

  indiceJuego = 0;
  mostrarJuego();
}

// ----------------------
// HABILIDADES SOCIALES
// ----------------------

function iniciarHabilidadesNivel(nivel) {
  // Para simplicidad, juegos con texto y botones
  if (nivel === "1") {
    mostrarPantalla("habilidadesNivel1");
    hablar("Bienvenido a Habilidades Sociales nivel 1. Aquí habrá juegos interactivos.");
    // Aquí agregar la lógica de juegos específicos si quieres, por ahora es demo
  } else if (nivel === "2") {
    mostrarPantalla("habilidadesNivel2");
    hablar("Bienvenido a Habilidades Sociales nivel 2. Aquí habrá juegos interactivos.");
  }

  // Botones de salida
  document.getElementById("btnVolverNivelesHab1")?.addEventListener("click", () => {
    mostrarPantalla("habilidadesNiveles");
    hablar("Regresaste a niveles de Habilidades Sociales.");
  });
  document.getElementById("btnSalirHab1")?.addEventListener("click", () => {
    mostrarPantalla("menuPrincipal");
    hablar("Has salido al menú principal.");
  });
  document.getElementById("btnVolverNivelesHab2")?.addEventListener("click", () => {
    mostrarPantalla("habilidadesNiveles");
    hablar("Regresaste a niveles de Habilidades Sociales.");
  });
  document.getElementById("btnSalirHab2")?.addEventListener("click", () => {
    mostrarPantalla("menuPrincipal");
    hablar("Has salido al menú principal.");
  });
}

// ----------------------
// AUTONOMÍA
// ----------------------

function iniciarAutonomiaNivel(nivel) {
  if (nivel === "1") {
    mostrarPantalla("autonomiaNivel1");
    hablar("Bienvenido a Autonomía nivel 1.");
  } else if (nivel === "2") {
    mostrarPantalla("autonomiaNivel2");
    hablar("Bienvenido a Autonomía nivel 2.");
  }

  // Botones de salida
  document.getElementById("btnVolverNivelesAut1")?.addEventListener("click", () => {
    mostrarPantalla("autonomiaNiveles");
    hablar("Regresaste a niveles de Autonomía.");
  });
  document.getElementById("btnSalirAut1")?.addEventListener("click", () => {
    mostrarPantalla("menuPrincipal");
    hablar("Has salido al menú principal.");
  });
  document.getElementById("btnVolverNivelesAut2")?.addEventListener("click", () => {
    mostrarPantalla("autonomiaNiveles");
    hablar("Regresaste a niveles de Autonomía.");
  });
  document.getElementById("btnSalirAut2")?.addEventListener("click", () => {
    mostrarPantalla("menuPrincipal");
    hablar("Has salido al menú principal.");
  });
}

// ----------------------
// MEDALLA Y CONFETI
// ----------------------

const medallaContainer = document.getElementById("medallaContainer");
const btnCerrarMedalla = document.getElementById("btnCerrarMedalla");
const confetiCanvas = document.getElementById("confetiCanvas");
const ctx = confetiCanvas.getContext("2d");
let confeti = [];
let animationFrameId;

function mostrarMedallaConfeti(area) {
  medallaContainer.style.display = "flex";
  hablar(`¡Felicidades! Completaste el área de ${area}.`);

  iniciarConfeti();
}

btnCerrarMedalla.addEventListener("click", () => {
  medallaContainer.style.display = "none";
  detenerConfeti();
  mostrarPantalla("menuPrincipal");
});

function ajustarCanvas() {
  confetiCanvas.width = window.innerWidth;
  confetiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", ajustarCanvas);
ajustarCanvas();

function iniciarConfeti() {
  confeti = [];
  const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#577590"];
  for(let i = 0; i < 150; i++) {
    confeti.push({
      x: Math.random() * confetiCanvas.width,
      y: Math.random() * confetiCanvas.height - confetiCanvas.height,
      r: (Math.random() * 6) + 4,
      d: (Math.random() * 10) + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }
  animarConfeti();
}

function animarConfeti() {
  ctx.clearRect(0, 0, confetiCanvas.width, confetiCanvas.height);
  confeti.forEach((conf) => {
    conf.tiltAngle += conf.tiltAngleIncrement;
    conf.y += (Math.cos(conf.d) + 3 + conf.r / 2) / 2;
    conf.tilt = Math.sin(conf.tiltAngle) * 15;

    ctx.beginPath();
    ctx.lineWidth = conf.r;
    ctx.strokeStyle = conf.color;
    ctx.moveTo(conf.x + conf.tilt + conf.r / 2, conf.y);
    ctx.lineTo(conf.x + conf.tilt, conf.y + conf.tilt + conf.r / 2);
    ctx.stroke();

    if(conf.y > confetiCanvas.height) {
      conf.x = Math.random() * confetiCanvas.width;
      conf.y = -10;
    }
  });
  animationFrameId = requestAnimationFrame(animarConfeti);
}

function detenerConfeti() {
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, confetiCanvas.width, confetiCanvas.height);
}

// -------------------
// INICIO
// -------------------
mostrarPantalla("bienvenida");
actualizarFondoPorSexo();
