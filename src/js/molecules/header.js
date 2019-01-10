/**
 * Init header event handling.
 *
 * @module header
 * @example
 * // import it in your Javascript file
 * import "path/to/header.js"
 * */

export default (({
  $menuTriggers,
  $nav,
  $header,
  $links
}) => {
  let activeSectionIndex = 0;
  let links = $links.map($link => {
    let target = $link.getAttribute('data-target');
    let targetElement = document.querySelector(target);
    let targetTop = targetElement.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.25);

    return {
      element: $link,
      targetElement,
      targetTop
    }
  });
  let getActiveSectionIndex = () => links.map((link, index) => {
    let scrollPos = window.scrollY

    return scrollPos >= link.targetTop && (!links[index + 1] || scrollPos < links[index + 1].targetTop) ? index.toString() : false
  }).filter(i => i)[0];
  let onScroll = activeLinkIndex => {
    let currentActiveSection = parseInt(getActiveSectionIndex(), 10)
    if (currentActiveSection !== activeSectionIndex) {
      activeSectionIndex = currentActiveSection;
      updateActiveSection();
    }
  };
  let updateActiveSection = () => {
    let link = links[activeSectionIndex];
    links.map(l => l.element.classList.remove('active'));
    link.element.classList.add('active');
  }
  window.addEventListener('scroll', onScroll)

  $menuTriggers.map($trigger => $trigger.addEventListener('click', e => $nav.classList.toggle('show')));
  const headerScrolling = basicScroll.create({
    elem: $header,
    from: 0,
    to: window.innerHeight - document.querySelector('body > header').scrollHeight,
    props: {
      '--opacity': {
        from: 0.01,
        to: 0.99
      },
      '--step': {
        from: 0,
        to: 1
      }
    }
  });

  headerScrolling.start();
  window.addEventListener('resize', e => {
    headerScrolling.calculate();
    headerScrolling.update();
  })
})({
  $menuTriggers: Array.from(document.querySelectorAll('.js-menu-trigger')),
  $nav: document.querySelector('#main-nav'),
  $header: document.querySelector('body > header'),
  $links: Array.from(document.querySelectorAll('.link-header'))
});
