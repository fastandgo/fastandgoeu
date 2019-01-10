/**
 * Init desc module.
 *
 * @module desc
 * @example
 * // import it in your Javascript file
 * import "path/to/desc.js"
 * */

export default (({
  elements,
  closingButtons
}) => {
  let deactivate = e => e.classList.remove('active')
  let activate = e => e.classList.add('active')
  let links = elements.map(element => {
    let target = document.querySelector(`#${element.getAttribute('data-target')}`);
    let parent = target.parentNode;
    return {
      element,
      target,
      parent
    }
  });
  let parents = links
    .reduce((t, e) => [...t, e.parent], []);

  links.map(link => {
    link.element.addEventListener('click', e => {
      e.preventDefault();
      activateSection(link)
    })
  });
  closingButtons.map(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      [...parents, ...links.reduce((t, e) => [...t, e.element, e.target], [])].map(deactivate);
    });
  })
  let activateSection = ({
    element,
    target,
    parent
  }) => {
    let isAlreadyActive = element.classList.contains('active');
    [...parents, ...links.reduce((t, e) => [...t, e.element, e.target], [])].map(deactivate);
    !isAlreadyActive && [element, target, parent].map(activate);
  };

})({
  elements: Array.from(document.querySelectorAll('.js-more')),
  closingButtons: Array.from(document.querySelectorAll('.js-close-bullets'))
});
