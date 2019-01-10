/**
 * Creates an instance of Alertbox.
 *
 * Initialize the instance of Alertbox.
 *
 * Return methods that can be applied on alertboxes.
 *
 * @class alertbox
 * @example
 * import { alertbox } from "path/to/alertbox.js";
 *
 * alertbox.create({ ... })
 * document.querySelector('#alertbox-notification').addEventListener('click', alertbox.toggle)
 */

import { ready } from "../tools/utils.js";

class Alertbox {
  constructor() {
    let alertboxes = Array.from(
      document.querySelectorAll(".alert-box .alert-box--close")
    );

    alertboxes.forEach(alertbox =>
      alertbox.addEventListener("click", this.toggle)
    );
  }

  /**
   * Use this function to open or close any alertbox.
   *
   * @method toggle
   * @access public
   * @param {event} event - Use if toggle function is passed to an event listener
   * @param {integer} [delay] - Delay toggle of opening/closing
   * @example
   * alertbox.toggle().bind(element);
   * alertbox.toggle().bind(element, null, 250); // with 250ms delay
   * alertbox.addEventListener('click', toggle);
   * @memberof alertbox
   */
  toggle(event, delay) {
    event && event.preventDefault();
    let ref = event ? event.currentTarget : this;
    let element = ref.tagName == "A" ? ref.parentNode : ref;

    if (delay) {
      setTimeout(
        el => {
          el.classList.toggle("remove");
        },
        delay,
        element
      );
    } else {
      element.classList.toggle("remove");
    }
  }

  /**
   * Use this function to create a new alertbox
   *
   * @method create
   * @access public
   * @param {any} content
   * @param {any} color
   * @param {any} crossColor
   * @param {boolean} [isHide=false]
   * @example
   * document.body.appendChild(alertbox.new('lorem ipsum', 'alert', 'white'));
   * @returns {nodeElement} - The new alertbox
   * @memberof alertbox
   */
  create(content, color, crossColor, isHide = false) {
    let $alert = document.createElement("div");
    $alert.classList.add("alert-box", color, "remove");

    let $p = document.createElement("p");
    $p.classList.add("no-margin");
    $p.innerText = content;
    $alert.appendChild($p);

    let $a = document.createElement("a");
    $a.href = "#x";
    $a.classList.add("alert-box--close");

    let $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $svg.classList.add("icon", "small", crossColor);

    let $use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    $use.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#icon-close"
    );

    $svg.appendChild($use);

    $a.appendChild($svg);
    $alert.appendChild($a);

    $alert
      .querySelector(".alert-box--close")
      .addEventListener("click", this.toggle);

    if (!isHide) {
      ready(this.toggle.bind($alert, null, 250), $alert);
    }

    return $alert;
  }
}

export let alertbox = new Alertbox();
