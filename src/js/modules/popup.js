const Popup = (function () {

  const getElement = (element, holder = null) => {
    const elementHolder = holder || document;
    if (typeof element === 'string') {
      return elementHolder.querySelector(element);
    }
    return element;
  }
  const popup = function (args) {
    this.configs = Object.assign({
      holder: null,
      button: null,
      submitAction: null,
      popupOpen: null,
      closeButton: '.popup__close',
      form: '.popup__form',
      classOpen: 'popup_is-opened'
    }, args);

    this.init();
  }

  popup.prototype = {
    init: function () {
      this.holder = getElement(this.configs.holder);
      this.button = getElement(this.configs.button);
      this.form = getElement(this.configs.form,  this.holder);

      this.initEvents();
    },

    initEvents: function () {
      if (this.button) {
        this.button.addEventListener('click', (e) => {
          this.openPopup();
        })
      }
      // Закрыть попап по кнопке.
      const closeButton = this.holder.querySelector(this.configs.closeButton);
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          this.closePopup();
        });
      }
      // Закрыть попап по нажатию на кноку Escape.
      document.addEventListener('keydown', (e) => {
        if (this.isOpen() && e.key === 'Escape') {
          this.closePopup();
        }
      })

      if (this.form && typeof this.configs.submitAction === 'function') {
        this.form.addEventListener('submit', (e) => {
          this.configs.submitAction(e, this.form);
          this.form.reset;
          this.closePopup();
        })
      }

      if (typeof this.configs.popupOpen === 'function') {
        this.holder.addEventListener('onPopupOpen', (e) => {
          this.configs.popupOpen(e, this);
        })
      }
    },

    openPopup: function() {
      if (!this.isOpen()) {
        this.holder.classList.add(this.configs.classOpen);
        this.holder.dispatchEvent(new Event('onPopupOpen'))
      }
    },

    isOpen: function() {
      return this.holder.classList.contains(this.configs.classOpen);
    },

    closePopup: function() {
      if (this.isOpen()) {
        this.holder.classList.remove(this.configs.classOpen);
      }
    }
  }
  return popup;
})()

export default Popup;