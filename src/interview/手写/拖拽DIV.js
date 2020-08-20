const div = document.querSelector('.drag-box');

let dragging = false;
let position = null;
div.addEventListener('mousedown', (e) => {
  dragging = true;
  position = [e.clientX, e.clientY];
});

div.addEventListener('mousemove', (e) => {
  if (dragging === false) return;
  const detalX = e.clientX - position[0];
  const detalY = e.clientY - position[1];

  const left = parseInt(div.style.left) || 0;
  const top = parseInt(div.style.top) || 0;

  div.style.left = left + detalX + 'px';
  div.style.top = top + detalY + 'px';

  position = [e.clientX, e.clientY];
});

div.addEventListener('mouseup', () => {
  dragging = false;
});
