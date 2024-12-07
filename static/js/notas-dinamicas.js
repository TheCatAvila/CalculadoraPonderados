// Selección de elementos clave
const notasDropdown = document.getElementById('notasDropdown');
const contenedorInputs = document.getElementById('contenedorInputs');
const checkPorcentaje = document.getElementById('check-porcentaje');
const botonCalcular = document.querySelector('.boton-calcular');
const inputResultado = document.querySelector('.resultado');

// Función para calcular el promedio
function calcularPromedio() {
  const notasInputs = [...document.querySelectorAll('.inputs[name^="nota"]')];
  const porcentajeInputs = [...document.querySelectorAll('.inputs[name^="porcentaje"]')];
  const incluirPorcentaje = checkPorcentaje.checked;
  let total = 0, sumaPesos = 0;

  notasInputs.forEach((notaInput, index) => {
    const nota = parseFloat(notaInput.value) || 0;
    const porcentaje = incluirPorcentaje ? (parseFloat(porcentajeInputs[index]?.value) || 0) : 1;

    if (incluirPorcentaje && porcentaje > 0) {
      total += nota * (porcentaje / 100);
      sumaPesos += porcentaje;
    } else {
      total += nota;
    }
  });

  if (incluirPorcentaje && sumaPesos !== 100) {
    alert('La suma de los porcentajes debe ser igual a 100.');
    return;
  }

  const promedio = incluirPorcentaje ? total : total / notasInputs.length;
  inputResultado.value = promedio.toFixed(1); // Mostrar resultado con un decimal
}

// Función para generar inputs dinámicos
function generarNotas(cantidadNotas = 4) {
  contenedorInputs.innerHTML = ''; // Limpia el contenedor
  const incluirPorcentaje = checkPorcentaje.checked;

  for (let i = 1; i <= cantidadNotas; i++) {
    const div = document.createElement('div');
    div.className = 'cont-inputs';
    div.appendChild(crearInput('number', `nota${i}`, `Nota ${i}`, 'text-center inputs'));
    if (incluirPorcentaje) {
      div.appendChild(crearInput('number', `porcentaje${i}`, '%', 'text-center inputs porcentajes'));
    }
    contenedorInputs.appendChild(div);
  }
}

// Función para crear un input
function crearInput(type, name, placeholder, className) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.className = className;
  return input;
}

// Función para crear un enlace
function crearLink(name, value, className) {
  const link = document.createElement('a');
  link.textContent = value; // Texto que muestra el enlace
  link.href = '#'; // Hacer clic en el enlace no recarga la página
  link.className = className; // Clase CSS
  link.setAttribute('data-value', name); // Atributo personalizado para identificar el valor
  return link;
}

// Generar opciones del dropdown
function generarOpcionesDropdown(min = 2, max = 30) {
  notasDropdown.innerHTML = ''; // Limpia el dropdown
  for (let i = min; i <= max; i++) {
    const listItem = document.createElement('li');
    const anchor = crearLink(i, `${i} notas`, 'dropdown-item');
    listItem.appendChild(anchor);
    notasDropdown.appendChild(listItem);
  }
}

// Eventos
checkPorcentaje.addEventListener('change', () => generarNotas(contenedorInputs.childElementCount));
notasDropdown.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-item')) {
    event.preventDefault();
    generarNotas(parseInt(event.target.getAttribute('data-value')));
  }
});
botonCalcular.addEventListener('click', (event) => {
  event.preventDefault();
  calcularPromedio();
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  generarOpcionesDropdown();
  generarNotas(); // Genera 4 notas por defecto
});
