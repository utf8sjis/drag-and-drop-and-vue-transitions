import './mobile-drag-drop-polyfill.js';

const Demo = {
  data: function () {
    return {
      items: [
        {id: 'li-1', name: 'い'},
        {id: 'li-2', name: 'ろ'},
        {id: 'li-3', name: 'は'},
        {id: 'li-4', name: 'に'},
        {id: 'li-5', name: 'ほ'},
        {id: 'li-6', name: 'へ'},
        {id: 'li-7', name: 'と'},
      ],
    };
  },
  mounted: function () {
    const items = this.items;
    document.querySelectorAll('.drag-list li').forEach((el) => {
      el.ondragstart = function (ev) {
        ev.dataTransfer.setData('text/plain', ev.target.id);
      };
      el.ondragover = function (ev) {
        ev.preventDefault();
      };
      el.ondrop = function (ev) {
        ev.preventDefault();
        const newIndex = items.findIndex(
          (item) => item.id === ev.dataTransfer.getData('text/plain')
        );
        const oldIndex = items.findIndex((item) => item.id === this.id);
        items[newIndex] = [
          items[oldIndex],
          (items[oldIndex] = items[newIndex]),
        ][0];
      };
    });
  },
};

Vue.createApp(Demo).mount('#drag-list-demo');
