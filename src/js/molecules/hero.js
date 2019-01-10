/**
 * Init hero video.
 *
 * @module hero
 * @example
 * // import it in your Javascript file
 * import "path/to/hero.js"
 * */

export default (({
  vimeoContainer
}) => {
  let vimeoPlayer = document.querySelector(`#${vimeoContainer}`);

  let setPlayerSize = () => {
    let height = window.innerHeight;
    let width = window.innerHeight * 16 / 9;

    if (width < window.innerWidth) {
      width = window.innerWidth;
      height = window.innerWidth * 9 / 16
    }

    vimeoPlayer.style.width = `${width}px`;
    vimeoPlayer.style.height = `${height}px`;
  }
  setPlayerSize();
  window.addEventListener('resize', setPlayerSize);
})({
  vimeoContainer: 'vimeo-hero'
});
