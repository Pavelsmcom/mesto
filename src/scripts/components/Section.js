'use strict';

export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderer(items) {
    for (let i = items.length - 1; i >= 0; i--) {
      this._renderer(items[i]);
    }
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
