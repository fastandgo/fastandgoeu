/**
 * Init fake links handling on import.
 *
 * Fake link handle base64 encoded URL or regular URL passed by using `data-fl` attribute
 * on any HTML tag. It can also handle `target` attribute.
 *
 * @module fakeLink
 * @example
 * // Import it in your Javascript file
 * import "path/to/fakeLink.js"
 * @example
 * <!-- Use it on any HTML tag -->
 * <span data-fl="<base64 link or real link>" target="_blank"></span>
 * */

export default (selector => {
  Array.from(document.querySelectorAll(selector)).forEach($link =>
    $link.addEventListener("click", () => {
      let t = $link.getAttribute("target");
      let u;

      try {
        u = decodeURIComponent(window.atob($link.getAttribute("data-fl")));
      } catch (e) {
        u = $link.getAttribute("data-fl");
      }

      if (u && !u.startsWith("#")) {
        window.open(u, t ? t : "_self");
      }
    })
  );
})("[data-fl]");
