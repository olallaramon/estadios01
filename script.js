const canvas = document.getElementById('stadiumCanvas');
const ctx = canvas.getContext('2d');

// Configuración inicial
const objects = []; // Lista de objetos en el estadio
let selectedObject = null; // Objeto actualmente seleccionado

// Dibujar campo
function drawField() {
  ctx.fillStyle = 'green';
  ctx.fillRect(50, 50, 700, 500); // Campo
}

// Dibujar todos los objetos
function drawObjects() {
  objects.forEach(obj => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  });
}

// Agregar objeto
function addObject(x, y, width, height, color) {
  objects.push({ x, y, width, height, color });
  draw();
}

// Dibujar el canvas completo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas
  drawField();
  drawObjects();
}

// Detectar si un clic está sobre un objeto
function getClickedObject(x, y) {
  return objects.find(obj => 
    x > obj.x && x < obj.x + obj.width && 
    y > obj.y && y < obj.y + obj.height
  );
}

// Eventos de ratón
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  selectedObject = getClickedObject(mouseX, mouseY);
});

canvas.addEventListener('mousemove', (e) => {
  if (selectedObject) {
    const rect = canvas.getBoundingClientRect();
    selectedObject.x = e.clientX - rect.left - selectedObject.width / 2;
    selectedObject.y = e.clientY - rect.top - selectedObject.height / 2;
    draw();
  }
});

canvas.addEventListener('mouseup', () => {
  selectedObject = null;
});

// Inicialización del prototipo
drawField();
addObject(100, 100, 50, 50, 'gray'); // Grada
addObject(200, 200, 20, 60, 'yellow'); // Torre de luz
