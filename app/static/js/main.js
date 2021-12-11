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
    // li要素それぞれに各イベントのハンドラを設定
    document.querySelectorAll('.drag-list li').forEach((el) => {
      // ドラッグの開始
      el.ondragstart = function (ev) {
        // ドラッグ元のli要素のidをセット
        ev.dataTransfer.setData('text/plain', ev.target.id);
      };
      // ドラッグ中
      el.ondragover = function (ev) {
        ev.preventDefault();
      };
      // ドロップ
      el.ondrop = function (ev) {
        ev.preventDefault();
        // ドラッグ元のli要素に対応するオブジェクトのインデクスの取得
        const dragIndex = items.findIndex(
          (item) => item.id === ev.dataTransfer.getData('text/plain')
        );
        // ドロップ先のli要素に対応するオブジェクトのインデクスの取得
        const dropIndex = items.findIndex(
          (item) => item.id === this.id
        );
        // ドラッグ元とドロップ先のオブジェクトの交換
        items[dragIndex] = [
          items[dropIndex],
          (items[dropIndex] = items[dragIndex]),
        ][0];
      };
    });
  },
};

Vue.createApp(Demo).mount('#drag-list-demo');
