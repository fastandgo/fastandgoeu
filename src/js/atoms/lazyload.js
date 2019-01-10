/**
 * Init image lazyloading on import.
 *
 * Add class `loaded` on loaded images and class `error` otherwise.
 *
 * @module lazyload
 * @example
 * // import it in your Javascript file
 * import "path/to/lazyload.js"
 * @example
 * <!-- Use it on any image -->
 * <img data-src="image-src.jpg" width="" height="" class="lazyload" alt="" data-error="Erreur lors du chargement de l'image" />
 * <img data-src="soupedelegume" width="" height="" class="lazyload" alt="Broken image" data-error="Erreur lors du chargement de l'image" />
 * */

export default (selector => {
  Array.from(document.querySelectorAll("img[data-src]"), $img => {
    ["src", "srcset", "size"].forEach(attr => {
      let dataAttr = $img.getAttribute(`data-${attr}`);
      dataAttr && $img.setAttribute(attr, $img.getAttribute(`data-${attr}`));
    });
    $img.onload = function() {
      ["src", "srcset", "size"].forEach(attr =>
        $img.removeAttribute(`data-${attr}`)
      );
    };
    $img.onerror = function() {
      $img.classList.add("error");
      ["src", "srcset", "size"].forEach(attr => {
        $img.removeAttribute(attr);
        $img.removeAttribute(`data-${attr}`);
      });
    };
  });
})("img.lazyload");
