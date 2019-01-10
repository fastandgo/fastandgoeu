/**
 * Init max-height variables.
 *
 * Add max-height of toggled sections.
 *
 * @module maxHeight
 * @example
 * // import it in your Javascript file
 * import "path/to/maxHeight.js"
 * */

export default (({
  elements
}) => {
  ['load', 'resize'].map(event => window.addEventListener(event, () => {
    elements.map(el => el.style.setProperty('--max-height', `${el.scrollHeight}px`));
  }));
})({
  elements: Array.from(document.querySelectorAll('.js-toggle-mh'))
});
