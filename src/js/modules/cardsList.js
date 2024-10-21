'use strict'

const CardsList = (function () {
  const cardsList = function (args) {
    this.configs = Object.assign(
      {
        template: null,
        holder: null,
        list: null,
        onCardAdded: null,
        image: '.card__image',
        title: '.card__title',
        deleteButton: 'card__delete-button',
        card: '.card',
      },
      args
    );
    this.init();
  }

  cardsList.prototype = {
    init: function () {
      if (this.configs.template instanceof DocumentFragment) {
        this.template = this.configs.template;
      }
      else if (this.configs.template instanceof HTMLTemplateElement) {
        this.template = this.configs.template.content
      }
      else if (this.configs.template instanceof String) {
        const template = document.querySelector(this.configs.template);
        this.template = template ? template.content : null;
      }
      else {
        this.template = null;
      }

      this.holder = document.querySelector(this.configs.holder);

      if (this.holder) {
        this.list = this.holder.querySelector(this.configs.list);
      }

      this.initEvents();
    },

    initEvents: function () {
      this.holder.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(this.configs.deleteButton)) {
          this.deleteItem(e.target);
        }
      });
    },

    addItem: function(data) {
      const item = this.getItemHtml(data);
      if (typeof this.configs.onCardAdded === 'function') {
        this.configs.onCardAdded(item);
      }
      this.list.append(item);

    },

    getItemHtml: function(data) {
      if (!this.template) {
        return '';
      }
      const template = this.template.cloneNode(true);
      const image = template.querySelector(this.configs.image);
      const title = template.querySelector(this.configs.title);

      if (image) {
        image.alt = data.name;
        image.src = data.link;
      }

      if (title) {
        title.textContent = data.name;
      }
      return template;
    },

    deleteItem: function (node) {
      const card = node.closest(this.configs.card);
      if (card) {
        card.remove();
      }
    }
  }

  return cardsList;
})();
export default CardsList;