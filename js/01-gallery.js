import { galleryItems } from "./gallery-items.js";
// Change code below this line
let instance;
const body = document.querySelector("body");
const galleryList = document.querySelector(".gallery");
const galleryListItems = [...galleryItems].map(
  ({ preview, original, description } = el) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const image = document.createElement("img");
    listItem.classList.add("gallery__item");
    link.href = original;
    link.classList.add("gallery__link");
    image.src = preview;
    image.alt = description;
    image.classList.add("gallery__image");
    image.dataset.source = original;
    link.appendChild(image);
    listItem.appendChild(link);
    return listItem;
  }
);
galleryList.append(...galleryListItems);

const onGalleryItemClick = (evt) => {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  evt.preventDefault();
  evt.target.src = evt.target.dataset.source;
  instance = basicLightbox.create(`${evt.target.parentNode.innerHTML}`);
  instance.show();
  body.setAttribute("style", "overflow:hidden;");
};
galleryList.addEventListener("click", onGalleryItemClick);
window.addEventListener("keydown", onEscModalClose);
function onEscModalClose(evt) {
  if (evt.key === "Escape" && instance.visible()) {
    instance.close();
    body.removeAttribute("style");
  }
}
window.addEventListener("click", onClickModalClose);
function onClickModalClose(evt) {
  if (instance.visible() && evt.target.nodeName !== "IMG") {
    body.removeAttribute("style");
  }
}
