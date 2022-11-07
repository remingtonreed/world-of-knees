/* eslint-disable import/prefer-default-export */

/**
 * Creates an element with optional class and type
 * @param {string} elemType type of element to create
 * @param {...string} [cssClass] CSS class(es) to apply to element
 * @returns {Element}
 */
export function createElem(elemType, ...cssClass) {
  const elem = document.createElement(elemType);
  if (cssClass != null && cssClass.length) {
    elem.classList.add(cssClass);
  }

  return elem;
}
