(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}var t={source:document.querySelector("#card-template").content,selectors:{image:".card__image",title:".card__title",deleteButton:".card__delete-button",likeButton:".card__like-button"},classes:{card:"card",likeActive:"card__like-button_is-active"}},n=function(n,o,r,c){if(t.source&&"object"===e(n)){n=Object.assign({name:"",link:""},n);var s=t.source.cloneNode(!0),a=s.querySelector(t.selectors.image),i=s.querySelector(t.selectors.title),l=s.querySelector(t.selectors.deleteButton),u=s.querySelector(t.selectors.likeButton);return a&&(a.alt=n.name,a.src=n.link,c&&(console.log(c),a.addEventListener("click",c))),i&&(i.textContent=n.name),l&&o&&l.addEventListener("click",(function(e){o(e.target)})),u&&r&&u.addEventListener("click",(function(e){r(e.target)})),s}},o=function(e){e.classList.contains(t.classes.card)||(e=e.closest("."+t.classes.card)),e&&e.remove()},r=function(e){e.classList.toggle(t.classes.likeActive)},c="popup_is-opened",s=function(e){e.classList.add(c),document.addEventListener("keyup",i)},a=function(e){e.classList.remove(c),document.removeEventListener("keyup",i)},i=function(e){var t=document.querySelector("."+c);t&&"Escape"===e.key&&a(t)},l=function(e){var t=e.target;(function(e){return e.target.classList.contains("popup")})(e)&&function(e){return e.classList.contains(c)}(t)&&a(t)},u=document.querySelector(".places").querySelector(".places__list"),p=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_new-card"),m=d.querySelector(".popup__form"),y=document.querySelector(".profile__edit-button"),f=document.querySelector(".popup_type_edit"),v=f.querySelector(".popup__form"),_=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),S=document.querySelector(".popup_type_image"),g=document.querySelectorAll(".popup"),q=function(e){var t=e.target;if(t.classList.contains("card__image")){s(S);var n=S.querySelector(".popup__image"),o=S.querySelector(".popup__caption");n.src=t.src,n.alt=t.alt,o.textContent=t.alt}};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){u.append(n(e,o,r,q))})),g.forEach((function(e){var t=e.querySelector(".popup__close");t&&t.addEventListener("click",(function(t){a(e)})),e.addEventListener("click",l)})),y.addEventListener("click",(function(e){s(f),v.name.value=_.textContent,v.description.value=k.textContent})),v.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=v.name.value,k.textContent=v.description.value,a(f)})),p.addEventListener("click",(function(e){m.reset(),s(d)})),m.addEventListener("submit",(function(e){e.preventDefault();var t={name:m["place-name"].value,link:m.link.value};u.prepend(n(t,o,r,q)),a(d)}))})();