let isDragging = false;

document.addEventListener('mousedown', function(event) {
  let dragElement = event.target.closest('.draggable');
  if (!dragElement) return;

  event.preventDefault();
  dragElement.ondragstart = () => false;

  let shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function onMouseUp() {
    finishDrag();
  }

  function startDrag(element, clientX, clientY) {
    if (isDragging) return;
    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    let rect = element.getBoundingClientRect();
    shiftX = clientX - rect.left;
    shiftY = clientY - rect.top;

    element.style.position = 'fixed';
    element.style.zIndex = 1000;

    moveAt(clientX, clientY);
  }

  function moveAt(clientX, clientY) {
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    let newBottom = newY + dragElement.offsetHeight;

    // Scroll down if near the bottom
    if (newBottom > document.documentElement.clientHeight) {
      let docBottom = document.documentElement.getBoundingClientRect().bottom;
      let scrollY = Math.min(docBottom - newBottom, 10);
      if (scrollY > 0) {
        window.scrollBy(0, scrollY);
      }

      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // Scroll up if above viewport
    if (newY < 0) {
      let scrollY = Math.min(-newY, 10);
      if (scrollY > 0) {
        window.scrollBy(0, -scrollY);
      }
      newY = Math.max(newY, 0);
    }

    // Prevent horizontal overflow
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

  function finishDrag() {
    if (!isDragging) return;
    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});
