'use strict';

export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderer(items) {
    items.forEach((card) => {
      this._renderer(card);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
