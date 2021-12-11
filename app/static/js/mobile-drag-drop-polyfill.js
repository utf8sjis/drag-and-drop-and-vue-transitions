/*
  ドラッグ&ドロップAPIをタッチデバイスでも動作させるためのpolyfill
  https://github.com/timruffles/mobile-drag-drop
*/

MobileDragDrop.polyfill({
  dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
});

document.addEventListener('dragenter', (event) => {event.preventDefault();});

window.addEventListener('touchmove', () => {});
